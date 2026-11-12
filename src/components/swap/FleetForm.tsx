'use client'

import {useRef, useState} from 'react'
import {AnimatePresence, motion} from 'framer-motion'
import {PhoneInput} from 'react-international-phone'
import {IoCheckmarkCircle} from 'react-icons/io5'
import {LuPaperclip, LuX} from 'react-icons/lu'
import {useValuationStore} from '@/store/valuationStore'
import {submitValuationLead} from '@/lib/valuation/getCarValuation'
import {toNigerianE164} from '@/lib/api/contact'
import ValuationSelect from './ValuationSelect'

const FLEET_COUNTS = ['1–5', '6–20', '21–50', '50+']

const labelCls = 'block text-[13px] text-slate-500 dark:text-white/50'
const inputCls =
    'mt-1.5 w-full bg-transparent border-0 border-b border-slate-300 pb-2 text-[15px] text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-0 transition-colors dark:border-white/15 dark:text-white dark:placeholder:text-white/30 dark:focus:border-white'

type Errors = Record<string, string>

export default function FleetForm() {
    const fleet = useValuationStore((s) => s.fleet)
    const setFleetField = useValuationStore((s) => s.setFleetField)
    const resetFleet = useValuationStore((s) => s.resetFleet)

    const [file, setFile] = useState<File | null>(null)
    const [submitting, setSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [formError, setFormError] = useState<string | null>(null)
    const [errors, setErrors] = useState<Errors>({})
    const fileInputRef = useRef<HTMLInputElement>(null)

    const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0] ?? null
        setFile(f)
        setFleetField('fleetFileName', f?.name ?? '')
        setErrors((x) => ({...x, fleetList: ''}))
    }

    const clearFile = () => {
        setFile(null)
        setFleetField('fleetFileName', '')
        if (fileInputRef.current) fileInputRef.current.value = ''
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (submitting) return
        setSubmitting(true)
        setFormError(null)
        setErrors({})

        const fd = new FormData()
        fd.set('type', 'fleet')
        fd.set('count', fleet.count)
        fd.set('rough', (fleet.showRough && fleet.rough.trim()) ? fleet.rough.trim() : 'Fleet valuation inquiry')
        fd.set('contactName', fleet.fullName)
        fd.set('fullName', fleet.fullName)
        fd.set('contactCompany', fleet.company)
        fd.set('contactRole', fleet.role)
        const e164Phone = toNigerianE164(fleet.phone)
        fd.set('contactPhone', e164Phone)
        fd.set('phone', e164Phone)
        fd.set('contactEmail', fleet.email.trim().toLowerCase())
        fd.set('email', fleet.email.trim().toLowerCase())
        if (file) fd.set('fleetList', file)

        try {
            const data = await submitValuationLead(fd)
            if (!data?.success) {
                if (data?.errors) setErrors(data.errors)
                throw new Error(data?.message || 'Something went wrong. Try again, or message us on WhatsApp.')
            }
            setSubmitted(true)
        } catch (err) {
            setFormError(err instanceof Error ? err.message : 'Something went wrong. Try again, or message us on WhatsApp.')
        } finally {
            setSubmitting(false)
        }
    }

    const reset = () => {
        resetFleet()
        clearFile()
        setSubmitted(false)
        setFormError(null)
        setErrors({})
    }

    if (submitted) {
        return (
            <motion.div
                initial={{opacity: 0, scale: 0.97}}
                animate={{opacity: 1, scale: 1}}
                className="flex min-h-[420px] flex-col items-center justify-center text-center"
            >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                    <IoCheckmarkCircle size={44} aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-xl font-bold">Thanks, {fleet.fullName || "we've got it"}.</h3>
                <p className="mx-auto mt-2 max-w-sm text-sm text-slate-500 dark:text-white/60">
                    Our fleet team will reach out within one working day to value your vehicles and talk through EV options.
                </p>
                <button
                    type="button"
                    onClick={reset}
                    className="mt-7 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
                >
                    Submit another fleet
                </button>
            </motion.div>
        )
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3 className="text-lg font-bold tracking-tight">Tell us about your fleet</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-white/60">
                Fleets need a closer look, so our team values them by hand.
            </p>

            <div className="mt-6 space-y-6">
                <ValuationSelect
                    label="How many cars?"
                    value={fleet.count}
                    options={FLEET_COUNTS}
                    onChange={(v) => setFleetField('count', v)}
                    error={errors.count}
                />

                {/* Upload */}
                <div>
                    <label className={labelCls} htmlFor="fleet-file">
                        Upload your fleet list
                    </label>
                    <input
                        ref={fileInputRef}
                        id="fleet-file"
                        type="file"
                        accept=".xlsx,.csv"
                        onChange={onFile}
                        className="sr-only"
                    />
                    {fleet.fleetFileName ? (
                        <div className="mt-2 flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm dark:border-white/10 dark:bg-white/5">
                            <span className="flex min-w-0 items-center gap-2">
                                <LuPaperclip size={16} className="shrink-0 text-accent" aria-hidden="true" />
                                <span className="truncate">{fleet.fleetFileName}</span>
                            </span>
                            <button
                                type="button"
                                onClick={clearFile}
                                aria-label="Remove file"
                                className="shrink-0 rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-white/10 dark:hover:text-white"
                            >
                                <LuX size={16} />
                            </button>
                        </div>
                    ) : (
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="mt-2 flex w-full items-center gap-2 rounded-xl border border-dashed border-slate-300 px-4 py-3 text-left text-sm text-slate-500 transition hover:border-slate-400 hover:bg-slate-50 dark:border-white/15 dark:text-white/50 dark:hover:border-white/30 dark:hover:bg-white/5"
                        >
                            <LuPaperclip size={16} className="shrink-0" aria-hidden="true" />
                            Choose a .xlsx or .csv file
                        </button>
                    )}
                    {errors.fleetList ? (
                        <p className="mt-1.5 text-[12px] font-medium text-red-500 dark:text-red-400">{errors.fleetList}</p>
                    ) : (
                        <p className="mt-1.5 text-[12px] text-slate-400 dark:text-white/40">
                            Include make, model, year and mileage for each car.
                        </p>
                    )}

                    {!fleet.showRough && (
                        <button
                            type="button"
                            onClick={() => setFleetField('showRough', true)}
                            className="mt-2 text-left text-[13px] font-medium text-accent underline-offset-2 hover:underline"
                        >
                            No list handy? Tell us roughly what you run and we&apos;ll collect the rest on a call.
                        </button>
                    )}
                </div>

                {fleet.showRough && (
                    <div>
                        <label className={labelCls} htmlFor="fleet-rough">
                            What does your fleet look like?
                        </label>
                        <textarea
                            id="fleet-rough"
                            rows={3}
                            value={fleet.rough}
                            onChange={(e) => setFleetField('rough', e.target.value)}
                            placeholder="e.g. 8 Corollas and 4 Hiace buses, mostly 2015–2018, high mileage."
                            className={`${inputCls} resize-none`}
                        />
                    </div>
                )}

                {/* Contact */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                        <label className={labelCls} htmlFor="fleet-name">Full name</label>
                        <input
                            id="fleet-name"
                            type="text"
                            value={fleet.fullName}
                            onChange={(e) => setFleetField('fullName', e.target.value)}
                            placeholder="Full name"
                            className={inputCls}
                        />
                        {errors.contactName && (
                            <p className="mt-1 text-[12px] font-medium text-red-500 dark:text-red-400">{errors.contactName}</p>
                        )}
                    </div>
                    <div>
                        <label className={labelCls} htmlFor="fleet-company">Company name</label>
                        <input
                            id="fleet-company"
                            type="text"
                            value={fleet.company}
                            onChange={(e) => setFleetField('company', e.target.value)}
                            placeholder="Company name"
                            className={inputCls}
                        />
                        {errors.contactCompany && (
                            <p className="mt-1 text-[12px] font-medium text-red-500 dark:text-red-400">{errors.contactCompany}</p>
                        )}
                    </div>
                    <div>
                        <label className={labelCls} htmlFor="fleet-role">Your role</label>
                        <input
                            id="fleet-role"
                            type="text"
                            value={fleet.role}
                            onChange={(e) => setFleetField('role', e.target.value)}
                            placeholder="e.g. Operations lead"
                            className={inputCls}
                        />
                    </div>
                    <div>
                        <label className={labelCls} htmlFor="fleet-phone">Phone and WhatsApp</label>
                        <div className="demo-phone mt-2.5">
                            <PhoneInput
                                inputProps={{id: 'fleet-phone'}}
                                defaultCountry="ng"
                                value={fleet.phone}
                                onChange={(val) => setFleetField('phone', val)}
                                placeholder="800 000 0000"
                            />
                        </div>
                        {errors.contactPhone && (
                            <p className="mt-1 text-[12px] font-medium text-red-500 dark:text-red-400">{errors.contactPhone}</p>
                        )}
                    </div>
                    <div className="sm:col-span-2">
                        <label className={labelCls} htmlFor="fleet-email">Email</label>
                        <input
                            id="fleet-email"
                            type="email"
                            value={fleet.email}
                            onChange={(e) => setFleetField('email', e.target.value)}
                            placeholder="you@company.com"
                            className={inputCls}
                        />
                        {errors.contactEmail && (
                            <p className="mt-1 text-[12px] font-medium text-red-500 dark:text-red-400">{errors.contactEmail}</p>
                        )}
                    </div>
                </div>

                {formError && (
                    <p className="rounded-xl bg-red-500/10 px-4 py-3 text-[13px] font-medium text-red-600 dark:text-red-400">
                        {formError}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={submitting}
                    className={`flex w-full items-center justify-center gap-2 rounded-full bg-accent py-4 text-[15px] font-semibold text-white transition hover:bg-accent/90 dark:bg-[#2D419A] dark:hover:bg-[#2D419A]/90 sm:w-fit sm:px-10 ${
                        submitting ? 'cursor-not-allowed opacity-50' : ''
                    }`}
                >
                    {submitting && (
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    )}
                    {submitting ? 'Sending…' : 'Get my fleet valued'}
                </button>
            </div>
        </form>
    )
}
