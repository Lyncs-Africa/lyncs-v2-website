'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { GiBrain } from 'react-icons/gi'
import { GoArrowUpRight } from 'react-icons/go'
import { IoAnalyticsSharp } from 'react-icons/io5'
import {
  LuWallet,
  LuBus,
  LuFuel,
  LuPlane,
  LuZap,
  LuBuilding2,
  LuUsers,
  LuCheck,
  LuCalculator,
} from 'react-icons/lu'

const outline = 'border-2 border-[#111]'

const PILLARS = [
  {
    id: 'wallets',
    title: 'Central Corporate Ride Wallets',
    badge: 'Bolt • Uber • LagRide',
    tagColor: 'bg-[#E6F0DC] text-emerald-900',
    icon: LuWallet,
    desc: 'Empower employees to hail rides for client visits and late-night office departures directly on company billing.',
    perks: [
      'Set automated daily, weekly, or monthly spend caps per employee or department',
      'Geofenced limits: restrict usage to specific business hubs or airport transfers',
      'Time-based rules: permit rides only after 7:00 PM or during official work hours',
      'Zero employee out-of-pocket expenses or fake expense claims',
    ],
  },
  {
    id: 'shuttles',
    title: 'Dedicated Staff Shuttles & Buses',
    badge: 'Route Mapping & Live Tracking',
    tagColor: 'bg-[#DCE5EA] text-sky-900',
    icon: LuBus,
    desc: 'Optimize employee commute routes across Lagos, Abuja, and Port Harcourt with comfortable, reliable executive shuttles.',
    perks: [
      'Custom route mapping based on employee residential clusters',
      'Live bus tracking and passenger check-in QR codes',
      'Guaranteed on-time arrivals to beat peak-hour traffic bottlenecks',
      'Vetted, insured commercial drivers with 100% background checks',
    ],
  },
  {
    id: 'fuel',
    title: 'Digital Fuel & Diesel Vouchers',
    badge: 'Instant Station QR Codes',
    tagColor: 'bg-[#F6EEDD] text-amber-900',
    icon: LuFuel,
    desc: 'Eliminate cash advances, missing fuel receipts, and generator diesel theft with pre-authorized digital station vouchers.',
    perks: [
      'Redeemable at top filling station networks across Nigeria',
      'Instant SMS and QR code validation at the pump with vehicle plate lock',
      'Real-time litre balance and station transaction timestamping',
      'Automated VAT receipts delivered directly to your finance ledger',
    ],
  },
  {
    id: 'travel',
    title: 'Corporate Flights & Travel Desk',
    badge: 'Local & Regional Bookings',
    tagColor: 'bg-[#ECE8F1] text-purple-900',
    icon: LuPlane,
    desc: 'Streamline executive travel approvals and flight reservations across domestic and African regional airlines.',
    perks: [
      'Seamless multi-tier manager approval flows before ticket issuance',
      'Consolidated corporate airline rates and flexible cancellation protection',
      'Airport pick-up and drop-off car sync directly inside the itinerary',
      'All travel itineraries centralized into 1 single corporate report',
    ],
  },
  {
    id: 'ev',
    title: 'Corporate EV Fleet Transition',
    badge: 'Cut Fuel Spend by 80%',
    tagColor: 'bg-[#E3ECFA] text-blue-900',
    icon: LuZap,
    desc: 'Swap company pool vehicles and executive cars for clean electric vehicles with full charging and repair coverage.',
    perks: [
      'Zero fuel expense: recharge at office charging points or partner hubs',
      'Substantially lower routine maintenance costs (no oil changes or spark plugs)',
      'Solar-backed depot charging installations for corporate headquarters',
      'Dedicated 24/7 mobile repair squads and emergency vehicle replacement',
    ],
  },
]

const ROLES_VALUE = [
  {
    role: 'For CFOs & Finance',
    icon: IoAnalyticsSharp,
    color: 'bg-[#E6F0DC]',
    highlights: [
      '1 consolidated, audit-ready monthly tax invoice',
      'Direct ERP & accounting software CSV export (SAP, QuickBooks, Zoho)',
      'Estimated 35% reduction in overall transport and fuel expenditure',
      'Zero cash leakage and 100% audit compliance',
    ],
  },
  {
    role: 'For HR & People Ops',
    icon: LuUsers,
    color: 'bg-[#ECE8F1]',
    highlights: [
      'Bulk employee onboarding via spreadsheet or HRIS integration',
      'Massive boost in employee morale with stress-free commute options',
      'Zero time wasted reviewing petty cash claims or paper receipts',
      'Custom travel allowances matched to staff grades and seniority',
    ],
  },
  {
    role: 'For Operations & Facility Leads',
    icon: LuBuilding2,
    color: 'bg-[#DCE5EA]',
    highlights: [
      'Real-time vehicle telemetry, driver allocation, and route optimization',
      'On-demand mechanic and flatbed tow truck dispatch across Lagos',
      'Scheduled preventive maintenance reminders and fleet health logs',
      'Dedicated 24/7 Lyncs enterprise account manager on standby',
    ],
  },
]

export default function BusinessesSolutionsSection() {
  const [activePillar, setActivePillar] = useState(0)
  const [employeeCount, setEmployeeCount] = useState(35)
  const [spendPerEmployee, setSpendPerEmployee] = useState(65000)

  // Calculations for savings
  const totalMonthlySpend = employeeCount * spendPerEmployee
  const estimatedSavingsMonthly = Math.round(totalMonthlySpend * 0.35)
  const estimatedHoursSaved = Math.round(employeeCount * 1.8)

  return (
    <section id="solutions" className="bg-white font-Quicksand dark:bg-night py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="max-w-3xl">
          <p className="flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-surface px-3 py-1.5 text-sm text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
            <GiBrain size={14} aria-hidden="true" className="shrink-0 text-emerald-600 dark:text-emerald-400" />
            Complete Enterprise Mobility Suite
          </p>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-primary dark:text-white sm:text-4xl md:text-5xl">
            Everything your company needs to move.{' '}
            <span className="text-accent">Under one roof.</span>
          </h2>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-300 md:text-lg">
            Whether your team needs daily island-mainland shuttles, airport protocol transfers, or digital fuel codes for marketing reps—Lyncs connects it all.
          </p>
        </div>

        {/* Pillars Interactive Display */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Navigation List */}
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

          {/* Active Feature Detail Card */}
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
                      Feature 0{activePillar + 1} of 05
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
                      Enterprise Capabilities:
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
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded bg-accent px-6 py-2.5 text-sm font-medium text-white transition hover:bg-opacity-90 dark:bg-white dark:text-primary"
                  >
                    Set this up for your team
                    <GoArrowUpRight size={16} />
                  </Link>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Configurable in under 24 hours
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Stakeholder Value Cards */}
        <div className="mt-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-primary dark:text-white">
              Built for every decision-maker on your team
            </h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Lyncs aligns finance, human resources, and operations into one frictionless workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ROLES_VALUE.map((item, idx) => {
              const Icon = item.icon
              return (
                <div
                  key={idx}
                  className={`rounded-2xl bg-white p-6 sm:p-7 ${outline} dark:bg-[#141A2B] shadow-[6px_6px_0_#111] dark:shadow-[6px_6px_0_#fff]`}
                >
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.color} ${outline} text-[#111]`}>
                    <Icon size={24} />
                  </div>
                  <h4 className="mt-5 text-xl font-bold text-primary dark:text-white">
                    {item.role}
                  </h4>
                  <ul className="mt-4 space-y-2.5">
                    {item.highlights.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>

        {/* Interactive Corporate Savings Calculator */}
        <div className="mt-20">
          <div
            className={`rounded-[32px] bg-[#F6EEDD] p-6 sm:p-10 md:p-12 ${outline} shadow-[8px_8px_0_#111] dark:bg-[#141A2B] dark:shadow-[8px_8px_0_#fff]`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left: Sliders */}
              <div className="lg:col-span-7">
                <span className={`inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-bold text-primary dark:bg-white/10 dark:text-white ${outline}`}>
                  <LuCalculator size={14} className="text-[#EF6702]" />
                  Corporate ROI Estimator
                </span>
                <h3 className="mt-4 text-2xl sm:text-3xl font-bold text-primary dark:text-white">
                  See how much your organization saves with Lyncs
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  Slide to adjust your company size and average monthly mobility budget per employee.
                </p>

                {/* Slider 1: Employees */}
                <div className="mt-8 space-y-2">
                  <div className="flex justify-between text-sm font-bold text-primary dark:text-white">
                    <span>Active Employees on Mobility:</span>
                    <span className="text-accent text-base">{employeeCount} team members</span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={300}
                    step={5}
                    value={employeeCount}
                    onChange={(e) => setEmployeeCount(Number(e.target.value))}
                    className="w-full h-2.5 bg-slate-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#EF6702]"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>5 staff</span>
                    <span>150 staff</span>
                    <span>300+ staff</span>
                  </div>
                </div>

                {/* Slider 2: Average Monthly Spend per employee */}
                <div className="mt-6 space-y-2">
                  <div className="flex justify-between text-sm font-bold text-primary dark:text-white">
                    <span>Avg Monthly Transport / Fuel Spend per Staff:</span>
                    <span className="text-accent text-base">₦{spendPerEmployee.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min={20000}
                    max={200000}
                    step={5000}
                    value={spendPerEmployee}
                    onChange={(e) => setSpendPerEmployee(Number(e.target.value))}
                    className="w-full h-2.5 bg-slate-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#EF6702]"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>₦20,000 / mo</span>
                    <span>₦100,000 / mo</span>
                    <span>₦200,000 / mo</span>
                  </div>
                </div>
              </div>

              {/* Right: Estimated Result Box */}
              <div className="lg:col-span-5">
                <div className={`rounded-2xl bg-white p-6 sm:p-8 ${outline} dark:bg-slate-900 shadow-[6px_6px_0_#111]`}>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Estimated Monthly Savings
                  </p>
                  <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-[#EF6702] tracking-tight">
                    ₦{estimatedSavingsMonthly.toLocaleString()}
                    <span className="text-sm font-medium text-slate-500"> / month</span>
                  </p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    (~₦{(estimatedSavingsMonthly * 12).toLocaleString()} saved annually)
                  </p>

                  <div className="mt-6 border-t border-slate-100 dark:border-white/10 pt-4 space-y-3 text-xs sm:text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Current Monthly Spend:</span>
                      <span className="font-bold text-primary dark:text-white">₦{totalMonthlySpend.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Finance Hours Saved:</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">~{estimatedHoursSaved} hrs/mo</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Manual Claim Receipts:</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">Zero (100% digital)</span>
                    </div>
                  </div>

                  <Link
                    href="/contact"
                    className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded bg-accent px-6 py-3 text-sm font-bold text-white transition hover:bg-opacity-90 dark:bg-white dark:text-primary"
                  >
                    Claim your demo & proposal
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
