'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { GiBrain } from 'react-icons/gi'
import { GoArrowUpRight } from 'react-icons/go'
import { IoCloseCircleOutline, IoCheckmarkCircle } from 'react-icons/io5'

const outline = 'border-2 border-[#111]'

const PAIN_POINTS = [
  'Staff screenshotting ride receipts & filing claims for 3 weeks',
  'Drivers calling HR at 7:00 AM for petrol emergency cash',
  'Different apps for cabs, airport shuttles, mechanic tow & flight tickets',
  'Finance reconciling 350 individual bank transfers at month end',
]

const LYNC_SOLUTIONS = [
  'Automatic corporate billing. Staff rides straight from company wallet',
  'Pre-allocated digital fuel vouchers with real-time station authorization',
  'Bolt, Uber, Shuttles, Flights, Tow & EV fleet connected to one portal',
  'One single consolidated invoice with line-by-line employee audit trail',
]

export default function AboutProblemSection() {
  const [activeTab, setActiveTab] = useState<'problem' | 'solution'>('solution')

  return (
    <section className="bg-[#FAF8F6] font-Quicksand dark:bg-night py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        {/* Main Neo-brutalist Card matching PlugInSection */}
        <div
          className={`relative rounded-[32px] bg-[#F6EEDD] p-6 sm:p-10 md:p-12 ${outline} shadow-[8px_8px_0_#111] dark:bg-[#141A2B] dark:shadow-[8px_8px_0_#fff]`}
        >
          <div className="max-w-3xl">
            <p className={`flex w-fit items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm text-slate-700 dark:bg-white/10 dark:text-slate-200 ${outline}`}>
              <GiBrain size={14} aria-hidden="true" className="shrink-0 text-emerald-600 dark:text-emerald-400" />
              Why did you start this? What was so broken about mobility in Lagos?
            </p>

            <h2 className="mt-6 text-3xl font-bold !leading-[1.1] tracking-tight text-[#111] dark:text-white sm:text-4xl md:text-[2.75rem]">
              Moving staff across Africa was an operational nightmare.{' '}
              <span className="mt-2 block">
                We turned chaos into{' '}
                <span className={`inline-block -rotate-2 rounded-full bg-[#EF6702] px-3.5 py-0.5 text-white md:px-4 ${outline}`}>
                  one OS
                </span>
                .
              </span>
            </h2>

            <p className="mt-4 text-base text-slate-700 dark:text-slate-300 md:text-lg">
              We watched companies in Lagos, Nairobi, and Accra lose millions of Naira every month to commute reconciliation waste, untracked fuel vouchers, and fragmented vendor contracts.
            </p>
          </div>

          {/* Side-by-side comparison (No blurry shadows, crisp flat borders) */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* The Old Way */}
            <div className={`rounded-2xl bg-white/70 p-6 sm:p-8 ${outline} dark:bg-white/5`}>
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/15 text-red-600">
                  <IoCloseCircleOutline size={20} />
                </span>
                <h3 className="text-xl font-bold text-[#111] dark:text-white">
                  The Old, Fragmented Way
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
                  The Lyncs Operating System
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

          {/* Socket Banner matching PlugInSection */}
          <div className={`mt-8 flex flex-col gap-4 rounded-2xl bg-white p-4 sm:flex-row sm:items-center sm:justify-between md:p-5 ${outline} dark:bg-white/5`}>
            <div className="flex items-center gap-4">
              <span className={`flex h-7 w-12 shrink-0 items-center justify-end rounded-full bg-[#EF6702] p-0.5 ${outline}`}>
                <span className="h-5 w-5 rounded-full border-2 border-[#111] bg-white" />
              </span>
              <p className="text-[15px] leading-snug text-slate-700 dark:text-slate-300 md:text-base">
                Lyncs coordinates over{' '}
                <span className="font-bold text-[#111] dark:text-white">18,000 corporate trips and commutes every month</span>{' '}
                across Lagos and beyond.
              </p>
            </div>
            <a
              href="/contact"
              className={`group inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-[#111] py-2.5 pl-5 pr-2.5 text-[14px] font-bold text-white transition hover:bg-primary sm:self-auto dark:bg-white dark:text-[#111] dark:hover:bg-slate-200 ${outline}`}
            >
              See the platform
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#EF6702] text-white transition group-hover:rotate-45">
                <GoArrowUpRight size={16} aria-hidden="true" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
