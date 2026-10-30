'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { GiBrain, GiLips } from 'react-icons/gi'
import { LuMouse } from 'react-icons/lu'
import { GoArrowUpRight } from 'react-icons/go'

const CIRCLES = [
  {
    title: 'Staff Rides',
    image: '/images/13.jpg',
    label: 'Bolt, Uber & LagRide',
    pos: 'left-[14%] top-[2%] w-[45%]',
    color: 'bg-[#E6F0DC] dark:bg-emerald-400/10',
    big: true,
  },
  {
    title: 'Flights',
    image: '/images/21.jpg',
    label: 'Corporate domestic & regional',
    pos: 'right-0 top-[12%] w-[36%] lg:-right-[4%]',
    color: 'bg-[#ECE8F1] dark:bg-violet-400/10',
  },
  {
    title: 'Staff Shuttles',
    image: '/images/22.jpg',
    label: 'Fixed staff commute routes',
    pos: 'left-0 top-[52%] w-[34%]',
    color: 'bg-[#DCE5EA] dark:bg-sky-400/10',
  },
  {
    title: 'Fleet & Fuel',
    image: '/images/overview.jpg',
    label: 'Digital vouchers & EV swap',
    pos: 'right-[2%] top-[50%] w-[48%]',
    color: 'bg-[#E3ECFA] dark:bg-accent/15',
    big: true,
    ring: true,
  },
]

const CHIPS = [
  { text: '1 Monthly Invoice', className: 'left-[22%] top-[50%]' },
  { text: 'Auto Policy Limits', className: 'left-[56%] top-[4%]' },
  { text: 'Zero Wahala', className: 'right-1 top-[58%]' },
]

const AVATARS = [
  { src: '/images/face-1.png', className: 'left-[64%] top-0 w-[11%]' },
  { src: '/images/face-three.png', className: 'left-[1%] top-[38%] w-[11%]' },
  { src: '/images/24.jpg', className: 'left-[28%] top-[84%] w-[11%] object-[50%_20%]' },
]

export default function BusinessesHero() {
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
        {/* Left: Copy & Conversational Banter */}
        <div className="max-w-xl">
          <p className="flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-surface px-3 py-1.5 text-sm text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
            <GiBrain size={14} aria-hidden="true" className="shrink-0 text-emerald-600 dark:text-emerald-400" />
            Corporate Mobility OS • Built for African Enterprises
          </p>

          <h1 className="mt-6 text-4xl font-bold !leading-[1.1] tracking-tight text-primary dark:text-white md:text-[2.75rem] xl:text-[3.25rem]">
            Consolidate rides, shuttles, flights & fuel into{' '}
            <span className="block mt-1 text-accent">one corporate wallet.</span>
          </h1>

          <div className="mt-6 flex flex-col items-start gap-3 text-left text-base md:text-lg">
            <p className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/15 dark:text-emerald-400">
                <GiBrain size={18} aria-hidden="true" />
              </span>
              <span className="text-[15px]">
                Our finance team spends 3 weeks reconciling Bolt receipts and petrol claims.
              </span>
            </p>
            <p className="flex items-center gap-3 font-medium text-primary dark:text-white">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent dark:bg-accent/20">
                <GiLips size={18} aria-hidden="true" />
              </span>
              <span className="text-[15px]">
                Say goodbye to manual claims. Staff ride on pre-allocated company limits, and finance gets 1 single, audit-ready month-end tax invoice.
              </span>
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded bg-accent px-7 py-3 text-[15px] font-medium text-white transition hover:bg-opacity-90 dark:bg-white dark:text-primary dark:hover:bg-slate-200"
            >
              Book a 15-min demo
              <GoArrowUpRight size={18} />
            </Link>
            <a
              href="#solutions"
              className="inline-flex rounded border border-accent px-6 py-3 text-[15px] font-medium text-accent transition hover:bg-accent/5 dark:border-white/20 dark:text-white dark:hover:border-white/40 dark:hover:bg-white/5"
            >
              See how it works
            </a>
          </div>

          <p className="mt-12 flex items-center gap-2 text-sm text-primary dark:text-slate-300">
            <LuMouse size={18} aria-hidden="true" />
            Keep scrolling to explore the enterprise mobility OS
          </p>
        </div>

        {/* Right: Floating Circle Cluster */}
        <div className="relative mx-auto aspect-square w-full max-w-[500px] lg:max-w-[560px]">
          <span
            aria-hidden
            className="absolute left-[8%] top-[16%] h-3 w-3 rounded-full bg-slate-200 dark:bg-white/10"
          />
          <span
            aria-hidden
            className="absolute bottom-[6%] left-[6%] h-4 w-4 rounded-full bg-highlight/30"
          />

          {CIRCLES.map(({ title, label, pos, color, big, ring, image }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, scale: 0.88 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`absolute aspect-square ${pos}`}
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
                className={`relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-full bg-cover bg-center text-center ring-4 ring-white dark:ring-slate-800 sm:ring-6 lg:ring-8 ${color}`}
                style={image ? { backgroundImage: `url('${image}')` } : undefined}
              >
                {image && (
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-b from-primary/30 to-primary/75"
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
            </motion.div>
          ))}

          {/* Chips */}
          {CHIPS.map(({ text, className }) => (
            <span
              key={text}
              className={`absolute z-20 rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-bold text-primary dark:border-white/20 dark:bg-slate-800 dark:text-white ${className}`}
            >
              {text}
            </span>
          ))}

          {/* Avatars */}
          {AVATARS.map(({ src, className }) => (
            <img
              key={src}
              alt=""
              src={src}
              className={`absolute z-10 aspect-square rounded-full object-cover ring-2 ring-white dark:ring-slate-800 sm:ring-4 ${className}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
