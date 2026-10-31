'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { GiBrain } from 'react-icons/gi'
import { LuLayers, LuReceipt, LuSmartphone } from 'react-icons/lu'

const CARDS = [
  {
    title: 'Modular Adoption',
    Icon: LuLayers,
    question: 'Can we start with just one service (like Rides or Fuel) before rolling out the rest?',
    answer: '100% yes. Activate only what you need today—such as staff rides or digital fuel vouchers—and turn on Shuttles, Flights, or Towing as your operations scale.',
    reaction: 'Ehen! Exactly the modularity our company wanted.',
    avatar: '/images/face-1.png',
    color: 'bg-green-950 dark:bg-green-100/10',
    tint: 'text-green-300',
    bubble: 'bg-green-400/15',
    reply: 'bg-green-100 text-green-950',
    layer: 'z-20',
    rings: '',
  },
  {
    title: 'Unified Billing',
    Icon: LuReceipt,
    question: 'How does billing work when our team uses 4 different services in one month?',
    answer: 'All expenses draw from your single company treasury balance. At month-end, finance receives 1 consolidated tax invoice itemizing every ride, flight, and fuel litre.',
    reaction: 'One single invoice for Bolt, flights, shuttles, and fuel? Perfect.',
    avatar: '/images/face-three.png',
    color: 'bg-fuchsia-950 dark:bg-fuchsia-100/10',
    tint: 'text-fuchsia-300',
    bubble: 'bg-fuchsia-400/15',
    reply: 'bg-fuchsia-100 text-fuchsia-950',
    layer: 'z-10',
    rings: '',
  },
  {
    title: 'App & Dashboard',
    Icon: LuSmartphone,
    question: 'How do employees and finance managers access the platform daily?',
    answer: 'Employees use the lightweight Lyncs mobile app for on-demand rides, bus passes, and fuel vouchers. Finance and HR use the web command portal.',
    reaction: 'Sharp. Total convenience for staff and full visibility for finance.',
    avatar: '/images/24.jpg',
    color: 'bg-purple-950 dark:bg-purple-100/10',
    tint: 'text-purple-300',
    bubble: 'bg-purple-400/15',
    reply: 'bg-purple-100 text-purple-950',
    layer: '',
    rings: 'md:hidden',
  },
]

const RING = 'h-[10px] w-full rounded-full bg-white dark:bg-night'
const AVATAR = 'h-10 w-10 shrink-0 rounded-full ring-2 ring-white/20'

const bubbleVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.96 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, delay },
  }),
}

export default function PlatformFaqSection() {
  return (
    <section className="relative overflow-x-hidden bg-white py-16 font-Quicksand dark:bg-night md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="max-w-3xl">
          <p className="flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-surface px-3 py-1.5 text-sm text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
            <GiBrain size={14} aria-hidden="true" className="shrink-0 text-emerald-600 dark:text-emerald-400" />
            Platform Questions
          </p>
          <h2 className="mt-6 text-4xl font-bold !leading-[1.1] tracking-tight text-primary dark:text-white md:text-[2.5rem] xl:text-[3rem]">
            How the platform works together.{' '}
            <span className="text-emerald-600 dark:text-emerald-400">Clear answers.</span>
          </h2>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className="relative grid-cols-3 gap-4 space-y-8 pt-10 md:grid md:space-y-0"
        >
          {CARDS.map(
            (
              {
                title,
                Icon,
                question,
                answer,
                reaction,
                avatar,
                color,
                tint,
                bubble,
                reply,
                layer,
                rings,
              },
              i
            ) => (
              <div
                key={title}
                className={`relative min-h-[260px] rounded-2xl px-6 py-8 md:min-h-[300px] text-white ${layer} ${color}`}
              >
                <div aria-hidden className={`absolute -right-8 top-0 h-full w-12 space-y-8 py-10 ${rings}`}>
                  <div className={RING} />
                  <div className={RING} />
                  <div className={RING} />
                  <div className={RING} />
                  <div className={RING} />
                  <div className={`${RING} hidden md:block`} />
                </div>

                <h3 className="flex items-center gap-3 text-[24px] font-bold !leading-[1.1] tracking-tight md:text-[20px]">
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 ${tint}`}>
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  {title}
                </h3>

                <div className="mt-6 space-y-4 pr-4">
                  <motion.div variants={bubbleVariants} custom={0.2 + i * 0.15} className="flex items-end gap-2.5">
                    <img src={avatar} alt="" className={`${AVATAR} object-cover object-[50%_20%]`} />
                    <p className={`max-w-[80%] rounded-2xl rounded-bl-md px-4 py-2.5 text-[15px] font-semibold leading-snug ${bubble}`}>
                      {question}
                    </p>
                  </motion.div>

                  <motion.div variants={bubbleVariants} custom={0.75 + i * 0.15} className="flex flex-row-reverse items-end gap-2.5">
                    <span className={`${AVATAR} flex items-center justify-center bg-white p-2`}>
                      <img src="/apple-touch-icon.png" alt="Lyncs" className="h-full w-full object-contain" />
                    </span>
                    <p className={`max-w-[80%] rounded-2xl rounded-br-md px-4 py-2.5 text-[15px] leading-snug ${reply}`}>
                      {answer}
                    </p>
                  </motion.div>

                  <motion.div variants={bubbleVariants} custom={1.3 + i * 0.15} className="flex items-end gap-2.5">
                    <img src={avatar} alt="" className={`${AVATAR} object-cover object-[50%_20%]`} />
                    <p className={`max-w-[80%] rounded-2xl rounded-bl-md px-4 py-2.5 text-[15px] font-semibold leading-snug ${bubble}`}>
                      {reaction}
                    </p>
                  </motion.div>
                </div>
              </div>
            )
          )}
        </motion.div>

        <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[20px] tracking-tight text-primary dark:text-white md:text-[20px]">
            Ready to connect your company mobility?
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex rounded bg-primary px-6 py-3 text-sm font-semibold tracking-wide text-white transition hover:bg-opacity-90 dark:bg-white dark:text-primary dark:hover:bg-slate-200"
            >
              Book a live walkthrough
            </Link>
            <a
              href="https://wa.me/2349055552055?text=Hello%20Lyncs%2C%20we%20want%20to%20learn%20more%20about%20the%20platform%20suite."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded border border-primary px-6 py-3 text-sm font-semibold tracking-wide text-primary transition hover:bg-primary/5 dark:border-white/30 dark:text-white dark:hover:bg-white/5"
            >
              Speak with a platform engineer
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
