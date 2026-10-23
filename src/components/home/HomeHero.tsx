import Link from 'next/link'
import classNames from 'classnames'
import { BsPeopleFill } from 'react-icons/bs'
import { FaBus, FaCar, FaHandPointer, FaRegCalendarAlt } from 'react-icons/fa'
import { GiBrain, GiCarKey, GiCommercialAirplane, GiLips } from 'react-icons/gi'
import { IoAnalyticsSharp } from 'react-icons/io5'
import { MdHomeRepairService } from 'react-icons/md'
import DashboardOverview from './DashboardOverview'
import HeroCollage from './HeroCollage'
import PartnerCarousel from './PartnerCarousel'


const SIDEBAR = [
  { label: 'Overview', Icon: IoAnalyticsSharp },
  { label: 'Book now', Icon: FaHandPointer },
  { label: 'Swap your car', Icon: GiCarKey },
  { label: 'Rides', Icon: FaCar },
  { label: 'Buses', Icon: FaBus },
  { label: 'Flights', Icon: GiCommercialAirplane },
  { label: 'Services', Icon: MdHomeRepairService },
  { label: 'Subscription', Icon: FaRegCalendarAlt },
  { label: 'My Staff', Icon: BsPeopleFill },
]

function ProductMock() {
  return (
    <div className="rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 overflow-hidden dark:bg-slate-900 dark:ring-white/10">
      <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-3 dark:border-white/5 dark:bg-slate-950">
        <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
        <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
        <span className="h-3 w-3 rounded-full bg-[#28C840]" />
        <div className="ml-4 flex-1 rounded-md bg-white px-3 py-1 text-xs text-slate-400 ring-1 ring-slate-200 dark:bg-slate-900 dark:text-slate-500 dark:ring-white/10">
          https://app.lyncs.africa/
        </div>
      </div>

      <div className="flex min-h-[600px] text-left">
        {/* Mirrors the real app's sidebar */}
        <aside className="hidden sm:block w-56 shrink-0 p-3">
          <div className="flex h-full flex-col rounded-[18px] bg-slate-800 p-4 dark:bg-white/[0.04] dark:ring-1 dark:ring-white/10">
            <img src="/images/logos/logo-white.png" alt="" className="mb-10 mt-2 w-[76px]" />
            <ul className="space-y-2">
              {SIDEBAR.map(({ label, Icon }, i) => (
                <li
                  key={label}
                  className={classNames('relative flex items-center gap-2.5 rounded-lg px-3 py-2.5', {
                    'bg-gray-300/30 dark:bg-accent/15': i === 0,
                  })}
                >
                  {i === 0 && <span className="absolute left-0 h-4 w-0.5 rounded-full bg-white dark:bg-accent" />}
                  <Icon
                    className={classNames(
                      'shrink-0 text-white',
                      i === 0 ? 'dark:text-accent' : 'dark:text-slate-400',
                    )}
                    size={18}
                    aria-hidden="true"
                  />
                  <span className={classNames('text-[13px]', i === 0 ? 'text-white' : 'text-slate-300 dark:text-slate-400')}>{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <DashboardOverview />
      </div>
    </div>
  )
}

export default function HomeHero() {
  return (
    <section className="relative -mt-20 md:-mt-[130px] overflow-hidden bg-white dark:bg-night pb-[100px] font-Quicksand">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 dark:hidden"
        style={{
          backgroundImage:
            'linear-gradient(rgba(26,39,71,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(26,39,71,0.06) 1px, transparent 1px)',
          backgroundSize: '64px 64px, 64px 64px',
        }}
      />
      <HeroCollage />

      <div className="relative mx-auto max-w-4xl px-4 pt-[120px] md:pt-[194px] text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-surface px-4 py-1.5 text-sm text-primary dark:border-white/10 dark:bg-white/5 dark:text-slate-200 opacity-0 animate-fade-in-up">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Corporate mobility, Lagos → everywhere Africa
        </span>
        <h1 className="mx-auto mt-6 max-w-3xl text-4xl md:text-[56px] font-bold leading-tight text-primary dark:text-white opacity-0 animate-fade-in-up">
          We are the corporate mobility Operating System.
        </h1>
        {/* A quick exchange: the visitor's thought, then our reply */}
        <div className="mx-auto mt-6 flex w-fit max-w-xl flex-col items-start gap-3 text-left text-base md:text-lg">
          <p className="flex items-center gap-3 text-slate-600 dark:text-slate-300 opacity-0 animate-fade-in-up">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/15 dark:text-emerald-400">
              <GiBrain size={20} aria-hidden="true" />
            </span>
            <span className="text-[16px]">Operating system? What does that even mean?</span>
          </p>
          <p
            className="flex items-center gap-3 font-medium text-primary dark:text-white opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.6s' }}
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent dark:bg-accent/20">
              <GiLips size={20} aria-hidden="true" />
            </span>
              <span className="text-[16px]"> Keep scrolling, we'll explain.</span>

          </p>
        </div>
        <div className="flex items-center gap-4 justify-center">
            <Link
                href="/contact"
                className="mt-8 inline-flex rounded bg-accent px-7 py-3 text-[15px] font-medium text-white transition hover:bg-opacity-90 dark:bg-white dark:text-primary dark:shadow-lg dark:shadow-white/10 dark:hover:bg-slate-200 opacity-0 animate-fade-in-up"
            >
                Book a demo
            </Link>
            <Link
                href="/contact"
                className="mt-8 inline-flex rounded bg-transparent border border-accent px-7 py-3 text-[15px] font-medium text-accent transition hover:bg-accent/5 dark:border-white/20 dark:text-white dark:hover:border-white/40 dark:hover:bg-white/5 opacity-0 animate-fade-in-up"
            >
                Log in to dashboard
            </Link>
        </div>
      </div>

      <div className="relative mx-auto mt-14 max-w-7xl px-4">
        {/* Mobile: logos sit above the panel */}
        <div className="md:hidden mb-6">
          <p className="mb-4 text-center text-xs text-muted">Works with</p>
          <PartnerCarousel />
        </div>

        <div className="absolute left-1/2 top-0 z-10 hidden h-[var(--notch-h)] w-[var(--notch-w)] -translate-x-1/2 items-center justify-center px-8 md:flex hero-notch-vars">
          <div className="w-full">
            <p className="mb-3 text-left text-[14px] text-muted font-semibold">Works with</p>
            <PartnerCarousel />
          </div>
        </div>

        <div
          className="hero-notch-vars hero-panel-notch relative overflow-hidden rounded-[32px] px-4 pb-12 pt-10 md:px-10 md:pt-32 md:pb-20"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(135deg, #1A2747 0%, #23397a 55%, #6584F6 100%)',
          }}
        >
          <div className="mx-auto max-w-5xl opacity-0 animate-fade-in-up">
            <ProductMock />
          </div>
        </div>
      </div>
    </section>
  )
}
