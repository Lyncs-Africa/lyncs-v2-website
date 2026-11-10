'use client'

import {useEffect, useState} from 'react'
import Link from 'next/link'
import {AnimatePresence, motion} from 'framer-motion'
import {PhoneInput} from 'react-international-phone'
import {IoCheckmarkCircle} from 'react-icons/io5'
import {LuX} from 'react-icons/lu'
import {useValuationStore} from '@/store/valuationStore'
import {EV_CONFIG} from '@/lib/valuation/config'
import {resolveActiveEv} from '@/lib/valuation/evOptions'

const labelCls = 'block text-[13px] text-slate-500 dark:text-white/50'
const inputCls =
    'mt-1.5 w-full bg-transparent border-0 border-b border-slate-300 pb-2 text-[15px] text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-0 transition-colors dark:border-white/15 dark:text-white dark:placeholder:text-white/30 dark:focus:border-white'

type Errors = Record<string, string>

export default function LockInModal({open, onClose}: {open: boolean; onClose: () => void}) {
    const owner = useValuationStore((s) => s.owner)
    const result = useValuationStore((s) => s.result)
    const evs = useValuationStore((s) => s.evs)
    const selectedEvId = useValuationStore((s) => s.selectedEvId)

    const [fullName, setFullName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [done, setDone] = useState(false)
    const [formError, setFormError] = useState<string | null>(null)
    const [errors, setErrors] = useState<Errors>({})

    // Close on Escape.
    useEffect(() => {
        if (!open) return
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
        document.addEventListener('keydown', onKey)
        document.body.style.overflow = 'hidden'
        return () => {
            document.removeEventListener('keydown', onKey)
            document.body.style.overflow = ''
        }
    }, [open, onClose])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (submitting || !result) return

        setSubmitting(true)
        setFormError(null)
        setErrors({})

        const fd = new FormData()
        fd.set('type', 'owner')
        fd.set('make', owner.make)
        fd.set('model', owner.model)
        fd.set('year', String(owner.year))
        fd.set('mileageKm', String(owner.km).replace(/\D/g, ''))
        fd.set('condition', owner.condition)
        fd.set('estimateMin', String(result.min))
        fd.set('estimateMax', String(result.max))
        // The EV they're swapping into (auto-matched or chosen).
        const activeEv = resolveActiveEv(evs, selectedEvId, (result.min + result.max) / 2)
        fd.set('targetEvName', activeEv.name)
        fd.set('targetEvPrice', String(activeEv.price))
        fd.set('contactName', fullName)
        fd.set('contactPhone', phone)
        fd.set('contactEmail', email)

        try {
            const res = await fetch('/api/valuation-leads', {method: 'POST', body: fd})
            const data = await res.json().catch(() => null)
            if (!res.ok || !data?.success) {
                if (data?.errors) setErrors(data.errors)
                throw new Error(data?.message || 'Something went wrong. Try again, or message us on WhatsApp.')
            }
            setDone(true)
        } catch (err) {
            setFormError(err instanceof Error ? err.message : 'Something went wrong. Try again, or message us on WhatsApp.')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                >
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={onClose}
                        aria-hidden="true"
                    />
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="lockin-title"
                        initial={{y: 24, opacity: 0, scale: 0.98}}
                        animate={{y: 0, opacity: 1, scale: 1}}
                        exit={{y: 24, opacity: 0, scale: 0.98}}
                        transition={{duration: 0.25, ease: 'easeOut'}}
                        className="relative z-10 max-h-[92vh] w-full max-w-md overflow-auto no-scrollbar rounded-t-[28px] bg-gray-100 p-6 text-slate-900 shadow-2xl sm:rounded-[28px] sm:p-8 dark:bg-[#0E131F] dark:text-white dark:ring-1 dark:ring-white/10"
                    >
                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Close"
                            className="absolute right-4 top-4 rounded-full p-1.5 text-slate-400 transition hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-white/10 dark:hover:text-white"
                        >
                            <LuX size={20} />
                        </button>

                        {done ? (
                            <div className="flex flex-col items-center py-6 text-center">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                                    <IoCheckmarkCircle size={44} aria-hidden="true" />
                                </div>
                                <h2 id="lockin-title" className="mt-5 text-xl font-bold">
                                    Your valuation is locked in.
                                </h2>
                                <p className="mx-auto mt-2 max-w-sm text-sm text-slate-500 dark:text-white/60">
                                    We&apos;ll reach out within one working day to book your inspection. Your quote is held
                                    for {EV_CONFIG.quoteHeldDays} days.
                                </p>
                                <Link
                                    href="/cars"
                                    className="mt-7 rounded-full bg-accent px-7 py-3 text-sm font-semibold text-white transition hover:bg-accent/90 dark:bg-[#2D419A] dark:hover:bg-[#2D419A]/90"
                                >
                                    See available EVs
                                </Link>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <h2 id="lockin-title" className="text-xl font-bold tracking-tight">
                                    Lock in your valuation
                                </h2>
                                <p className="mt-1.5 text-sm text-slate-500 dark:text-white/60">
                                    Leave your details and we&apos;ll book your inspection.
                                </p>

                                <div className="mt-6 space-y-5">
                                    <div>
                                        <label className={labelCls} htmlFor="lockin-name">Full name</label>
                                        <input
                                            id="lockin-name"
                                            type="text"
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            placeholder="Full name"
                                            className={inputCls}
                                            autoFocus
                                        />
                                        {errors.contactName && (
                                            <p className="mt-1 text-[12px] font-medium text-red-500 dark:text-red-400">{errors.contactName}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className={labelCls} htmlFor="lockin-phone">Phone and WhatsApp</label>
                                        <div className="demo-phone mt-2.5">
                                            <PhoneInput
                                                inputProps={{id: 'lockin-phone'}}
                                                defaultCountry="ng"
                                                value={phone}
                                                onChange={setPhone}
                                                placeholder="800 000 0000"
                                            />
                                        </div>
                                        {errors.contactPhone && (
                                            <p className="mt-1 text-[12px] font-medium text-red-500 dark:text-red-400">{errors.contactPhone}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className={labelCls} htmlFor="lockin-email">Email</label>
                                        <input
                                            id="lockin-email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="you@email.com"
                                            className={inputCls}
                                        />
                                        {errors.contactEmail && (
                                            <p className="mt-1 text-[12px] font-medium text-red-500 dark:text-red-400">{errors.contactEmail}</p>
                                        )}
                                    </div>
                                </div>

                                {formError && (
                                    <p className="mt-5 rounded-xl bg-red-500/10 px-4 py-3 text-[13px] font-medium text-red-600 dark:text-red-400">
                                        {formError}
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className={`mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-accent py-4 text-[15px] font-semibold text-white transition hover:bg-accent/90 dark:bg-[#2D419A] dark:hover:bg-[#2D419A]/90 ${
                                        submitting ? 'cursor-not-allowed opacity-50' : ''
                                    }`}
                                >
                                    {submitting && (
                                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                                    )}
                                    {submitting ? 'Booking…' : 'Book my inspection'}
                                </button>
                            </form>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
