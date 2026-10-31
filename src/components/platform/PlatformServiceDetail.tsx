'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { GiBrain, GiLips } from 'react-icons/gi'
import { GoArrowUpRight } from 'react-icons/go'
import { IoCloseCircleOutline, IoCheckmarkCircle, IoLogoWhatsapp } from 'react-icons/io5'
import {
  LuCar,
  LuBus,
  LuPlane,
  LuWallet,
  LuKey,
  LuTruck,
  LuFuel,
  LuWrench,
  LuCheck,
  LuMouse,
} from 'react-icons/lu'
import { PlatformService, PLATFORM_SERVICES } from '../../data/platformServices'

const outline = 'border-2 border-[#111]'

const ICON_MAP: Record<string, any> = {
  LuCar,
  LuBus,
  LuPlane,
  LuWallet,
  LuKey,
  LuTruck,
  LuFuel,
  LuWrench,
}

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

export default function PlatformServiceDetail({ service }: { service: PlatformService }) {
  const still = useReducedMotion()
  const Icon = ICON_MAP[service.iconName] || LuCar
  const allServices = Object.values(PLATFORM_SERVICES)

  return (
    <div className="font-Quicksand">
      {/* 1. Hero Section with Top Service Switcher */}
      <section className="relative -mt-20 md:-mt-[130px] overflow-hidden bg-[#FAF8F6] dark:bg-night pb-16 pt-[120px] md:pt-[180px]">
        {/* Subtle grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 dark:hidden"
          style={{
            backgroundImage:
              'linear-gradient(rgba(26,39,71,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(26,39,71,0.06) 1px, transparent 1px)',
            backgroundSize: '64px 64px, 64px 64px',
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4">
          {/* Horizontal Service Switcher Bar */}
          <div className="mb-10 overflow-x-auto pb-2 scrollbar-none">
            <div className="flex items-center gap-2 min-w-max">
              <Link
                href="/platform"
                className="flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-700 transition hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
              >
                ← Platform Suite
              </Link>
              <span className="h-4 w-px bg-slate-300 dark:bg-white/20 mx-1" />
              {allServices.map((item) => {
                const ItemIcon = ICON_MAP[item.iconName] || LuCar
                const isActive = item.slug === service.slug
                return (
                  <Link
                    key={item.slug}
                    href={`/platform/${item.slug}`}
                    className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
                      isActive
                        ? `bg-[#1A2747] text-white ${outline} shadow-[2px_2px_0_#EF6702] dark:bg-white dark:text-primary dark:shadow-[2px_2px_0_#fff]`
                        : 'border border-slate-200 bg-white/70 text-slate-600 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10'
                    }`}
                  >
                    <ItemIcon size={14} />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left: Copy & Banter */}
            <div className="max-w-xl">
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-1.5 rounded-full ${service.color} px-3 py-1 text-xs font-bold text-[#111] ${outline}`}>
                  <Icon size={14} />
                  {service.badge}
                </span>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Platform Rail
                </span>
              </div>

              <h1 className="mt-6 text-4xl font-bold !leading-[1.1] tracking-tight text-primary dark:text-white md:text-[2.75rem] xl:text-[3.25rem]">
                {service.heroHeading}{' '}
                <span className="block mt-1 text-accent">{service.heroAccent}</span>
              </h1>

              {/* Conversational banter */}
              <div className="mt-6 flex flex-col items-start gap-3 text-left text-base md:text-lg">
                <p className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/15 dark:text-emerald-400">
                    <GiBrain size={18} aria-hidden="true" />
                  </span>
                  <span className="text-[15px]">{service.dialogBrain}</span>
                </p>
                <p className="flex items-center gap-3 font-medium text-primary dark:text-white">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent dark:bg-accent/20">
                    <GiLips size={18} aria-hidden="true" />
                  </span>
                  <span className="text-[15px]">{service.dialogLips}</span>
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href={service.primaryCtaHref}
                  className="inline-flex items-center gap-2 rounded bg-accent px-7 py-3 text-[15px] font-medium text-white transition hover:bg-opacity-90 dark:bg-white dark:text-primary dark:hover:bg-slate-200"
                >
                  {service.primaryCtaText}
                  <GoArrowUpRight size={18} />
                </Link>
                <a
                  href="#capabilities"
                  className="inline-flex rounded border border-accent px-6 py-3 text-[15px] font-medium text-accent transition hover:bg-accent/5 dark:border-white/20 dark:text-white dark:hover:border-white/40 dark:hover:bg-white/5"
                >
                  Explore features
                </a>
              </div>

              <p className="mt-10 flex items-center gap-2 text-sm text-primary dark:text-slate-300">
                <LuMouse size={18} aria-hidden="true" />
                Scroll down for full specs & comparison
              </p>
            </div>

            {/* Right: Rich Visual Showcase */}
            <div className="relative mx-auto aspect-square w-full max-w-[480px] lg:max-w-[540px]">
              {/* Outer decorative neo-brutalist frame */}
              <div
                className={`relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[32px] bg-cover bg-center p-6 sm:p-8 ${outline} shadow-[8px_8px_0_#111] dark:shadow-[8px_8px_0_#fff]`}
                style={{ backgroundImage: `url('${service.heroImage}')` }}
              >
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/50 to-primary/20 pointer-events-none" />

                {/* Top Badge on image */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className={`rounded-full bg-white px-3 py-1 text-xs font-bold text-primary ${outline}`}>
                    {service.label} Module
                  </span>
                  <span className="rounded-full bg-accent/90 px-3 py-1 text-xs font-bold text-white">
                    Live in Nigeria
                  </span>
                </div>

                {/* Bottom Card Overlay */}
                <div className="relative z-10 rounded-2xl bg-white/95 p-5 text-primary backdrop-blur-md dark:bg-slate-900/95 dark:text-white border border-slate-200 dark:border-white/10">
                  <div className="flex items-center gap-3">
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${service.color} text-[#111] ${outline}`}>
                      <Icon size={20} />
                    </span>
                    <div>
                      <h4 className="font-bold text-sm sm:text-base leading-snug">
                        {service.shortTitle}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {service.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Connected Providers Row */}
                  <div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-white/10 flex flex-wrap gap-1.5">
                    {service.providers.map((p, idx) => (
                      <span
                        key={idx}
                        className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700 dark:bg-white/10 dark:text-slate-200"
                      >
                        {p.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Connected Providers Showcase Bar */}
      <section className="border-y border-slate-200 bg-white py-6 dark:border-white/10 dark:bg-night">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Integrated Networks & Infrastructure:
            </span>
            <div className="flex flex-wrap items-center gap-3">
              {service.providers.map((p, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-2 rounded-xl bg-slate-50 px-3.5 py-1.5 text-xs font-bold text-primary dark:bg-white/5 dark:text-white ${outline}`}
                >
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span>{p.name}</span>
                  <span className="text-[10px] text-slate-400 font-normal">({p.tag})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Problem vs Solution Side-by-Side Comparison */}
      <section className="bg-[#FAF8F6] dark:bg-night py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div
            className={`rounded-[32px] bg-[#F6EEDD] p-6 sm:p-10 md:p-12 ${outline} shadow-[8px_8px_0_#111] dark:bg-[#141A2B] dark:shadow-[8px_8px_0_#fff]`}
          >
            <div className="max-w-3xl">
              <p className={`flex w-fit items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm text-slate-700 dark:bg-white/10 dark:text-slate-200 ${outline}`}>
                <GiBrain size={14} aria-hidden="true" className="shrink-0 text-emerald-600 dark:text-emerald-400" />
                Operational Breakthrough
              </p>

              <h2 className="mt-6 text-3xl font-bold !leading-[1.1] tracking-tight text-[#111] dark:text-white sm:text-4xl md:text-[2.75rem]">
                Why managing {service.label.toLowerCase()} the old way fails in Africa—and{' '}
                <span className="mt-2 block">
                  how Lyncs brings{' '}
                  <span className={`inline-block -rotate-2 rounded-full bg-[#EF6702] px-3.5 py-0.5 text-white md:px-4 ${outline}`}>
                    100% control
                  </span>
                  .
                </span>
              </h2>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Old Way */}
              <div className={`rounded-2xl bg-white/70 p-6 sm:p-8 ${outline} dark:bg-white/5`}>
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/15 text-red-600">
                    <IoCloseCircleOutline size={20} />
                  </span>
                  <h3 className="text-xl font-bold text-[#111] dark:text-white">
                    The Fragmented Way
                  </h3>
                </div>
                <ul className="mt-6 space-y-3.5 text-sm text-slate-700 dark:text-slate-300">
                  {service.painPoints.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-red-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Lyncs Way */}
              <div className={`rounded-2xl bg-white p-6 sm:p-8 ${outline} dark:bg-slate-900`}>
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-600">
                    <IoCheckmarkCircle size={20} />
                  </span>
                  <h3 className="text-xl font-bold text-[#111] dark:text-white">
                    The Lyncs Advantage
                  </h3>
                </div>
                <ul className="mt-6 space-y-3.5 text-sm text-slate-700 dark:text-slate-300">
                  {service.solutions.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                      <span className="font-medium text-[#111] dark:text-white">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Metrics Row */}
            <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {service.stats.map(({ label, val }, i) => (
                <div
                  key={i}
                  className={`rounded-2xl bg-white p-4 ${outline} dark:bg-slate-900`}
                >
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Result 0{i + 1}
                  </p>
                  <p className="mt-2 text-2xl font-bold tracking-tight text-[#111] dark:text-white lg:text-3xl">
                    {val}
                  </p>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-snug">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Capabilities Breakdown */}
      <section id="capabilities" className="bg-white dark:bg-night py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="max-w-3xl">
            <p className="flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-surface px-3 py-1.5 text-sm text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
              <GiBrain size={14} aria-hidden="true" className="shrink-0 text-emerald-600 dark:text-emerald-400" />
              Core Capabilities
            </p>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-primary dark:text-white sm:text-4xl md:text-5xl">
              Engineered for seamless execution.{' '}
              <span className="text-accent">Zero guesswork.</span>
            </h2>
            <p className="mt-4 text-base text-slate-600 dark:text-slate-300 md:text-lg">
              Here is what happens when you activate the {service.label} module on your company or personal dashboard.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.capabilities.map((cap, idx) => (
              <div
                key={idx}
                className={`rounded-2xl bg-white p-6 sm:p-8 ${outline} shadow-[6px_6px_0_#111] dark:bg-[#141A2B] dark:shadow-[6px_6px_0_#fff] flex flex-col justify-between`}
              >
                <div>
                  <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${service.color} text-[#111] ${outline}`}>
                    Feature 0{idx + 1}
                  </span>
                  <h3 className="mt-4 text-xl font-bold text-primary dark:text-white">
                    {cap.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {cap.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/10 flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  <LuCheck size={16} />
                  <span>Fully automated & managed</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FAQ Binder Section */}
      <section className="relative overflow-x-hidden bg-[#FAF8F6] py-16 dark:bg-night md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="max-w-3xl">
            <p className="flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-surface px-3 py-1.5 text-sm text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
              <GiBrain size={14} aria-hidden="true" className="shrink-0 text-emerald-600 dark:text-emerald-400" />
              Frequently Asked Questions
            </p>
            <h2 className="mt-6 text-4xl font-bold !leading-[1.1] tracking-tight text-primary dark:text-white md:text-[2.5rem] xl:text-[3rem]">
              Questions about {service.label}.{' '}
              <span className="text-emerald-600 dark:text-emerald-400">We have you covered.</span>
            </h2>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="relative grid-cols-3 gap-4 space-y-8 pt-10 md:grid md:space-y-0"
          >
            {service.faq.map(
              (
                {
                  title,
                  question,
                  answer,
                  reaction,
                  avatar,
                  color,
                  tint,
                  bubble,
                  reply,
                },
                i
              ) => (
                <div
                  key={title}
                  className={`relative min-h-[260px] rounded-2xl px-6 py-8 md:min-h-[300px] text-white ${
                    i === 0 ? 'z-20' : i === 1 ? 'z-10' : ''
                  } ${color}`}
                >
                  <div
                    aria-hidden
                    className={`absolute -right-8 top-0 h-full w-12 space-y-8 py-10 ${
                      i === 2 ? 'md:hidden' : ''
                    }`}
                  >
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
        </div>
      </section>

      {/* 6. Conversion CTA Section */}
      <section className="bg-white dark:bg-night py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div
            className={`relative overflow-hidden rounded-[32px] bg-[#EF6702] p-8 sm:p-12 md:p-16 text-white ${outline} shadow-[8px_8px_0_#111] dark:shadow-[8px_8px_0_#fff]`}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full border-8 border-white/10"
            />

            <div className="relative z-10 max-w-3xl">
              <span className={`inline-block rounded-full bg-white px-3.5 py-1 text-xs font-bold text-[#111] ${outline}`}>
                {service.label} Module
              </span>

              <h2 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl !leading-tight text-white">
                {service.ctaHeadline}
              </h2>

              <p className="mt-4 text-base sm:text-lg text-white/90 max-w-2xl">
                {service.ctaSub}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href={service.primaryCtaHref}
                  className={`inline-flex items-center gap-2 rounded bg-white px-8 py-3.5 text-[15px] font-bold text-primary transition hover:bg-slate-100 ${outline}`}
                >
                  {service.primaryCtaText}
                  <GoArrowUpRight size={18} />
                </Link>
                <a
                  href={`https://wa.me/2349055552055?text=Hello%20Lyncs%2C%20I%20want%20to%20learn%20more%20about%20${encodeURIComponent(service.label)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded border-2 border-white bg-transparent px-6 py-3.5 text-[15px] font-bold text-white transition hover:bg-white/10"
                >
                  <IoLogoWhatsapp size={20} />
                  Instant WhatsApp Chat
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
