'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { GiBrain } from 'react-icons/gi'
import { GoArrowUpRight } from 'react-icons/go'
import { LuWallet, LuShieldCheck, LuReceipt, LuHeadphones, LuCheck } from 'react-icons/lu'

const outline = 'border-2 border-[#111]'

const FOUNDATIONS = [
  {
    title: '1 Central Corporate Treasury',
    desc: 'Fund one central balance via bank transfer or credit terms. All 8 rails draw from this single master treasury.',
    icon: LuWallet,
    color: 'bg-[#E6F0DC]',
    perks: ['Dedicated NGN corporate treasury balance', 'Automated low-balance alerts & top-ups', 'Zero cash disbursements to staff'],
  },
  {
    title: 'Automated Policy Engine',
    desc: 'Configure geofences, curfew hours, and monthly allowance limits across business units with hard-cap protection.',
    icon: LuShieldCheck,
    color: 'bg-[#ECE8F1]',
    perks: ['Time-locked travel hours', 'Approved geographic zones & routes', 'Zero unauthorized personal trips'],
  },
  {
    title: '1 Consolidated Tax Invoice',
    desc: 'At month-end, finance gets one single audit-ready invoice covering rides, buses, fuel, and flights with line-by-line VAT.',
    icon: LuReceipt,
    color: 'bg-[#F6EEDD]',
    perks: ['One bill replaces 400 expense claims', 'Direct CSV export to QuickBooks, SAP, Zoho', '100% compliant with FIRS & tax audits'],
  },
  {
    title: '24/7 Lagos Command Center',
    desc: 'Our dedicated operations and fleet dispatch desk in Victoria Island resolves bottlenecks and emergencies in real time.',
    icon: LuHeadphones,
    color: 'bg-[#DCE5EA]',
    perks: ['Dedicated enterprise account manager', '15-min average emergency recovery dispatch', 'Direct priority WhatsApp line for HR & admins'],
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.1 },
  }),
}

export default function PlatformIntegrationShowcase() {
  return (
    <section className="bg-[#FAF8F6] font-Quicksand dark:bg-night py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        {/* Main Neo-brutalist Container */}
        <div
          className={`rounded-[32px] bg-[#F6EEDD] p-6 sm:p-10 md:p-12 ${outline} shadow-[8px_8px_0_#111] dark:bg-[#141A2B] dark:shadow-[8px_8px_0_#fff]`}
        >
          <div className="max-w-3xl">
            <p className={`flex w-fit items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm text-slate-700 dark:bg-white/10 dark:text-slate-200 ${outline}`}>
              <GiBrain size={14} aria-hidden="true" className="shrink-0 text-emerald-600 dark:text-emerald-400" />
              The Architecture Behind The Platform
            </p>

            <h2 className="mt-6 text-3xl font-bold !leading-[1.1] tracking-tight text-[#111] dark:text-white sm:text-4xl md:text-[2.75rem]">
              How 8 different mobility services become{' '}
              <span className="mt-2 block">
                one seamless{' '}
                <span className={`inline-block -rotate-2 rounded-full bg-[#EF6702] px-3.5 py-0.5 text-white md:px-4 ${outline}`}>
                  operating system
                </span>
                .
              </span>
            </h2>

            <p className="mt-4 text-base text-slate-700 dark:text-slate-300 md:text-lg">
              You don&apos;t need another taxi app or standalone bus tracker. You need an operating layer that controls spend, enforces company travel policy, and reconciles every Naira automatically.
            </p>
          </div>

          {/* 4 Pillars Grid */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {FOUNDATIONS.map((item, idx) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={idx}
                  custom={idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={cardVariants}
                  className={`rounded-2xl bg-white p-6 sm:p-8 ${outline} dark:bg-slate-900 shadow-[4px_4px_0_#111] dark:shadow-[4px_4px_0_#fff]`}
                >
                  <div className="flex items-center justify-between">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.color} ${outline} text-[#111]`}>
                      <Icon size={24} />
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-extrabold text-slate-600 dark:bg-white/10 dark:text-slate-300">
                      Core Layer 0{idx + 1}
                    </span>
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-[#111] dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.desc}
                  </p>
                  <ul className="mt-4 space-y-2 border-t border-slate-100 dark:border-white/10 pt-4">
                    {item.perks.map((perk, pIdx) => (
                      <li key={pIdx} className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
                        <LuCheck size={14} className="shrink-0 text-emerald-600 dark:text-emerald-400" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </div>

          {/* Bottom Master Switch Bar (mirrors PlugInSection socket bar) */}
          <div className={`mt-8 flex flex-col gap-5 rounded-2xl bg-white p-5 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between ${outline}`}>
            <div className="flex items-center gap-4">
              <span aria-hidden className={`flex h-7 w-12 shrink-0 items-center justify-end rounded-full bg-[#EF6702] p-0.5 ${outline}`}>
                <span className="h-5 w-5 rounded-full border-2 border-[#111] bg-white" />
              </span>
              <p className="text-sm sm:text-base leading-snug text-slate-700 dark:text-slate-300">
                Activate all 8 rails on <span className="font-bold text-[#111] dark:text-white">one web command portal</span> for your admins and staff.
              </p>
            </div>
            <Link
              href="/contact"
              className="group inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-[#111] py-2.5 pl-5 pr-2.5 text-sm font-bold text-white transition hover:bg-primary sm:self-auto dark:bg-white dark:text-[#111]"
            >
              Switch it on
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#EF6702] text-white transition group-hover:rotate-45">
                <GoArrowUpRight size={16} aria-hidden="true" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
