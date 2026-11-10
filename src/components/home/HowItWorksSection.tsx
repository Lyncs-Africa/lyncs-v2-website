'use client'

import {Fragment} from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import {motion} from 'framer-motion'
import SectionBadge from '../ui/SectionBadge'

type Step = {
    title: string
    body: string
    tags: string[]
    card: string
    dot: string
    stagger: string
}

const STEPS: Step[] = [
    {
        title: 'Get your fleet valued',
        body: 'Tell us what you drive. We’ll value your current cars and hold that quote for 30 days.',
        tags: ['Any make or model', '30-day quote hold'],
        card: 'bg-[#E6F0E2]',
        dot: 'bg-emerald-500',
        stagger: 'md:mt-0',
    },
    {
        title: 'Pick your EVs',
        body: 'Choose new or used. The value of your old cars goes toward your 20% upfront payment.',
        tags: ['New or used', '20% upfront'],
        card: 'bg-[#E3ECFA]',
        dot: 'bg-[#2D419A]',
        stagger: 'md:mt-16',
    },
    {
        title: 'Pay small-small, drive right away',
        body: 'Spread the rest over 18 to 24 months through our partner banks. Ready as soon as you sign off.',
        tags: ['18–24 months', 'Partner banks', 'Drive right away'],
        card: 'bg-[#FBEEDD]',
        dot: 'bg-amber-500',
        stagger: 'md:mt-8',
    },
]

// A small 3-stop progress line; the current step's dot is filled
function StepProgress({step, dot}: {step: number; dot: string}) {
    return (
        <div>
            <div className="flex items-center">
                {[1, 2, 3].map((k, idx) => (
                    <Fragment key={k}>
                        <span
                            className={classNames(
                                'h-2.5 w-2.5 shrink-0 rounded-full',
                                k === step ? dot : 'border border-slate-400/70',
                            )}
                        />
                        {idx < 2 && <span className="h-px flex-1 bg-slate-400/50"/>}
                    </Fragment>
                ))}
            </div>
            <div
                className={classNames(
                    'mt-2 flex text-[11px] font-medium text-slate-500',
                    step === 1 ? 'justify-start' : step === 2 ? 'justify-center' : 'justify-end',
                )}
            >
                Step {step}
            </div>
        </div>
    )
}

const cardVariants = {
    hidden: {opacity: 0, y: 24},
    visible: (i: number) => ({opacity: 1, y: 0, transition: {duration: 0.5, delay: i * 0.12}}),
}

const highlight = 'rounded px-1 py-0.5 text-slate-900'

export default function HowItWorksSection() {
    return (
        <section className="relative overflow-hidden bg-white pt-16 pb-10 font-Quicksand text-primary dark:bg-[#0C1F17] dark:text-white md:pt-24 md:pb-16">
            {/* Faint grid, like a blueprint */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 dark:hidden"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(26,39,71,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(26,39,71,0.05) 1px, transparent 1px)',
                    backgroundSize: '48px 48px, 48px 48px',
                }}
            />
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 hidden dark:block"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
                    backgroundSize: '48px 48px, 48px 48px',
                }}
            />

            <div className="relative mx-auto max-w-7xl px-4">
                {/* Header: numbered pill on the left, highlighted blurb on the right */}
                <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
                    <SectionBadge number="01" label="How it works"/>

                    <p className="max-w-md text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
                        From petrol to electric in three steps. We{' '}
                        <span className={classNames(highlight, 'bg-emerald-200')}>value your current fleet</span>, put it
                        toward <span className={classNames(highlight, 'bg-accent/25 dark:bg-accent')}>new or used EVs</span>, and you pay
                        small-small over <span className={classNames(highlight, 'bg-amber-200')}>18 to 24 months</span>.
                    </p>
                </div>

                {/* Staggered step cards */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{once: true, amount: 0.2}}
                    className="mt-14 grid gap-6 md:grid-cols-3 md:items-start"
                >
                    {STEPS.map(({title, body, tags, card, dot, stagger}, i) => (
                        <motion.div
                            key={title}
                            custom={i}
                            variants={cardVariants}
                            className={classNames('rounded-3xl p-6 shadow-sm shadow-slate-900/5 md:p-7', card, stagger)}
                        >
                            <StepProgress step={i + 1} dot={dot}/>
                            <h3 className="mt-6 text-[1.6rem] font-bold leading-[1.1] tracking-tight text-slate-900">
                                {title}
                            </h3>
                            <p className="mt-2.5 text-[14px] leading-relaxed text-slate-600">{body}</p>
                            <div className="mt-5 flex flex-wrap gap-2">
                                {tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="rounded-full border border-slate-900/15 px-3 py-1 text-[12px] font-medium text-slate-700"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Soft nudge for anyone still weighing it up */}
                <div className="mt-16 flex flex-col gap-6 border-t border-slate-200 pt-10 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
                    <div className="max-w-xl">
                        <h3 className="text-[22px] font-bold tracking-tight text-primary dark:text-white">
                            Not sure what your fleet is worth?
                        </h3>
                        <p className="mt-2 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
                            Tell us the cars you run today, and we’ll value them and show you how much of the switch they cover.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-3 sm:shrink-0">
                        <Link
                            href="/swap"
                            className="inline-flex rounded-full border bg-primary px-6 py-3 text-sm font-semibold tracking-wide text-white transition hover:bg-opacity-90 dark:border-transparent dark:bg-white dark:text-primary dark:hover:bg-slate-200"
                        >
                            Get my fleet valued
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-flex rounded-full border border-primary px-6 py-3 text-sm font-semibold tracking-wide text-primary transition hover:bg-primary/5 dark:border-white/30 dark:text-white dark:hover:bg-white/5"
                        >
                            Talk to our team
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
