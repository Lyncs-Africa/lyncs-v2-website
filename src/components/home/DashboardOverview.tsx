import type { CSSProperties } from 'react'
import {
  IoArrowForward,
  IoCalendarOutline,
  IoChevronBack,
  IoChevronDown,
  IoChevronForward,
  IoListOutline,
  IoNotificationsOutline,
  IoSwapHorizontal,
} from 'react-icons/io5'

// Recreation of the app's overview page, scaled down for the hero mockup.
// Photos are cropped straight out of the real screenshots.
type Shot = { src: string; w: number; h: number }
const TOP: Shot = { src: '/images/overview.jpg', w: 1506, h: 905 }
const BOTTOM: Shot = { src: '/images/overview-bottom.jpg', w: 1502, h: 591 }

function cropFrom(shot: Shot, x: number, y: number, w: number, h: number): CSSProperties {
  return {
    backgroundImage: `url('${shot.src}')`,
    backgroundSize: `${(shot.w / w) * 100}% ${(shot.h / h) * 100}%`,
    backgroundPosition: `${(x / (shot.w - w)) * 100}% ${(y / (shot.h - h)) * 100}%`,
    aspectRatio: `${w} / ${h}`,
  }
}

const crop = (x: number, y: number, w: number, h: number) => cropFrom(TOP, x, y, w, h)

// Staff avatars on the bundle card
const AVATARS = [668, 748].map((cx) => cropFrom(BOTTOM, cx - 22, 408, 44, 44))

// Airline logo circles, centred on their positions in the screenshot
const AIRLINES = [954, 994, 1034, 1075].map((cx) => crop(cx - 24, 521, 48, 48))

const card = 'rounded-xl border border-slate-200 bg-white dark:border-white/10 dark:bg-white/[0.03]'
const select =
  'flex items-center gap-1.5 rounded-lg border border-slate-200 px-2 py-1 text-[10px] text-slate-600 dark:border-white/10 dark:text-slate-300'

export default function DashboardOverview() {
  return (
    <div className="flex-1 space-y-3 p-3 md:p-4">
      {/* Top bar */}
      <div className={`${card} flex items-center justify-between px-4 py-3`}>
        <p className="text-sm md:text-base text-primary dark:text-white">Welcome to your dashboard</p>
        <div className="flex items-center gap-3">
          <span className="relative text-primary dark:text-slate-300">
            <IoNotificationsOutline size={16} aria-hidden="true" />
            <span className="absolute -right-2 -top-2 rounded-full bg-red-500 px-1 text-[8px] font-semibold leading-[14px] text-white">
              48
            </span>
          </span>
          <span className="text-xs text-primary dark:text-white">Hi, Nebechi</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
        {/* Left column */}
        <div className="space-y-3 md:col-span-2">
          {/* Dark green in light mode, soft sage in dark mode */}
          <div className="relative overflow-hidden rounded-xl bg-[#0E2A17] [background-image:repeating-linear-gradient(135deg,rgba(255,255,255,0.05)_0_1px,transparent_1px_9px)] p-4 text-white dark:bg-[#DCEBE1] dark:[background-image:repeating-linear-gradient(135deg,rgba(14,42,23,0.07)_0_1px,transparent_1px_9px)] dark:text-[#0E2A17]">
            <p className="text-sm font-semibold">Subscription renewal</p>
            <p className="mt-1 text-[10px] text-white/80 dark:text-[#0E2A17]/75">Your current cycle renews on 26 September 2026.</p>
            <p className="mt-1 flex items-center gap-1 text-[9px] text-white/60 dark:text-[#0E2A17]/60">
              <span className="h-1.5 w-1.5 rounded-full bg-white dark:bg-emerald-600" />1 day remaining
            </p>
            <div className="mt-3 flex items-end justify-between">
              <span className="rounded-md bg-white px-3 py-1.5 text-[10px] font-medium text-primary dark:bg-[#0E2A17] dark:text-white">Add a new plan</span>
              <div className="w-10 overflow-hidden rounded-md bg-white text-center shadow dark:ring-1 dark:ring-[#0E2A17]/10">
                <div className="h-2.5 bg-red-500" />
                <p className="py-0.5 text-base font-bold leading-tight text-primary">26</p>
              </div>
            </div>
          </div>

          <div className={`${card} p-3`}>
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-1.5 text-xs text-primary dark:text-white">
                <IoListOutline size={14} aria-hidden="true" /> Trips
              </p>
              <span className={select}>
                Bus trips <IoChevronDown size={10} aria-hidden="true" />
              </span>
            </div>
            <div className="mt-3 rounded-lg border border-slate-200 p-3 dark:border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold leading-none text-primary dark:text-white">15</span>
                <span className="text-[10px] leading-tight text-primary dark:text-slate-300">
                  Active
                  <br />
                  Trips
                </span>
              </div>
              <p className="mt-3 text-[10px] text-slate-600 dark:text-slate-300">
                Jibowu Bus Stop, Murtala Muhammed Way, Lagos
              </p>
              <div className="relative my-2 flex items-center justify-center">
                <span className="absolute inset-x-0 h-px bg-slate-300 dark:bg-white/15" />
                <span className="relative flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white text-accent dark:border-white/10 dark:bg-slate-900">
                  <IoSwapHorizontal size={12} aria-hidden="true" />
                </span>
              </div>
              <p className="text-[10px] text-slate-600 dark:text-slate-300">Eko Hotel Roundabout, Lagos</p>
              <div className="mt-3 flex items-end justify-between gap-2">
                <p className="text-[9px] leading-snug text-slate-400">
                  Booked by Nebechi C.
                  <br />
                  For 1st September, 2026
                </p>
                <span className="shrink-0 rounded-md border border-slate-300 px-2 py-1 text-[8px] uppercase text-slate-600 dark:border-white/15 dark:text-slate-300">
                  View trip
                </span>
              </div>
            </div>
            <p className="-mx-3 mt-3 flex items-center gap-1 border-t border-slate-200 px-3 pt-2.5 text-[10px] text-slate-600 dark:border-white/10 dark:text-slate-300">
              View all trips <IoArrowForward size={10} aria-hidden="true" />
            </p>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-3 md:col-span-3">
          <div
            className={`${card} p-4`}
            style={{
              backgroundImage:
                'linear-gradient(rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.08) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/10 text-accent dark:bg-accent/20">
              <IoCalendarOutline size={16} aria-hidden="true" />
            </span>
            <p className="mt-3 text-base font-medium text-primary dark:text-white">Book a trip for your team</p>
            <p className="mt-0.5 text-[10px] text-slate-400">
              Arrange rides, bus trips, flights, or vouchers for your staff in one place.
            </p>
            <span className="mt-3 inline-flex items-center gap-1 rounded-md bg-accent px-3 py-1.5 text-[10px] font-medium text-white">
              Book now <IoChevronForward size={10} aria-hidden="true" />
            </span>

            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="rounded-lg border border-slate-200 bg-white p-1.5 dark:border-white/10 dark:bg-slate-900">
                <div className="w-full rounded-md" style={crop(642, 442, 246, 140)} />
                <p className="mt-1.5 text-[9px] leading-snug text-primary dark:text-slate-200">
                  Get a ride in minutes, anytime you need one
                </p>
                <div className="mt-1.5 flex items-center gap-1">
                  <span className="flex -space-x-1">
                    <img src="/images/bolt-logo.png" alt="" className="h-3.5 w-3.5 rounded-full object-cover ring-1 ring-white dark:ring-slate-900" />
                    <img src="/images/indrive-icon.png" alt="" className="h-3.5 w-3.5 rounded-full object-cover ring-1 ring-white dark:ring-slate-900" />
                  </span>
                  <span className="text-[8px] text-slate-400">Bolt, Uber &amp; more</span>
                </div>
              </div>

              <div className="rounded-lg border border-slate-200 bg-slate-50 p-1.5 dark:border-white/10 dark:bg-white/5">
                <p className="text-[9px] leading-snug text-primary dark:text-slate-200">Book flights for yourself and your team</p>
                <div className="mt-1 flex items-center gap-1">
                  <span className="flex -space-x-1.5">
                    {AIRLINES.map((style, i) => (
                      <span key={i} className="h-4 w-4 rounded-full ring-1 ring-white dark:ring-slate-900" style={style} />
                    ))}
                  </span>
                  <span className="text-[8px] text-slate-400">+ more</span>
                </div>
                <div className="mt-1.5 w-full rounded-md" style={crop(925, 586, 247, 140)} />
              </div>

              <div className="flex flex-col">
                <div className="mb-1.5 flex justify-end gap-1 text-slate-400">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full border border-slate-200 dark:border-white/10">
                    <IoChevronBack size={8} aria-hidden="true" />
                  </span>
                  <span className="flex h-4 w-4 items-center justify-center rounded-full border border-slate-200 dark:border-white/10">
                    <IoChevronForward size={8} aria-hidden="true" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col overflow-hidden rounded-lg bg-[#1C5BE8]">
                  <div className="px-2 pt-2">
                    <p className="text-[9px] font-semibold text-white">Fund cowry wallet</p>
                    <p className="text-[7px] text-white/80">Top up your staff wallet with ease.</p>
                  </div>
                  <div className="mt-auto w-full" style={crop(1198, 620, 268, 117)} />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className={`${card} p-3`}>
              <div className="flex items-start justify-between gap-2">
                <p className="text-xs font-semibold text-primary dark:text-white">₦2,000,000 Bundle</p>
                <span className="flex shrink-0 items-center gap-1 text-[7px] font-semibold uppercase tracking-wide text-purple-600 dark:text-purple-400">
                  <span className="h-1 w-1 rounded-full bg-current" />
                  Locked pricing
                </span>
              </div>
              <p className="mt-0.5 text-[9px] text-slate-400">₦2,000,000 / month</p>
              <div className="mt-3 flex items-center -space-x-1.5">
                {AVATARS.map((style, i) => (
                  <span key={i} className="h-6 w-6 rounded-full ring-2 ring-white dark:ring-slate-900" style={style} />
                ))}
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[8px] font-medium text-white ring-2 ring-white dark:bg-slate-700 dark:ring-slate-900">
                  NN
                </span>
              </div>
              <div className="mt-3 flex items-center justify-between text-[8px] text-slate-500 dark:text-slate-400">
                <span>Allocation used</span>
                <span className="text-primary dark:text-white">1%</span>
              </div>
              <div className="mt-1 h-1 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
                <div className="h-full w-[2%] rounded-full bg-emerald-500" />
              </div>
            </div>
            <div
              className={`${card} p-3`}
              style={{
                backgroundImage:
                  'repeating-linear-gradient(135deg, rgba(148,163,184,0.12) 0 1px, transparent 1px 8px)',
              }}
            >
              <div className="flex items-center justify-between">
                <p className="text-xs text-primary dark:text-white">Billing</p>
                <span className={select}>
                  All time <IoChevronDown size={10} aria-hidden="true" />
                </span>
              </div>
              <p className="mt-2 text-base font-semibold text-primary dark:text-white">₦500,000</p>
              <p className="text-[8px] text-slate-400">Last payment made on 26 Aug 2026</p>
              <span className="mt-4 inline-flex rounded-md border border-accent px-2.5 py-1 text-[9px] text-accent dark:border-accent/60">
                View my subscription
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
