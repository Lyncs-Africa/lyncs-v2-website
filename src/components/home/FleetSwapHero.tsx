'use client'

import Link from 'next/link'
import {useRef} from 'react'
import {preload} from 'react-dom'
import HeroCollage from './HeroCollage'
import {easeOut, motion, useReducedMotion, useScroll, useSpring, useTransform, useVelocity} from 'framer-motion'
import {LuBus, LuCar, LuKey, LuPlane, LuTruck, LuWallet, LuWrench} from 'react-icons/lu'
import {MdElectricCar} from "react-icons/md";
import {FaChargingStation} from "react-icons/fa"

// Preload the car images in the browser immediately to eliminate loading delay
if (typeof window !== 'undefined') {
    ['/images/26.webp', '/images/ev-wheel-front.webp', '/images/ev-wheel-rear.webp', '/images/26-dark.webp'].forEach((src) => {
        const img = new Image()
        img.src = src
    })
}

const OPTIONS = [
    {label: 'EVs', Icon: MdElectricCar},
    {label: 'Charging', Icon: FaChargingStation},
    {label: 'Rides', Icon: LuCar},
    {label: 'Buses', Icon: LuBus},
    {label: 'Flights', Icon: LuPlane},
    {label: 'Ride wallets', Icon: LuWallet},
    {label: 'Car rentals', Icon: LuKey},
    {label: 'On demand tow', Icon: LuTruck},
    {label: 'On demand mechanic', Icon: LuWrench},
]

// Wheel centres and radius in 26.png (2014 x 780), measured from the image.
// The cut-outs in /images/ev-wheel-*.png sit exactly over the baked-in wheels.
const IMG_W = 2014
const IMG_H = 780
const WHEEL_R = 150
const WHEELS = [
    {src: '/images/ev-wheel-front.png', webpSrc: '/images/ev-wheel-front.webp', cx: 398, cy: 565},
    {src: '/images/ev-wheel-rear.png', webpSrc: '/images/ev-wheel-rear.webp', cx: 1597, cy: 566},
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
    // Hint to the browser's preload scanner during SSR
    preload('/images/26.webp', {as: 'image', type: 'image/webp', fetchPriority: 'high'})
    preload('/images/26-dark.webp', {as: 'image', type: 'image/webp', fetchPriority: 'high'})
    preload('/images/ev-wheel-front.webp', {as: 'image', type: 'image/webp', fetchPriority: 'high'})
    preload('/images/ev-wheel-rear.webp', {as: 'image', type: 'image/webp', fetchPriority: 'high'})

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
    const pitch = useSpring(useTransform(speed, [-300, 0, 300], [-0.8, 0, 0.8], {clamp: true}), {
        stiffness: 200,
        damping: 20,
    })

    return (
        <div ref={ref} className="relative">
            <motion.div style={still ? undefined : {x, opacity}} className="relative">
                <span aria-hidden
                      className="absolute inset-x-[6%] -bottom-[3%] h-[10%] rounded-[50%] bg-slate-900/25 blur-xl dark:bg-black/60"/>
                {/* Fast-loading WebP with PNG fallback. Eager + high priority for instant hero rendering */}
                <motion.div style={still ? undefined : {rotate: pitch, transformOrigin: '50% 72%'}}
                            className="relative">
                    <picture className="w-full dark:hidden">
                        <source srcSet="/images/26.webp" type="image/webp" />
                        <img
                            src="/images/26.png"
                            alt="A light-blue electric saloon"
                            loading="eager"
                            decoding="async"
                            // @ts-ignore
                            fetchPriority="high"
                            className="w-full"
                        />
                    </picture>
                    <picture className="hidden w-full dark:block">
                        <source srcSet="/images/26-dark.webp" type="image/webp" />
                        <img
                            src="/images/26-dark.png"
                            alt="A pearl-white electric saloon"
                            loading="eager"
                            decoding="async"
                            // @ts-ignore
                            fetchPriority="high"
                            className="w-full"
                        />
                    </picture>
                </motion.div>
                {WHEELS.map(({src, webpSrc, cx, cy}) => (
                    <motion.div
                        key={src}
                        aria-hidden
                        style={{
                            rotate: still ? 0 : spin,
                            left: `${((cx - WHEEL_R) / IMG_W) * 100}%`,
                            top: `${((cy - WHEEL_R) / IMG_H) * 100}%`,
                            width: `${((WHEEL_R * 2) / IMG_W) * 100}%`,
                        }}
                        className="absolute aspect-square"
                    >
                        <picture className="w-full h-full block">
                            <source srcSet={webpSrc} type="image/webp" />
                            <img
                                src={src}
                                alt=""
                                aria-hidden
                                loading="eager"
                                decoding="async"
                                // @ts-ignore
                                fetchPriority="high"
                                className="w-full h-full object-contain pointer-events-none select-none"
                            />
                        </picture>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    )
}

export default function FleetSwapHero() {
    return (
        <section
            className="-mt-20 md:-mt-[130px] relative overflow-x-clip bg-[#FAF8F6] pb-16 font-Quicksand dark:bg-night md:pb-0">
            <div aria-hidden
                 className="absolute inset-y-0 right-0 hidden w-[33%] bg-[#DCE8F2] dark:bg-[#15203A] lg:block"/>

            {/* Decorative photo collage on the left (dark mode only, behind content) */}
            <div aria-hidden
                 className="absolute inset-y-0 left-0 hidden w-[67%] overflow-hidden lg:block">
                <HeroCollage/>
            </div>

            <div className="relative mx-auto grid max-w-7xl py-[100px] gap-10 px-4 lg:grid-cols-12 lg:gap-y-6">
                <div className="pt-20 relative order-1 lg:order-none lg:col-span-8 lg:row-start-1">
                    <h2 className="font-Geist max-w-2xl text-4xl font-bold !leading-[1.1] tracking-tight text-slate-700 dark:text-white md:text-[2.75rem] xl:text-[3.7rem]">
                        Swap your company's fleet for electric vehicles.{' '}
                        <span className="text-accent">Drop the fuel bill draining your budget</span><br/>
                    </h2>

                    <svg
                        aria-hidden
                        viewBox="0 0 260 220"
                        fill="none"
                        className="absolute -right-6 top-6 hidden w-56 text-primary dark:text-slate-400 lg:block xl:-right-24"
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

                <nav aria-label="EV options"
                     className="order-4 lg:order-none lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:self-center lg:pl-4 pt-10">
                    <div className="ml-10 flex flex-wrap gap-x-6 gap-y-5">
                        {OPTIONS.map(({label, Icon}) => (
                            <div key={label} className="flex items-center gap-2.5">
                                <span
                                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/[0.1] text-accent ring-1 ring-black/5 dark:bg-indigo-400/15 dark:text-indigo-300 dark:ring-indigo-300/20">
                                    <Icon size={18} aria-hidden="true"/>
                                </span>
                                <span
                                    className="text-sm font-semibold tracking-tight text-neutral-600 dark:text-slate-300">
                                    {label}
                                </span>
                            </div>
                        ))}
                    </div>
                </nav>

                <div className="relative z-10 order-2 lg:order-none lg:col-span-4 lg:row-start-2">
                    <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400">Buy new, buy used, or swap the cars you already have. Pay small-small over time, and drive away in your EVs right away.</p>

                    <div className="mt-8 flex flex-wrap gap-3 dark:border-white/10">
                        <Link
                            href="/swap"
                            className="inline-flex rounded bg-accent px-6 py-3 text-md font-semibold tracking-wide text-white transition hover:bg-opacity-90 dark:bg-white dark:text-primary dark:hover:bg-slate-200"
                        >
                           Swap my fleet
                        </Link>
                        <Link
                            href="/cars"
                            className="inline-flex rounded border border-accent px-6 py-3 text-md font-semibold tracking-wide text-accent transition hover:bg-accent/5 dark:border-white/30 dark:text-white dark:hover:bg-white/5"
                        >
                            See available EVs
                        </Link>
                    </div>
                </div>

                <div
                    className="-mt-[4rem] relative order-3 overflow-hidden rounded-3xl bg-[#DCE8F2] px-4 py-10 dark:bg-[#15203A] lg:order-none lg:col-span-8 lg:row-start-2 lg:self-center lg:overflow-visible lg:bg-transparent lg:p-0 lg:dark:bg-transparent">
                    <DrivingCar/>
                </div>
            </div>
        </section>
    )
}
