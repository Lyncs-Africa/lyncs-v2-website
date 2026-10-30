'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { GoArrowUpRight } from 'react-icons/go'
import { IoCheckmarkCircle } from 'react-icons/io5'
import { LuCar } from 'react-icons/lu'

const outline = 'border-2 border-[#111]'

const TRUST_POINTS = [
  'Zero subscription or recurring membership fee',
  'Instant trade-in valuation for your petrol car',
  '8-year EV battery warranty & charging network access',
  '24/7 Lagos roadside recovery & customer support',
]

export default function IndividualsCtaSection() {
  return (
    <section className="bg-[#FAF8F6] font-Quicksand dark:bg-night py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div
          className={`relative overflow-hidden rounded-[32px] bg-[#EF6702] p-8 sm:p-12 md:p-16 text-white ${outline} shadow-[8px_8px_0_#111] dark:shadow-[8px_8px_0_#fff]`}
        >
          {/* Subtle decorative circles */}
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
              Join Thousands of Smart Commuters
            </span>

            <h2 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl !leading-tight text-white">
              Ready to stop wasting money on fuel and commute stress?
            </h2>

            <p className="mt-4 text-base sm:text-lg text-white/90 max-w-2xl">
              Swap your current petrol vehicle for an electric car today, compare ride rates across apps, and access discounted fuel vouchers all from one platform.
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
                href="/cars/swap"
                className={`inline-flex items-center gap-2 rounded bg-white px-8 py-3.5 text-[15px] font-bold text-primary transition hover:bg-slate-100 ${outline}`}
              >
                Swap your car for an EV
                <GoArrowUpRight size={18} />
              </Link>
              <Link
                href="/cars/list"
                className="inline-flex items-center gap-2 rounded border-2 border-white bg-transparent px-6 py-3.5 text-[15px] font-bold text-white transition hover:bg-white/10"
              >
                <LuCar size={20} />
                Browse available cars
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
