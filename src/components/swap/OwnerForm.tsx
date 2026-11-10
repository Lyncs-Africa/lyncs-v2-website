'use client'

import {useValuationStore} from '@/store/valuationStore'
import {CONDITIONS} from '@/lib/valuation/data'
import {getMakes, getModels, getYears} from '@/lib/valuation/carList'
import {formatThousands} from '@/lib/valuation/breakdown'
import ValuationSelect from './ValuationSelect'

const labelCls = 'block text-[13px] text-slate-500 dark:text-white/50'
const inputCls =
    'mt-1.5 w-full bg-transparent border-0 border-b border-slate-300 pb-2 text-[15px] text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-0 transition-colors dark:border-white/15 dark:text-white dark:placeholder:text-white/30 dark:focus:border-white'

export default function OwnerForm() {
    const owner = useValuationStore((s) => s.owner)
    const setOwnerField = useValuationStore((s) => s.setOwnerField)
    const resetOwner = useValuationStore((s) => s.resetOwner)

    const years = getYears()
    const models = getModels(owner.make)

    return (
        <div>
            <h3 className="text-lg font-bold tracking-tight">Tell us about your car</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-white/60">
                We&apos;ll use this to estimate what your car is worth toward an EV.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <ValuationSelect
                    label="What make is your car?"
                    value={owner.make}
                    options={getMakes()}
                    placeholder="Toyota"
                    onChange={(v) => setOwnerField('make', v)}
                />
                <ValuationSelect
                    label="Which model?"
                    value={owner.model}
                    options={models}
                    placeholder="Corolla"
                    disabled={!owner.make}
                    onChange={(v) => setOwnerField('model', v)}
                />
                <ValuationSelect
                    label="What year is it?"
                    value={owner.year ? String(owner.year) : ''}
                    options={years}
                    placeholder="Select a year"
                    onChange={(v) => setOwnerField('year', Number(v))}
                />
                <div>
                    <label className={labelCls} htmlFor="owner-km">
                        Roughly how many km has it done?
                    </label>
                    <input
                        id="owner-km"
                        type="text"
                        inputMode="numeric"
                        value={owner.km}
                        onChange={(e) => setOwnerField('km', formatThousands(e.target.value))}
                        placeholder="85,000"
                        className={inputCls}
                    />
                </div>
                <div className="sm:col-span-2">
                    <ValuationSelect
                        label="What condition is it in?"
                        value={owner.condition}
                        options={CONDITIONS}
                        onChange={(v) => setOwnerField('condition', v as (typeof CONDITIONS)[number])}
                    />
                </div>
            </div>

            <button
                type="button"
                onClick={resetOwner}
                className="mt-7 rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-200 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
            >
                Clear
            </button>
        </div>
    )
}
