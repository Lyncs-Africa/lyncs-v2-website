'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import {
    IoCall,
    IoCheckmarkCircle,
    IoLogoWhatsapp,
    IoMail,
    IoShieldCheckmarkOutline,
} from 'react-icons/io5'
import { LuArrowRight, LuCar, LuCheck, LuChevronDown, LuSparkles, LuTruck } from 'react-icons/lu'
import { PhoneInput } from 'react-international-phone'
import { formatThousands } from '@/lib/valuation/breakdown'
import { submitCarRequest } from '@/lib/api/cars'

const POWERTRAIN_OPTIONS = [
    { label: 'Petrol', value: 'petrol' },
    { label: 'Electric (EV)', value: 'electric' },
    { label: 'Hybrid', value: 'hybrid' },
] as const

const CONDITION_OPTIONS = [
    { label: 'Brand New', value: 'brand-new' },
    { label: 'Foreign Used', value: 'used' },
] as const

const SOURCING_PERKS = [
    {
        Icon: IoShieldCheckmarkOutline,
        title: 'Verified Pre-Shipment Inspection',
        desc: 'Every sourced vehicle is inspected for mechanical, structural, and battery health before purchase.',
    },
    {
        Icon: LuSparkles,
        title: 'Transparent Landed Pricing',
        desc: 'Receive verified vehicle options with full shipping and customs clearance costs within 24–48 hours.',
    },
    {
        Icon: LuTruck,
        title: 'Port Pickup or Doorstep Delivery',
        desc: 'We handle shipping, Lagos port clearing, and delivery straight to your location.',
    },
]

function parseNumeric(formatted: string): number | undefined {
    const digits = formatted.replace(/\D/g, '')
    if (!digits) return undefined
    const num = Number(digits)
    return Number.isFinite(num) && num > 0 ? num : undefined
}

function SelectField<T extends string>({
    label,
    value,
    options,
    onChange,
}: {
    label: string
    value: T
    options: readonly { label: string; value: T }[]
    onChange: (v: T) => void
}) {
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!open) return
        const onDown = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
        }
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpen(false)
        }
        document.addEventListener('mousedown', onDown)
        document.addEventListener('keydown', onKey)
        return () => {
            document.removeEventListener('mousedown', onDown)
            document.removeEventListener('keydown', onKey)
        }
    }, [open])

    const selectedLabel = options.find((o) => o.value === value)?.label || ''

    return (
        <div className="relative" ref={ref}>
            <label className="block text-[13px] text-slate-500 dark:text-white/50">{label}</label>
            <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={open}
                onClick={() => setOpen((o) => !o)}
                className="mt-1.5 flex w-full items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-left text-[15px] text-slate-900 shadow-sm transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 dark:border-white/10 dark:bg-white/5 dark:text-white"
            >
                <span className="truncate">{selectedLabel}</span>
                <LuChevronDown
                    size={16}
                    aria-hidden="true"
                    className={`shrink-0 text-slate-400 transition-transform dark:text-white/40 ${open ? 'rotate-180' : ''}`}
                />
            </button>

            <AnimatePresence>
                {open && (
                    <motion.ul
                        role="listbox"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        className="absolute left-0 top-full z-30 mt-2 max-h-64 w-full min-w-[180px] overflow-auto rounded-2xl border border-slate-200 bg-white p-1.5 shadow-2xl dark:border-white/10 dark:bg-[#131A28]"
                    >
                        {options.map((opt) => {
                            const active = opt.value === value
                            return (
                                <li key={opt.value} role="option" aria-selected={active}>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            onChange(opt.value)
                                            setOpen(false)
                                        }}
                                        className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-left text-[14px] transition ${
                                            active
                                                ? 'bg-accent font-medium text-white dark:bg-[#2D419A]'
                                                : 'text-slate-700 hover:bg-slate-100 dark:text-white/80 dark:hover:bg-white/10'
                                        }`}
                                    >
                                        <span>{opt.label}</span>
                                        {active && <LuCheck size={15} className="shrink-0" aria-hidden="true" />}
                                    </button>
                                </li>
                            )
                        })}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    )
}

export default function RequestVehicle() {
    const searchParams = useSearchParams()

    const [submitted, setSubmitted] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [referenceCode, setReferenceCode] = useState<string | null>(null)
    const [formError, setFormError] = useState<string | null>(null)
    const [isWhatsapp, setIsWhatsapp] = useState(true)

    const [form, setForm] = useState({
        make: '',
        model: '',
        type: 'petrol' as 'petrol' | 'electric' | 'hybrid',
        usage: 'brand-new' as 'brand-new' | 'used',
        budgetMin: '',
        budgetMax: '',
        name: '',
        email: '',
        phone: '',
        whatsapp: '',
        details: '',
    })

    useEffect(() => {
        const qMake = searchParams.get('make')
        const qModel = searchParams.get('model')
        if (qMake || qModel) {
            setForm((prev) => ({
                ...prev,
                make: qMake || prev.make,
                model: qModel || prev.model,
            }))
        }
    }, [searchParams])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (submitting) return

        if (!form.make.trim() || !form.model.trim()) {
            setFormError('Please enter the vehicle make and model you are looking for.')
            return
        }
        if (!form.name.trim() || !form.email.trim()) {
            setFormError('Please provide your name and email address.')
            return
        }
        if (!form.phone || form.phone.replace(/\D/g, '').length < 7) {
            setFormError('Please provide a valid phone number.')
            return
        }

        setSubmitting(true)
        setFormError(null)

        try {
            const res = await submitCarRequest({
                make: form.make.trim(),
                model: form.model.trim(),
                type: form.type,
                usage: form.usage,
                budgetMin: parseNumeric(form.budgetMin),
                budgetMax: parseNumeric(form.budgetMax),
                details: form.details.trim() || undefined,
                contact: {
                    name: form.name.trim(),
                    email: form.email.trim(),
                    phone: form.phone,
                    whatsapp: isWhatsapp ? form.phone : form.whatsapp || form.phone,
                },
            })
            const data = res?.data || res
            setReferenceCode(data?.referenceCode || data?.id || null)
            setSubmitted(true)
        } catch (err) {
            setFormError(
                err instanceof Error
                    ? err.message
                    : 'Something went wrong while submitting your request. Please try again.',
            )
        } finally {
            setSubmitting(false)
        }
    }

    const reset = () => {
        setSubmitted(false)
        setReferenceCode(null)
        setFormError(null)
        setIsWhatsapp(true)
        setForm({
            make: '',
            model: '',
            type: 'petrol',
            usage: 'brand-new',
            budgetMin: '',
            budgetMax: '',
            name: '',
            email: '',
            phone: '',
            whatsapp: '',
            details: '',
        })
    }

    const labelCls = 'block text-[13px] text-slate-500 dark:text-white/50'
    const fieldCls =
        'mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-[15px] text-slate-900 placeholder:text-slate-400 shadow-sm transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-white/30'

    return (
        <section
            style={{
                backgroundImage:
                    'linear-gradient(rgba(26,39,71,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(26,39,71,0.05) 1px, transparent 1px)',
                backgroundSize: '48px 48px, 48px 48px',
            }}
            className="-mt-20 font-Quicksand dark:bg-night md:-mt-[130px]"
        >
            <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-10 px-4 pb-16 pt-28 sm:px-6 md:pb-28 md:pt-[160px] lg:gap-16 lg:px-8 xl:grid-cols-2">
                {/* Left Column: Heading, Copy, Sourcing Perks & Direct Contact (matching /contact) */}
                <div className="xl:sticky xl:top-28">

                    <h1 className=" text-4xl font-bold leading-[1.05] tracking-tight text-primary dark:text-white sm:text-5xl md:text-6xl">
                        <span className="text-accent">Request</span> the exact vehicle you want
                    </h1>

                    <p className="mt-6 max-w-md text-[15px] leading-relaxed text-slate-500 dark:text-slate-300">
                        Can&apos;t find the exact make, model, or trim in our catalog? Tell us your specification and
                        target budget, and our sourcing team will find, inspect, and deliver it straight to you.
                    </p>

                    <div className="mt-9 space-y-5 max-w-md">
                        {SOURCING_PERKS.map(({ Icon, title, desc }) => (
                            <div key={title} className="flex items-start gap-3.5">
                                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent ring-1 ring-black/5 dark:bg-white/5 dark:ring-white/10">
                                    <Icon size={18} aria-hidden="true" />
                                </span>
                                <div>
                                    <p className="text-sm font-bold text-primary dark:text-white">{title}</p>
                                    <p className="mt-0.5 text-[13px] leading-relaxed text-slate-500 dark:text-slate-400">
                                        {desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 space-y-6 border-t border-slate-200/80 pt-8 max-w-md dark:border-white/10">
                        <a href="mailto:support@lyncs.africa" className="flex items-center gap-4 group">
                            <IoMail size={26} className="shrink-0 text-accent" />
                            <span>
                                <span className="block text-[13px] text-slate-400 dark:text-white/50">E-mail</span>
                                <span className="block text-lg font-semibold text-primary transition group-hover:text-accent dark:text-white">
                                    support@lyncs.africa
                                </span>
                            </span>
                        </a>
                        <a href="tel:+2349055555407" className="flex items-center gap-4 group">
                            <IoCall size={26} className="shrink-0 text-accent" />
                            <span>
                                <span className="block text-[13px] text-slate-400 dark:text-white/50">
                                    Phone number
                                </span>
                                <span className="block text-lg font-semibold text-primary transition group-hover:text-accent dark:text-white">
                                    +234 905 555 5407
                                </span>
                            </span>
                        </a>
                    </div>
                </div>

                {/* Right Column: Form Card (matching /contact) */}
                <div className="demo-card rounded-[28px] border border-slate-200 bg-gray-100 p-6 text-slate-900 shadow-2xl sm:p-9 md:p-10 dark:border-transparent dark:bg-[#0E131F] dark:text-white dark:ring-1 dark:ring-white/10">
                    <AnimatePresence mode="wait">
                        {submitted ? (
                            <motion.div
                                key="done"
                                initial={{ opacity: 0, scale: 0.97 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex min-h-[420px] flex-col items-center justify-center text-center"
                            >
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500">
                                    <IoCheckmarkCircle size={44} />
                                </div>
                                <h2 className="mt-5 text-2xl font-bold text-primary dark:text-white">
                                    Vehicle request sent!
                                </h2>
                                <p className="mx-auto mt-2 max-w-sm text-sm text-slate-500 dark:text-white/60">
                                    Thanks, {form.name || 'there'}. We&apos;ve received your request for a{' '}
                                    <span className="font-semibold text-slate-800 dark:text-white">
                                        {form.make} {form.model}
                                    </span>{' '}
                                    and will reach out via WhatsApp and {form.email || 'email'} within 24–48 hours.
                                </p>
                                {referenceCode && (
                                    <p className="mt-4 rounded-full bg-slate-200/80 px-4 py-1.5 text-xs font-semibold text-slate-700 dark:bg-white/10 dark:text-white/80">
                                        Reference ID: {referenceCode}
                                    </p>
                                )}
                                <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                                    <button
                                        type="button"
                                        onClick={reset}
                                        className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
                                    >
                                        Request another vehicle
                                    </button>
                                    <Link
                                        href="/cars"
                                        className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent/90 dark:bg-[#2D419A] dark:hover:bg-[#2D419A]/90"
                                    >
                                        Browse catalog
                                    </Link>
                                </div>
                            </motion.div>
                        ) : (
                            <form key="form" onSubmit={handleSubmit} className="space-y-5">
                                {/* Make & Model */}
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <label className={labelCls}>Vehicle Make</label>
                                        <input
                                            type="text"
                                            required
                                            value={form.make}
                                            onChange={(e) => setForm({ ...form, make: e.target.value })}
                                            placeholder="e.g. Toyota, BYD, Mercedes-Benz"
                                            className={fieldCls}
                                        />
                                    </div>
                                    <div>
                                        <label className={labelCls}>Vehicle Model</label>
                                        <input
                                            type="text"
                                            required
                                            value={form.model}
                                            onChange={(e) => setForm({ ...form, model: e.target.value })}
                                            placeholder="e.g. Land Cruiser Prado, Song Plus"
                                            className={fieldCls}
                                        />
                                    </div>
                                </div>

                                {/* Powertrain & Condition */}
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <SelectField
                                        label="Powertrain / Fuel Type"
                                        value={form.type}
                                        options={POWERTRAIN_OPTIONS}
                                        onChange={(val) => setForm({ ...form, type: val })}
                                    />

                                    <SelectField
                                        label="Vehicle Condition"
                                        value={form.usage}
                                        options={CONDITION_OPTIONS}
                                        onChange={(val) => setForm({ ...form, usage: val })}
                                    />
                                </div>

                                {/* Budget Range */}
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <label className={labelCls}>Min Budget (₦, optional)</label>
                                        <input
                                            type="text"
                                            inputMode="numeric"
                                            value={form.budgetMin}
                                            onChange={(e) =>
                                                setForm({ ...form, budgetMin: formatThousands(e.target.value) })
                                            }
                                            placeholder="15,000,000"
                                            className={fieldCls}
                                        />
                                    </div>
                                    <div>
                                        <label className={labelCls}>Max Budget (₦, optional)</label>
                                        <input
                                            type="text"
                                            inputMode="numeric"
                                            value={form.budgetMax}
                                            onChange={(e) =>
                                                setForm({ ...form, budgetMax: formatThousands(e.target.value) })
                                            }
                                            placeholder="30,000,000"
                                            className={fieldCls}
                                        />
                                    </div>
                                </div>

                                {/* Contact Name & Email */}
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <label className={labelCls}>Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={form.name}
                                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                                            placeholder="Tolu Adeyemi"
                                            className={fieldCls}
                                        />
                                    </div>

                                    <div>
                                        <label className={labelCls}>Email</label>
                                        <input
                                            type="email"
                                            required
                                            value={form.email}
                                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                                            placeholder="tolu@yourcompany.com"
                                            className={fieldCls}
                                        />
                                    </div>
                                </div>

                                {/* Phone & WhatsApp toggle */}
                                <div>
                                    <label className={labelCls}>Phone</label>
                                    <div className="contact-phone mt-1.5">
                                        <PhoneInput
                                            defaultCountry="ng"
                                            value={form.phone}
                                            onChange={(val) => setForm({ ...form, phone: val })}
                                            placeholder="800 000 0000"
                                        />
                                    </div>
                                    <label
                                        className={`group mt-3 flex w-fit cursor-pointer select-none items-center gap-2.5 rounded-full border px-3.5 py-2 text-[13px] font-medium transition ${isWhatsapp
                                            ? 'border-[#25D366]/40 bg-[#25D366]/10 text-slate-700 dark:text-white'
                                            : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 dark:border-white/10 dark:bg-white/5 dark:text-white/70'
                                            }`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={isWhatsapp}
                                            onChange={(e) => setIsWhatsapp(e.target.checked)}
                                            className="peer sr-only"
                                        />
                                        <span
                                            className={`flex h-5 w-5 items-center justify-center rounded-md border transition peer-focus-visible:ring-2 peer-focus-visible:ring-accent/40 ${isWhatsapp
                                                ? 'border-[#25D366] bg-[#25D366] text-white'
                                                : 'border-slate-300 bg-white dark:border-white/20 dark:bg-transparent'
                                                }`}
                                        >
                                            {isWhatsapp && <LuCheck size={14} strokeWidth={3} />}
                                        </span>
                                        <IoLogoWhatsapp size={16} className="text-[#25D366]" />
                                        This is my WhatsApp number
                                    </label>
                                </div>

                                {!isWhatsapp && (
                                    <div>
                                        <label className={labelCls}>WhatsApp Number</label>
                                        <div className="contact-phone mt-1.5">
                                            <PhoneInput
                                                defaultCountry="ng"
                                                value={form.whatsapp}
                                                onChange={(val) => setForm({ ...form, whatsapp: val })}
                                                placeholder="800 000 0000"
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Additional Details / Message */}
                                <div>
                                    <label className={labelCls}>
                                        Trim, Year, Color &amp; Additional Preferences (optional)
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={form.details}
                                        onChange={(e) => setForm({ ...form, details: e.target.value })}
                                        placeholder="e.g. 2022–2024 model year, Pearl White exterior, panoramic sunroof, leather interior..."
                                        className={`${fieldCls} resize-none`}
                                    />
                                </div>

                                {formError && (
                                    <p className="rounded-xl bg-red-500/10 px-4 py-3 text-[13px] font-medium text-red-600 dark:text-red-400">
                                        {formError}
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className={`group inline-flex items-center gap-3 rounded-full bg-accent py-2 pl-2 pr-7 text-[15px] font-semibold text-white transition hover:bg-accent/90 dark:bg-[#2D419A] dark:hover:bg-[#2D419A]/90 ${submitting ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
                                        }`}
                                >
                                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-accent transition group-hover:translate-x-0.5 dark:text-[#2D419A]">
                                        <LuArrowRight size={20} />
                                    </span>
                                    {submitting ? 'Submitting Request…' : 'Request Vehicle'}
                                </button>
                            </form>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    )
}
