'use client'

import Link from 'next/link'
import {motion, useReducedMotion} from 'framer-motion'
import {IoCheckmarkCircleOutline} from 'react-icons/io5'
import {LuMouse} from 'react-icons/lu'
import SectionBadge from '../ui/SectionBadge'

// Positions and sizes are percentages of a square stage, so the cluster
// scales down cleanly on small screens.
const CIRCLES = [
    {
        title: 'Rides',
        image: '/images/13.jpg',
        label: 'Major ride hailing serivces',
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
        label: 'Car hire, tow & mechanics',
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

export default function BeyondTheFleetSection() {
    const still = useReducedMotion()

    return (
        <section className="relative overflow-hidden bg-[#FAF8F6] pt-16 pb-10 font-Quicksand dark:bg-[#15203A] md:pt-24 md:pb-16">
            <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 lg:grid-cols-2">
                {/* Copy */}
                <div className="max-w-xl">
                    <SectionBadge number="05" label="Beyond the fleet" variant="auto"/>
                    <h2 className="mt-6 text-4xl font-bold !leading-[1.1] tracking-tight text-primary dark:text-white md:text-[2.5rem] xl:text-[3rem]">
                        That’s how your fleet moves.{" "}
                        <span className="text-accent">Here’s how the rest of your team does.</span>
                    </h2>
                    <p className="mt-6 text-base leading-relaxed text-slate-500 dark:text-slate-400 md:text-[16px]">
                        Rides, buses, flights and services for your staff, all on one plan. And for management, something transport never gives them: visibility.
                    </p>
                    <ul className="mt-5 space-y-2.5">
                        {[
                            'Who travelled, and why?',
                            'Was it approved?',
                            'How much did it cost?',
                            'Who went over policy?',
                        ].map((question) => (
                            <li key={question} className="flex items-center gap-2.5 text-[15px] text-slate-600 dark:text-slate-300">
                                <IoCheckmarkCircleOutline size={18} aria-hidden="true" className="shrink-0 text-emerald-500 dark:text-emerald-400"/>
                                {question}
                            </li>
                        ))}
                    </ul>
                    <p className="mt-5 text-base font-medium leading-relaxed text-primary dark:text-white md:text-[16px]">
                        Lyncs answers every one of these, in one dashboard.
                    </p>
                    <div className="mt-8 flex flex-wrap items-center gap-4">
                        <Link
                            href="/book-demo"
                            className="inline-flex rounded bg-accent px-6 py-3 text-[15px] font-medium text-white shadow-lg shadow-accent/20 transition hover:bg-opacity-90 dark:bg-[#2D419A]"
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
