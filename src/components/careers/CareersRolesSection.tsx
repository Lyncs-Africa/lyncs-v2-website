'use client'

import Link from 'next/link'
import { GiBrain } from 'react-icons/gi'
import { GoArrowUpRight } from 'react-icons/go'
import { LuCar, LuArrowLeftRight, LuMail } from 'react-icons/lu'

const outline = 'border-2 border-[#111]'

export default function CareersRolesSection() {
  return (
    <section id="open-roles" className="bg-[#FAF8F6] font-Quicksand dark:bg-night py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        {/* Main Neo-brutalist Container */}
        <div
          className={`relative rounded-[32px] bg-[#F6EEDD] p-6 sm:p-10 md:p-12 ${outline} shadow-[8px_8px_0_#111] dark:bg-[#141A2B] dark:shadow-[8px_8px_0_#fff]`}
        >
          <div className="max-w-3xl">
            <p className={`flex w-fit items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm text-slate-700 dark:bg-white/10 dark:text-slate-200 ${outline}`}>
              <GiBrain size={14} aria-hidden="true" className="shrink-0 text-amber-500" />
              What positions are currently open right now?
            </p>

            <h2 className="mt-6 text-3xl font-bold !leading-[1.1] tracking-tight text-[#111] dark:text-white sm:text-4xl md:text-[2.75rem]">
              No open positions{' '}
              <span className={`inline-block -rotate-2 rounded-full bg-[#EF6702] px-3.5 py-0.5 text-white md:px-4 ${outline}`}>
                right now
              </span>
              .
            </h2>

            <p className="mt-4 text-base text-slate-700 dark:text-slate-300 md:text-lg">
              We currently do not have any job vacancies or active hiring cycles. Our entire team is fully focused on delivering vehicles, EV swap programs, and car sales.
            </p>
          </div>

          {/* Car Buying & Swap CTA Card */}
          <div className={`mt-10 rounded-2xl bg-white p-6 sm:p-8 ${outline} dark:bg-slate-900`}>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="max-w-xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    <LuCar size={14} /> Looking to buy a car?
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs font-bold text-accent">
                    <LuArrowLeftRight size={14} /> EV Swap & Trade-in
                  </span>
                </div>
                <h3 className="mt-3 text-2xl font-bold text-[#111] dark:text-white">
                  We are looking for car buyers, not new hires.
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Explore our live inventory of verified brand-new and foreign-used vehicles. Get flexible financing, transparent pricing, verified inspection reports, and instant doorstep delivery across Nigeria.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
                <Link
                  href="/cars"
                  className={`group inline-flex items-center justify-center gap-2 rounded-full bg-[#111] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-primary dark:bg-white dark:text-[#111] dark:hover:bg-slate-200 ${outline}`}
                >
                  <span>Browse Car Catalog</span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#EF6702] text-white transition group-hover:rotate-45">
                    <GoArrowUpRight size={14} aria-hidden="true" />
                  </span>
                </Link>

                <Link
                  href="/swap"
                  className={`inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-slate-800 transition hover:bg-slate-50 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 ${outline}`}
                >
                  <LuArrowLeftRight size={15} className="text-accent" />
                  <span>Value & Swap Your Car</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Spontaneous resumes note */}
          <div className={`mt-6 flex flex-col gap-4 rounded-2xl bg-white/70 p-5 sm:flex-row sm:items-center sm:justify-between ${outline} dark:bg-white/5`}>
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-700 dark:bg-white/10 dark:text-white">
                <LuMail size={16} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#111] dark:text-white">
                  Talent pool for future openings
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  While we have no active roles today, you can send your CV to <span className="font-semibold text-slate-900 dark:text-white">careers@lyncs.africa</span> for when we resume hiring in the future.
                </p>
              </div>
            </div>
            <a
              href="mailto:careers@lyncs.africa?subject=Future%20Talent%20Pool%20-%20Spontaneous%20Application"
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-bold text-primary hover:bg-slate-50 dark:bg-transparent dark:text-white dark:hover:bg-white/5 ${outline}`}
            >
              <span>Email your CV</span>
              <GoArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
