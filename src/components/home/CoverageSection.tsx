'use client'

import {useEffect, useRef, useState} from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import {motion, useInView, useScroll, useTransform} from 'framer-motion'
import {LuGift, LuLifeBuoy, LuPlugZap, LuWrench} from 'react-icons/lu'
import type {IconType} from 'react-icons'
import SectionBadge from '../ui/SectionBadge'

type Item = {title: string; body: string; tag?: string; note?: string}
type Panel = {
    id: string
    title: string
    Icon: IconType
    intro: string
    card: string
    iconWrap: string
    items: Item[]
}

const PANELS: Panel[] = [
    {
        id: 'charging',
        title: 'Charging',
        Icon: LuPlugZap,
        intro: 'Charge at the office, across Lagos, or straight on your plan.',
        card: 'bg-[#E7F0FB]',
        iconWrap: 'bg-primary text-white',
        items: [
            {
                title: 'At your office',
                body: 'We install chargers at your premises, and the bigger your fleet, the more we set up for free. Need a full charging station? We’ll quote and build it.',
                tag: 'Free chargers as your fleet grows',
            },
            {
                title: 'Around Lagos',
                body: 'Find the nearest charging point from your Lyncs dashboard. Over 20 locations mapped across the city, and growing.',
            },
            {
                title: 'On your plan',
                body: 'Charge now, pay later. The cost comes off your Lyncs subscription.',
            },
        ],
    },
    {
        id: 'maintenance',
        title: 'Maintenance',
        Icon: LuWrench,
        intro: 'Servicing, parts and a repair network right across the city.',
        card: 'bg-[#FCEEDD]',
        iconWrap: 'bg-[#B4540A] text-white',
        items: [
            {
                title: 'Routine servicing',
                body: 'Check-ups, labour and parts. Switch a large enough fleet and your first year of servicing is on us.',
                tag: 'Free first-year servicing for larger fleets',
                note: 'Accident damage and major repairs aren’t covered.',
            },
            {
                title: 'Repair network',
                body: 'Over 10 repair partners across Lagos, listed in your dashboard by distance.',
            },
        ],
    },
    {
        id: 'emergencies',
        title: 'Emergencies',
        Icon: LuLifeBuoy,
        intro: 'When a car stops, your team keeps moving.',
        card: 'bg-[#FBE4E4]',
        iconWrap: 'bg-[#B42318] text-white',
        items: [
            {
                title: 'On-demand mechanic and towing',
                body: 'One tap in the app, wherever the car stops.',
            },
            {
                title: 'Ride credits',
                body: 'Your staff keep getting to work while their car is in the shop.',
            },
        ],
    },
]

function PanelCard({panel, active}: {panel: Panel; active: boolean}) {
    const {title, Icon, intro, card, iconWrap, items} = panel
    return (
        <motion.div
            animate={{scale: active ? 1 : 0.96}}
            transition={{duration: 0.4, ease: 'easeOut'}}
            className={classNames('flex h-full w-full items-center rounded-3xl p-6 md:p-10', card)}
        >
            <div className="mx-auto grid w-full max-w-6xl items-center gap-8 md:grid-cols-2">
                {/* Left: the tab and its promise */}
                <div className="flex flex-col">
                    <span className={classNames('flex h-12 w-12 items-center justify-center rounded-xl', iconWrap)}>
                        <Icon size={22} aria-hidden="true"/>
                    </span>
                    <h3 className="mt-5 text-[2rem] font-bold leading-[1.1] tracking-tight text-primary md:text-[2.25rem]">
                        {title}
                    </h3>
                    <p className="mt-4 max-w-sm text-[16px] leading-relaxed text-slate-700">{intro}</p>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <Link
                            href="/cars/swap#coverage"
                            className="inline-flex rounded bg-accent px-6 py-3 text-sm font-semibold tracking-wide text-white transition hover:bg-opacity-90 dark:bg-[#2D419A]"
                        >
                            Check coverage near you
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-flex rounded border border-accent px-6 py-3 text-sm font-semibold tracking-wide text-accent transition hover:bg-primary/5 dark:border-[#2D419A] dark:text-[#2D419A]"
                        >
                            Talk to our team
                        </Link>
                    </div>
                </div>

                {/* Right: the detail cards */}
                <div className="flex flex-col gap-3">
                    {items.map(({title: t, body, tag, note}) => (
                        <div key={t} className="rounded-2xl bg-white/70 p-4 ring-1 ring-black/5 md:p-5">
                            <h4 className="text-[15px] font-bold tracking-tight text-primary">{t}</h4>
                            <p className="mt-1.5 text-[13.5px] leading-relaxed text-slate-600">{body}</p>
                            {tag && (
                                <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-[12px] font-semibold text-emerald-700">
                                    <LuGift size={13} aria-hidden="true" className="shrink-0"/>
                                    {tag}
                                </span>
                            )}
                            {note && <p className="mt-3 text-[12px] italic leading-snug text-slate-400">{note}</p>}
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}

export default function CoverageSection() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [active, setActive] = useState(0)
    const [tabClicking, setTabClicking] = useState(false)

    const {scrollYProgress} = useScroll({target: containerRef, offset: ['start start', 'end end']})
    const isInView = useInView(containerRef, {once: true, margin: '-100px'})

    // Each later panel slides up over the one before it as you scroll
    const y2 = useTransform(scrollYProgress, [0.22, 0.5], ['100%', '0%'])
    const y3 = useTransform(scrollYProgress, [0.55, 0.83], ['100%', '0%'])
    const panelY = [undefined, y2, y3]

    // Tabs follow the scroll, unless a tab was just clicked
    useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', (v) => {
            if (tabClicking) return
            setActive(v > 0.66 ? 2 : v > 0.33 ? 1 : 0)
        })
        return () => unsubscribe()
    }, [scrollYProgress, tabClicking])

    const onTab = (i: number) => {
        setTabClicking(true)
        setActive(i)
        const container = containerRef.current
        if (container) {
            const sectionHeight = container.scrollHeight / PANELS.length
            window.scrollTo({top: container.offsetTop + sectionHeight * i, behavior: 'smooth'})
        }
        setTimeout(() => setTabClicking(false), 600)
    }

    return (
        <section ref={containerRef} className="relative overflow-clip bg-black font-Quicksand text-white">
            {/* Wave divider: white top with the same blueprint grid, black hills rising into the black section */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 z-0 bg-white leading-[0] dark:bg-[#0C1F17]"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(26,39,71,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(26,39,71,0.05) 1px, transparent 1px)',
                    backgroundSize: '48px 48px, 48px 48px',
                }}
            >
                {/* Light grid for dark mode, since the dark blueprint lines vanish on the green */}
                <div
                    aria-hidden
                    className="absolute inset-0 z-0 hidden dark:block"
                    style={{
                        backgroundImage:
                            'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
                        backgroundSize: '48px 48px, 48px 48px',
                    }}
                />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1000 265.34"
                    preserveAspectRatio="none"
                    fill="#000"
                    className="relative z-10 block h-[150px] w-full md:h-[300px]"
                >
                    <path d="M.17,10.74 C43.4,20,87.41,29.54,125.87,51.36 c49.88,28.29,86.24,81.56,141.49,99.85 a115.56,115.56,0,0,0,71,.33 c20.72-6.65,39.05-19,57.45-30.63 c34.42-21.75,71.93-40,112.69-45.4 c83.85-11.09,164.77,46.12,248.13,17.9 c44.46-15,78-52.21,120.65-71.76 A236.83,236.83,0,0,1,1000,1.25 L1000,265.34 l-1.71,264.09H.2 C.2,180.48-.23,95.6.17,10.74Z"/>
                </svg>
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 pt-[170px] pb-20 md:pt-[320px] md:pb-28">
                <div className="text-center">
                    <SectionBadge number="02" label="Coverage" variant="dark" align="center" className="mb-6"/>
                    <h2 className="text-4xl font-bold leading-[1.1] tracking-tight md:text-[3.25rem]">
                        Everything your EVs
                        <br/> need to keep moving
                    </h2>
                    <p className="mx-auto mt-5 max-w-xl text-[16px] font-light text-gray-400">
                        Give us your locations, and we’ll show you the chargers and repair options closest to your team.
                    </p>
                </div>

                {/* Sticky pill tabs */}
                <div className="sticky top-[150px] z-30 mt-10 flex justify-center">
                    <div className="inline-flex gap-1 rounded-full bg-white p-1 shadow-lg shadow-black/20 ring-1 ring-black/5">
                        {PANELS.map((panel, i) => (
                            <button
                                key={panel.id}
                                type="button"
                                onClick={() => onTab(i)}
                                className={classNames(
                                    'rounded-full px-5 py-2 text-sm font-semibold transition',
                                    active === i ? 'bg-accent text-white dark:bg-[#2D419A]' : 'text-slate-500 hover:text-primary',
                                )}
                            >
                                {panel.title}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Scroll-stacked panels */}
                <div className="relative mt-10 h-[260vh]">
                    <div className="sticky top-[220px] h-[78vh] overflow-hidden rounded-3xl">
                        {PANELS.map((panel, i) => (
                            <motion.div
                                key={panel.id}
                                className="absolute inset-0"
                                style={{zIndex: 10 + i * 10, y: panelY[i]}}
                                initial={i === 0 ? {scale: 0.95} : undefined}
                                animate={i === 0 ? (isInView ? {scale: 1} : {scale: 0.95}) : undefined}
                                transition={i === 0 ? {duration: 0.6, ease: [0.25, 0.1, 0.25, 1]} : undefined}
                            >
                                <PanelCard panel={panel} active={active === i}/>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
