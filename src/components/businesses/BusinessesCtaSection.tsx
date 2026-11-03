'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { GoArrowUpRight } from 'react-icons/go'
import { IoLogoWhatsapp, IoCheckmarkCircle } from 'react-icons/io5'

const outline = 'border-2 border-[#111]'

const TRUST_POINTS = [
  'Zero setup fee or hidden charges',
  '15-minute customized platform onboarding',
  'Custom pilot program for teams of 10+ employees',
  'Dedicated account manager in Lagos',
]

export default function BusinessesCtaSection() {
  return (
    <section className="bg-[#FAF8F6] font-Quicksand dark:bg-night py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div
          className={`relative overflow-hidden rounded-[32px] bg-[#EF6702] p-8 sm:p-12 md:p-16 text-white ${outline} shadow-[8px_8px_0_#111] dark:shadow-[8px_8px_0_#fff]`}
        >
          {/* Subtle geometric circles in background */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full border-8 border-white/10"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 right-40 h-64 w-64 rounded-full border-8 border-white/10"
          />

          <div className="relative z-10 max-w-3xl">
            <span className={`inline-block rounded-full bg-white px-3.5 py-1 text-xs font-bold text-[#111] ${outline}`}>
              Transform Your Organization Today
            </span>

            <h2 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl !leading-tight text-white">
              Ready to eliminate transport reconciliation and cut mobility spend by 35%?
            </h2>

            <p className="mt-4 text-base sm:text-lg text-white/90 max-w-2xl">
              Schedule a 15-minute live walkthrough with our enterprise mobility architects in Lagos. We will map your staff routes, configure policy limits, and calculate your exact savings.
            </p>

            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-white/95">
              {TRUST_POINTS.map((pt, i) => (
                <li key={i} className="flex items-center gap-2">
                  <IoCheckmarkCircle size={18} className="shrink-0 text-white" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className={`inline-flex items-center gap-2 rounded bg-white px-8 py-3.5 text-[15px] font-bold text-primary transition hover:bg-slate-100 ${outline}`}
              >
                Book your 15-min walkthrough
                <GoArrowUpRight size={18} />
              </Link>
              <a
                href="https://wa.me/2349055552055?text=Hello%20Lyncs%2C%20we%20want%20to%20schedule%20a%20corporate%20demo."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded border-2 border-white bg-transparent px-6 py-3.5 text-[15px] font-bold text-white transition hover:bg-white/10"
              >
                <IoLogoWhatsapp size={20} />
                Instant WhatsApp Chat
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
