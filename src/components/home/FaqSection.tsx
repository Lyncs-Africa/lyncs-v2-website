import SectionBadge from '../ui/SectionBadge'
import FaqTabs from '../faq/FaqTabs'
import {FAQ_GROUPS} from '../faq/faqData'

export default function FaqSection() {
    return (
        <section className="relative overflow-hidden bg-white py-16 font-Quicksand text-primary dark:bg-[#0C1F17] dark:text-white md:py-24">
            {/* Faint blueprint grid, same as HowItWorksSection */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 dark:hidden"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(26,39,71,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(26,39,71,0.05) 1px, transparent 1px)',
                    backgroundSize: '48px 48px, 48px 48px',
                }}
            />
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 hidden dark:block"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
                    backgroundSize: '48px 48px, 48px 48px',
                }}
            />

            <div className="relative mx-auto max-w-7xl px-4">
                {/* Header */}
                <SectionBadge number="09" label="FAQ"/>
                <div className="mt-6 grid gap-6 md:grid-cols-2 md:items-center">
                    <h2 className="text-4xl font-bold !leading-[1.05] tracking-tight text-primary dark:text-white md:text-[3rem]">
                        Frequently asked questions
                    </h2>
                    <p className="text-[15px] leading-relaxed text-slate-500 dark:text-slate-300 md:justify-self-end md:text-right">
                        Here’s everything teams ask before they move with Lyncs — the swap, charging, servicing and payments.
                    </p>
                </div>

                {/* Tabbed accordion — first two per category, rest on /faq */}
                <div className="mt-12">
                    <FaqTabs groups={FAQ_GROUPS} limit={2} seeAllHref="/faq"/>
                </div>
            </div>
        </section>
    )
}
