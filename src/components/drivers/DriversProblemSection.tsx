'use client'

import { GiBrain } from 'react-icons/gi'
import { IoCloseCircleOutline, IoCheckmarkCircle } from 'react-icons/io5'
import { LuTrendingDown, LuClock, LuShieldCheck, LuZap } from 'react-icons/lu'

const outline = 'border-2 border-[#111]'

const PAIN_POINTS = [
  'Handing over most of your daily earnings to fuel before you even clear car rent',
  'Paying daily or weekly vehicle rent on a car you will never actually own',
  'Losing whole days of income whenever the car breaks down with no trusted mechanic',
  'Juggling several driver apps and still waiting for low-paying trips in surge traffic',
  'No clear path to owning your own vehicle no matter how many hours you drive',
]

const LYNC_SOLUTIONS = [
  'Rent-to-own an electric vehicle: every payment builds towards full ownership',
  'Up to 80% lower running costs: charge instead of fuelling at the pump',
  '24/7 on-demand mechanic and tow dispatch so a breakdown never ends your day',
  'Earn across Bolt, Uber and LagRide from one driver account and one wallet',
  'Transparent weekly statements so you always know your real take-home',
]

const STATS = [
  { label: 'Running cost cut on an EV', val: '80%', Icon: LuTrendingDown },
  { label: 'Avg roadside rescue dispatch', val: '15 mins', Icon: LuClock },
  { label: 'Ride platforms, one account', val: '3 in 1', Icon: LuZap },
  { label: 'Path to owning your car', val: 'Built in', Icon: LuShieldCheck },
]

export default function DriversProblemSection() {
  return (
    <section className="bg-[#FAF8F6] font-Quicksand dark:bg-night py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div
          className={`relative rounded-[32px] bg-[#F6EEDD] p-6 sm:p-10 md:p-12 ${outline} shadow-[8px_8px_0_#111] dark:bg-[#141A2B] dark:shadow-[8px_8px_0_#fff]`}
        >
          <div className="max-w-3xl">
            <p className={`flex w-fit items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm text-slate-700 dark:bg-white/10 dark:text-slate-200 ${outline}`}>
              <GiBrain size={14} aria-hidden="true" className="shrink-0 text-emerald-600 dark:text-emerald-400" />
              The E-Hailing Driver Reality in Africa
            </p>

            <h2 className="mt-6 text-3xl font-bold !leading-[1.1] tracking-tight text-[#111] dark:text-white sm:text-4xl md:text-[2.75rem]">
              You do the driving all day, but fuel and car rent keep{' '}
              <span className="mt-2 block">
                taking{' '}
                <span className={`inline-block -rotate-2 rounded-full bg-[#EF6702] px-3.5 py-0.5 text-white md:px-4 ${outline}`}>
                  your profit
                </span>
                .
              </span>
            </h2>

            <p className="mt-4 text-base text-slate-700 dark:text-slate-300 md:text-lg">
              Between rising fuel prices, daily vehicle rent, and sudden breakdowns, most drivers end the week with far less than they earned. Lyncs is built to flip that, so your hours on the road finally work for you.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`rounded-2xl bg-white/70 p-6 sm:p-8 ${outline} dark:bg-white/5`}>
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/15 text-red-600">
                  <IoCloseCircleOutline size={20} />
                </span>
                <h3 className="text-xl font-bold text-[#111] dark:text-white">
                  The Everyday Driver Grind
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
