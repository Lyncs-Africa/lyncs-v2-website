import type {Metadata} from 'next'
import {LuRefreshCw} from 'react-icons/lu'
import CarValuation from '../../../components/swap/CarValuation'

export const metadata: Metadata = {
    title: 'What is your car worth? | Lyncs Africa',
    description:
        'Estimate what your current car is worth toward an electric vehicle from Lyncs. See how much of the EV it covers and an estimated monthly payment. Final value confirmed after a quick inspection.',
}

export default function SwapPage() {
    return (
        <section
            style={{
                backgroundImage:
                    'linear-gradient(rgba(26,39,71,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(26,39,71,0.05) 1px, transparent 1px)',
                backgroundSize: '48px 48px, 48px 48px',
            }}
            className="-mt-20 font-Quicksand dark:bg-night md:-mt-[130px]"
        >
            <div className="mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 md:pb-28 md:pt-[160px] lg:px-8">
                <div className="grid gap-x-12 gap-y-6 lg:grid-cols-2 lg:items-center">
                    <div>
                        <span className="flex w-fit items-center gap-2 text-sm font-bold tracking-tight text-slate-700 dark:text-slate-300">
                            <LuRefreshCw size={20} className="text-accent" aria-hidden="true" />
                            Swap for an EV
                        </span>
                        <h1 className="mt-6 text-[2.75rem] font-bold leading-[0.98] tracking-tight text-primary dark:text-white sm:text-6xl">
                            What is your
                            <br />
                            <span className="text-accent">car worth?</span>
                        </h1>
                    </div>
                    <p className="mt-10 text-right ml-auto max-w-md text-[15px] leading-relaxed text-neutral-600 dark:text-slate-300 lg:pb-2">
                        Put the value of the car you drive now toward an electric vehicle from Lyncs. Get an instant,
                        no-obligation estimate — the final value is always confirmed after a quick inspection.
                    </p>
                </div>

                <div className="mt-12">
                    <CarValuation />
                </div>
            </div>
        </section>
    )
}
