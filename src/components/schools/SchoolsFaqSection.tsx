'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { GiBrain } from 'react-icons/gi'
import { LuMapPin, LuShieldCheck, LuReceipt } from 'react-icons/lu'

const CARDS = [
  {
    title: 'Knowing Where the Bus Is',
    Icon: LuMapPin,
    question: 'How will parents and the school know where the bus is and when children arrive?',
    answer: 'Everyone gets live tracking with automatic pickup and drop-off alerts, plus a real-time map and daily trip logs for your transport administrator.',
    reaction: 'Ehen! That will stop the endless calls to the front office.',
    avatar: '/images/face-1.png',
    color: 'bg-green-950 dark:bg-green-100/10',
    tint: 'text-green-300',
    bubble: 'bg-green-400/15',
    reply: 'bg-green-100 text-green-950',
    layer: 'z-20',
    rings: '',
  },
  {
    title: 'Driver Safety & Vetting',
    Icon: LuShieldCheck,
    question: 'Who is driving our students, and how do we know they are safe and qualified?',
    answer: 'Every Lyncs driver is background-checked, trained and assigned to a route with daily logs, so you always have a clear record of who is behind the wheel.',
    reaction: 'Correct! Proper accountability for every single trip.',
    avatar: '/images/face-three.png',
    color: 'bg-fuchsia-950 dark:bg-fuchsia-100/10',
    tint: 'text-fuchsia-300',
    bubble: 'bg-fuchsia-400/15',
    reply: 'bg-fuchsia-100 text-fuchsia-950',
    layer: 'z-10',
    rings: '',
  },
  {
    title: 'Costs & Billing',
    Icon: LuReceipt,
    question: 'Do we have to buy buses and manage fuel, or how does the school pay?',
    answer: 'No capital outlay needed. Lyncs provides the fleet and drivers, and all transport is consolidated into one simple monthly invoice for the school.',
    reaction: 'Sharp. One clear bill instead of scattered petty cash.',
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

export default function SchoolsFaqSection() {
  return (
    <section className="relative overflow-x-hidden bg-white py-16 font-Quicksand dark:bg-night md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="max-w-3xl">
          <p className="flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-surface px-3 py-1.5 text-sm text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
            <GiBrain size={14} aria-hidden="true" className="shrink-0 text-emerald-600 dark:text-emerald-400" />
            Questions Schools Ask
          </p>
          <h2 className="mt-6 text-4xl font-bold !leading-[1.1] tracking-tight text-primary dark:text-white md:text-[2.5rem] xl:text-[3rem]">
            The three questions every school asks.{' '}
            <span className="text-emerald-600 dark:text-emerald-400">All answered.</span>
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
            Ready to hand your school transport to a team that handles it all?
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/book-demo"
              className="inline-flex rounded bg-primary px-6 py-3 text-sm font-semibold tracking-wide text-white transition hover:bg-opacity-90 dark:bg-white dark:text-primary dark:hover:bg-slate-200"
            >
              Book a school demo
            </Link>
            <Link
              href="/contact"
              className="inline-flex rounded border border-primary px-6 py-3 text-sm font-semibold tracking-wide text-primary transition hover:bg-primary/5 dark:border-white/30 dark:text-white dark:hover:bg-white/5"
            >
              Talk to our team
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
