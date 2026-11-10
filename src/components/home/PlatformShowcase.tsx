import Link from 'next/link'
import classNames from 'classnames'
import { BsPeopleFill } from 'react-icons/bs'
import { FaBus, FaCar, FaHandPointer, FaRegCalendarAlt } from 'react-icons/fa'
import { GiCarKey, GiCommercialAirplane } from 'react-icons/gi'
import { IoAnalyticsSharp } from 'react-icons/io5'
import { MdHomeRepairService } from 'react-icons/md'
import DashboardOverview from './DashboardOverview'
import HeroCollage from './HeroCollage'
import SectionBadge from '../ui/SectionBadge'


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
        <aside className="hidden sm:block shrink-0 p-3">
          <div className="flex h-full flex-col rounded-[18px] bg-slate-800 p-4 dark:bg-white/[0.04] dark:ring-1 dark:ring-white/10">
            <img src="/images/logos/logo-white.png" alt="" className="mb-10 mt-2 w-[76px]" />
            <ul className="space-y-2">
              {SIDEBAR.map(({ label, Icon }, i) => (
                <li
                  key={label}
                  className={classNames('relative flex items-center justify-center gap-2.5 rounded-lg px-3 py-2.5', {
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
                  {/*<span className={classNames('text-[13px]', i === 0 ? 'text-white' : 'text-slate-300 dark:text-slate-400')}>{label}</span>*/}
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

export default function PlatformShowcase() {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-night pb-[100px] font-Quicksand">
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

      <div className="relative mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left: copy */}
          <div className="text-left lg:col-span-4">
            <SectionBadge number="10" label="Corporate mobility" variant="auto" className="opacity-0 animate-fade-in-up" />
            <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight text-primary dark:text-white md:text-[2.5rem] xl:text-[3rem] opacity-0 animate-fade-in-up">
              Powering the future of Africa mobility
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-500 dark:text-slate-400 md:text-[16px] opacity-0 animate-fade-in-up">
              One platform for your company’s mobility — EVs, charging, rides, buses, flights and rentals on a single subscription, in one dashboard.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/book-demo"
                className="inline-flex rounded bg-accent px-7 py-3 text-[15px] font-medium text-white transition hover:bg-opacity-90 dark:bg-white dark:text-primary dark:shadow-lg dark:shadow-white/10 dark:hover:bg-slate-200 opacity-0 animate-fade-in-up"
              >
                Book a demo
              </Link>
              <Link
                href="/contact"
                className="inline-flex rounded bg-transparent border border-accent px-7 py-3 text-[15px] font-medium text-accent transition hover:bg-accent/5 dark:border-white/20 dark:text-white dark:hover:border-white/40 dark:hover:bg-white/5 opacity-0 animate-fade-in-up"
              >
                Log in to dashboard
              </Link>
            </div>
          </div>

          <div className="relative opacity-0 animate-fade-in-up lg:col-span-8 lg:mr-[calc(50%-35vw)]">
            <ProductMock />
          </div>
        </div>
      </div>
    </section>
  )
}
