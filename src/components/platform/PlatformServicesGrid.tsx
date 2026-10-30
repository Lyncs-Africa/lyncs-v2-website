'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
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
} from 'react-icons/lu'
import { PLATFORM_SERVICES } from '../../data/platformServices'

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

export default function PlatformServicesGrid() {
  const servicesList = Object.values(PLATFORM_SERVICES)

  return (
    <section id="platform-services" className="bg-white font-Quicksand dark:bg-night py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="max-w-3xl">
          <p className="flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-surface px-3 py-1.5 text-sm text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
            <GiBrain size={14} aria-hidden="true" className="shrink-0 text-emerald-600 dark:text-emerald-400" />
            The 8 Pillars of Lyncs
          </p>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-primary dark:text-white sm:text-4xl md:text-5xl">
            Pick a service or connect all eight.{' '}
            <span className="text-accent">Total flexibility.</span>
          </h2>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-300 md:text-lg">
            Every service plugs into your central corporate balance, employee policy engine, and consolidated tax invoicing. Click on any rail below for full technical details.
          </p>
        </div>

        {/* 8 Services Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesList.map((service, index) => {
            const Icon = ICON_MAP[service.iconName] || LuCar
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`group flex flex-col justify-between rounded-2xl bg-white p-6 ${outline} shadow-[6px_6px_0_#111] dark:bg-[#141A2B] dark:shadow-[6px_6px_0_#fff] hover:-translate-y-1 transition-transform duration-200`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl ${service.color} ${outline} text-[#111]`}
                    >
                      <Icon size={24} />
                    </span>
                    <span className="text-xs font-bold text-slate-400">
                      0{index + 1}
                    </span>
                  </div>

                  <span
                    className={`mt-4 inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold ${service.color} text-[#111] ${outline}`}
                  >
                    {service.badge}
                  </span>

                  <h3 className="mt-3 text-xl font-bold text-primary dark:text-white group-hover:text-accent transition-colors">
                    {service.shortTitle}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {service.tagline}
                  </p>

                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/10 space-y-2">
                    {service.capabilities.slice(0, 2).map((cap, cIdx) => (
                      <div key={cIdx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                        <LuCheck size={14} className="shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                        <span className="line-clamp-1">{cap.title}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/10">
                  <Link
                    href={`/platform/${service.slug}`}
                    className="inline-flex w-full items-center justify-between rounded-xl bg-slate-50 px-4 py-2.5 text-xs font-bold text-primary transition group-hover:bg-accent group-hover:text-white dark:bg-white/5 dark:text-white dark:group-hover:bg-accent"
                  >
                    <span>View {service.label}</span>
                    <GoArrowUpRight size={16} />
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
