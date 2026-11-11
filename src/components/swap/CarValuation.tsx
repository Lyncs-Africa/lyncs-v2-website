'use client'

import {useState} from 'react'
import {AnimatePresence, motion} from 'framer-motion'
import {useValuationStore, type Tab, type OwnerForm as OwnerFormState} from '@/store/valuationStore'
import type {ValuationRange} from '@/lib/valuation/getCarValuation'
import type {EvOption} from '@/lib/valuation/evOptions'
import type {Tenor} from '@/lib/valuation/config'
import {useCarValuation} from './useCarValuation'
import OwnerForm from './OwnerForm'
import FleetForm from './FleetForm'
import ResultPanel from './ResultPanel'
import LockInModal from './LockInModal'

const TABS: {value: Tab; label: string}[] = [
    {value: 'owner', label: 'Car owner'},
    {value: 'fleet', label: 'Company fleet'},
]

export default function CarValuation() {
    const tab = useValuationStore((s) => s.tab)
    const setTab = useValuationStore((s) => s.setTab)
    const owner = useValuationStore((s) => s.owner)
    const result = useValuationStore((s) => s.result)
    const tenor = useValuationStore((s) => s.tenor)
    const evs = useValuationStore((s) => s.evs)
    const selectedEvId = useValuationStore((s) => s.selectedEvId)
    const resetOwner = useValuationStore((s) => s.resetOwner)

    const [lockOpen, setLockOpen] = useState(false)
    const [lockedValuation, setLockedValuation] = useState<{
        owner: OwnerFormState
        result: ValuationRange
        tenor: Tenor
        evs: EvOption[]
        selectedEvId: string | null
    } | null>(null)

    // Watches the owner form and keeps the result state in sync.
    useCarValuation()

    const handleLockIn = () => {
        if (!result) return
        setLockedValuation({
            owner: {...owner},
            result,
            tenor,
            evs,
            selectedEvId,
        })
        resetOwner()
        setLockOpen(true)
    }

    const handleCloseModal = () => {
        setLockOpen(false)
        setLockedValuation(null)
    }

    return (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
            {/* Left: the form */}
            <div className="rounded-[28px] border border-slate-200 bg-gray-100 p-6 text-slate-900 shadow-2xl sm:p-9 dark:border-transparent dark:bg-[#0E131F] dark:text-white dark:ring-1 dark:ring-white/10">
                <h2 className="text-lg font-bold tracking-tight">Who are you?</h2>

                {/* Segmented toggle (radio group) */}
                <div
                    role="radiogroup"
                    aria-label="Who are you?"
                    className="mt-3 inline-flex w-full rounded-full bg-slate-100 p-1 dark:bg-white/5 sm:w-auto"
                >
                    {TABS.map((t) => {
                        const active = tab === t.value
                        return (
                            <button
                                key={t.value}
                                type="button"
                                role="radio"
                                aria-checked={active}
                                onClick={() => setTab(t.value)}
                                className={`flex-1 rounded-full px-5 py-2 text-sm font-semibold transition sm:flex-none ${
                                    active
                                        ? 'bg-accent text-white shadow dark:bg-[#2D419A]'
                                        : 'text-slate-500 hover:text-slate-800 dark:text-white/50 dark:hover:text-white'
                                }`}
                            >
                                {t.label}
                            </button>
                        )
                    })}
                </div>

                <div className="mt-7">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={tab}
                            initial={{opacity: 0, y: 8}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -8}}
                            transition={{duration: 0.2}}
                        >
                            {tab === 'owner' ? <OwnerForm /> : <FleetForm />}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Right: the live result panel */}
            <div className="lg:sticky lg:top-28 lg:self-start">
                <ResultPanel onLockIn={handleLockIn} />
            </div>

            <LockInModal open={lockOpen} onClose={handleCloseModal} valuation={lockedValuation} />
        </div>
    )
}
