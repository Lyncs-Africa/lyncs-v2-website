'use client'

import { motion } from 'framer-motion'
import { GiBrain } from 'react-icons/gi'
import { IoCloseCircleOutline, IoCheckmarkCircle } from 'react-icons/io5'
import { LuTrendingDown, LuClock, LuShieldCheck, LuWallet } from 'react-icons/lu'

const outline = 'border-2 border-[#111]'

const PAIN_POINTS = [
  'Staff screenshotting ride receipts & filing expense claims for 3 weeks',
  'Company pool drivers demanding cash advances for emergency fuel',
  'Fragmented vendor management: 1 bus provider, 3 flight agents, 2 car rentals',
  'Zero policy controls: off-hour personal trips billed as corporate expenses',
  'Finance reconciling 350+ individual bank transfers every month end',
]

const LYNC_SOLUTIONS = [
  'Direct corporate ride wallets: staff book without paying out of pocket',
  'Digital fuel vouchers with real-time station authorization and QR validation',
  'Bolt, Uber, LagRide, corporate shuttles, flights & EV fleet in 1 portal',
  'Automated policy rules: curfew hours, geofences, and role-based monthly caps',
  'One single consolidated tax invoice with employee audit trails and VAT',
]

const STATS = [
  { label: 'Average travel budget saved', val: '35%', Icon: LuTrendingDown },
  { label: 'Hours spent on claim reconciliation', val: '0 hrs', Icon: LuClock },
  { label: 'Consolidated month-end invoice', val: '1 bill', Icon: LuWallet },
  { label: 'Real-time policy compliance', val: '100%', Icon: LuShieldCheck },
]

export default function BusinessesProblemSection() {
  return (
    <section className="bg-[#FAF8F6] font-Quicksand dark:bg-night py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        {/* Main Neo-brutalist Card */}
        <div
          className={`relative rounded-[32px] bg-[#F6EEDD] p-6 sm:p-10 md:p-12 ${outline} shadow-[8px_8px_0_#111] dark:bg-[#141A2B] dark:shadow-[8px_8px_0_#fff]`}
        >
          <div className="max-w-3xl">
            <p className={`flex w-fit items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm text-slate-700 dark:bg-white/10 dark:text-slate-200 ${outline}`}>
              <GiBrain size={14} aria-hidden="true" className="shrink-0 text-emerald-600 dark:text-emerald-400" />
              The Corporate Mobility Dilemma in Africa
            </p>

            <h2 className="mt-6 text-3xl font-bold !leading-[1.1] tracking-tight text-[#111] dark:text-white sm:text-4xl md:text-[2.75rem]">
              Moving your team shouldn&apos;t require 10 apps, 20 spreadsheets, and{' '}
              <span className="mt-2 block">
                hours of{' '}
                <span className={`inline-block -rotate-2 rounded-full bg-[#EF6702] px-3.5 py-0.5 text-white md:px-4 ${outline}`}>
                  reconciliation wahala
                </span>
                .
              </span>
            </h2>

            <p className="mt-4 text-base text-slate-700 dark:text-slate-300 md:text-lg">
              African businesses lose hundreds of hours and millions of Naira each month to untracked fuel allowances, manual expense receipts, and fragmented transportation contracts. Lyncs gives leadership total control.
            </p>
          </div>

          {/* Side-by-side comparison */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* The Old Way */}
            <div className={`rounded-2xl bg-white/70 p-6 sm:p-8 ${outline} dark:bg-white/5`}>
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/15 text-red-600">
                  <IoCloseCircleOutline size={20} />
                </span>
                <h3 className="text-xl font-bold text-[#111] dark:text-white">
                  The Old, Broken Way
                </h3>
              </div>
              <ul className="mt-6 space-y-3.5 text-sm text-slate-700 dark:text-slate-300">
                {PAIN_POINTS.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-red-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* The Lyncs Way */}
            <div className={`rounded-2xl bg-white p-6 sm:p-8 ${outline} dark:bg-slate-900`}>
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-600">
                  <IoCheckmarkCircle size={20} />
                </span>
                <h3 className="text-xl font-bold text-[#111] dark:text-white">
                  The Lyncs Corporate OS
                </h3>
              </div>
              <ul className="mt-6 space-y-3.5 text-sm text-slate-700 dark:text-slate-300">
                {LYNC_SOLUTIONS.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                    <span className="font-medium text-[#111] dark:text-white">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Key Metrics Banner */}
          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {STATS.map(({ label, val, Icon }, i) => (
              <div
                key={i}
                className={`rounded-2xl bg-white p-4 ${outline} dark:bg-slate-900`}
              >
                <div className="flex items-center justify-between text-slate-400">
                  <Icon size={20} className="text-accent" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Result</span>
                </div>
                <p className="mt-3 text-2xl font-bold tracking-tight text-[#111] dark:text-white lg:text-3xl">
                  {val}
                </p>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-snug">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
