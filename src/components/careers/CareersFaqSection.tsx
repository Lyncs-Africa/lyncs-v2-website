'use client'

import Link from 'next/link'
import { LuArrowRight, LuCheck } from 'react-icons/lu'

const HIGHLIGHTS = [
  'Verified brand-new and foreign-used vehicles across Nigeria',
  'Transparent EV swap & trade-in valuations in minutes',
  'Trusted by drivers, fleet operators, and corporate teams',
]

export default function CareersFaqSection() {
  return (
    <section id="culture" className="bg-white py-16 font-Quicksand dark:bg-night md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="rounded-2xl border border-slate-800/80 bg-night px-7 py-10 text-white dark:border-white/10 dark:bg-[#0E131F] sm:px-12 sm:py-14">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Left: Heading + CTA */}
            <div className="lg:col-span-6">
              <h2 className="text-3xl font-bold uppercase !leading-[1.08] tracking-tight text-white sm:text-4xl">
                Ready to get
                <br />
                started?
              </h2>
              <p className="mt-4 text-sm text-slate-300">
                Trusted by individuals and corporate fleets across Nigeria.
              </p>
              <Link
                href="/cars"
                className="mt-1 inline-block text-sm font-medium text-white underline underline-offset-4 transition hover:text-[#A5B4FC]"
              >
                Explore our live vehicle catalog.
              </Link>

              <div className="mt-7 flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-[#2D419A] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2D419A]/90"
                >
                  <span>Start a Conversation</span>
                  <LuArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* Right: 3 Clean Checklist Points */}
            <ul className="space-y-4 lg:col-span-6">
              {HIGHLIGHTS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-slate-300 sm:text-[15px]">
                  <LuCheck
                    size={18}
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-[#A5B4FC]"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
