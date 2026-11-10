'use client'

import Link from 'next/link'
import {motion} from 'framer-motion'
import {FiCheck} from 'react-icons/fi'
import SectionBadge from '../ui/SectionBadge'

const cardVariants = {
    hidden: {opacity: 0, y: 24},
    visible: (i: number) => ({opacity: 1, y: 0, transition: {duration: 0.5, delay: i * 0.12}}),
}

export default function IndividualsSection() {
    return (
        <section className="relative overflow-hidden bg-black pb-16 pt-[170px] font-Quicksand text-white md:pb-24 md:pt-[320px]">
            {/* Wave divider: light top (blends with the section above), black hills rising into this section */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 z-0 bg-[#FAF8F6] leading-[0] dark:bg-[#15203A]"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1000 265.34"
                    preserveAspectRatio="none"
                    fill="#000"
                    className="block h-[150px] w-full md:h-[300px]"
                >
                    <path d="M.17,10.74 C43.4,20,87.41,29.54,125.87,51.36 c49.88,28.29,86.24,81.56,141.49,99.85 a115.56,115.56,0,0,0,71,.33 c20.72-6.65,39.05-19,57.45-30.63 c34.42-21.75,71.93-40,112.69-45.4 c83.85-11.09,164.77,46.12,248.13,17.9 c44.46-15,78-52.21,120.65-71.76 A236.83,236.83,0,0,1,1000,1.25 L1000,265.34 l-1.71,264.09H.2 C.2,180.48-.23,95.6.17,10.74Z"/>
                </svg>
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-4">
                {/* Header */}
                <SectionBadge number="06" label="Not buying for a company?" variant="dark"/>
                <div className="mt-6 max-w-2xl">
                    <h2 className="text-4xl font-bold !leading-[1.1] tracking-tight text-white md:text-[2.5rem] xl:text-[3rem]">
                        Getting an EV for yourself?{' '}
                        <span className="text-accent">There’s a path for you too.</span>
                    </h2>
                    <p className="mt-5 text-base leading-relaxed text-slate-400 md:text-[16px]">
                        Tell us whether you drive for a living or just want your own, and we’ll show you the plan that fits.
                    </p>
                </div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{once: true, amount: 0.2}}
                    className="mt-12 grid gap-6 lg:grid-cols-2"
                >
                    {/* Driver card — dark glass */}
                    <motion.div
                        custom={0}
                        variants={cardVariants}
                        className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-sm shadow-black/20 md:p-8"
                    >
                        <div className="flex h-full flex-col">
                            <div className="space-y-3">
                                <span className="inline-flex w-fit rounded-full bg-accent px-5 py-2 text-[12px] font-semibold text-white dark:bg-[#2D419A]">
                                    Drive for a living
                                </span>
                                <h3 className="text-[24px] font-bold leading-tight tracking-tight text-white md:text-[28px]">
                                    Drive for Bolt, inDrive or LagRide?
                                </h3>
                                <p className="text-sm leading-relaxed text-slate-400 md:text-[14px]">
                                    An EV that works as hard as you do, for less.
                                </p>
                            </div>

                            <div className="mt-5 rounded-[24px] border border-white/10 bg-white/5 p-5 md:p-6">
                                <p className="text-[17px] font-semibold text-white">What you get</p>
                                <ul className="mt-4 space-y-3 text-sm text-slate-300 md:text-[14px]">
                                    {[
                                        'Own an EV with less than 20% down, or swap the car you drive',
                                        'Spread repayment over 24 months',
                                        'Lower running costs mean you keep more of every trip',
                                        'The app shows the nearest chargers and repair shops',
                                    ].map((item) => (
                                        <li
                                            key={item}
                                            className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                                        >
                                            <span className="mt-0.5 shrink-0 text-accent"><FiCheck size={18}/></span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mt-auto pt-6">
                                <Link
                                    href="/contact"
                                    className="inline-flex w-full justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-opacity-90 md:w-fit dark:bg-[#2D419A]"
                                >
                                    Check if I qualify
                                </Link>
                            </div>
                        </div>
                    </motion.div>

                    {/* Own-it card — white standout */}
                    <motion.div
                        custom={1}
                        variants={cardVariants}
                        className="rounded-[28px] bg-white p-6 shadow-lg shadow-black/30 md:p-8"
                    >
                        <div className="flex h-full flex-col">
                            <div className="space-y-3">
                                <span className="inline-flex w-fit rounded-full bg-primary px-5 py-2 text-[12px] font-semibold text-white">
                                    Just for you
                                </span>
                                <h3 className="text-[24px] font-bold leading-tight tracking-tight text-primary md:text-[28px]">
                                    Want an EV of your own?
                                </h3>
                                <p className="text-sm leading-relaxed text-slate-600 md:text-[14px]">
                                    An EV of your own, paid your way.
                                </p>
                            </div>

                            <div className="mt-5 rounded-[24px] border border-slate-200 bg-slate-50 p-5 md:p-6">
                                <p className="text-[17px] font-semibold text-primary">What you get</p>
                                <ul className="mt-4 space-y-3 text-sm text-slate-700 md:text-[14px]">
                                    {[
                                        'Buy new, buy used, or swap the car you have',
                                        'Spread repayment over 24 months',
                                        'Charging cost deducted via your Lyncs subscription',
                                        'Home chargers available — we’ll send you a quote',
                                    ].map((item) => (
                                        <li
                                            key={item}
                                            className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3"
                                        >
                                            <span className="mt-0.5 shrink-0 text-accent"><FiCheck size={18}/></span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mt-auto pt-6">
                                <Link
                                    href="/cars"
                                    className="inline-flex w-full justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-opacity-90 md:w-fit"
                                >
                                    Get my EV
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
