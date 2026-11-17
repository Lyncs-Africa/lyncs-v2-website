'use client'

import { LuArrowRight, LuBriefcase, LuMail } from 'react-icons/lu'

export default function CareersHero() {
  return (
    <section className="relative -mt-20 md:-mt-[130px] overflow-hidden bg-[#FAF8F6] font-Quicksand dark:bg-night pb-20 pt-[124px] md:pb-28 md:pt-[196px]">
      {/* Background subtle grid matching ContactHero / AboutHero */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 dark:hidden"
        style={{
          backgroundImage:
            'linear-gradient(rgba(26,39,71,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(26,39,71,0.06) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden dark:block"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left: Editorial narrative */}
          <div className="lg:col-span-6">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">
              Careers
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-primary dark:text-white sm:text-5xl">
              Why Join Lyncs
            </h1>

            <div className="mt-6 max-w-lg space-y-4 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
              <p>
                Lyncs is building the mobility infrastructure for Africa — making EV swaps, verified vehicle sourcing, and corporate fleet deliveries seamless from end to end.
              </p>
              <p>
                We hire builders, operators, and problem-solvers who want to go deep on hard operational and engineering challenges. People who&apos;d rather ship something tangible than sit through another status meeting.
              </p>
              <p>
                We&apos;re a focused, high-ownership team based in Lagos. Your work gets seen, your judgment carries weight, and you&apos;ll learn and move faster here than you would at most other places.
              </p>
            </div>

            <div className="mt-8">
              <a
                href="mailto:support@lyncs.africa?subject=Careers%20at%20Lyncs%20Africa"
                className="inline-flex items-center gap-2.5 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent/90 dark:bg-[#2D419A] dark:hover:bg-[#2D419A]/90"
              >
                <LuMail size={16} aria-hidden="true" />
                <span>Send us a note</span>
              </a>
            </div>
          </div>

          {/* Right: Open Roles card */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_14px_40px_-14px_rgba(29,41,61,0.08)] dark:border-white/10 dark:bg-[#0E131F] dark:shadow-none sm:p-8">
              <div className="flex items-start justify-between border-b border-slate-100 pb-5 dark:border-white/10">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-accent">
                    Open Roles
                  </p>
                  <h2 className="mt-1 text-lg font-bold text-primary dark:text-white">
                    No positions available
                  </h2>
                </div>
                <span
                  aria-hidden="true"
                  className="mt-1.5 h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-white/25"
                />
              </div>

              <div className="px-2 py-10 text-center sm:py-12">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-surface text-accent dark:bg-white/10">
                  <LuBriefcase size={20} aria-hidden="true" />
                </div>

                <h3 className="mt-4 text-base font-bold text-primary dark:text-white">
                  No open roles right now
                </h3>

                <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                  We&apos;re not actively hiring right now, but we&apos;re always interested in hearing from exceptional engineers, operators, and mobility specialists. Send us a note and tell us what you&apos;d bring to the team.
                </p>

                <a
                  href="mailto:support@lyncs.africa?subject=Future%20Role%20Inquiry%20-%20Lyncs%20Africa"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition hover:opacity-80"
                >
                  <span>support@lyncs.africa</span>
                  <LuArrowRight size={15} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
