'use client'

import Link from 'next/link'
import {useRef} from 'react'
import {easeOut, motion, useReducedMotion, useScroll, useSpring, useTransform, useVelocity} from 'framer-motion'
import {GiBrain} from 'react-icons/gi'
import {GoArrowUpRight} from 'react-icons/go'
import {LuArrowLeftRight, LuBadgeCheck, LuCarFront} from 'react-icons/lu'

const OPTIONS = [
    {label: 'Swap petrol for electric', href: '/cars/swap', Icon: LuArrowLeftRight},
    {label: 'Buy new', href: '/cars/new', Icon: LuBadgeCheck},
    {label: 'Buy used', href: '/cars/used', Icon: LuCarFront},
]

// Wheel centres and radius in 26.png (2014 x 780), measured from the image.
// The cut-outs in /images/ev-wheel-*.png sit exactly over the baked-in wheels.
const IMG_W = 2014
const IMG_H = 780
const WHEEL_R = 150
const WHEELS = [
    {src: '/images/ev-wheel-front.png', cx: 398, cy: 565},
    {src: '/images/ev-wheel-rear.png', cx: 1597, cy: 566},
]

// Degrees a wheel turns per 1% of car-width travelled (distance / radius)
const DEG_PER_PCT = (IMG_W / WHEEL_R / 100) * (180 / Math.PI)

// Pulls away gently, then holds a steady speed: accelerates over the first
// 20% of the exit, cruises for the rest, and never speeds up at the end.
const PULL_AWAY = 0.2
const CRUISE = 1 / (1 - PULL_AWAY / 2)
const pullAway = (t: number) =>
    t < PULL_AWAY ? (CRUISE * t * t) / (2 * PULL_AWAY) : CRUISE * (t - PULL_AWAY / 2)

// Drives in from the right, parks while in view, drives off to the left.
// Everything is tied to scroll, so scrolling back up reverses it.
function DrivingCar() {
    const ref = useRef<HTMLDivElement>(null)
    const still = useReducedMotion()
    const {scrollYProgress} = useScroll({target: ref, offset: ['start end', 'end start']})
    const progress = useSpring(scrollYProgress, {stiffness: 70, damping: 22, mass: 0.8})

    // Rolls in slowly and brakes into the spot; eases off, then drives at a steady speed
    const travel = useTransform(progress, [0, 0.4, 0.52, 1], [110, 0, 0, -120], {
        ease: [easeOut, (t) => t, pullAway],
    })
    const x = useTransform(travel, (v) => `${v}%`)
    // Fades by position on the way out, so it never sits over the copy and buttons
    // and keeps pace with the car however slow the exit is
    const opacity = useTransform(travel, [-90, -8, 95, 110], [0, 1, 1, 0])
    // Moving left means turning anticlockwise, so rotation follows travel directly
    const spin = useTransform(travel, (v) => v * DEG_PER_PCT)
    // A touch of weight transfer: the body pitches with speed and settles when parked
    const speed = useVelocity(travel)
    const pitch = useSpring(useTransform(speed, [-300, 0, 300], [-0.8, 0, 0.8], {clamp: true}), {stiffness: 200, damping: 20})

    return (
        <div ref={ref} className="relative">
            <motion.div style={still ? undefined : {x, opacity}} className="relative">
                <span aria-hidden className="absolute inset-x-[6%] -bottom-[3%] h-[10%] rounded-[50%] bg-slate-900/25 blur-xl dark:bg-black/60"/>
                {/* Pearl-white paint in dark mode (same photo, repainted). Lazy so
                    the hidden version isn't downloaded. */}
                <motion.div style={still ? undefined : {rotate: pitch, transformOrigin: '50% 72%'}} className="relative">
                    <img src="/images/26.png" alt="A light-blue electric saloon" loading="lazy" className="w-full dark:hidden"/>
                    <img src="/images/26-dark.png" alt="A pearl-white electric saloon" loading="lazy" className="hidden w-full dark:block"/>
                </motion.div>
                {WHEELS.map(({src, cx, cy}) => (
                    <motion.img
                        key={src}
                        src={src}
                        alt=""
                        aria-hidden
                        style={{
                            rotate: still ? 0 : spin,
                            left: `${((cx - WHEEL_R) / IMG_W) * 100}%`,
                            top: `${((cy - WHEEL_R) / IMG_H) * 100}%`,
                            width: `${((WHEEL_R * 2) / IMG_W) * 100}%`,
                        }}
                        className="absolute aspect-square"
                    />
                ))}
            </motion.div>
        </div>
    )
}

export default function EVSection() {
    return (
        <section className="relative overflow-x-clip bg-[#FAF8F6] pb-16 font-Quicksand dark:bg-night md:pb-24">
            <div aria-hidden className="absolute -mt-32 inset-y-0 right-0 hidden w-[33%] bg-[#DCE8F2] dark:bg-[#15203A] lg:block"/>

            <div className="relative mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-12 lg:gap-y-6">
                <div className="pt-24 relative order-1 lg:order-none lg:col-span-8 lg:row-start-1">
                    <p className="flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-surface px-3 py-1.5 text-sm text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                        <GiBrain size={14} aria-hidden="true" className="shrink-0 text-emerald-600 dark:text-emerald-400"/>
                        Okay o. And now I&apos;m hearing you people are selling EVs? Ehn?
                    </p>
                    <h2 className="mt-6 max-w-2xl text-4xl font-bold !leading-[1.1] tracking-tight text-primary dark:text-white md:text-[2.75rem] xl:text-[3.25rem]">
                        Fuel is finishing your pocket.{' '}
                        <span className="text-slate-400 dark:text-slate-500">Swap your petrol car for an</span>{' '}
                        <span className="text-emerald-600 dark:text-emerald-400">Electric vehicle</span>
                    </h2>

                    {/* Hand-drawn loop pointing down at the car */}
                    <svg
                        aria-hidden
                        viewBox="0 0 260 220"
                        fill="none"
                        className="absolute -right-6 top-6 hidden w-56 text-primary dark:text-slate-400 lg:block xl:right-0"
                    >
                        <motion.path
                            d="M4 120 C 60 118, 120 124, 150 112 C 190 96, 160 60, 132 78 C 100 100, 150 140, 190 110 C 230 80, 232 20, 196 12 C 150 2, 150 70, 208 120 C 236 146, 240 180, 238 214"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            initial={{pathLength: 0}}
                            whileInView={{pathLength: 1}}
                            viewport={{once: true, amount: 0.6}}
                            transition={{duration: 1.4, ease: 'easeInOut'}}
                        />
                        <motion.path
                            d="M228 202 L238 216 L248 202"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{opacity: 0}}
                            whileInView={{opacity: 1}}
                            viewport={{once: true, amount: 0.6}}
                            transition={{delay: 1.4, duration: 0.2}}
                        />
                    </svg>
                </div>

                {/* Ways in, sitting on the blue panel */}
                <nav aria-label="EV options" className="order-4 lg:order-none lg:col-span-3 lg:col-start-10 lg:row-start-1 lg:self-center lg:pl-4">
                    <ul className="space-y-1">
                        {OPTIONS.map(({label, href, Icon}) => (
                            <li key={href}>
                                <Link
                                    href={href}
                                    className="group flex items-center gap-3 rounded-lg py-2 text-[15px] font-semibold text-primary transition hover:text-accent dark:text-slate-200 dark:hover:text-white"
                                >
                                    <Icon size={20} aria-hidden="true" className="shrink-0"/>
                                    {label}
                                    <GoArrowUpRight size={16} aria-hidden="true" className="opacity-0 transition group-hover:opacity-100"/>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Copy, timeline, CTA */}
                <div className="relative z-10 order-2 lg:order-none lg:col-span-4 lg:row-start-2">
                    <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400">
                        Or buy new, or buy used. Pay small-small over time. And we drive it to your door.
                    </p>

                    <div className="mt-8">
                        <div className="flex justify-between text-sm font-semibold text-primary dark:text-white">
                            <span>Start today</span>
                            <span>Move in two months</span>
                        </div>
                        <div className="relative mt-3 h-1.5 rounded-full bg-slate-200 dark:bg-white/10">
                            <motion.div
                                initial={{width: 0}}
                                whileInView={{width: '100%'}}
                                viewport={{once: true, amount: 0.8}}
                                transition={{duration: 1.2, ease: 'easeOut', delay: 0.3}}
                                className="absolute inset-y-0 left-0 rounded-full bg-accent"
                            />
                            <span className="absolute -left-0.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full border-[3px] border-accent bg-white dark:bg-night"/>
                            <span className="absolute -right-1 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-white shadow-md shadow-accent/30">
                                <LuCarFront size={14} aria-hidden="true"/>
                            </span>
                        </div>
                        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                            Faster than shipping from the US.
                        </p>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3 border-t border-slate-200 pt-8 dark:border-white/10">
                        <Link
                            href="/cars/swap"
                            className="inline-flex rounded bg-primary px-6 py-3 text-sm font-semibold tracking-wide text-white transition hover:bg-opacity-90 dark:bg-white dark:text-primary dark:hover:bg-slate-200"
                        >
                            Start now
                        </Link>
                        {/* Point this at the valuation page once it exists */}
                        <Link
                            href="/cars/swap#valuation"
                            className="inline-flex rounded border border-primary px-6 py-3 text-sm font-semibold tracking-wide text-primary transition hover:bg-primary/5 dark:border-white/30 dark:text-white dark:hover:bg-white/5"
                        >
                            Check my car valuation
                        </Link>
                    </div>
                </div>

                {/* The car, driving in over the split */}
                <div className="relative order-3 overflow-hidden rounded-3xl bg-[#DCE8F2] px-4 py-10 dark:bg-[#15203A] lg:order-none lg:col-span-8 lg:row-start-2 lg:self-center lg:overflow-visible lg:bg-transparent lg:p-0 lg:dark:bg-transparent">
                    <DrivingCar/>
                </div>
            </div>
        </section>
    )
}
