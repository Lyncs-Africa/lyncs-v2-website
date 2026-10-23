'use client'

import Link from 'next/link'
import {motion} from 'framer-motion'
import {GiBrain} from 'react-icons/gi'
import {GoArrowUpRight} from 'react-icons/go'

// Plug colours are lifted from the cables in /images/25.png
const PLUGS = [
    {name: 'Bolt', color: 'bg-[#74B044] text-[#111]'},
    {name: 'Uber', color: 'bg-white text-[#111]'},
    {name: 'inDrive', color: 'bg-[#FEC804] text-[#111]'},
    {name: 'LagRide', color: 'bg-[#F49AC1] text-[#111]'},
    {name: 'Shuttles', color: 'bg-[#3DA5E0] text-[#111]'},
    {name: 'Korope', color: 'bg-[#E7341B] text-white'},
    {name: 'Flights', color: 'bg-[#FEC804] text-[#111]'},
]

// Flat, outlined look to match the illustration
const outline = 'border-2 border-[#111]'

// The card drives these; the plugs inherit its hidden/visible state so they replay together
const cardVariants = {
    hidden: {opacity: 0, y: 24},
    visible: {opacity: 1, y: 0, transition: {duration: 0.5}},
}

const plugVariants = {
    hidden: {opacity: 0, x: -16},
    visible: (i: number) => ({
        opacity: 1,
        x: 0,
        transition: {type: 'spring' as const, stiffness: 400, damping: 18, delay: 0.3 + i * 0.08},
    }),
}

export default function PlugInSection() {
    return (
        <section className="bg-[#FAF8F6] font-Quicksand dark:bg-night">
            <div className="mx-auto max-w-7xl px-4">
                <div
                    className={`z-10 relative overflow-hidden rounded-[32px] bg-[#EF6702] bg-cover bg-no-repeat bg-[position:75%_center] p-4 pt-64 sm:p-6 sm:pt-80 lg:bg-[length:auto_100%] lg:bg-right lg:p-10 ${outline}`}
                    style={{backgroundImage: "url('/images/25.png')"}}
                >
                    <div className="grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
                        <motion.div
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{once: false, amount: 0.3}}
                            className={`rounded-[24px] bg-[#F6EEDD] p-6 shadow-[8px_8px_0_#111] dark:bg-[#141A2B] md:p-10 ${outline}`}
                        >
                            <p className={`flex w-fit items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm text-slate-700 dark:bg-white/10 dark:text-slate-200 ${outline}`}>
                                <GiBrain size={14} aria-hidden="true" className="shrink-0 text-emerald-600 dark:text-emerald-400"/>
                                So you&apos;re a bus service? A taxi app? I don&apos;t understand.
                            </p>

                            <h2 className="mt-6 text-4xl font-bold !leading-[1.1] tracking-tight text-[#111] dark:text-white md:text-[2.5rem] xl:text-[3rem]">
                                Neither.
                                <span className="mt-2 block text-2xl text-[#111]/70 dark:text-slate-400 md:text-3xl">
                                    We don&apos;t own the buses.
                                </span>
                                <span className="mt-2 block">
                                    We{' '}
                                    <span className={`inline-block -rotate-2 rounded-full bg-[#EF6702] px-3 text-white md:px-4 ${outline}`}>
                                        plug into
                                    </span>{' '}
                                    all of them.
                                </span>
                            </h2>

                            {/* Providers as plugs, each one snapping into place */}
                            <ul className="mt-8 flex flex-wrap gap-3" aria-label="Providers we connect">
                                {PLUGS.map(({name, color}, i) => (
                                    <motion.li
                                        key={name}
                                        variants={plugVariants}
                                        custom={i}
                                        className="flex items-center"
                                    >
                                        <span aria-hidden className="flex flex-col gap-1">
                                            <span className="h-1 w-2.5 rounded-l-sm bg-[#111] dark:bg-slate-300"/>
                                            <span className="h-1 w-2.5 rounded-l-sm bg-[#111] dark:bg-slate-300"/>
                                        </span>
                                        <span className={`rounded-lg px-3.5 py-1.5 text-[15px] font-bold ${outline} ${color}`}>
                                            {name}
                                        </span>
                                    </motion.li>
                                ))}
                            </ul>

                            {/* The socket: one place for the company */}
                            <div className={`mt-8 flex flex-col gap-5 rounded-2xl bg-white p-4 dark:bg-white/5 sm:flex-row sm:items-center sm:justify-between md:p-5 ${outline}`}>
                                <div className="flex items-center gap-4">
                                    {/* An 'on' toggle */}
                                    <span aria-hidden className={`flex h-7 w-12 shrink-0 items-center justify-end rounded-full bg-[#EF6702] p-0.5 ${outline}`}>
                                        <span className="h-5 w-5 rounded-full border-2 border-[#111] bg-white"/>
                                    </span>
                                    <p className="text-[15px] leading-snug text-slate-700 dark:text-slate-300 md:text-base">
                                        We connect the lot and hand your company{' '}
                                        <span className="font-bold text-[#111] dark:text-white">one place to control it.</span>
                                    </p>
                                </div>
                                <Link
                                    href="/contact"
                                    className="group inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-[#111] py-2.5 pl-5 pr-2.5 text-[15px] font-medium text-white transition hover:bg-primary sm:self-auto dark:bg-white dark:text-[#111] dark:hover:bg-slate-200"
                                >
                                    Switch it on
                                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#EF6702] text-white transition group-hover:rotate-45">
                                        <GoArrowUpRight size={16} aria-hidden="true"/>
                                    </span>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}
