'use client'

import { GiBrain } from 'react-icons/gi'
import { IoCloseCircleOutline, IoCheckmarkCircle } from 'react-icons/io5'
import { LuMapPin, LuClock, LuShieldCheck, LuReceipt } from 'react-icons/lu'

const outline = 'border-2 border-[#111]'

const PAIN_POINTS = [
  'Worried parents calling the office because they cannot tell where the school bus is',
  'Managing your own drivers, licences, fuelling and repairs on top of running a school',
  'Buses breaking down mid-route with no quick replacement, leaving students stranded',
  'Unvetted drivers and no proper record of who is behind the wheel each day',
  'Scattered transport costs and petty-cash fuelling with no single, clear bill',
]

const LYNC_SOLUTIONS = [
  'Managed shuttle fleet so you never recruit, train or chase drivers yourself',
  'Live trip tracking with pickup and drop-off alerts for parents and administrators',
  'Vetted, background-checked drivers with daily trip logs and accountability',
  '24/7 maintenance and emergency tow so a breakdown never halts a route',
  'All transport consolidated into one simple monthly invoice for the school',
]

const STATS = [
  { label: 'Live visibility on every route', val: '100%', Icon: LuMapPin },
  { label: 'Avg roadside rescue dispatch', val: '15 mins', Icon: LuClock },
  { label: 'Drivers vetted & trained', val: 'Verified', Icon: LuShieldCheck },
  { label: 'Monthly transport billing', val: '1 Invoice', Icon: LuReceipt },
]

export default function SchoolsProblemSection() {
  return (
    <section className="bg-[#FAF8F6] font-Quicksand dark:bg-night py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div
          className={`relative rounded-[32px] bg-[#F6EEDD] p-6 sm:p-10 md:p-12 ${outline} shadow-[8px_8px_0_#111] dark:bg-[#141A2B] dark:shadow-[8px_8px_0_#fff]`}
        >
          <div className="max-w-3xl">
            <p className={`flex w-fit items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm text-slate-700 dark:bg-white/10 dark:text-slate-200 ${outline}`}>
              <GiBrain size={14} aria-hidden="true" className="shrink-0 text-emerald-600 dark:text-emerald-400" />
              The School Transport Reality in Africa
            </p>

            <h2 className="mt-6 text-3xl font-bold !leading-[1.1] tracking-tight text-[#111] dark:text-white sm:text-4xl md:text-[2.75rem]">
              Running school transport yourself shouldn&apos;t keep you in{' '}
              <span className="mt-2 block">
                constant{' '}
                <span className={`inline-block -rotate-2 rounded-full bg-[#EF6702] px-3.5 py-0.5 text-white md:px-4 ${outline}`}>
                  safety worry
                </span>
                .
              </span>
            </h2>

            <p className="mt-4 text-base text-slate-700 dark:text-slate-300 md:text-lg">
              Between anxious parents, driver management, breakdowns, and unclear costs, student transport can take more attention than the classroom. Lyncs runs it for you—safely, transparently, and fully tracked.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`rounded-2xl bg-white/70 p-6 sm:p-8 ${outline} dark:bg-white/5`}>
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/15 text-red-600">
                  <IoCloseCircleOutline size={20} />
                </span>
                <h3 className="text-xl font-bold text-[#111] dark:text-white">
                  The In-House Transport Headache
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

            <div className={`rounded-2xl bg-white p-6 sm:p-8 ${outline} dark:bg-slate-900`}>
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-600">
                  <IoCheckmarkCircle size={20} />
                </span>
                <h3 className="text-xl font-bold text-[#111] dark:text-white">
                  The Lyncs Advantage
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

          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {STATS.map(({ label, val, Icon }, i) => (
              <div
                key={i}
                className={`rounded-2xl bg-white p-4 ${outline} dark:bg-slate-900`}
              >
                <div className="flex items-center justify-between text-slate-400">
                  <Icon size={20} className="text-accent" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Perk</span>
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
