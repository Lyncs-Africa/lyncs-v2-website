'use client'

import { motion, useReducedMotion } from 'framer-motion'
import {
  LuCar,
  LuBus,
  LuPlane,
  LuWallet,
  LuTruck,
  LuWrench,
  LuCheck,
  LuShieldCheck,
  LuQrCode,
  LuMapPin,
  LuClock,
} from 'react-icons/lu'

const outline = 'border-2 border-[#111]'

/* -------------------------------------------------------------------------- */
/* 1. RIDES: Multi-App Plug-in & Fare Aggregator                              */
/* -------------------------------------------------------------------------- */
function RidesAnimation({ still }: { still: boolean }) {
  const apps = [
    { name: 'Bolt', price: '₦3,100', eta: '2m', logo: '/images/bolt-logo.png', bg: 'bg-[#74B044] text-[#111]', best: true },
    { name: 'Uber', price: '₦3,650', eta: '4m', logo: '/images/uber-logo.png', bg: 'bg-white text-[#111]', best: false },
    { name: 'LagRide', price: '₦3,400', eta: '5m', logo: '/images/lagride-logo.png', bg: 'bg-[#F49AC1] text-[#111]', best: false },
    { name: 'inDrive', price: '₦3,250', eta: '3m', logo: '/images/indrive-icon.png', bg: 'bg-[#FEC804] text-[#111]', best: false },
  ]

  return (
    <div className="relative flex h-full flex-col justify-between gap-3 p-4">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-300">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Live Fare Aggregator
        </span>
        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
          VI HQ → Ikeja GRA
        </span>
      </div>

      {/* 4 Ride Apps as snapping plugs */}
      <div className="grid grid-cols-2 gap-2">
        {apps.map((app, i) => (
          <motion.div
            key={app.name}
            initial={still ? false : { opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: 'spring', stiffness: 360, damping: 20, delay: i * 0.08 }}
            className="flex items-center"
          >
            {/* 2-prong plug */}
            <span aria-hidden className="flex flex-col gap-1">
              <span className="h-1 w-2 rounded-l-sm bg-[#111] dark:bg-slate-300" />
              <span className="h-1 w-2 rounded-l-sm bg-[#111] dark:bg-slate-300" />
            </span>
            <div
              className={`flex flex-1 items-center justify-between rounded-xl px-2.5 py-1.5 text-xs font-bold ${outline} ${app.bg} ${
                app.best ? 'ring-2 ring-emerald-500 ring-offset-1 dark:ring-offset-slate-900' : ''
              }`}
            >
              <span className="flex items-center gap-1.5">
                <img src={app.logo} alt="" className="h-4 w-4 rounded-full object-cover border border-black/20 bg-white" />
                {app.name}
              </span>
              <span className="text-[11px] font-extrabold">{app.price}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Animated Route Track (runs once on scroll) */}
      <div className={`rounded-xl bg-white p-2.5 dark:bg-slate-900 ${outline}`}>
        <div className="flex items-center justify-between text-[11px] font-bold text-primary dark:text-white">
          <span>Best Rate Auto-Selected (Bolt • 2 mins)</span>
          <span className="text-emerald-600 dark:text-emerald-400">₦0 Staff Cash</span>
        </div>
        <div className="relative mt-2 h-2 w-full rounded-full bg-slate-100 dark:bg-white/10">
          <motion.div
            initial={still ? { width: '82%' } : { width: '10%' }}
            whileInView={{ width: '82%' }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
            className="h-full rounded-full bg-emerald-500"
          />
          <motion.span
            initial={still ? { left: '78%' } : { left: '8%' }}
            whileInView={{ left: '78%' }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
            className="absolute top-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center rounded-full border border-[#111] bg-[#EF6702] text-white shadow"
          >
            <LuCar size={11} />
          </motion.span>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* 2. BUSES: Staff Shuttle Cluster & Live GPS Telemetry                       */
/* -------------------------------------------------------------------------- */
function BusesAnimation({ still }: { still: boolean }) {
  const stops = ['Mainland Hub', 'Maryland', 'Yaba', 'VI Office']

  return (
    <div className="relative flex h-full flex-col justify-between gap-3 p-4">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-500/15 px-2.5 py-0.5 text-[11px] font-bold text-sky-800 dark:text-sky-300">
          <LuQrCode size={12} />
          Route #04 • Morning Shuttle
        </span>
        <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-300">
          98.4% On-Time
        </span>
      </div>

      {/* Animated Shuttle Corridor (runs once on scroll) */}
      <div className={`relative rounded-xl bg-white px-4 py-3 dark:bg-slate-900 ${outline}`}>
        {/* Dedicated Track Row: Line, Dots & Coaster Pill on the exact same horizontal axis */}
        <div className="relative flex h-6 items-center justify-between">
          {/* Background Line */}
          <div className="absolute inset-x-1.5 top-1/2 h-1 -translate-y-1/2 rounded-full bg-slate-200 dark:bg-white/15" />

          {/* Active Progress Line */}
          <motion.div
            initial={still ? { width: '68%' } : { width: '6%' }}
            whileInView={{ width: '68%' }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.3, ease: 'easeOut', delay: 0.15 }}
            className="absolute left-1.5 top-1/2 h-1 -translate-y-1/2 rounded-full bg-accent"
          />

          {/* Moving Shuttle Pill centered on the line */}
          <motion.div
            initial={still ? { left: '58%' } : { left: '4%' }}
            whileInView={{ left: '58%' }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.3, ease: 'easeOut', delay: 0.15 }}
            className={`absolute top-1/2 z-20 flex -translate-y-1/2 items-center gap-1 rounded-full bg-[#3DA5E0] px-2 py-0.5 text-[10px] font-bold text-[#111] ${outline}`}
          >
            <LuBus size={11} />
            <span>Coaster</span>
          </motion.div>

          {/* 4 Stop Dots sitting directly on the line */}
          {stops.map((stop) => (
            <span
              key={stop}
              className="relative z-10 h-3.5 w-3.5 shrink-0 rounded-full border-2 border-[#111] bg-white dark:bg-slate-800"
            />
          ))}
        </div>

        {/* Stop Labels Row directly underneath */}
        <div className="mt-1.5 flex items-start justify-between">
          {stops.map((stop, idx) => (
            <span
              key={stop}
              className={`whitespace-nowrap text-[10px] font-bold text-slate-700 dark:text-slate-300 ${
                idx === 0 ? 'text-left' : idx === stops.length - 1 ? 'text-right' : 'text-center'
              }`}
            >
              {stop}
            </span>
          ))}
        </div>
      </div>

      {/* Live Boarding Pass Counter */}
      <div className="flex items-center justify-between gap-2">
        <div className={`flex flex-1 items-center gap-2 rounded-xl bg-[#DCE5EA] px-3 py-2 text-xs font-bold text-[#111] ${outline}`}>
          <LuQrCode size={15} className="shrink-0" />
          <span>QR Boarded: 26 / 28 Staff</span>
        </div>
        <div className={`rounded-xl bg-white px-3 py-2 text-[11px] font-extrabold text-emerald-700 dark:bg-slate-900 dark:text-emerald-400 ${outline}`}>
          GPS Live ✓
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* 3. FLIGHTS: Trajectory Arc & 60-Second Executive Approval                  */
/* -------------------------------------------------------------------------- */
function FlightsAnimation({ still }: { still: boolean }) {
  const airlines = ['Air Peace', 'Ibom Air', 'ValueJet']

  return (
    <div className="relative flex h-full flex-col justify-between gap-3 p-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {airlines.map((a) => (
            <span
              key={a}
              className={`rounded-md bg-white px-2 py-0.5 text-[10px] font-bold text-[#111] ${outline}`}
            >
              {a}
            </span>
          ))}
        </div>
        <span className="text-[11px] font-bold text-purple-700 dark:text-purple-300">
          60s Booking
        </span>
      </div>

      {/* Flight Path Stage (runs once on scroll) */}
      <div className={`relative overflow-hidden rounded-xl bg-white px-4 py-3 dark:bg-slate-900 ${outline}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-extrabold text-primary dark:text-white">LOS</p>
            <p className="text-[10px] text-slate-500">Lagos</p>
          </div>

          <div className="relative flex-1 mx-4 h-8 flex items-center">
            <svg viewBox="0 0 160 36" className="w-full h-full overflow-visible">
              <path
                d="M 4 28 Q 80 -8 156 28"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="4 4"
                className="text-slate-300 dark:text-white/20"
              />
              <motion.path
                d="M 4 28 Q 80 -8 156 28"
                fill="none"
                stroke="#EF6702"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={still ? { pathLength: 1 } : { pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1.3, ease: 'easeOut', delay: 0.15 }}
              />
            </svg>
            <motion.span
              initial={still ? { left: '52%', top: '8%' } : { left: '8%', top: '55%' }}
              whileInView={{ left: '52%', top: '8%' }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.2, ease: 'easeOut', delay: 0.15 }}
              className="absolute -translate-x-1/2 flex h-6 w-6 items-center justify-center rounded-full border border-[#111] bg-[#FEC804] text-[#111] shadow"
            >
              <LuPlane size={12} />
            </motion.span>
          </div>

          <div className="text-right">
            <p className="text-sm font-extrabold text-primary dark:text-white">ABV</p>
            <p className="text-[10px] text-slate-500">Abuja</p>
          </div>
        </div>
      </div>

      {/* Manager Auto-Approval Bar */}
      <div className={`flex items-center justify-between rounded-xl bg-[#ECE8F1] px-3 py-2 text-xs font-bold text-[#111] ${outline}`}>
        <span className="flex items-center gap-1.5">
          <LuCheck size={14} className="rounded-full bg-emerald-500 text-white p-0.5" />
          Manager Approved • E-Ticket Issued
        </span>
        <span className="rounded bg-white px-1.5 py-0.5 text-[10px] font-extrabold border border-[#111]">
          + Airport Car
        </span>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* 4. RIDE WALLETS: Central NGN Treasury & Policy Guardrails                  */
/* -------------------------------------------------------------------------- */
function WalletsAnimation({ still }: { still: boolean }) {
  const depts = [
    { name: 'Sales & Field Team', cap: '₦1,500,000', pct: '78%', color: 'bg-emerald-500' },
    { name: 'Engineering & Ops', cap: '₦950,000', pct: '52%', color: 'bg-accent' },
  ]

  return (
    <div className="relative flex h-full flex-col justify-between gap-2.5 p-4">
      {/* Master NGN Treasury Header */}
      <div className={`flex items-center justify-between rounded-xl bg-[#111] px-3.5 py-2 text-white dark:bg-slate-900 ${outline}`}>
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#EF6702] text-white">
            <LuWallet size={13} />
          </span>
          <div>
            <p className="text-[10px] text-slate-300 leading-none">Master NGN Treasury</p>
            <p className="text-xs font-extrabold tracking-tight mt-0.5">₦8,450,000.00</p>
          </div>
        </div>
        <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
          Auto-Topup ON
        </span>
      </div>

      {/* Department Wallet Allocations (runs once on scroll) */}
      <div className={`space-y-2 rounded-xl bg-white p-2.5 dark:bg-slate-900 ${outline}`}>
        {depts.map((d, i) => (
          <div key={d.name}>
            <div className="flex justify-between text-[10px] font-bold text-primary dark:text-white">
              <span>{d.name}</span>
              <span>{d.cap} / mo</span>
            </div>
            <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
              <motion.div
                initial={still ? { width: d.pct } : { width: '15%' }}
                whileInView={{ width: d.pct }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1.1, delay: i * 0.2, ease: 'easeOut' }}
                className={`h-full rounded-full ${d.color}`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Policy Guardrail Chips */}
      <div className="flex flex-wrap items-center gap-1.5">
        <span className={`inline-flex items-center gap-1 rounded-full bg-[#E6F0DC] px-2.5 py-0.5 text-[10px] font-bold text-[#111] ${outline}`}>
          <LuShieldCheck size={11} /> Geofence Locked
        </span>
        <span className={`inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-0.5 text-[10px] font-bold text-[#111] ${outline}`}>
          <LuClock size={11} /> 7AM–9PM Curfew
        </span>
        <span className={`inline-flex items-center gap-1 rounded-full bg-[#FEC804] px-2.5 py-0.5 text-[10px] font-bold text-[#111] ${outline}`}>
          0% Cash Leakage
        </span>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* 5. CAR RENTALS: Executive Chauffeur & VIP Protocol Vehicle                 */
/* -------------------------------------------------------------------------- */
// Exact wheel centres and radius in 26.png (2014 x 780), matching <FleetSwapHero />
const CAR_IMG_W = 2014
const CAR_IMG_H = 780
const CAR_WHEEL_R = 150
const CAR_WHEELS = [
  { src: '/images/ev-wheel-front.png', cx: 398, cy: 565 },
  { src: '/images/ev-wheel-rear.png', cx: 1597, cy: 566 },
]
const CAR_DEG_PER_PCT = (CAR_IMG_W / CAR_WHEEL_R / 100) * (180 / Math.PI)

function RentalsAnimation({ still }: { still: boolean }) {
  // Car drives in once from the right (+65% -> 0%) with spinning tires, then parks
  const startPct = 65
  const startSpin = startPct * CAR_DEG_PER_PCT

  return (
    <div className="relative flex h-full flex-col justify-between gap-2 p-4 overflow-hidden">
      <div className="flex items-center justify-between">
        <span className={`rounded-full bg-[#E3ECFA] px-2.5 py-0.5 text-[10px] font-bold text-[#111] ${outline}`}>
          Chauffeur + VIP Protocol
        </span>
        <span className="text-[11px] font-extrabold text-emerald-700 dark:text-emerald-400">
          99.8% Punctual
        </span>
      </div>

      {/* Animated Car Stage with Spinning Tires — runs once on scroll */}
      <div className={`relative flex items-center justify-center overflow-hidden rounded-xl bg-[#DCE8F2] px-4 py-2.5 dark:bg-[#15203A] ${outline}`}>
        <motion.div
          initial={still ? { x: '0%' } : { x: `${startPct}%` }}
          whileInView={{ x: '0%' }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.6, ease: 'easeOut' }}
          className="relative w-52 sm:w-56"
        >
          <span
            aria-hidden
            className="absolute inset-x-[6%] -bottom-[3%] h-[10%] rounded-[50%] bg-slate-900/25 blur-md dark:bg-black/60"
          />
          <motion.div
            initial={still ? { rotate: 0 } : { rotate: 0.8 }}
            whileInView={{ rotate: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.6, ease: 'easeOut' }}
            style={{ transformOrigin: '50% 72%' }}
            className="relative"
          >
            <img src="/images/26.png" alt="Executive rental vehicle" className="w-full dark:hidden" />
            <img src="/images/26-dark.png" alt="Executive rental vehicle" className="hidden w-full dark:block" />
          </motion.div>
          {CAR_WHEELS.map(({ src, cx, cy }) => (
            <motion.img
              key={src}
              src={src}
              alt=""
              aria-hidden
              initial={still ? { rotate: 0 } : { rotate: startSpin }}
              whileInView={{ rotate: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.6, ease: 'easeOut' }}
              style={{
                left: `${((cx - CAR_WHEEL_R) / CAR_IMG_W) * 100}%`,
                top: `${((cy - CAR_WHEEL_R) / CAR_IMG_H) * 100}%`,
                width: `${((CAR_WHEEL_R * 2) / CAR_IMG_W) * 100}%`,
              }}
              className="absolute aspect-square"
            />
          ))}
        </motion.div>
        <span className="absolute right-2 top-2 z-10 rounded-md bg-white/90 px-2 py-0.5 text-[9px] font-extrabold text-[#111] border border-[#111]">
          Insured Fleet
        </span>
      </div>

      {/* Fleet Tiers */}
      <div className="grid grid-cols-3 gap-1.5 text-center">
        {['Land Cruiser', 'Exec Sedan', 'Coaster Bus'].map((tier, idx) => (
          <div
            key={tier}
            className={`rounded-lg px-2 py-1 text-[10px] font-bold ${outline} ${
              idx === 0 ? 'bg-[#EF6702] text-white' : 'bg-white text-[#111]'
            }`}
          >
            {tier}
          </div>
        ))}
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* 6. CAR TOW: 15-Minute Emergency Radar & Hydraulic Flatbed                  */
/* -------------------------------------------------------------------------- */
function TowAnimation({ still }: { still: boolean }) {
  return (
    <div className="relative flex h-full flex-col justify-between gap-3 p-4">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/15 px-2.5 py-0.5 text-[11px] font-bold text-red-700 dark:text-red-300">
          <span className="h-2 w-2 rounded-full bg-red-500" />
          SOS Flatbed Dispatch
        </span>
        <span className={`rounded-full bg-[#FEC804] px-2.5 py-0.5 text-[10px] font-extrabold text-[#111] ${outline}`}>
          ETA: 15 Mins
        </span>
      </div>

      {/* Radar & Recovery Map Stage (runs once on scroll) */}
      <div className={`relative overflow-hidden rounded-xl bg-slate-900 p-3 text-white ${outline}`}>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />
        <div className="relative flex items-center justify-between">
          {/* Moving Flatbed Truck */}
          <motion.div
            initial={still ? { x: 42 } : { x: 0 }}
            whileInView={{ x: 42 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.3, ease: 'easeOut', delay: 0.15 }}
            className="z-10 flex items-center gap-1.5 rounded-lg bg-[#E6F0DC] px-2.5 py-1 text-[11px] font-extrabold text-[#111] border border-[#111]"
          >
            <LuTruck size={14} />
            <span>Flatbed #04</span>
          </motion.div>

          {/* Dashed Highway Path */}
          <div className="flex-1 border-b-2 border-dashed border-emerald-400/60 mx-2" />

          {/* SOS Pin */}
          <div className="relative flex items-center justify-center">
            <span className="relative z-10 flex items-center gap-1 rounded-lg bg-red-500 px-2 py-1 text-[10px] font-bold text-white border border-white/30">
              <LuMapPin size={11} /> 3rd Mainland
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 dark:text-slate-300">
        <span className="flex items-center gap-1">
          <LuCheck size={14} className="text-emerald-600" /> 100% Hydraulic Flatbed
        </span>
        <span className="text-primary dark:text-white font-extrabold">Zero Extortion</span>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* 7. FUEL VOUCHERS: Digital QR Pump Scan & Plate Number Lock                 */
/* -------------------------------------------------------------------------- */
function FuelAnimation({ still }: { still: boolean }) {
  return (
    <div className="relative flex h-full flex-col justify-between gap-3 p-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          {['TotalEnergies', 'NNPC', 'Ardova'].map((st) => (
            <span
              key={st}
              className={`rounded-md bg-white px-2 py-0.5 text-[10px] font-bold text-[#111] ${outline}`}
            >
              {st}
            </span>
          ))}
        </div>
        <span className="text-[10px] font-extrabold text-emerald-700 dark:text-emerald-400">
          Save 4–7%/L
        </span>
      </div>

      {/* QR Scan + Litre Meter (runs once on scroll) */}
      <div className="grid grid-cols-[auto_1fr] gap-2.5 items-center">
        {/* QR Scanner Box */}
        <div className={`relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl bg-white text-[#111] ${outline}`}>
          <LuQrCode size={36} />
          <motion.div
            initial={still ? { y: 18, opacity: 0 } : { y: -24, opacity: 1 }}
            whileInView={{ y: 24, opacity: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.4, ease: 'easeInOut', delay: 0.2 }}
            className="absolute inset-x-1 h-0.5 bg-emerald-500 shadow-[0_0_8px_#10b981]"
          />
        </div>

        {/* Plate Lock & Meter */}
        <div className={`rounded-xl bg-white p-2.5 dark:bg-slate-900 ${outline}`}>
          <div className="flex items-center justify-between">
            <span className="rounded bg-[#FEC804] px-1.5 py-0.5 text-[10px] font-extrabold text-[#111] border border-[#111]">
              PLATE: LND-402-AA ✓
            </span>
            <span className="text-xs font-extrabold text-primary dark:text-white">
              65.0 Litres
            </span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
            <motion.div
              initial={still ? { width: '88%' } : { width: '15%' }}
              whileInView={{ width: '88%' }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
              className="h-full rounded-full bg-[#EF6702]"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 dark:text-slate-300">
        <span>Petrol (PMS) & Generator Diesel</span>
        <span className="text-emerald-700 dark:text-emerald-400">0% Cash Fraud</span>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* 8. MECHANIC: On-Site OBD-II Diagnostics & OEM Parts                        */
/* -------------------------------------------------------------------------- */
function MechanicAnimation({ still }: { still: boolean }) {
  const checks = ['OBD-II Engine Scan', 'Genuine OEM Parts', '3-Month Warranty']

  return (
    <div className="relative flex h-full flex-col justify-between gap-2.5 p-4">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800 dark:text-emerald-300">
          <LuWrench size={12} />
          Mobile Master Van
        </span>
        <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300">
          At Office / Home
        </span>
      </div>

      {/* Live OBD-II Diagnostic Screen (runs once on scroll) */}
      <div className={`rounded-xl bg-slate-900 p-3 text-white ${outline}`}>
        <div className="flex items-center justify-between text-[10px] text-emerald-400 font-bold">
          <span>SYSTEM DIAGNOSTIC • COMPLETE</span>
          <span>99.5% ACCURACY</span>
        </div>

        {/* Waveform Bars animating once into place */}
        <div className="mt-2 flex items-end gap-1 h-6">
          {[40, 75, 55, 95, 65, 85, 50, 90, 60, 80, 45, 70].map((h, idx) => (
            <motion.span
              key={idx}
              initial={still ? { height: `${h}%` } : { height: '15%' }}
              whileInView={{ height: `${h}%` }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: idx * 0.05, ease: 'easeOut' }}
              className="flex-1 rounded-sm bg-emerald-400"
            />
          ))}
        </div>
      </div>

      {/* Sequential Verified Badges */}
      <div className="flex flex-wrap gap-1.5">
        {checks.map((item) => (
          <span
            key={item}
            className={`inline-flex items-center gap-1 rounded-lg bg-white px-2 py-1 text-[10px] font-bold text-[#111] ${outline}`}
          >
            <LuCheck size={11} className="text-emerald-600 shrink-0" />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Exported Dispatcher Component                                              */
/* -------------------------------------------------------------------------- */
export default function ServiceMicroAnimation({ slug }: { slug: string }) {
  const still = Boolean(useReducedMotion())

  switch (slug) {
    case 'rides':
      return <RidesAnimation still={still} />
    case 'buses':
      return <BusesAnimation still={still} />
    case 'flights':
      return <FlightsAnimation still={still} />
    case 'ride-wallets':
      return <WalletsAnimation still={still} />
    case 'car-rentals':
      return <RentalsAnimation still={still} />
    case 'car-tow':
      return <TowAnimation still={still} />
    case 'fuel-vouchers':
      return <FuelAnimation still={still} />
    case 'mechanic':
      return <MechanicAnimation still={still} />
    default:
      return <RidesAnimation still={still} />
  }
}
