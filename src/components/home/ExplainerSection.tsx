'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { GiBrain, GiLips } from 'react-icons/gi'
import { GoArrowUpRight } from 'react-icons/go'
import { IoArrowForward, IoCalendarOutline, IoGridOutline, IoWalletOutline } from 'react-icons/io5'

// Picks up the hero's dialogue: the visitor asks, we answer
const BUBBLES = [
  { text: 'What does that even mean, Mr man?', Icon: GiBrain, from: 'visitor', offset: '' },
  { text: 'Your people move for work.', Icon: GiLips, from: 'us', offset: 'ml-10 md:ml-24' },
  { text: 'You run all of it from one dashboard.', Icon: GiLips, from: 'us', offset: 'ml-4 md:ml-10' },
] as const

const POINTS = [
  { text: 'Ride, bus, flight — booked, managed and paid from one place.', Icon: IoCalendarOutline },
  { text: 'One wallet. One bill.', Icon: IoWalletOutline },
  { text: 'No wahala, no ten apps.', Icon: IoGridOutline },
]

const pill = 'inline-block rounded-full border-2 px-3 md:px-4 leading-[1.15]'

export default function ExplainerSection() {
  return (
    <section className="bg-white py-16 font-Quicksand dark:bg-night md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="relative overflow-hidden rounded-[32px] bg-cover bg-center p-4 md:p-6" style={{ backgroundImage: "url('/images/13.jpg')" }}>
          <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/20 to-black/10 dark:from-black/65 dark:via-black/40 dark:to-black/30" />

          <div className="relative grid gap-6 md:grid-cols-2 md:gap-8">
            {/* Left: the conversation */}
            <div className="flex flex-col justify-between gap-8 p-2 md:p-6">
              <ul className="space-y-4 pt-2 md:pt-6">
                {BUBBLES.map(({ text, Icon, from, offset }, i) => (
                  <motion.li
                    key={text}
                    initial={{ opacity: 0, y: 16, scale: 0.96 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.4, delay: i * 0.5 }}
                    className={`flex w-fit items-center gap-2.5 rounded-2xl px-4 py-2.5 text-sm shadow-lg backdrop-blur md:text-[15px] ${offset} ${
                      from === 'visitor'
                        ? 'rounded-bl-md bg-white/90 text-primary dark:bg-slate-900/85 dark:text-slate-100'
                        : 'rounded-tl-md bg-accent/95 text-white'
                    }`}
                  >
                    <Icon
                      size={16}
                      aria-hidden="true"
                      className={from === 'visitor' ? 'shrink-0 text-emerald-600 dark:text-emerald-400' : 'shrink-0 text-white'}
                    />
                    {text}
                  </motion.li>
                ))}
              </ul>

              {/* Polaroid */}
              <motion.div
                initial={{ opacity: 0, rotate: -8, y: 24 }}
                whileInView={{ opacity: 1, rotate: -4, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: 1.4 }}
                className="hidden w-64 rounded-2xl bg-white p-2 shadow-2xl md:block dark:bg-slate-900"
              >
                <img src="/images/bus-bg.jpg" alt="A commuter booking her trip on her phone" className="aspect-[4/3] w-full rounded-xl object-cover" />
              </motion.div>
            </div>

            {/* Right: the answer, on frosted glass */}
            <div className="flex flex-col justify-center rounded-[24px] bg-white/85 p-6 backdrop-blur-xl dark:bg-night/80 md:p-10">
              <h2 className="text-4xl font-bold tracking-tight text-primary dark:text-white md:text-5xl">
                <span className="flex flex-wrap items-center gap-2 md:gap-3">
                  <span className={`${pill} border-primary dark:border-white/70`}>Ride.</span>
                  <span className={`${pill} border-accent text-accent`}>Bus.</span>
                </span>
                <span className="mt-2 flex flex-wrap items-center gap-2 md:gap-3">
                  <span className={`${pill} border-primary dark:border-white/70`}>Flight.</span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary dark:border-white/70 md:h-12 md:w-12">
                    <IoArrowForward size={20} aria-hidden="true" />
                  </span>
                </span>
                <span className="mt-2 block">One dashboard.</span>
              </h2>

              <ul className="mt-8 space-y-3">
                {POINTS.map(({ text, Icon }) => (
                  <li key={text} className="flex items-start gap-3 text-[15px] text-slate-600 dark:text-slate-300">
                    <Icon size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-accent" />
                    {text}
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-wrap items-center gap-5">
                <Link
                  href="/contact"
                  className="rounded-full bg-primary px-6 py-3 text-[15px] font-medium text-white transition hover:bg-opacity-90 dark:bg-white dark:text-primary dark:hover:bg-slate-200"
                >
                  Book a demo
                </Link>
                <Link
                  href="/platform/rides"
                  className="group flex items-center gap-3 text-[15px] font-medium text-primary dark:text-white"
                >
                  Explore the platform
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 transition group-hover:border-primary dark:border-white/30 dark:group-hover:border-white">
                    <GoArrowUpRight size={18} aria-hidden="true" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
