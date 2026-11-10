import type {Metadata} from 'next'
import Link from 'next/link'
import SectionBadge from '../../../components/ui/SectionBadge'
import FaqTabs from '../../../components/faq/FaqTabs'
import {FAQ_GROUPS} from '../../../components/faq/faqData'

export const metadata: Metadata = {
    title: 'FAQ — Lyncs',
    description:
        'Answers on the fleet swap, charging, servicing, payments and more — everything teams ask before they move with Lyncs.',
}

export default function FaqPage() {
    return (
        <div className="relative overflow-hidden bg-white font-Quicksand text-primary">
            {/* Faint blueprint grid, same as HowItWorksSection */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(26,39,71,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(26,39,71,0.05) 1px, transparent 1px)',
                    backgroundSize: '48px 48px, 48px 48px',
                }}
            />

            <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-28 md:pb-28 md:pt-36">
                {/* Header */}
                <SectionBadge number="09" label="FAQ"/>
                <div className="mt-6 grid gap-6 md:grid-cols-2 md:items-center">
                    <h1 className="text-4xl font-bold !leading-[1.05] tracking-tight text-primary md:text-[3rem] xl:text-[3.5rem]">
                        Frequently asked questions
                    </h1>
                    <p className="text-[15px] leading-relaxed text-slate-500 md:justify-self-end md:text-right">
                        Everything teams ask us about the swap, charging, servicing and payments — all in one place.
                    </p>
                </div>

                {/* Tabbed accordion — full lists */}
                <div className="mt-12">
                    <FaqTabs groups={FAQ_GROUPS}/>
                </div>

                {/* Still have questions */}
                <div className="mt-16 rounded-3xl bg-primary p-8 text-center md:p-10">
                    <h2 className="text-[22px] font-bold tracking-tight text-white md:text-[26px]">
                        Still have questions?
                    </h2>
                    <p className="mx-auto mt-2 max-w-md text-[15px] leading-relaxed text-slate-300">
                        Tell us about your fleet and we’ll walk you through exactly how the switch would work for your team.
                    </p>
                    <div className="mt-6 flex flex-wrap justify-center gap-3">
                        <Link
                            href="/contact"
                            className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold tracking-wide text-primary transition hover:bg-slate-200"
                        >
                            Talk to our team
                        </Link>
                        <Link
                            href="/book-demo"
                            className="inline-flex rounded-full border border-white/30 px-6 py-3 text-sm font-semibold tracking-wide text-white transition hover:bg-white/10"
                        >
                            Book a demo
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
