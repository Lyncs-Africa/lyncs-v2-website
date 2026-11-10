'use client'

import {useEffect} from 'react'
import Link from 'next/link'
import {AnimatePresence, motion} from 'framer-motion'
import {LuArrowRight, LuWallet} from 'react-icons/lu'
import {FaWhatsapp} from 'react-icons/fa'
import {useValuationStore} from '@/store/valuationStore'
import {EV_CONFIG, WHATSAPP_NUMBER, type Tenor} from '@/lib/valuation/config'
import {getBreakdown, monthlyLabel, nairaM} from '@/lib/valuation/breakdown'
import {fetchEvOptions, resolveActiveEv} from '@/lib/valuation/evOptions'
import ValuationSelect from './ValuationSelect'

function whatsappHref(parts: {make: string; model: string; year: number | ''; km: string; condition: string}) {
    const msg =
        `Hi Lyncs, I'd like a valuation for my car:\n` +
        `• Make: ${parts.make || '—'}\n` +
        `• Model: ${parts.model || '—'}\n` +
        `• Year: ${parts.year || '—'}\n` +
        `• Mileage: ${parts.km ? `${parts.km} km` : '—'}\n` +
        `• Condition: ${parts.condition || '—'}`
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
}

function Shell({children}: {children: React.ReactNode}) {
    return (
        <div
            aria-live="polite"
            className="flex min-h-[420px] flex-col justify-center rounded-[28px] border border-slate-200 bg-gray-100 p-6 text-slate-900 shadow-2xl sm:p-9 dark:border-transparent dark:bg-[#0E131F] dark:text-white dark:ring-1 dark:ring-white/10"
        >
            {children}
        </div>
    )
}

export default function ResultPanel({onLockIn}: {onLockIn: () => void}) {
    const tab = useValuationStore((s) => s.tab)
    const status = useValuationStore((s) => s.status)
    const result = useValuationStore((s) => s.result)
    const owner = useValuationStore((s) => s.owner)
    const tenor = useValuationStore((s) => s.tenor)
    const setTenor = useValuationStore((s) => s.setTenor)
    const resetOwner = useValuationStore((s) => s.resetOwner)
    const evs = useValuationStore((s) => s.evs)
    const setEvs = useValuationStore((s) => s.setEvs)

    // Load the EV inventory once, so the result can auto-match against it.
    useEffect(() => {
        if (evs.length === 0) fetchEvOptions().then(setEvs).catch(() => {})
    }, [evs.length, setEvs])

    // Fleet tab never shows an instant estimate.
    if (tab === 'fleet') {
        return (
            <Shell>
                <p className="text-[13px] font-semibold uppercase tracking-wider text-slate-400 dark:text-white/40">
                    Fleet valuation
                </p>
                <h3 className="mt-3 text-2xl font-bold tracking-tight">Valued by a specialist</h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-500 dark:text-white/60">
                    Fleets vary too much for an instant number. Send your details and a Lyncs specialist will value every
                    vehicle and come back with the swap credit and EV options that fit.
                </p>
                <ul className="mt-6 space-y-3 text-sm text-slate-600 dark:text-white/70">
                    {['A valuation for every vehicle', 'EV options matched to how you operate', 'One point of contact from day one'].map(
                        (t) => (
                            <li key={t} className="flex items-start gap-2.5">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                                {t}
                            </li>
                        ),
                    )}
                </ul>
            </Shell>
        )
    }

    return (
        <Shell>
            <AnimatePresence mode="wait">
                {status === 'empty' && (
                    <motion.div key="empty" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent dark:bg-[#2D419A]/20">
                            <LuWallet size={22} aria-hidden="true" />
                        </div>
                        <h3 className="mt-5 text-2xl font-bold tracking-tight">Your estimate shows up here</h3>
                        <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-500 dark:text-white/60">
                            Fill in your car&apos;s details and we&apos;ll work out what it&apos;s worth toward your EV.
                        </p>
                    </motion.div>
                )}

                {status === 'loading' && (
                    <motion.div key="loading" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="animate-pulse">
                        <div className="h-4 w-40 rounded bg-slate-200 dark:bg-white/10" />
                        <div className="mt-4 h-10 w-64 rounded bg-slate-200 dark:bg-white/10" />
                        <div className="mt-6 h-3 w-full max-w-sm rounded bg-slate-200 dark:bg-white/10" />
                        <div className="mt-2 h-3 w-3/4 rounded bg-slate-200 dark:bg-white/10" />
                        <div className="mt-8 h-11 w-48 rounded-full bg-slate-200 dark:bg-white/10" />
                    </motion.div>
                )}

                {status === 'couldnt' && (
                    <motion.div key="couldnt" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
                        <h3 className="text-2xl font-bold tracking-tight">We need a closer look at this one</h3>
                        <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-500 dark:text-white/60">
                            We don&apos;t have enough data on this car to give an estimate here. Send us the details and
                            we&apos;ll value it for you.
                        </p>
                        <div className="mt-7 flex flex-wrap items-center gap-4">
                            <a
                                href={whatsappHref(owner)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent/90 dark:bg-[#2D419A] dark:hover:bg-[#2D419A]/90"
                            >
                                <FaWhatsapp size={17} aria-hidden="true" />
                                Chat with us on WhatsApp
                            </a>
                            <button
                                type="button"
                                onClick={resetOwner}
                                className="text-sm font-semibold text-slate-500 underline-offset-2 transition hover:text-slate-800 hover:underline dark:text-white/60 dark:hover:text-white"
                            >
                                Try another car
                            </button>
                        </div>
                    </motion.div>
                )}

                {status === 'success' && result && (
                    <SuccessView key="success" result={result} tenor={tenor} setTenor={setTenor} onLockIn={onLockIn} />
                )}
            </AnimatePresence>
        </Shell>
    )
}

const AUTO_LABEL = '↺  Use best match (auto)'

function SuccessView({
    result,
    tenor,
    setTenor,
    onLockIn,
}: {
    result: {min: number; max: number}
    tenor: Tenor
    setTenor: (t: Tenor) => void
    onLockIn: () => void
}) {
    const evs = useValuationStore((s) => s.evs)
    const selectedEvId = useValuationStore((s) => s.selectedEvId)
    const setSelectedEv = useValuationStore((s) => s.setSelectedEv)

    const carValue = (result.min + result.max) / 2
    const activeEv = resolveActiveEv(evs, selectedEvId, carValue)
    const isAuto = !selectedEvId || !evs.some((e) => e.id === selectedEvId)
    const b = getBreakdown(result, tenor, activeEv)

    const labelFor = (e: {name: string; price: number}) => `${e.name} · ${nairaM(e.price)}`
    const options = [AUTO_LABEL, ...evs.map(labelFor)]
    const onPick = (v: string) => {
        if (v === AUTO_LABEL) {
            setSelectedEv(null)
            return
        }
        const found = evs.find((e) => labelFor(e) === v)
        setSelectedEv(found ? found.id : null)
    }

    return (
        <motion.div initial={{opacity: 0, y: 8}} animate={{opacity: 1, y: 0}} exit={{opacity: 0}}>
            <p className="text-[13px] font-semibold uppercase tracking-wider text-slate-400 dark:text-white/40">
                Your car could be worth
            </p>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                {nairaM(result.min)} <span className="text-slate-400 dark:text-white/40">to</span> {nairaM(result.max)}
            </p>

            {/* Which EV we're valuing against — auto-matched, overridable. */}
            {evs.length > 0 && (
                <div className="mt-6">
                    <ValuationSelect
                        label="Swapping into"
                        value={labelFor(activeEv)}
                        options={options}
                        onChange={onPick}
                    />
                    <p className="mt-2 text-[12px] text-slate-400 dark:text-white/40">
                        {isAuto
                            ? 'Best match for your car’s value — pick another to compare.'
                            : 'Your pick. Choose “Use best match” to let us match it for you.'}
                    </p>
                </div>
            )}

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/5">
                <p className="text-sm leading-relaxed text-slate-600 dark:text-white/70">
                    {b.surplus > 0 ? (
                        <>
                            That fully covers a{' '}
                            <span className="font-semibold text-slate-900 dark:text-white">{activeEv.name}</span>{' '}
                            ({nairaM(activeEv.price)}) — with about{' '}
                            <span className="font-semibold text-slate-900 dark:text-white">{nairaM(b.surplus)}</span> to
                            spare toward a nicer EV or your first payments.
                        </>
                    ) : b.covers ? (
                        <>
                            That covers your 20% down on a{' '}
                            <span className="font-semibold text-slate-900 dark:text-white">{activeEv.name}</span>{' '}
                            ({nairaM(activeEv.price)}), leaving about{' '}
                            <span className="font-semibold text-slate-900 dark:text-white">{nairaM(b.financed)}</span> to
                            finance.
                        </>
                    ) : (
                        <>
                            Add about{' '}
                            <span className="font-semibold text-slate-900 dark:text-white">{nairaM(b.topUp)}</span> to reach
                            your 20% down on a{' '}
                            <span className="font-semibold text-slate-900 dark:text-white">{activeEv.name}</span>{' '}
                            ({nairaM(activeEv.price)}).
                        </>
                    )}
                </p>

                {/* Tenor toggle */}
                <div className="mt-5 flex items-center gap-3">
                    <span className="text-[13px] text-slate-500 dark:text-white/50">Spread over</span>
                    <div
                        className="inline-flex rounded-full bg-slate-100 p-1 dark:bg-white/5"
                        role="radiogroup"
                        aria-label="Repayment tenor"
                    >
                        {EV_CONFIG.tenorOptions.map((t) => {
                            const active = tenor === t
                            return (
                                <button
                                    key={t}
                                    type="button"
                                    role="radio"
                                    aria-checked={active}
                                    onClick={() => setTenor(t)}
                                    className={`rounded-full px-4 py-1.5 text-[13px] font-semibold transition ${
                                        active
                                            ? 'bg-accent text-white dark:bg-[#2D419A]'
                                            : 'text-slate-500 hover:text-slate-800 dark:text-white/50 dark:hover:text-white'
                                    }`}
                                >
                                    {t} months
                                </button>
                            )
                        })}
                    </div>
                </div>

                {b.monthly != null && (
                    <p className="mt-4 text-lg font-bold tracking-tight">
                        Roughly {monthlyLabel(b.monthly)} <span className="text-sm font-medium text-slate-400 dark:text-white/40">a month</span>
                    </p>
                )}
            </div>

            <p className="mt-4 text-[12px] leading-relaxed text-slate-400 dark:text-white/40">
                This is an estimate, not a final offer. Final value is confirmed after a quick inspection. Quotes are held
                for {EV_CONFIG.quoteHeldDays} days. Financing is subject to partner bank approval.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                    type="button"
                    onClick={onLockIn}
                    className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent/90 dark:bg-[#2D419A] dark:hover:bg-[#2D419A]/90"
                >
                    Lock in this value
                    <LuArrowRight size={17} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
                </button>
                <Link
                    href="/cars"
                    className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
                >
                    See available EVs
                </Link>
            </div>
        </motion.div>
    )
}
