'use client'

import Link from 'next/link'
import {motion, useReducedMotion} from 'framer-motion'
import {GiBrain} from 'react-icons/gi'
import {IoCheckmarkCircle} from 'react-icons/io5'
import {LuMouse} from 'react-icons/lu'

// Positions and sizes are percentages of a square stage, so the cluster
// scales down cleanly on small screens.
const CIRCLES = [
    {
        title: 'Rides',
        image: '/images/13.jpg',
        label: 'Bolt, inDrive, Lagride & more',
        pos: 'left-[16%] top-[2%] w-[45%]',
        color: 'bg-[#E6F0DC] dark:bg-emerald-400/10',
        big: true,
    },
    {
        title: 'Flights',
        image: '/images/21.jpg',
        label: 'Local & international',
        pos: 'right-0 top-[12%] w-[36%] lg:-right-[6%]',
        color: 'bg-[#ECE8F1] dark:bg-violet-400/10',
    },
    {
        title: 'Buses',
        image: '/images/22.jpg',
        label: 'Intercity & shuttles',
        pos: 'left-0 top-[54%] w-[32%]',
        color: 'bg-[#DCE5EA] dark:bg-sky-400/10',
    },
    {
        title: 'Services',
        image: '/images/23.jpg',
        label: 'Car hire, tow, fuel & mechanics',
        pos: 'right-[2%] top-[52%] w-[50%]',
        color: 'bg-[#E3ECFA] dark:bg-accent/15',
        big: true,
        ring: true,
    },
]

const CHIPS = [
    {text: 'Booked', className: 'left-[24%] top-[52%]'},
    {text: 'Managed', className: 'left-[58%] top-[4%]'},
    {text: 'Paid', className: 'right-0 top-[60%]'},
]

const AVATARS = [
    {src: '/images/face-1.png', className: 'left-[66%] top-0 w-[10%]'},
    {src: '/images/face-three.png', className: 'left-[1%] top-[40%] w-[10%]'},
    {src: '/images/24.jpg', className: 'left-[30%] top-[86%] w-[10%] object-[50%_20%]'},
]

export default function ExplainerCircles() {
    const still = useReducedMotion()

    return (
        <section className="relative overflow-hidden bg-[#FAF8F6] py-16 font-Quicksand dark:bg-night md:py-24">
            <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 lg:grid-cols-2">
                {/* Copy */}
                <div className="max-w-xl">
                    <p className="flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-surface px-3 py-1.5 text-sm text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                        <GiBrain size={14} aria-hidden="true" className="text-emerald-600 dark:text-emerald-400"/>
                        Okay, I have scrolled. Are you going to break it down now?
                    </p>
                    <h2 className="mt-6 text-4xl font-bold !leading-[1.1] tracking-tight text-primary dark:text-white md:text-[2.5rem] xl:text-[3rem]">
                        You are constantly moving your people but this time, you control it all from one place
                    </h2>
                    <p className="mt-6 text-base leading-relaxed text-slate-500 dark:text-slate-400 md:text-[16px]">
                        Ride, bus, flights, rentals, e.t.c booked, managed and paid from one place. One wallet. One bill. No wahala, no
                        ten
                        apps.
                    </p>
                    <div className="mt-8 flex flex-wrap items-center gap-4">
                        <Link
                            href="/contact"
                            className="inline-flex rounded bg-accent px-6 py-3 text-[15px] font-medium text-white shadow-lg shadow-accent/20 transition hover:bg-opacity-90"
                        >
                            Book a demo
                        </Link>
                        {/* Point this at the next section's id once it exists */}
                        <Link
                            href="#how-it-works"
                            className="inline-flex rounded border border-accent px-6 py-3 text-[15px] font-medium text-accent transition hover:bg-accent/5 dark:border-white/20 dark:text-white dark:hover:border-white/40 dark:hover:bg-white/5"
                        >
                            Tell me more about this
                        </Link>
                    </div>
                    <p className="mt-14 flex items-center gap-2 text-sm text-primary dark:text-slate-300">
                        <LuMouse size={18} aria-hidden="true"/>
                        Keep scrolling to see how it works
                    </p>
                </div>

                <div className="relative mx-auto aspect-square w-full max-w-[520px] lg:max-w-[580px]">
                    <span aria-hidden
                          className="absolute left-[10%] top-[18%] h-3 w-3 rounded-full bg-slate-200 dark:bg-white/10"/>
                    <span aria-hidden className="absolute bottom-[4%] left-[8%] h-4 w-4 rounded-full bg-highlight/30"/>

                    {CIRCLES.map(({title, label, pos, color, big, ring, image}, i) => (
                        <motion.div
                            key={title}
                            initial={{opacity: 0, scale: 0.85}}
                            whileInView={{opacity: 1, scale: 1}}
                            viewport={{once: true, amount: 0.3}}
                            transition={{duration: 0.6, delay: i * 0.12}}
                            className={`absolute aspect-square ${pos}`}
                        >
                            {ring && <span aria-hidden
                                           className="absolute -inset-[8%] rounded-full border border-slate-200 dark:border-white/10"/>}
                            <motion.div
                                animate={still ? undefined : {y: [0, -8, 0]}}
                                transition={{duration: 6 + i, repeat: Infinity, ease: 'easeInOut'}}
                                className={`relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-full bg-cover bg-center text-center shadow-xl shadow-slate-900/10 ring-4 ring-white dark:shadow-black/30 dark:ring-slate-800 sm:ring-[6px] lg:ring-8 ${color}`}
                                style={image ? {backgroundImage: `url('${image}')`} : undefined}
                            >
                                {/* Photo circles get a dark wash so the text stays legible */}
                                {image && <span aria-hidden className="absolute inset-0 bg-gradient-to-b from-primary/30 to-primary/70"/>}
                                <p className={`relative font-bold tracking-tight ${image ? 'text-white' : 'text-primary dark:text-white'} ${big ? 'text-lg sm:text-2xl lg:text-4xl' : 'text-base sm:text-xl lg:text-3xl'}`}>
                                    {title}
                                </p>
                                <p className={`relative mt-0.5 px-3 text-[9px] font-medium leading-tight sm:mt-1 sm:px-4 sm:text-xs lg:text-sm ${image ? 'text-white/90' : 'text-primary/80 dark:text-slate-300'}`}>{label}</p>
                            </motion.div>
                        </motion.div>
                    ))}



                    {AVATARS.map(({src, className}) => (
                        <img
                            key={src}
                            src={src}
                            alt=""
                            className={`absolute z-10 aspect-square rounded-full object-cover shadow-md ring-2 ring-white dark:ring-slate-800 sm:ring-4 ${className}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
