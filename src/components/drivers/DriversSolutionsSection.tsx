'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { GiBrain } from 'react-icons/gi'
import { GoArrowUpRight } from 'react-icons/go'
import {
  LuZap,
  LuCar,
  LuWrench,
  LuCheck,
  LuCalculator,
} from 'react-icons/lu'

const outline = 'border-2 border-[#111]'

const PILLARS = [
  {
    id: 'rent-to-own',
    title: 'Rent-to-Own an Electric Vehicle',
    badge: 'Drive It, Then Own It',
    tagColor: 'bg-[#E3ECFA] text-blue-900',
    icon: LuZap,
    href: '/swap',
    ctaText: 'Start rent-to-own',
    desc: 'Stop paying daily rent on a car that will never be yours. Drive a modern EV where every weekly payment moves you towards full ownership.',
    perks: [
      'Flexible weekly payments that build real equity in your own vehicle',
      'Up to 80% lower running costs: charge at home or partner hubs instead of fuelling',
      'Maintenance is far cheaper: no engine oil, spark plugs or timing belts',
      '8-year battery warranty and bumper-to-bumper vehicle support included',
    ],
  },
  {
    id: 'multi-platform',
    title: 'Earn Across Every Ride Platform',
    badge: 'Bolt • Uber • LagRide',
    tagColor: 'bg-[#E6F0DC] text-emerald-900',
    icon: LuCar,
    href: '/platform/rides',
    ctaText: 'See ride platform',
    desc: 'Why depend on one app? Take trips across the major ride platforms from a single Lyncs account and keep your wheels turning all day.',
    perks: [
      'One driver profile and wallet across multiple ride-hailing platforms',
      'Fewer idle hours: pick up trips wherever demand is highest',
      'Consolidated earnings you can withdraw without chasing failed transfers',
      'Clear trip history and weekly performance analytics',
    ],
  },
  {
    id: 'rescue',
    title: '24/7 Mechanic & Emergency Tow',
    badge: '15-Min Rapid Dispatch',
    tagColor: 'bg-[#ECE8F1] text-purple-900',
    icon: LuWrench,
    href: '/platform/mechanic',
    ctaText: 'Request roadside support',
    desc: 'A breakdown should not cost you a full day of income. Dispatch vetted mobile mechanics and flatbed tow trucks straight to your location.',
    perks: [
      'Live GPS dispatch tracking: see your mechanic or tow truck on the way',
      'Fixed, transparent pricing with no roadside haggling',
      'Vetted technicians with genuine parts and diagnostic tools',
      'Coverage across Lagos Mainland, Island, Lekki-Epe and expressways',
    ],
  },
]

export default function DriversSolutionsSection() {
  const [activePillar, setActivePillar] = useState(0)
  const [weeklyFuelSpend, setWeeklyFuelSpend] = useState(45000)

  const monthlyPetrolSpend = Math.round(weeklyFuelSpend * 4.33)
  const monthlyEvCost = Math.round(monthlyPetrolSpend * 0.2)
  const monthlySaved = monthlyPetrolSpend - monthlyEvCost
  const annualSaved = monthlySaved * 12

  return (
    <section id="solutions" className="bg-white font-Quicksand dark:bg-night py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="max-w-3xl">
          <p className="flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-surface px-3 py-1.5 text-sm text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
            <GiBrain size={14} aria-hidden="true" className="shrink-0 text-emerald-600 dark:text-emerald-400" />
            Built For E-Hailing & Commercial Drivers
          </p>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-primary dark:text-white sm:text-4xl md:text-5xl">
            Everything you need to earn more and own your ride.{' '}
            <span className="text-accent">No endless rent.</span>
          </h2>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-300 md:text-lg">
            Whether you want to swap petrol costs for cheap charging, take trips across every platform, or get instant roadside rescue when your car breaks down—we built Lyncs for drivers.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="space-y-3 lg:col-span-5">
            {PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon
              const isSelected = activePillar === idx
              return (
                <button
                  key={pillar.id}
                  onClick={() => setActivePillar(idx)}
                  className={`w-full text-left p-5 rounded-2xl transition-all duration-200 ${outline} ${
                    isSelected
                      ? 'bg-[#1A2747] text-white shadow-[6px_6px_0_#EF6702] dark:bg-slate-800 dark:shadow-[6px_6px_0_#fff]'
                      : 'bg-white hover:bg-slate-50 text-slate-800 dark:bg-[#141A2B] dark:text-slate-200 dark:hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                          isSelected
                            ? 'bg-accent/20 text-accent'
                            : 'bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-300'
                        }`}
                      >
                        <Icon size={20} />
                      </span>
                      <div>
                        <h3 className="font-bold text-base leading-snug">
                          {pillar.title}
                        </h3>
                        <span
                          className={`inline-block text-[11px] font-semibold uppercase tracking-wider mt-1 ${
                            isSelected ? 'text-accent' : 'text-slate-500 dark:text-slate-400'
                          }`}
                        >
                          {pillar.badge}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePillar}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className={`h-full rounded-[28px] bg-[#FAF8F6] p-6 sm:p-8 md:p-10 ${outline} shadow-[8px_8px_0_#111] dark:bg-[#141A2B] dark:shadow-[8px_8px_0_#fff] flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-block rounded-full px-3.5 py-1 text-xs font-bold ${PILLARS[activePillar].tagColor} ${outline}`}
                    >
                      {PILLARS[activePillar].badge}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      Feature 0{activePillar + 1} of 03
                    </span>
                  </div>

                  <h3 className="mt-5 text-2xl font-bold text-primary dark:text-white sm:text-3xl">
                    {PILLARS[activePillar].title}
                  </h3>

                  <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
                    {PILLARS[activePillar].desc}
                  </p>

                  <div className="mt-6 border-t border-slate-200 dark:border-white/10 pt-6">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                      Key Highlights:
                    </p>
                    <ul className="space-y-3">
                      {PILLARS[activePillar].perks.map((perk, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 mt-0.5">
                            <LuCheck size={13} />
                          </span>
                          <span>{perk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <Link
                    href={PILLARS[activePillar].href}
                    className="inline-flex items-center gap-2 rounded bg-accent px-6 py-2.5 text-sm font-medium text-white transition hover:bg-opacity-90 dark:bg-white dark:text-primary"
                  >
                    {PILLARS[activePillar].ctaText}
                    <GoArrowUpRight size={16} />
                  </Link>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Driver onboarding is free
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-20">
          <div
            className={`rounded-[32px] bg-[#F6EEDD] p-6 sm:p-10 md:p-12 ${outline} shadow-[8px_8px_0_#111] dark:bg-[#141A2B] dark:shadow-[8px_8px_0_#fff]`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <span className={`inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-bold text-primary dark:bg-white/10 dark:text-white ${outline}`}>
                  <LuCalculator size={14} className="text-[#EF6702]" />
                  Fuel vs EV Driver Calculator
                </span>
                <h3 className="mt-4 text-2xl sm:text-3xl font-bold text-primary dark:text-white">
                  See how much extra you take home by driving an EV
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  Slide to select what you currently spend on fuel each week.
                </p>

                <div className="mt-8 space-y-2">
                  <div className="flex justify-between text-sm font-bold text-primary dark:text-white">
                    <span>Current Weekly Fuel Spend:</span>
                    <span className="text-accent text-base">₦{weeklyFuelSpend.toLocaleString()} / week</span>
                  </div>
                  <input
                    type="range"
                    min={20000}
                    max={140000}
                    step={5000}
                    value={weeklyFuelSpend}
                    onChange={(e) => setWeeklyFuelSpend(Number(e.target.value))}
                    className="w-full h-2.5 bg-slate-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#EF6702]"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>₦20,000 / week</span>
                    <span>₦80,000 / week</span>
                    <span>₦140,000 / week</span>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className={`rounded-xl bg-white/80 p-4 ${outline} dark:bg-slate-900`}>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Current Monthly Fuel Cost</p>
                    <p className="mt-1 text-xl font-bold text-red-500">
                      ₦{monthlyPetrolSpend.toLocaleString()}
                    </p>
                  </div>
                  <div className={`rounded-xl bg-white/80 p-4 ${outline} dark:bg-slate-900`}>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Equivalent EV Charging Cost</p>
                    <p className="mt-1 text-xl font-bold text-emerald-600 dark:text-emerald-400">
                      ₦{monthlyEvCost.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className={`rounded-2xl bg-white p-6 sm:p-8 ${outline} dark:bg-slate-900 shadow-[6px_6px_0_#111]`}>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Extra In Your Pocket
                  </p>
                  <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-[#EF6702] tracking-tight">
                    ₦{monthlySaved.toLocaleString()}
                    <span className="text-sm font-medium text-slate-500"> / month</span>
                  </p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    (~₦{annualSaved.toLocaleString()} more take-home each year)
                  </p>

                  <div className="mt-6 border-t border-slate-100 dark:border-white/10 pt-4 space-y-3 text-xs sm:text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Fuel Bill Reduction:</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">~80% savings</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Routine Engine Servicing:</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">₦0 (No engine oil)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Vehicle Ownership:</span>
                      <span className="font-bold text-primary dark:text-white">Rent-to-own</span>
                    </div>
                  </div>

                  <Link
                    href="/swap"
                    className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded bg-accent px-6 py-3 text-sm font-bold text-white transition hover:bg-opacity-90 dark:bg-white dark:text-primary"
                  >
                    Get an EV to drive today
                    <GoArrowUpRight size={18} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
