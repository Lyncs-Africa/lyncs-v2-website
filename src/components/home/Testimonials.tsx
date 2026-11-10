'use client'

import Link from 'next/link'
import {Fragment} from 'react'
import {FaRegStar, FaStar, FaStarHalfAlt} from 'react-icons/fa'
import SectionBadge from '../ui/SectionBadge'

type Feedback = {person: string; message: string; rating: number}

const FEEDBACKS: Feedback[] = [
    {person: 'Obafemi Darabidan', message: 'They’re doing something really ballsy, and I honestly see them going all the way to the top.', rating: 5},
    {person: 'Odunayo Temilade', message: 'No more chasing HR for my Bolt refund. Everything’s tracked and approved right from the Lyncs dashboard.', rating: 5},
    {person: 'Tobi Adegoke', message: 'No more juggling five apps just to move around.', rating: 4},
    {person: 'Femi Bejide', message: 'This is the most transparent thing I’ve seen when it comes to mobility and expense management. Maybe I’m biased, but it’s just that good.', rating: 5},
    {person: 'Lensola Awoniyi', message: 'With the credit option, we can move anytime we want without waiting on reimbursements. Lyncs gives us real breathing room.', rating: 4.5},
    {person: 'Chinenye Dibiah', message: 'Switching our fleet felt risky on paper, but the team held our hand the whole way. We’d do it again tomorrow.', rating: 5},
    {person: 'Kelechi Okeke', message: 'The nearest-charger map alone has saved my drivers hours every week.', rating: 4.5},
    {person: 'Emmanuel Chibuzor', message: 'One subscription for everything means my finance team finally sleeps at night.', rating: 5},
]

function Ratings({value}: {value: number}) {
    return (
        <div className="flex items-center gap-1 text-amber-400" aria-label={`${value} out of 5`}>
            {[1, 2, 3, 4, 5].map((i) => {
                if (value >= i) return <FaStar key={i} size={15} aria-hidden="true"/>
                if (value >= i - 0.5) return <FaStarHalfAlt key={i} size={15} aria-hidden="true"/>
                return <FaRegStar key={i} size={15} aria-hidden="true" className="text-amber-400/40"/>
            })}
        </div>
    )
}

function initials(name: string) {
    return name.split(' ').slice(0, 2).map((n) => n[0]).join('')
}

function Card({person, message, rating}: Feedback) {
    return (
        <figure className="flex h-full w-[300px] shrink-0 flex-col rounded-2xl border border-white/10 bg-white/5 p-6 md:w-[340px]">
            <Ratings value={rating}/>
            <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-slate-200">
                “{message}”
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/20 text-[13px] font-bold text-accent">
                    {initials(person)}
                </span>
                <div>
                    <p className="text-[14px] font-semibold text-white">{person}</p>
                    <p className="text-[12px] text-slate-400">Lyncs client</p>
                </div>
            </figcaption>
        </figure>
    )
}

export default function Testimonials() {
    return (
        <section className="relative overflow-hidden bg-black pb-16 pt-10 font-Quicksand text-white md:pb-24 md:pt-16">
            <div className="mx-auto max-w-7xl px-4">
                {/* Header */}
                <SectionBadge number="08" label="What our clients say" variant="dark"/>
                <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                    <h2 className="max-w-xl text-4xl font-bold !leading-[1.1] tracking-tight text-white md:text-[2.5rem] xl:text-[3rem]">
                        Teams that move with Lyncs{' '}
                        <span className="text-accent">don’t leave.</span>
                    </h2>
                    <div className="max-w-md">
                        <p className="text-base leading-relaxed text-slate-400 md:text-[16px]">Tell us about your company, and we’ll show you how teams like yours are using Lyncs today.</p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <Link
                                href="/contact"
                                className="inline-flex rounded-full bg-accent px-6 py-3 text-sm font-semibold tracking-wide text-white transition hover:bg-opacity-90 dark:bg-[#2D419A]"
                            >
                                Talk to us today
                            </Link>
                            <Link
                                href="/book-demo"
                                className="inline-flex rounded-full border border-white/30 px-6 py-3 text-sm font-semibold tracking-wide text-white transition hover:bg-white/5"
                            >
                                Book a demo
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Auto-scrolling, full-bleed testimonial marquee */}
            <div className="marquee-pause relative mt-12 overflow-hidden md:mt-16">
                <div className="animate-marquee flex gap-5 px-2.5">
                    {[0, 1].map((loop) => (
                        <Fragment key={loop}>
                            {FEEDBACKS.map((f, i) => (
                                <Card key={`${loop}-${i}`} {...f}/>
                            ))}
                        </Fragment>
                    ))}
                </div>
                {/* Soft fade at both edges */}
                <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black to-transparent md:w-28"/>
                <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black to-transparent md:w-28"/>
            </div>
        </section>
    )
}
