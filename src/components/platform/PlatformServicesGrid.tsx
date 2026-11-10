'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { GiBrain } from 'react-icons/gi'
import { GoArrowUpRight } from 'react-icons/go'
import {
  LuCar,
  LuBus,
  LuPlane,
  LuWallet,
  LuKey,
  LuTruck,
  LuFuel,
  LuWrench,
  LuCheck,
  LuLayers,
} from 'react-icons/lu'
import { PLATFORM_SERVICES } from '../../data/platformServices'
import ServiceMicroAnimation from './ServiceMicroAnimations'

const outline = 'border-2 border-[#111]'

const ICON_MAP: Record<string, any> = {
  LuCar,
  LuBus,
  LuPlane,
  LuWallet,
  LuKey,
  LuTruck,
  LuFuel,
  LuWrench,
}

const CATEGORIES = [
  { id: 'all', label: 'All 7 Mobility Rails', slugs: null },
  { id: 'commute', label: 'Daily Commute & Wallets', slugs: ['rides', 'buses', 'ride-wallets'] },
  { id: 'executive', label: 'Flights & Executive Cars', slugs: ['flights', 'car-rentals'] },
  { id: 'fleet', label: 'Towing & Mechanic', slugs: ['car-tow', 'mechanic'] },
]

export default function PlatformServicesGrid() {
  const [activeCategory, setActiveCategory] = useState('all')
  const allServices = Object.values(PLATFORM_SERVICES)

  const currentTab = CATEGORIES.find((c) => c.id === activeCategory) || CATEGORIES[0]
  const displayedServices = currentTab.slugs
    ? allServices.filter((s) => currentTab.slugs!.includes(s.slug))
    : allServices

  return (
    <section id="platform-services" className="bg-white font-Quicksand dark:bg-night py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section Header + Filter Bar */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-surface px-3 py-1.5 text-sm text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
              <GiBrain size={14} aria-hidden="true" className="shrink-0 text-emerald-600 dark:text-emerald-400" />
              The 7 Pillars of Lyncs
            </p>
            <h2 className="mt-6 text-3xl font-bold !leading-[1.1] tracking-tight text-primary dark:text-white sm:text-4xl md:text-5xl">
              Pick a single service or{' '}
              <span className={`inline-block -rotate-1 rounded-full bg-[#EF6702] px-3.5 py-0.5 text-white ${outline}`}>
                plug in all seven.
              </span>
            </h2>
            <p className="mt-4 text-base text-slate-600 dark:text-slate-300 md:text-lg">
              Every module runs on your central NGN corporate treasury, automated policy engine, and single monthly tax invoice. Watch how each rail works below:
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const active = activeCategory === cat.id
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`rounded-full px-4 py-2 text-xs sm:text-sm font-bold transition-all ${outline} ${active
                    ? 'bg-[#111] text-white shadow-[3px_3px_0_#EF6702] dark:bg-white dark:text-[#111]'
                    : 'bg-[#FAF8F6] text-primary hover:bg-slate-100 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10'
                    }`}
                >
                  {cat.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* 8 Interactive Animated Service Cards (2-Column Bento Grid) */}
        <motion.div layout className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {displayedServices.map((service) => {
              const Icon = ICON_MAP[service.iconName] || LuCar
              const railIndex = allServices.findIndex((s) => s.slug === service.slug) + 1
              const primaryStat = service.stats[0]

              return (
                <motion.article
                  layout
                  id={`rail-${service.slug}`}
                  key={service.slug}
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  className={`group flex flex-col justify-between overflow-hidden rounded-[28px] bg-[#FAF8F6] dark:bg-[#141A2B] ${outline} shadow-[8px_8px_0_#111] dark:shadow-[8px_8px_0_#fff] transition-transform duration-300 hover:-translate-y-1`}
                >
                  {/* Top Live Micro-Animation Stage */}
                  {/* <div
                    className={`relative h-[205px] w-full overflow-hidden border-b-2 border-[#111] ${service.color} dark:bg-slate-800/90`}
                  >
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 opacity-35 dark:opacity-15"
                      style={{
                        backgroundImage:
                          'radial-gradient(#111 1px, transparent 1px)',
                        backgroundSize: '16px 16px',
                      }}
                    />
                    <ServiceMicroAnimation slug={service.slug} />
                  </div> */}

                  {/* Card Body */}
                  <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
                    <div>
                      {/* Top Meta Row: Icon + Rail Number + Key Metric */}
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <span
                            className={`flex h-11 w-11 items-center justify-center rounded-xl ${service.color} ${outline} text-[#111] shadow-[2px_2px_0_#111]`}
                          >
                            <Icon size={22} />
                          </span>
                          <div>
                            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-400">
                              Rail 0{railIndex} • {service.badge}
                            </span>
                            <h3 className="text-2xl font-bold tracking-tight text-primary dark:text-white group-hover:text-accent transition-colors">
                              {service.shortTitle}
                            </h3>
                          </div>
                        </div>

                        {/* {primaryStat && (
                          <div className={`rounded-xl bg-white px-3 py-1.5 text-right dark:bg-slate-900 ${outline}`}>
                            <p className="text-sm font-extrabold leading-none text-emerald-600 dark:text-emerald-400">
                              {primaryStat.val}
                            </p>
                            <p className="mt-0.5 text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                              {primaryStat.label}
                            </p>
                          </div>
                        )} */}
                      </div>

                      {/* Tagline */}
                      <p className="mt-4 text-sm sm:text-[15px] text-slate-600 dark:text-slate-300 leading-relaxed">
                        {service.tagline}
                      </p>

                      {/* Connected Providers as Mini Plugs */}
                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        {service.providers.map((p) => (
                          <span
                            key={p.name}
                            className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-xs font-bold text-primary dark:border-white/15 dark:bg-white/5 dark:text-slate-200"
                          >
                            <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
                            {p.name}
                            <span className="ml-1.5 text-[10px] font-normal text-slate-400">
                              • {p.tag}
                            </span>
                          </span>
                        ))}
                      </div>

                      {/* 4 Capabilities Mini-Grid */}
                      <div className="mt-5 grid grid-cols-1 gap-2.5 border-t border-slate-200/80 pt-5 sm:grid-cols-2 dark:border-white/10">
                        {service.capabilities.map((cap, cIdx) => (
                          <div
                            key={cIdx}
                            className="flex items-start gap-2 text-xs font-medium text-slate-700 dark:text-slate-300"
                          >
                            <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                              <LuCheck size={11} />
                            </span>
                            <span>{cap.title}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Footer */}
                    <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200/80 pt-5 dark:border-white/10">
                      <Link
                        href={`/platform/${service.slug}`}
                        className={`inline-flex flex-1 items-center justify-between rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#111] transition group-hover:bg-[#EF6702] group-hover:text-white dark:bg-slate-900 dark:text-white dark:group-hover:bg-[#EF6702] ${outline}`}
                      >
                        <span>Explore {service.label} Module</span>
                        <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[#111] bg-[#FAF8F6] text-[#111] transition group-hover:rotate-45">
                          <GoArrowUpRight size={14} />
                        </span>
                      </Link>
                      <Link
                        href="/contact"
                        className="rounded-xl px-4 py-3 text-xs font-bold text-slate-600 transition hover:text-accent dark:text-slate-300 dark:hover:text-white"
                      >
                        Book live demo →
                      </Link>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
