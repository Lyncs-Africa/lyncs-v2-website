'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GiBrain } from 'react-icons/gi'
import { GoArrowUpRight } from 'react-icons/go'
import { LuMapPin, LuBriefcase, LuClock, LuCheck } from 'react-icons/lu'

const outline = 'border-2 border-[#111]'

const DEPARTMENTS = ['All', 'Engineering', 'Operations', 'Growth & Sales']

const ROLES = [
  {
    id: 'fullstack',
    title: 'Senior Full-Stack Engineer',
    dept: 'Engineering',
    location: 'Victoria Island, Lagos (Hybrid)',
    type: 'Full-time',
    salary: 'Competitive + Equity',
    stack: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'Tailwind'],
    summary:
      'Own the architecture of our corporate mobility operating system, multi-tenant billing pipelines, and real-time fleet dispatch dashboard.',
  },
  {
    id: 'mobile',
    title: 'Senior Mobile Engineer (React Native)',
    dept: 'Engineering',
    location: 'Lagos / Remote (Africa)',
    type: 'Full-time',
    salary: 'Competitive + Equity',
    stack: ['React Native', 'TypeScript', 'Offline Sync', 'Live Tracking'],
    summary:
      'Build the passenger and company wallet mobile experience used by thousands of staff members moving across Lagos daily.',
  },
  {
    id: 'ev-ops',
    title: 'EV Fleet & Charging Infrastructure Lead',
    dept: 'Operations',
    location: 'Victoria Island, Lagos',
    type: 'Full-time',
    salary: 'Competitive + Bonus',
    stack: ['Fleet Management', 'EV Chargers', 'Vehicle Logistics', 'P&L'],
    summary:
      'Lead our electric vehicle swap rollout. Manage charging partner networks, mobile repair squads, and commercial fleet uptime.',
  },
  {
    id: 'sales-lead',
    title: 'Enterprise Mobility Account Director',
    dept: 'Growth & Sales',
    location: 'Lagos, Nigeria (Hybrid)',
    type: 'Full-time',
    salary: 'Competitive + Commission',
    stack: ['B2B Enterprise', 'Fintech / Telecoms', 'C-Level Pitching'],
    summary:
      'Close enterprise mobility contracts with top-tier African banks, multinationals, and tech firms looking to streamline commute operations.',
  },
  {
    id: 'dispatch-ops',
    title: 'Corporate Dispatch & Customer Success Lead',
    dept: 'Operations',
    location: 'Lagos HQ',
    type: 'Full-time',
    salary: 'Competitive',
    stack: ['Live Dispatch', 'VIP Protocols', 'Client Happiness'],
    summary:
      'Manage high-priority corporate flight connections, executive shuttles, and resolve ride issues in real time with our transport partners.',
  },
]

export default function CareersRolesSection() {
  const [selectedDept, setSelectedDept] = useState('All')
  const [selectedRole, setSelectedRole] = useState<string | null>(null)

  const filteredRoles =
    selectedDept === 'All' ? ROLES : ROLES.filter((r) => r.dept === selectedDept)

  return (
    <section id="open-roles" className="bg-[#FAF8F6] font-Quicksand dark:bg-night py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        {/* Main Neo-brutalist Container */}
        <div
          className={`relative rounded-[32px] bg-[#F6EEDD] p-6 sm:p-10 md:p-12 ${outline} shadow-[8px_8px_0_#111] dark:bg-[#141A2B] dark:shadow-[8px_8px_0_#fff]`}
        >
          <div className="max-w-3xl">
            <p className={`flex w-fit items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm text-slate-700 dark:bg-white/10 dark:text-slate-200 ${outline}`}>
              <GiBrain size={14} aria-hidden="true" className="shrink-0 text-emerald-600 dark:text-emerald-400" />
              What positions are currently open right now?
            </p>

            <h2 className="mt-6 text-3xl font-bold !leading-[1.1] tracking-tight text-[#111] dark:text-white sm:text-4xl md:text-[2.75rem]">
              Open roles for builders who like{' '}
              <span className={`inline-block -rotate-2 rounded-full bg-[#EF6702] px-3.5 py-0.5 text-white md:px-4 ${outline}`}>
                shipping fast
              </span>
              .
            </h2>

            <p className="mt-4 text-base text-slate-700 dark:text-slate-300 md:text-lg">
              We look for craft, curiosity, and high agency. Select a department to explore our active openings.
            </p>
          </div>

          {/* Department Filter Pills */}
          <div className="mt-8 flex flex-wrap gap-2.5">
            {DEPARTMENTS.map((dept) => {
              const active = selectedDept === dept
              return (
                <button
                  key={dept}
                  type="button"
                  onClick={() => setSelectedDept(dept)}
                  className={`rounded-lg px-4 py-2 text-xs font-bold transition cursor-pointer ${outline} ${
                    active
                      ? 'bg-[#111] text-white dark:bg-white dark:text-[#111]'
                      : 'bg-white text-slate-700 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-300'
                  }`}
                >
                  {dept}
                </button>
              )
            })}
          </div>

          {/* Roles Listing (Flat cards, NO blurry shadows) */}
          <div className="mt-8 space-y-4">
            {filteredRoles.map((role) => (
              <div
                key={role.id}
                className={`rounded-2xl bg-white p-6 transition ${outline} dark:bg-slate-900`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="rounded-md bg-accent/15 px-2.5 py-0.5 text-[11px] font-bold text-accent">
                        {role.dept}
                      </span>
                      <span className="text-xs text-slate-400 dark:text-slate-500">•</span>
                      <span className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400">
                        <LuMapPin size={13} />
                        {role.location}
                      </span>
                      <span className="text-xs text-slate-400 dark:text-slate-500">•</span>
                      <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                        {role.salary}
                      </span>
                    </div>

                    <h3 className="mt-2 text-xl font-bold text-[#111] dark:text-white">
                      {role.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
                      {role.summary}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {role.stack.map((item) => (
                        <span
                          key={item}
                          className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600 dark:bg-white/5 dark:text-slate-300"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <a
                    href={`mailto:careers@lyncs.africa?subject=Application%20for%20${encodeURIComponent(
                      role.title
                    )}&body=Hi%20Lyncs%20Team%2C%0A%0AI'm%20interested%20in%20the%20${encodeURIComponent(
                      role.title
                    )}%20role.%0A%0ALink%20to%20my%20LinkedIn%20or%20Portfolio%3A%0A%0ABrief%20note%20about%20myself%3A`}
                    className={`group inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-[#111] py-2.5 pl-5 pr-2.5 text-[13px] font-bold text-white transition hover:bg-primary sm:self-center dark:bg-white dark:text-[#111] dark:hover:bg-slate-200 ${outline}`}
                  >
                    Apply Now
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#EF6702] text-white transition group-hover:rotate-45">
                      <GoArrowUpRight size={14} aria-hidden="true" />
                    </span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Don't see your role? */}
          <div className={`mt-8 flex flex-col gap-4 rounded-2xl bg-white p-5 sm:flex-row sm:items-center sm:justify-between ${outline} dark:bg-white/5`}>
            <div>
              <h4 className="text-base font-bold text-[#111] dark:text-white">
                Don’t see your exact role listed?
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                We always create roles for exceptional builders, fleet operators, and designers. Send a cold note directly to our founders.
              </p>
            </div>
            <a
              href="mailto:careers@lyncs.africa?subject=General%20Application%20-%20Exceptional%20Builder"
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-5 py-2 text-xs font-bold text-primary hover:bg-slate-50 dark:text-white dark:hover:bg-white/5 ${outline}`}
            >
              <span>Email founders</span>
              <GoArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
