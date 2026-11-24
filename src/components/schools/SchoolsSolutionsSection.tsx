'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { GiBrain } from 'react-icons/gi'
import { GoArrowUpRight } from 'react-icons/go'
import {
  LuBus,
  LuMapPin,
  LuWrench,
  LuCheck,
  LuCalculator,
} from 'react-icons/lu'

const outline = 'border-2 border-[#111]'

const FUEL_PER_BUS = 220000 // est. monthly diesel/fuel per bus

const PILLARS = [
  {
    id: 'fleet',
    title: 'Managed School Shuttle Fleet',
    badge: 'Buses & Drivers Included',
    tagColor: 'bg-[#E3ECFA] text-blue-900',
    icon: LuBus,
    href: '/platform/buses',
    ctaText: 'See bus platform',
    desc: 'Skip the cost and stress of owning buses and employing drivers. Lyncs provides a ready fleet with vetted drivers mapped to your school routes.',
    perks: [
      'Right-sized buses for your pickup zones and student numbers',
      'Vetted, background-checked and trained drivers on every route',
      'Optional electric buses to cut fuel and maintenance costs',
      'Scale routes up or down each term with no idle vehicles',
    ],
  },
  {
    id: 'tracking',
    title: 'Live Tracking for Parents & Admins',
    badge: 'Real-Time Visibility',
    tagColor: 'bg-[#E6F0DC] text-emerald-900',
    icon: LuMapPin,
    href: '/book-demo',
    ctaText: 'Book a demo',
    desc: 'Give parents calm and administrators control. Everyone sees the bus location and pickup or drop-off status in real time.',
    perks: [
      'Automatic pickup and drop-off alerts to parents',
      'Live map of every bus for your transport administrator',
      'Daily trip logs with driver, route and attendance records',
      'Incident and delay notifications the moment they happen',
    ],
  },
  {
    id: 'maintenance',
    title: '24/7 Maintenance & Emergency Tow',
    badge: '15-Min Rapid Dispatch',
    tagColor: 'bg-[#ECE8F1] text-purple-900',
    icon: LuWrench,
    href: '/platform/mechanic',
    ctaText: 'See support',
    desc: 'A broken-down bus should never leave students waiting. Vetted mechanics and flatbed tow trucks are dispatched fast so routes keep running.',
    perks: [
      'Scheduled servicing keeps the fleet road-ready and safe',
      'Live GPS dispatch for mechanics and recovery trucks',
      'Rapid replacement so no route is cancelled mid-day',
      'Coverage across Lagos Mainland, Island, Lekki-Epe and expressways',
    ],
  },
]

export default function SchoolsSolutionsSection() {
  const [activePillar, setActivePillar] = useState(0)
  const [busCount, setBusCount] = useState(6)

  const monthlyFuel = busCount * FUEL_PER_BUS
  const monthlyEv = Math.round(monthlyFuel * 0.3)
  const monthlySaved = monthlyFuel - monthlyEv
  const annualSaved = monthlySaved * 12

  return (
    <section id="solutions" className="bg-white font-Quicksand dark:bg-night py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="max-w-3xl">
          <p className="flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-surface px-3 py-1.5 text-sm text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
            <GiBrain size={14} aria-hidden="true" className="shrink-0 text-emerald-600 dark:text-emerald-400" />
            Built For Schools & Education Groups
          </p>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-primary dark:text-white sm:text-4xl md:text-5xl">
            Everything you need to move students safely.{' '}
            <span className="text-accent">Fully managed.</span>
          </h2>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-300 md:text-lg">
            Whether you want to outsource your whole fleet, give parents live tracking, or keep buses running without downtime—we built Lyncs for schools.
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
                    Tailored to your routes
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
                  Fleet Fuel Savings Calculator
                </span>
                <h3 className="mt-4 text-2xl sm:text-3xl font-bold text-primary dark:text-white">
                  See what your school saves by running electric buses
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  Slide to select how many buses your routes need.
                </p>

                <div className="mt-8 space-y-2">
                  <div className="flex justify-between text-sm font-bold text-primary dark:text-white">
                    <span>Buses In Your Fleet:</span>
                    <span className="text-accent text-base">{busCount} {busCount === 1 ? 'bus' : 'buses'}</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={30}
                    step={1}
                    value={busCount}
                    onChange={(e) => setBusCount(Number(e.target.value))}
                    className="w-full h-2.5 bg-slate-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#EF6702]"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>1 bus</span>
                    <span>15 buses</span>
                    <span>30 buses</span>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className={`rounded-xl bg-white/80 p-4 ${outline} dark:bg-slate-900`}>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Current Monthly Fuel Cost</p>
                    <p className="mt-1 text-xl font-bold text-red-500">
                      ₦{monthlyFuel.toLocaleString()}
                    </p>
                  </div>
                  <div className={`rounded-xl bg-white/80 p-4 ${outline} dark:bg-slate-900`}>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Equivalent Electric Running Cost</p>
                    <p className="mt-1 text-xl font-bold text-emerald-600 dark:text-emerald-400">
                      ₦{monthlyEv.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className={`rounded-2xl bg-white p-6 sm:p-8 ${outline} dark:bg-slate-900 shadow-[6px_6px_0_#111]`}>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Estimated Monthly Savings
                  </p>
                  <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-[#EF6702] tracking-tight">
                    ₦{monthlySaved.toLocaleString()}
                    <span className="text-sm font-medium text-slate-500"> / month</span>
                  </p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    (~₦{annualSaved.toLocaleString()} saved across the school year)
                  </p>

                  <div className="mt-6 border-t border-slate-100 dark:border-white/10 pt-4 space-y-3 text-xs sm:text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Fuel Bill Reduction:</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">~70% savings</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Driver Management:</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">Handled by Lyncs</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Transport Billing:</span>
                      <span className="font-bold text-primary dark:text-white">One invoice</span>
                    </div>
                  </div>

                  <Link
                    href="/book-demo"
                    className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded bg-accent px-6 py-3 text-sm font-bold text-white transition hover:bg-opacity-90 dark:bg-white dark:text-primary"
                  >
                    Book a school demo
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
