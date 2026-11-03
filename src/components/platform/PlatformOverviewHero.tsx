'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { GiBrain, GiLips } from 'react-icons/gi'
import { LuMouse } from 'react-icons/lu'
import { GoArrowUpRight } from 'react-icons/go'

const outline = 'border-2 border-[#111]'

const CIRCLES = [
  {
    title: 'Rides & Cabs',
    image: '/images/13.jpg',
    label: 'Bolt, Uber, inDrive & LagRide',
    pos: 'left-[14%] top-[2%] w-[45%]',
    color: 'bg-[#E6F0DC] dark:bg-emerald-400/10',
    big: true,
    href: '#rail-rides',
  },
  {
    title: 'Air Flights',
    image: '/images/21.jpg',
    label: 'Domestic & regional travel',
    pos: 'right-0 top-[12%] w-[36%] lg:-right-[4%]',
    color: 'bg-[#ECE8F1] dark:bg-violet-400/10',
    href: '#rail-flights',
  },
  {
    title: 'Staff Buses',
    image: '/images/22.jpg',
    label: 'Fixed commute shuttles',
    pos: 'left-0 top-[52%] w-[34%]',
    color: 'bg-[#DCE5EA] dark:bg-sky-400/10',
    href: '#rail-buses',
  },
  {
    title: 'Fuel & Fleet',
    image: '/images/23.jpg',
    label: 'Vouchers, rentals, tow & repairs',
    pos: 'right-[2%] top-[50%] w-[48%]',
    color: 'bg-[#E3ECFA] dark:bg-accent/15',
    big: true,
    ring: true,
    href: '#rail-fuel-vouchers',
  },
]

const CHIPS = [
  { text: '8 Integrated Rails', className: 'left-[20%] top-[49%] bg-[#FEC804] text-[#111]' },
  { text: '1 NGN Treasury', className: 'left-[53%] top-[4%] bg-[#E6F0DC] text-[#111]' },
  { text: 'Zero Wahala', className: 'right-1 top-[56%] bg-white text-[#111]' },
]

const AVATARS = [
  { src: '/images/face-1.png', className: 'left-[64%] top-0 w-[11%]' },
  { src: '/images/face-three.png', className: 'left-[1%] top-[38%] w-[11%]' },
  { src: '/images/24.jpg', className: 'left-[28%] top-[84%] w-[11%] object-[50%_20%]' },
]

const EIGHT_PLUGS = [
  { name: 'Rides', slug: 'rides', color: 'bg-[#74B044] text-[#111]' },
  { name: 'Buses', slug: 'buses', color: 'bg-[#3DA5E0] text-[#111]' },
  { name: 'Flights', slug: 'flights', color: 'bg-[#FEC804] text-[#111]' },
  { name: 'Ride Wallets', slug: 'ride-wallets', color: 'bg-[#F6EEDD] text-[#111]' },
  { name: 'Car Rentals', slug: 'car-rentals', color: 'bg-white text-[#111]' },
  { name: 'Car Tow', slug: 'car-tow', color: 'bg-[#E6F0DC] text-[#111]' },
  { name: 'Fuel Vouchers', slug: 'fuel-vouchers', color: 'bg-[#F49AC1] text-[#111]' },
  { name: 'Mechanic', slug: 'mechanic', color: 'bg-[#DCE5EA] text-[#111]' },
]

const plugVariants = {
  hidden: { opacity: 0, x: -14 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { type: 'spring' as const, stiffness: 380, damping: 20, delay: 0.15 + i * 0.06 },
  }),
}

export default function PlatformOverviewHero() {
  const still = useReducedMotion()

  return (
    <section className="relative -mt-20 md:-mt-[130px] overflow-hidden bg-[#FAF8F6] font-Quicksand dark:bg-night pb-16 pt-[120px] md:pt-[190px]">
      {/* Background subtle grid matching existing pages */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 dark:hidden"
        style={{
          backgroundImage:
            'linear-gradient(rgba(26,39,71,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(26,39,71,0.06) 1px, transparent 1px)',
          backgroundSize: '64px 64px, 64px 64px',
        }}
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 lg:grid-cols-2">
        {/* Left: Copy, Conversational Banter & 8 Snapping Rail Plugs */}
        <div className="relative max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-surface px-3 py-1.5 text-sm text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
          >
            <GiBrain size={14} aria-hidden="true" className="shrink-0 text-emerald-600 dark:text-emerald-400" />
            Complete Mobility Suite • 8 Integrated Services
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="mt-6 text-4xl font-bold !leading-[1.1] tracking-tight text-primary dark:text-white md:text-[2.75rem] xl:text-[3.25rem]"
          >
            Eight powerful mobility rails.{' '}
            <span className="mt-2 block">
              One{' '}
              <span className={`inline-block -rotate-2 rounded-full bg-[#EF6702] px-3.5 py-0.5 text-white ${outline}`}>
                Operating System.
              </span>
            </span>
          </motion.h1>

          {/* Hand-drawn loop pointing toward the floating circles on desktop */}
          <svg
            aria-hidden
            viewBox="0 0 220 140"
            fill="none"
            className="pointer-events-none absolute -right-14 top-16 hidden w-40 text-primary/40 dark:text-slate-400/40 xl:block"
          >
            <motion.path
              d="M6 70 C 48 68, 92 32, 125 46 C 152 58, 120 96, 102 74 C 86 54, 145 20, 198 62"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.3, ease: 'easeInOut', delay: 0.3 }}
            />
            <motion.path
              d="M188 52 L200 63 L185 69"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.5, duration: 0.2 }}
            />
          </svg>

          <div className="mt-6 flex flex-col items-start gap-3 text-left text-base md:text-lg">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex items-center gap-3 text-slate-600 dark:text-slate-300"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/15 dark:text-emerald-400">
                <GiBrain size={18} aria-hidden="true" />
              </span>
              <span className="text-[15px]">
                Wait, so we don&apos;t have to manage 10 separate vendors for rides, buses, flights, and fuel?
              </span>
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.45 }}
              className="flex items-center gap-3 font-medium text-primary dark:text-white"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent dark:bg-accent/20">
                <GiLips size={18} aria-hidden="true" />
              </span>
              <span className="text-[15px]">
                Never again. Lyncs plugs directly into ride networks, bus operators, domestic airlines, fuel stations, and mobile technicians. 1 NGN wallet, 1 bill, total visibility.
              </span>
            </motion.p>
          </div>

          {/* 8 Snapping Rail Plugs (mirrors PlugInSection on HomePage) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-7"
          >
            <p className="mb-2.5 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Click any rail to jump or inspect:
            </p>
            <ul className="flex flex-wrap gap-2.5" aria-label="8 Mobility Rails">
              {EIGHT_PLUGS.map(({ name, slug, color }, i) => (
                <motion.li key={slug} variants={plugVariants} custom={i}>
                  <a
                    href={`#rail-${slug}`}
                    className="group flex items-center transition-transform hover:-translate-y-0.5"
                  >
                    <span aria-hidden className="flex flex-col gap-1">
                      <span className="h-1 w-2 rounded-l-sm bg-[#111] dark:bg-slate-300" />
                      <span className="h-1 w-2 rounded-l-sm bg-[#111] dark:bg-slate-300" />
                    </span>
                    <span className={`rounded-lg px-3 py-1 text-xs font-bold ${outline} ${color} group-hover:shadow-[2px_2px_0_#111] dark:group-hover:shadow-[2px_2px_0_#fff]`}>
                      {name}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className={`inline-flex items-center gap-2 rounded-xl bg-accent px-7 py-3 text-[15px] font-bold text-white transition hover:bg-opacity-90 dark:bg-white dark:text-primary dark:hover:bg-slate-200 ${outline} shadow-[4px_4px_0_#111] dark:shadow-[4px_4px_0_#fff]`}
            >
              Book a live walkthrough
              <GoArrowUpRight size={18} />
            </Link>
            <a
              href="#platform-services"
              className="inline-flex rounded-xl border-2 border-accent px-6 py-3 text-[15px] font-bold text-accent transition hover:bg-accent/5 dark:border-white/20 dark:text-white dark:hover:border-white/40 dark:hover:bg-white/5"
            >
              Explore all 8 services
            </a>
          </div>

          <p className="mt-10 flex items-center gap-2 text-sm text-primary dark:text-slate-300">
            <LuMouse size={18} aria-hidden="true" />
            Keep scrolling to see all 8 interactive mobility modules
          </p>
        </div>

        {/* Right: Floating Circle Cluster with Orbital Ring & Live Telemetry */}
        <div className="relative mx-auto aspect-square w-full max-w-[500px] lg:max-w-[560px]">
          {/* Subtle orbital dashed SVG ring connecting the cluster */}
          <svg
            aria-hidden
            viewBox="0 0 400 400"
            className="pointer-events-none absolute inset-0 h-full w-full text-slate-300/70 dark:text-white/10"
          >
            <circle
              cx="200"
              cy="200"
              r="145"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="6 6"
            />
          </svg>

          <span
            aria-hidden
            className="absolute left-[8%] top-[16%] h-3 w-3 rounded-full bg-slate-200 dark:bg-white/10"
          />
          <span
            aria-hidden
            className="absolute bottom-[6%] left-[6%] h-4 w-4 rounded-full bg-highlight/30"
          />

          {CIRCLES.map(({ title, label, pos, color, big, ring, image, href }, i) => (
            <motion.a
              href={href}
              key={title}
              initial={{ opacity: 0, scale: 0.86 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className={`group absolute aspect-square ${pos}`}
            >
              {ring && (
                <span
                  aria-hidden
                  className="absolute -inset-[8%] rounded-full border border-slate-300 dark:border-white/10"
                />
              )}
              <motion.div
                animate={still ? undefined : { y: [0, -8, 0] }}
                transition={{ duration: 6 + i, repeat: Infinity, ease: 'easeInOut' }}
                className={`relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-full bg-cover bg-center text-center shadow-xl shadow-slate-900/10 ring-4 ring-white transition-transform duration-300 group-hover:scale-[1.03] dark:shadow-black/30 dark:ring-slate-800 sm:ring-6 lg:ring-8 ${color}`}
                style={image ? { backgroundImage: `url('${image}')` } : undefined}
              >
                {image && (
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-b from-primary/30 to-primary/75 transition-opacity group-hover:opacity-90"
                  />
                )}
                <p
                  className={`relative font-bold tracking-tight ${
                    image ? 'text-white' : 'text-primary dark:text-white'
                  } ${big ? 'text-lg sm:text-2xl lg:text-3xl' : 'text-base sm:text-xl lg:text-2xl'}`}
                >
                  {title}
                </p>
                <p
                  className={`relative mt-0.5 px-3 text-[10px] font-medium leading-tight sm:mt-1 sm:px-4 sm:text-xs ${
                    image ? 'text-white/90' : 'text-primary/80 dark:text-slate-300'
                  }`}
                >
                  {label}
                </p>
              </motion.div>
            </motion.a>
          ))}

          {/* Floating Neo-Brutalist Chips */}
          {CHIPS.map(({ text, className }, i) => (
            <motion.span
              key={text}
              animate={still ? undefined : { y: [0, -5, 0] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
              className={`absolute z-20 rounded-full px-3 py-1 text-xs font-extrabold shadow-[3px_3px_0_#111] ${outline} ${className}`}
            >
              {text}
            </motion.span>
          ))}

          {/* Avatars */}
          {AVATARS.map(({ src, className }) => (
            <img
              key={src}
              alt=""
              src={src}
              className={`absolute z-10 aspect-square rounded-full object-cover shadow-md ring-2 ring-white dark:ring-slate-800 sm:ring-4 ${className}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
