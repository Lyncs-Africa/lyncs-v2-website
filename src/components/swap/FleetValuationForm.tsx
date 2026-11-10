'use client'

import {useEffect, useMemo, useRef, useState} from 'react'
import Link from 'next/link'
import {AnimatePresence, motion} from 'framer-motion'
import {LuCheck, LuChevronDown, LuFuel, LuTrendingUp, LuWallet} from 'react-icons/lu'

// --- Indicative valuation model -------------------------------------------
// These are transparent, rough assumptions used to give an instant, "ballpark"
// figure on the page. A specialist confirms the real numbers afterwards.

const VEHICLE_TYPES = [
    'Saloon / Sedan',
    'SUV / Crossover',
    'Pickup / Truck',
    'Bus / Coaster',
    'Mixed fleet',
] as const
type VehicleType = (typeof VEHICLE_TYPES)[number]

// Typical used resale value per vehicle, in NGN.
const BASE_VALUE: Record<VehicleType, number> = {
    'Saloon / Sedan': 4_500_000,
    'SUV / Crossover': 8_000_000,
    'Pickup / Truck': 9_500_000,
    'Bus / Coaster': 11_000_000,
    'Mixed fleet': 6_500_000,
}

const AGE_BANDS = ['Under 3 years', '3 – 6 years', '7 – 10 years', 'Over 10 years'] as const
const AGE_FACTOR: Record<(typeof AGE_BANDS)[number], number> = {
    'Under 3 years': 0.85,
    '3 – 6 years': 0.6,
    '7 – 10 years': 0.4,
    'Over 10 years': 0.22,
}

const CONDITIONS = ['Excellent', 'Good', 'Fair', 'Needs work'] as const
const CONDITION_FACTOR: Record<(typeof CONDITIONS)[number], number> = {
    Excellent: 1.0,
    Good: 0.85,
    Fair: 0.65,
    'Needs work': 0.45,
}

// Switching from petrol/diesel to electric typically removes ~70% of per-km
// running cost (fuel vs. charging + lighter maintenance).
const FUEL_SAVING_RATE = 0.7

const naira = (n: number) =>
    new Intl.NumberFormat('en-NG', {style: 'currency', currency: 'NGN', maximumFractionDigits: 0}).format(
        Math.round(n),
    )

// A themed dropdown matching the rest of the site (no native <select>).
function SelectField({
    label,
    value,
    options,
    onChange,
}: {
    label: string
    value: string
    options: readonly string[]
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

export default function FleetValuationForm() {
    const [count, setCount] = useState('')
    const [type, setType] = useState<VehicleType>(VEHICLE_TYPES[0])
    const [age, setAge] = useState<(typeof AGE_BANDS)[number]>(AGE_BANDS[1])
    const [condition, setCondition] = useState<(typeof CONDITIONS)[number]>(CONDITIONS[1])
    const [fuel, setFuel] = useState('')

    const n = Math.max(0, parseInt(count || '0', 10) || 0)
    const monthlyFuel = Math.max(0, parseInt(fuel || '0', 10) || 0)

    const canEstimate = n > 0

    const result = useMemo(() => {
        if (!canEstimate) return null
        const perVehicle = BASE_VALUE[type] * AGE_FACTOR[age] * CONDITION_FACTOR[condition]
        const swapCredit = perVehicle * n
        const monthlySaving = monthlyFuel * FUEL_SAVING_RATE
        return {
            low: swapCredit * 0.85,
            high: swapCredit * 1.15,
            monthlySaving,
            annualSaving: monthlySaving * 12,
        }
    }, [canEstimate, type, age, condition, n, monthlyFuel])

    const label = 'block text-[13px] text-slate-500 dark:text-white/50'
    const underline =
        'mt-1.5 w-full bg-transparent border-0 border-b border-slate-300 pb-2 text-[15px] text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-0 transition-colors dark:border-white/15 dark:text-white dark:placeholder:text-white/30 dark:focus:border-white'

    return (
        <div
            className="demo-card rounded-[28px] border border-slate-200 bg-gray-100 p-6 text-slate-900 shadow-2xl sm:p-9 dark:border-transparent dark:bg-[#0E131F] dark:text-white dark:ring-1 dark:ring-white/10">
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-slate-500">
                Fleet valuation
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight">Value my fleet</h2>
            <p className="mt-1.5 text-sm text-slate-500 dark:text-white/60">
                A few details for an instant, no-obligation estimate.
            </p>

            <div className="mt-7 space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                        <label className={label}>How many vehicles?*</label>
                        <input
                            type="number"
                            min={1}
                            inputMode="numeric"
                            value={count}
                            onChange={(e) => setCount(e.target.value)}
                            placeholder="e.g. 12"
                            className={underline}
                        />
                    </div>
                    <SelectField
                        label="Mostly what type?"
                        value={type}
                        options={VEHICLE_TYPES}
                        onChange={(v) => setType(v as VehicleType)}
                    />
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <SelectField
                        label="Average age"
                        value={age}
                        options={AGE_BANDS}
                        onChange={(v) => setAge(v as (typeof AGE_BANDS)[number])}
                    />
                    <SelectField
                        label="Overall condition"
                        value={condition}
                        options={CONDITIONS}
                        onChange={(v) => setCondition(v as (typeof CONDITIONS)[number])}
                    />
                </div>

                <div>
                    <label className={label}>Current monthly fuel spend (optional, ₦)</label>
                    <input
                        type="number"
                        min={0}
                        inputMode="numeric"
                        value={fuel}
                        onChange={(e) => setFuel(e.target.value)}
                        placeholder="e.g. 2,500,000"
                        className={underline}
                    />
                </div>
            </div>

            {/* Estimate */}
            <AnimatePresence mode="wait">
                {result ? (
                    <motion.div
                        key="estimate"
                        initial={{opacity: 0, y: 8}}
                        animate={{opacity: 1, y: 0}}
                        className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/5"
                    >
                        <p className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-wider text-slate-400 dark:text-white/40">
                            <LuWallet size={15} className="text-accent"/>
                            Estimated swap credit
                        </p>
                        <p className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                            {naira(result.low)} <span className="text-slate-400 dark:text-white/40">–</span> {naira(result.high)}
                        </p>

                        {result.monthlySaving > 0 && (
                            <div className="mt-5 grid grid-cols-2 gap-4 border-t border-slate-200 pt-5 dark:border-white/10">
                                <div>
                                    <p className="flex items-center gap-1.5 text-[12px] font-medium text-slate-400 dark:text-white/40">
                                        <LuFuel size={13} className="text-accent"/> Fuel saved / month
                                    </p>
                                    <p className="mt-1 text-lg font-bold">{naira(result.monthlySaving)}</p>
                                </div>
                                <div>
                                    <p className="flex items-center gap-1.5 text-[12px] font-medium text-slate-400 dark:text-white/40">
                                        <LuTrendingUp size={13} className="text-accent"/> Saved / year
                                    </p>
                                    <p className="mt-1 text-lg font-bold">{naira(result.annualSaving)}</p>
                                </div>
                            </div>
                        )}

                        <p className="mt-4 text-xs text-slate-400 dark:text-white/40">
                            Indicative only. Share your fleet details with a specialist and we&apos;ll confirm the exact
                            trade-in value and EV options.
                        </p>
                    </motion.div>
                ) : (
                    <div className="mt-8 rounded-2xl border border-dashed border-slate-300 p-5 text-center text-sm text-slate-400 dark:border-white/15 dark:text-white/40">
                        Enter how many vehicles you run to see your estimate.
                    </div>
                )}
            </AnimatePresence>

            <Link
                href="/book-demo"
                className="mt-6 flex w-full items-center justify-center rounded-full bg-accent py-4 text-[15px] font-semibold text-white transition hover:bg-accent/90 dark:bg-white dark:text-[#111] dark:hover:bg-white/90"
            >
                Get a formal valuation
            </Link>
            <p className="mt-3 text-center text-xs text-slate-400 dark:text-white/40">
                Takes you to book a 30-minute session with a fleet specialist.
            </p>
        </div>
    )
}
