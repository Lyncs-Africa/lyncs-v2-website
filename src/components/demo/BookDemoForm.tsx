'use client'

import {useEffect, useMemo, useRef, useState} from 'react'
import {AnimatePresence, motion} from 'framer-motion'
import {IoCheckmarkCircle} from 'react-icons/io5'
import {PhoneInput} from 'react-international-phone'
import {
    LuArrowRight,
    LuCalendarDays,
    LuCheck,
    LuChevronDown,
    LuChevronLeft,
    LuChevronRight,
    LuClock,
} from 'react-icons/lu'

// Backend host (no trailing slash). The demo endpoint lives under /api, so we
// strip a trailing /api from the env value before re-appending the full path.
const API_BASE = (
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    'https://staging.lyncs.africa'
)
    .replace(/\/+$/, '')
    .replace(/\/api$/, '')
const DEMO_BOOKING_URL = `${API_BASE}/api/enterprise/demo-bookings`

const TEAM_SIZES = ['1 - 20', '21 - 100', '101 - 500', '500+ staff']

const INDUSTRY_OPTIONS = [
    'Technology / Software',
    'Banking & Finance',
    'Oil & Gas / Energy',
    'Manufacturing & FMCG',
    'Logistics & Haulage',
    'Healthcare & Pharma',
    'Retail & E-commerce',
    'Telecommunications',
    'Construction & Real estate',
    'Hospitality & Travel',
    'Government & Public sector',
    'Education',
    'Professional services',
    'Other (please specify)',
]

const SERVICE_OPTIONS = [
    'All platform services (Full Suite)',
    'Staff rides (Bolt, inDrive, lagRide)',
    'Staff shuttles & commute buses',
    'Corporate air travel & flights',
    'Corporate & staff ride wallets',
    'EV Fleet swap & charging',
    'On demand car tow & mechanic',
    'Executive car & bus Rentals',
    'Other / custom requirement',
]

// Every 30 minutes across business hours (WAT), skipping the 2–3 PM break.
const TIME_SLOTS = (() => {
    const slots: string[] = []
    for (let mins = 9 * 60; mins < 17 * 60; mins += 30) {
        const hour = Math.floor(mins / 60)
        if (hour === 14) continue // skip 2:00 PM and 2:30 PM
        const minute = mins % 60
        const period = hour >= 12 ? 'PM' : 'AM'
        const hour12 = hour % 12 === 0 ? 12 : hour % 12
        slots.push(`${hour12}:${minute === 0 ? '00' : minute} ${period}`)
    }
    return slots
})()

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
]

function sameDay(a: Date, b: Date) {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

function monthCells(view: Date): (Date | null)[] {
    const year = view.getFullYear()
    const month = view.getMonth()
    const startWeekday = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const cells: (Date | null)[] = []
    for (let i = 0; i < startWeekday; i++) cells.push(null)
    for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d))
    return cells
}

function prettyDate(d: Date) {
    return d.toLocaleDateString('en-GB', {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'})
}

// A themed, custom dropdown that replaces the native <select> so its open list
// matches the card (accent-highlighted selection, light/dark aware).
function SelectField({
    label,
    value,
    options,
    onChange,
}: {
    label: string
    value: string
    options: string[]
    onChange: (v: string) => void
}) {
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!open) return
        const onDown = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
        }
        document.addEventListener('mousedown', onDown)
        return () => document.removeEventListener('mousedown', onDown)
    }, [open])

    return (
        <div className="relative" ref={ref}>
            <label className="block text-[13px] text-slate-500 dark:text-white/50">{label}</label>
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="mt-1.5 flex w-full items-center justify-between gap-2 border-b border-slate-300 pb-2 text-left text-[15px] text-slate-900 transition-colors hover:border-slate-400 focus:border-slate-900 focus:outline-none dark:border-white/15 dark:text-white dark:hover:border-white/40 dark:focus:border-white"
            >
                <span className="truncate">{value}</span>
                <LuChevronDown
                    size={16}
                    className={`shrink-0 text-slate-400 transition-transform dark:text-white/40 ${open ? 'rotate-180' : ''}`}
                />
            </button>

            <AnimatePresence>
                {open && (
                    <motion.ul
                        initial={{opacity: 0, y: 6}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: 6}}
                        className="absolute left-0 top-full z-30 mt-3 max-h-64 w-full min-w-[220px] overflow-auto rounded-2xl border border-slate-200 bg-white p-1.5 shadow-2xl dark:border-white/10 dark:bg-[#131A28]"
                    >
                        {options.map((opt) => {
                            const active = opt === value
                            return (
                                <li key={opt}>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            onChange(opt)
                                            setOpen(false)
                                        }}
                                        className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-[14px] transition ${
                                            active
                                                ? 'bg-accent font-medium text-white dark:bg-[#2D419A]'
                                                : 'text-slate-700 hover:bg-slate-100 dark:text-white/80 dark:hover:bg-white/10'
                                        }`}
                                    >
                                        <span>{opt}</span>
                                        {active && <LuCheck size={15} className="shrink-0"/>}
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

export default function BookDemoForm() {
    const [today, setToday] = useState<Date | null>(null)
    const [view, setView] = useState<Date | null>(null)
    const [date, setDate] = useState<Date | null>(null)
    const [slot, setSlot] = useState('')
    const [openPicker, setOpenPicker] = useState<'date' | 'time' | null>(null)
    const [submitted, setSubmitted] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [optIn, setOptIn] = useState(true)
    const [teamSize, setTeamSize] = useState(TEAM_SIZES[1])
    const [service, setService] = useState(SERVICE_OPTIONS[0])
    const [industry, setIndustry] = useState(INDUSTRY_OPTIONS[0])
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        phone: '',
        industryOther: '',
        referral: '',
        notes: '',
    })

    const dateRef = useRef<HTMLDivElement>(null)
    const timeRef = useRef<HTMLDivElement>(null)

    // Resolve "today" on the client to avoid hydration drift.
    useEffect(() => {
        const t = new Date()
        t.setHours(0, 0, 0, 0)
        setToday(t)
        setView(new Date(t.getFullYear(), t.getMonth(), 1))
    }, [])

    // Auto-fill the referral code from the link, e.g. /book-demo?ref=ABC123
    // (also accepts ?referral= or ?code=). Done on the client so it works with
    // the static export without a Suspense boundary.
    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const code = params.get('ref') || params.get('referral') || params.get('code')
        if (code) setForm((f) => ({...f, referral: code.trim()}))
    }, [])

    // Close an open picker when clicking outside it.
    useEffect(() => {
        if (!openPicker) return
        const onDown = (e: MouseEvent) => {
            const el = e.target as Node
            if (openPicker === 'date' && dateRef.current && !dateRef.current.contains(el)) setOpenPicker(null)
            if (openPicker === 'time' && timeRef.current && !timeRef.current.contains(el)) setOpenPicker(null)
        }
        document.addEventListener('mousedown', onDown)
        return () => document.removeEventListener('mousedown', onDown)
    }, [openPicker])

    const canGoPrev = useMemo(() => {
        if (!view || !today) return false
        return view.getFullYear() > today.getFullYear() || (view.getFullYear() === today.getFullYear() && view.getMonth() > today.getMonth())
    }, [view, today])

    const canSubmit = useMemo(
        () =>
            Boolean(
                form.firstName.trim() &&
                form.lastName.trim() &&
                form.email.trim() &&
                form.company.trim() &&
                form.phone.trim() &&
                (industry !== 'Other (please specify)' || form.industryOther.trim()) &&
                date &&
                slot,
            ),
        [form, date, slot, industry],
    )

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!canSubmit || submitting || !date) return

        setSubmitting(true)
        setError(null)

        const resolvedIndustry =
            industry === 'Other (please specify)' ? form.industryOther.trim() : industry
        const preferredTime = `${slot} WAT · ${prettyDate(date)} (30 min)`

        const payload: Record<string, unknown> = {
            firstName: form.firstName.trim(),
            lastName: form.lastName.trim(),
            email: form.email.trim(),
            companyName: form.company.trim(),
            phoneNumber: form.phone.trim(),
            industry: resolvedIndustry,
            preferredTime,
            numberOfEmployees: teamSize,
            serviceOfInterest: [service],
            focus: form.notes.trim(),
            productUpdatesOptIn: optIn,
        }
        if (form.referral.trim()) payload.referralCode = form.referral.trim()

        try {
            const res = await fetch(DEMO_BOOKING_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(payload),
            })
            const data = await res.json().catch(() => null)
            if (!res.ok || (data && data.success === false)) {
                throw new Error((data && data.message) || `Something went wrong (${res.status}).`)
            }
            setSubmitted(true)
        } catch (err) {
            setError(
                err instanceof Error && err.message
                    ? err.message
                    : 'We could not reach the server. Please try again.',
            )
        } finally {
            setSubmitting(false)
        }
    }

    const reset = () => {
        setSubmitted(false)
        setError(null)
        setForm({firstName: '', lastName: '', email: '', company: '', phone: '', industryOther: '', referral: '', notes: ''})
        setDate(null)
        setSlot('')
        setTeamSize(TEAM_SIZES[1])
        setService(SERVICE_OPTIONS[0])
        setIndustry(INDUSTRY_OPTIONS[0])
    }

    const label = 'block text-[13px] text-slate-500 dark:text-white/50'
    const underline =
        'mt-1.5 w-full bg-transparent border-0 border-b border-slate-300 pb-2 text-[15px] text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-0 transition-colors dark:border-white/15 dark:text-white dark:placeholder:text-white/30 dark:focus:border-white'
    const fieldBtn =
        'mt-1.5 flex w-full items-center justify-between gap-2 border-b border-slate-300 pb-2 text-left text-[15px] transition-colors hover:border-slate-400 focus:border-slate-900 focus:outline-none dark:border-white/15 dark:hover:border-white/40 dark:focus:border-white'

    return (
        <div
            className="demo-card rounded-[28px] border border-slate-200 bg-gray-100 p-6 text-slate-900 shadow-2xl sm:p-9 dark:border-transparent dark:bg-[#0E131F] dark:text-white dark:ring-1 dark:ring-white/10">
            <AnimatePresence mode="wait">
                {submitted && date ? (
                    <motion.div
                        key="done"
                        initial={{opacity: 0, scale: 0.97}}
                        animate={{opacity: 1, scale: 1}}
                        className="flex min-h-[520px] flex-col items-center justify-center text-center"
                    >
                        <div
                            className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                            <IoCheckmarkCircle size={44}/>
                        </div>
                        <h2 className="mt-5 text-2xl font-bold">Your demo is booked!</h2>
                        <p className="mx-auto mt-2 max-w-sm text-sm text-slate-500 dark:text-white/60">
                            Thanks, {form.firstName || 'there'}. We&apos;ve pencilled you in for:
                        </p>
                        <div
                            className="mt-5 w-full max-w-xs rounded-2xl border border-slate-200 bg-white px-5 py-4 dark:border-white/10 dark:bg-white/5">
                            <p className="flex items-center justify-center gap-2 text-sm font-semibold">
                                <LuCalendarDays size={16} className="text-accent"/>
                                {prettyDate(date)}
                            </p>
                            <p className="mt-2 flex items-center justify-center gap-2 text-sm font-semibold">
                                <LuClock size={16} className="text-accent"/>
                                {slot} · 30 min (WAT)
                            </p>
                        </div>
                        <p className="mt-4 text-sm text-slate-400 dark:text-white/40">
                            An email has been sent to {form.email || 'your email'}, and a customer representative
                            will reach out to you very soon.
                        </p>
                        <button
                            type="button"
                            onClick={reset}
                            className="mt-7 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
                        >
                            Book another demo
                        </button>
                    </motion.div>
                ) : (
                    <form key="form" onSubmit={handleSubmit} className="space-y-6">
                        {/* First / Last */}
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <label className={label}>First name*</label>
                                <input
                                    type="text"
                                    required
                                    value={form.firstName}
                                    onChange={(e) => setForm({...form, firstName: e.target.value})}
                                    placeholder="First name"
                                    className={underline}
                                />
                            </div>
                            <div>
                                <label className={label}>Last name*</label>
                                <input
                                    type="text"
                                    required
                                    value={form.lastName}
                                    onChange={(e) => setForm({...form, lastName: e.target.value})}
                                    placeholder="Last name"
                                    className={underline}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <label className={label}>Work email*</label>
                                <input
                                    type="email"
                                    required
                                    value={form.email}
                                    onChange={(e) => setForm({...form, email: e.target.value})}
                                    placeholder="Work email"
                                    className={underline}
                                />
                            </div>
                            <div>
                                <label className={label}>Phone / WhatsApp*</label>
                                <div className="demo-phone mt-2.5">
                                    <PhoneInput
                                        defaultCountry="ng"
                                        value={form.phone}
                                        onChange={(val) => setForm({...form, phone: val})}
                                        placeholder="800 000 0000"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <label className={label}>Company*</label>
                                <input
                                    type="text"
                                    required
                                    value={form.company}
                                    onChange={(e) => setForm({...form, company: e.target.value})}
                                    placeholder="Company name"
                                    className={underline}
                                />
                            </div>
                            <SelectField
                                label="Industry*"
                                value={industry}
                                options={INDUSTRY_OPTIONS}
                                onChange={setIndustry}
                            />
                        </div>

                        {/* Specify industry when "Other" is chosen */}
                        {industry === 'Other (please specify)' && (
                            <div>
                                <label className={label}>Please specify your industry*</label>
                                <input
                                    type="text"
                                    required
                                    value={form.industryOther}
                                    onChange={(e) => setForm({...form, industryOther: e.target.value})}
                                    placeholder="e.g. Agriculture, Media & Entertainment"
                                    className={underline}
                                />
                            </div>
                        )}

                        {/* Date + Time pickers */}
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            {/* Date */}
                            <div className="relative" ref={dateRef}>
                                <label className={label}>Preferred date*</label>
                                <button
                                    type="button"
                                    onClick={() => setOpenPicker(openPicker === 'date' ? null : 'date')}
                                    className={`${fieldBtn} ${date ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-white/30'}`}
                                >
                      <span className="flex items-center gap-2">
                        <LuCalendarDays size={16} className="text-slate-400 dark:text-white/40"/>
                          {date ? date.toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                          }) : 'Select a date'}
                      </span>
                                    <LuChevronDown size={16}
                                                   className={`text-slate-400 dark:text-white/40 transition-transform ${openPicker === 'date' ? 'rotate-180' : ''}`}/>
                                </button>

                                <AnimatePresence>
                                    {openPicker === 'date' && view && today && (
                                        <motion.div
                                            initial={{opacity: 0, y: 6}}
                                            animate={{opacity: 1, y: 0}}
                                            exit={{opacity: 0, y: 6}}
                                            className="absolute left-0 top-full z-20 mt-3 w-[300px] max-w-[88vw] rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl dark:border-white/10 dark:bg-[#131A28]"
                                        >
                                            <div className="flex items-center justify-between">
                                                <button
                                                    type="button"
                                                    disabled={!canGoPrev}
                                                    onClick={() => setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))}
                                                    className="flex h-8 w-8 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-100 disabled:opacity-25 disabled:hover:bg-transparent dark:text-white/70 dark:hover:bg-white/10"
                                                >
                                                    <LuChevronLeft size={18}/>
                                                </button>
                                                <span className="text-sm font-semibold">
                              {MONTHS[view.getMonth()]} {view.getFullYear()}
                            </span>
                                                <button
                                                    type="button"
                                                    onClick={() => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))}
                                                    className="flex h-8 w-8 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-100 dark:text-white/70 dark:hover:bg-white/10"
                                                >
                                                    <LuChevronRight size={18}/>
                                                </button>
                                            </div>

                                            <div
                                                className="mt-3 grid grid-cols-7 gap-1 text-center text-[11px] text-slate-400 dark:text-white/40">
                                                {WEEKDAYS.map((w) => (
                                                    <span key={w} className="py-1">{w}</span>
                                                ))}
                                            </div>
                                            <div className="grid grid-cols-7 gap-1">
                                                {monthCells(view).map((cell, i) => {
                                                    if (!cell) return <span key={i}/>
                                                    const past = cell < today
                                                    const selected = date && sameDay(cell, date)
                                                    const isToday = sameDay(cell, today)
                                                    return (
                                                        <button
                                                            key={i}
                                                            type="button"
                                                            disabled={past}
                                                            onClick={() => {
                                                                setDate(cell)
                                                                setOpenPicker(null)
                                                            }}
                                                            className={`flex h-9 items-center justify-center rounded-full text-[13px] transition ${
                                                                selected
                                                                    ? 'bg-accent font-bold text-white dark:bg-[#2D419A]'
                                                                    : past
                                                                        ? 'text-slate-300 dark:text-white/20'
                                                                        : 'text-slate-700 hover:bg-slate-100 dark:text-white/80 dark:hover:bg-white/10'
                                                            } ${isToday && !selected ? 'ring-1 ring-slate-300 dark:ring-white/25' : ''}`}
                                                        >
                                                            {cell.getDate()}
                                                        </button>
                                                    )
                                                })}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Time */}
                            <div className="relative" ref={timeRef}>
                                <label className={label}>Preferred time (WAT)*</label>
                                <button
                                    type="button"
                                    onClick={() => setOpenPicker(openPicker === 'time' ? null : 'time')}
                                    className={`${fieldBtn} ${slot ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-white/30'}`}
                                >
                      <span className="flex items-center gap-2">
                        <LuClock size={16} className="text-slate-400 dark:text-white/40"/>
                          {slot || 'Select a time'}
                      </span>
                                    <LuChevronDown size={16}
                                                   className={`text-slate-400 dark:text-white/40 transition-transform ${openPicker === 'time' ? 'rotate-180' : ''}`}/>
                                </button>

                                <AnimatePresence>
                                    {openPicker === 'time' && (
                                        <motion.div
                                            initial={{opacity: 0, y: 6}}
                                            animate={{opacity: 1, y: 0}}
                                            exit={{opacity: 0, y: 6}}
                                            className="absolute left-0 top-full z-20 mt-3 max-h-[260px] w-[240px] max-w-[88vw] overflow-auto rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl dark:border-white/10 dark:bg-[#131A28]"
                                        >
                                            <div className="grid grid-cols-2 gap-2">
                                                {TIME_SLOTS.map((t) => {
                                                    const active = slot === t
                                                    return (
                                                        <button
                                                            key={t}
                                                            type="button"
                                                            onClick={() => {
                                                                setSlot(t)
                                                                setOpenPicker(null)
                                                            }}
                                                            className={`rounded-lg py-2 text-[13px] font-semibold transition ${
                                                                active ? 'bg-accent text-white dark:bg-[#2D419A]' : 'text-slate-600 hover:bg-slate-100 dark:text-white/70 dark:hover:bg-white/10'
                                                            }`}
                                                        >
                                                            {t}
                                                        </button>
                                                    )
                                                })}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Employees + Service (custom dropdowns) */}
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <SelectField
                                label="Number of company employees"
                                value={teamSize}
                                options={TEAM_SIZES}
                                onChange={setTeamSize}
                            />
                            <SelectField
                                label="Service of interest"
                                value={service}
                                options={SERVICE_OPTIONS}
                                onChange={setService}
                            />
                        </div>

                        {/* Referral code */}
                        <div>
                            <label className={label}>Referral code (optional)</label>
                            <input
                                type="text"
                                value={form.referral}
                                onChange={(e) => setForm({...form, referral: e.target.value})}
                                placeholder="Enter a referral code if you have one"
                                className={underline}
                            />
                        </div>

                        {/* Notes */}
                        <div>
                            <label className={label}>Anything we should focus on? (optional)</label>
                            <textarea
                                rows={2}
                                value={form.notes}
                                onChange={(e) => setForm({...form, notes: e.target.value})}
                                placeholder="e.g. 60 staff commuting Ikeja ↔ Victoria Island; replacing petty-cash fuel"
                                className={`${underline} resize-none`}
                            />
                        </div>

                        {/* Opt-in */}
                        <label className="flex cursor-pointer items-start gap-3 text-[13px] text-slate-600 dark:text-white/60">
                            <input
                                type="checkbox"
                                checked={optIn}
                                onChange={(e) => setOptIn(e.target.checked)}
                                className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-accent"
                            />
                            <span>I&apos;d like to receive product updates and occasional emails from Lyncs.</span>
                        </label>

                        {/* Error */}
                        {error && (
                            <p className="rounded-xl bg-red-500/10 px-4 py-3 text-[13px] font-medium text-red-600 dark:text-red-400">
                                {error}
                            </p>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={!canSubmit || submitting}
                            className={`group flex w-fit items-center justify-center gap-3 rounded-full bg-accent py-2 pl-2 pr-7 text-[15px] font-semibold text-white transition hover:bg-accent/90 dark:bg-[#2D419A] dark:hover:bg-[#2D419A]/90 ${
                                canSubmit && !submitting ? 'cursor-pointer' : 'cursor-not-allowed opacity-40'
                            }`}
                        >
                            <span
                                className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-accent transition group-hover:translate-x-0.5 dark:text-[#2D419A]">
                                {submitting ? (
                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-accent/30 border-t-accent"/>
                                ) : (
                                    <LuArrowRight size={20}/>
                                )}
                            </span>
                            {submitting ? 'Booking…' : 'Book my demo'}
                        </button>
                    </form>
                )}
            </AnimatePresence>
        </div>
    )
}
