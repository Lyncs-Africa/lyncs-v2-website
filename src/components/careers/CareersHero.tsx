'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { GiBrain, GiLips } from 'react-icons/gi'
import { LuMouse, LuSparkles, LuLaptop, LuHeartHandshake, LuZap } from 'react-icons/lu'
import { GoArrowUpRight } from 'react-icons/go'

const outline = 'border-2 border-[#111]'

const PERKS = [
  { title: 'MacBook Pro & Setup', desc: 'Latest M-series hardware + monitor of your choice', icon: LuLaptop, color: 'bg-[#E6F0DC]' },
  { title: 'Lyncs Ride & EV Credits', desc: 'Monthly mobility allowance to move across Lagos freely', icon: LuZap, color: 'bg-[#F6EEDD]' },
  { title: 'Top-tier Health & HMO', desc: 'Comprehensive medical coverage including dental & optical', icon: LuHeartHandshake, color: 'bg-[#DCE5EA]' },
  { title: 'High Autonomy & Equity', desc: 'Meaningful ownership, zero micromanagement, real responsibility', icon: LuSparkles, color: 'bg-[#ECE8F1]' },
]

export default function CareersHero() {
  const still = useReducedMotion()

  return (
    <section className="relative -mt-20 md:-mt-[130px] overflow-hidden bg-[#FAF8F6] font-Quicksand dark:bg-night pb-16 pt-[120px] md:pt-[190px]">
      {/* Background subtle grid matching HomeHero */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 dark:hidden"
        style={{
          backgroundImage:
            'linear-gradient(rgba(26,39,71,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(26,39,71,0.06) 1px, transparent 1px)',
          backgroundSize: '64px 64px, 64px 64px',
        }}
      />

      <div className="relative mx-auto max-w-5xl px-4 text-center">
        {/* Top pill badge */}
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-surface px-4 py-1.5 text-sm text-primary dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            We’re hiring across Lagos & Africa • 5 open roles
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="mx-auto mt-6 max-w-4xl text-4xl sm:text-5xl md:text-[56px] font-bold !leading-[1.1] tracking-tight text-primary dark:text-white">
          Build the mobility rails for Africa.{' '}
          <span className="block mt-1 text-accent">High ownership.</span>
          <span className="block mt-1 text-2xl sm:text-3xl md:text-4xl text-slate-400 dark:text-slate-500 font-semibold">
            Zero corporate politics.
          </span>
        </h1>

        {/* Conversational banter with GiBrain & GiLips */}
        <div className="mx-auto mt-7 flex w-fit max-w-xl flex-col items-start gap-3 text-left text-base md:text-lg">
          <p className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/15 dark:text-emerald-400">
              <GiBrain size={18} aria-hidden="true" />
            </span>
            <span className="text-[15px]">Is this in-person in Victoria Island or fully remote?</span>
          </p>
          <p className="flex items-center gap-3 font-medium text-primary dark:text-white">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent dark:bg-accent/20">
              <GiLips size={18} aria-hidden="true" />
            </span>
            <span className="text-[15px]">
              Hybrid in our Victoria Island HQ (with unlimited chef meals & zero power cuts) + remote-friendly across Africa.
            </span>
          </p>
        </div>

        {/* 4 Flat Perk Cards with up-and-down micro-animations (NO blurry shadows) */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          {PERKS.map(({ title, desc, icon: Icon, color }, i) => (
            <motion.div
              key={title}
              animate={still ? undefined : { y: [0, -6, 0] }}
              transition={{
                duration: 5 + i * 0.4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.2,
              }}
              className={`rounded-2xl bg-white p-5 ${outline} dark:bg-[#141A2B]`}
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 dark:border-white/10 ${color} text-[#111]`}>
                <Icon size={20} />
              </div>
              <h3 className="mt-4 text-sm font-bold text-primary dark:text-white">
                {title}
              </h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Jump CTA */}
        <div className="mt-10 flex items-center justify-center gap-4">
          <a
            href="#open-roles"
            className="inline-flex rounded bg-accent px-7 py-3 text-[15px] font-medium text-white transition hover:bg-opacity-90 dark:bg-white dark:text-primary dark:hover:bg-slate-200"
          >
            Explore open roles
          </a>
          <a
            href="#culture"
            className="inline-flex rounded border border-accent px-6 py-3 text-[15px] font-medium text-accent transition hover:bg-accent/5 dark:border-white/20 dark:text-white dark:hover:border-white/40 dark:hover:bg-white/5"
          >
            Read how we work
          </a>
        </div>
      </div>
    </section>
  )
}
