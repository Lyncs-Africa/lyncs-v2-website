import type {IconType} from 'react-icons'
import {LuBadgeCheck, LuCircleDollarSign, LuRefreshCw, LuZap} from 'react-icons/lu'
import FleetValuationForm from './FleetValuationForm'

const STEPS: { label: string; detail: string; Icon: IconType }[] = [
    {label: 'Tell us your fleet', detail: 'Count, type, age and condition.', Icon: LuCircleDollarSign},
    {label: 'Get a value', detail: 'An instant trade-in estimate.', Icon: LuBadgeCheck},
    {label: 'Swap for EVs', detail: 'Put the credit toward electric.', Icon: LuRefreshCw},
    {label: 'Drop the fuel bill', detail: 'Charge for a fraction of petrol.', Icon: LuZap},
]

export default function SwapValuationSection() {
    return (
        <section
            style={{
                backgroundImage:
                    'linear-gradient(rgba(26,39,71,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(26,39,71,0.05) 1px, transparent 1px)',
                backgroundSize: '48px 48px, 48px 48px',
            }}
            className="-mt-20 md:-mt-[130px] font-Quicksand dark:bg-night">
            <div
                className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 pb-16 pt-28 sm:px-6 md:pb-28 md:pt-[160px] xl:grid-cols-2 lg:gap-16 lg:px-8">
                <div className="flex flex-col justify-center">
          <span
              className="flex w-fit items-center gap-2 text-sm font-bold tracking-tight text-slate-700 dark:text-slate-300">
            <LuRefreshCw size={20} className="text-accent"/>
            Swap my fleet
          </span>

                    <h1 className="mt-7 text-[2.75rem] font-bold leading-[0.98] tracking-tight text-primary dark:text-white sm:text-6xl">
                        See what your
                        <br/>
                        <span className="text-accent">fleet is worth.</span>
                    </h1>

                    <p className="mt-6 max-w-md text-[15px] leading-relaxed text-neutral-600 dark:text-slate-300">
                        Trade in the cars you already run and put their value toward electric vehicles. Get an instant,
                        no-obligation estimate, then swap and start cutting the fuel bill draining your budget.
                    </p>

                    <hr className="mt-10 max-w-md border-black/10 dark:border-white/10"/>

                    <p className="mt-8 text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-slate-500">
                        How the swap works
                    </p>
                    <div className="mt-5 grid max-w-md grid-cols-1 gap-5 sm:grid-cols-2">
                        {STEPS.map(({label, detail, Icon}) => (
                            <div key={label} className="flex items-start gap-3">
                <span
                    className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/[0.1] text-accent ring-1 ring-black/5 dark:bg-white/5 dark:ring-white/10">
                  <Icon size={18} aria-hidden="true"/>
                </span>
                                <span>
                  <span className="block text-sm font-semibold tracking-tight text-neutral-700 dark:text-slate-200">
                    {label}
                  </span>
                  <span className="mt-0.5 block text-[13px] leading-snug text-neutral-500 dark:text-slate-400">
                    {detail}
                  </span>
                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <FleetValuationForm/>
            </div>
        </section>
    )
}
