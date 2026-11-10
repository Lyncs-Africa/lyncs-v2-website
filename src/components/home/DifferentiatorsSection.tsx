'use client'

import Link from 'next/link'
import {motion} from 'framer-motion'
import SectionBadge from '../ui/SectionBadge'

type Point = { title: string; body: string }

// The three ways Lyncs is not a dealer
const POINTS: Point[] = [
    {
        title: 'We take your old cars',
        body: 'We value them, sell them and count the value as part payment. A dealer sells you a new car and leaves you with the old ones.',
    },
    {
        title: 'We build the charging around you',
        body: 'Free chargers as your fleet grows, and a full office station if you want one, quoted for your site. A dealer hands over the keys and that’s where it ends.',
    },
    {
        title: 'One subscription covers everything',
        body: 'EV charging, rides, buses and flights all run through one Lyncs subscription. A dealer can’t do that. It’s what makes Lyncs different.',
    },
]

export default function DifferentiatorsSection() {
    return (
        <section className="relative overflow-hidden bg-white py-16 font-Quicksand dark:bg-night md:py-24">
            <div className="mx-auto max-w-7xl px-4">
                {/* Header */}
                <SectionBadge number="04" label="What makes us different" variant="auto"/>
                <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <h2 className="max-w-2xl text-4xl font-bold !leading-[1.1] tracking-tight text-primary dark:text-white md:text-[2.5rem] xl:text-[3rem]">
                        A dealer sells you a car.{' '}<br/>
                        <span className="text-accent"> Lyncs keeps it moving.</span>
                    </h2>
                    <p className="max-w-md text-base leading-relaxed text-slate-500 dark:text-slate-400 lg:text-right">Tell
                        us what your fleet runs on today, and we’ll show you everything Lyncs would handle after the
                        swap.</p>
                </div>

                <div className="mt-14 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                    {/* Left: the three differentiators as a timeline */}
                    <div>
                        {POINTS.map(({title, body}, i) => {
                            const last = i === POINTS.length - 1
                            return (
                                <motion.div
                                    key={title}
                                    initial={{opacity: 0, y: 16}}
                                    whileInView={{opacity: 1, y: 0}}
                                    viewport={{once: true, amount: 0.4}}
                                    transition={{duration: 0.5, delay: i * 0.12}}
                                    className="relative flex items-start gap-4 pb-10 last:pb-0"
                                >
                                    {/* connector line, drawn behind every item except the last */}
                                    {!last && (
                                        <span
                                            aria-hidden
                                            className="absolute left-[19px] top-10 h-[calc(100%-2.5rem)] w-px bg-primary/25 dark:bg-white/15"
                                        />
                                    )}
                                    <span
                                        className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary bg-[#FAF8F6] text-sm font-bold text-primary dark:border-accent dark:bg-night dark:text-accent">
                                        {i + 1}
                                    </span>
                                    <div>
                                        <h3 className="text-[1.2rem] font-bold leading-tight tracking-tight text-primary dark:text-white">
                                            {title}
                                        </h3>
                                        <p className="mt-1.5 text-[15px] leading-relaxed text-slate-500 dark:text-slate-400">
                                            {body}
                                        </p>
                                    </div>
                                </motion.div>
                            )
                        })}

                        <div className="flex flex-wrap items-center gap-4">
                            <Link
                                href="/book-demo"
                                className="inline-flex rounded bg-accent px-6 py-3 text-[15px] font-medium text-white shadow-lg shadow-accent/20 transition hover:bg-opacity-90 dark:bg-[#2D419A]"
                            >
                                Book a demo
                            </Link>
                            <Link
                                href="/swap"
                                className="inline-flex rounded border border-accent px-6 py-3 text-[15px] font-medium text-accent transition hover:bg-accent/5 dark:border-white/20 dark:text-white dark:hover:border-white/40 dark:hover:bg-white/5"
                            >
                                Get my fleet valued
                            </Link>
                        </div>
                    </div>

                    {/* Right: the services converging into one subscription */}
                    <motion.div
                        initial={{opacity: 0, scale: 0.96}}
                        whileInView={{opacity: 1, scale: 1}}
                        viewport={{once: true, amount: 0.3}}
                        transition={{duration: 0.6}}
                    >
                        <img
                            src="/images/team-2.jpg"
                            alt="Every Lyncs service — EVs, charging, servicing, rides, buses, flights and rentals — on one company subscription."
                            className="w-full rounded-2xl"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
