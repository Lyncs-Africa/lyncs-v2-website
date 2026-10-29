'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { GiBrain } from 'react-icons/gi'
import { GoArrowUpRight } from 'react-icons/go'
import {
  IoLogoWhatsapp,
  IoCallOutline,
  IoMailOutline,
  IoLocationOutline,
} from 'react-icons/io5'

const outline = 'border-2 border-[#111]'

const CHANNELS = [
  {
    title: 'Chat on WhatsApp',
    badge: 'Instant response',
    badgeColor: 'bg-[#74B044] text-[#111]',
    description: 'Instant chat with our Lagos operations & fleet management desk.',
    detail: '+234 (0) 802 885 9627',
    href: 'https://wa.me/2348028859627?text=Hello%20Lyncs%2C%20I%20would%20like%20to%20learn%20more%20about%20corporate%20mobility.',
    action: 'Open WhatsApp',
    Icon: IoLogoWhatsapp,
    iconColor: 'bg-[#E6F0DC] text-emerald-800 dark:bg-emerald-400/20 dark:text-emerald-300',
  },
  {
    title: 'Call Our Lagos Desk',
    badge: 'Mon - Fri, 8am - 6pm',
    badgeColor: 'bg-[#3DA5E0] text-[#111]',
    description: 'Speak directly with an enterprise advisor about routes & pricing.',
    detail: '+234 1 888 LYNCS',
    href: 'tel:+23418885962',
    action: 'Place a call',
    Icon: IoCallOutline,
    iconColor: 'bg-[#DCE5EA] text-sky-800 dark:bg-sky-400/20 dark:text-sky-300',
  },
  {
    title: 'Send Us An Email',
    badge: '< 15 mins reply',
    badgeColor: 'bg-[#F49AC1] text-[#111]',
    description: 'Send RFPs, staff route spreadsheets, or company proposals.',
    detail: 'hello@lyncs.africa',
    href: 'mailto:hello@lyncs.africa?subject=Corporate%20Mobility%20Inquiry',
    action: 'Send an email',
    Icon: IoMailOutline,
    iconColor: 'bg-[#ECE8F1] text-purple-800 dark:bg-purple-400/20 dark:text-purple-300',
  },
  {
    title: 'Visit Our Lagos HQ',
    badge: 'Coffee is on us ☕',
    badgeColor: 'bg-[#FEC804] text-[#111]',
    description: 'Pop in anytime. Power is always on, AC is cold, and EV demo lot is open.',
    detail: 'Victoria Island, Lagos, Nigeria',
    href: 'https://maps.google.com/?q=Victoria+Island+Lagos',
    action: 'Get directions',
    Icon: IoLocationOutline,
    iconColor: 'bg-[#F6EEDD] text-amber-800 dark:bg-amber-400/20 dark:text-amber-300',
  },
]

export default function ContactChannelsSection() {
  const still = useReducedMotion()

  return (
    <section id="direct-channels" className="relative overflow-hidden bg-[#FAF8F6] py-16 font-Quicksand dark:bg-night md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="max-w-2xl">
          <p className="flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-surface px-3 py-1.5 text-sm text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
            <GiBrain size={14} aria-hidden="true" className="shrink-0 text-emerald-600 dark:text-emerald-400" />
            Prefer to reach out directly without filling a form?
          </p>
          <h2 className="mt-6 text-3xl font-bold !leading-[1.1] tracking-tight text-primary dark:text-white sm:text-4xl md:text-[2.75rem]">
            Every line open.{' '}
            <span className="text-accent">Real people in Lagos.</span>
          </h2>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-400">
            No support ticket queues. Ping us on WhatsApp, call our direct Lagos corporate line, or come see us in Victoria Island.
          </p>
        </div>

        {/* 4 Cards Grid (Flat outlined, NO blurry shadows) */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CHANNELS.map(({ title, badge, badgeColor, description, detail, href, action, Icon, iconColor }, i) => (
            <motion.a
              key={title}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              animate={still ? undefined : { y: [0, -6, 0] }}
              transition={{
                duration: 5 + i * 0.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.25,
              }}
              className={`group flex flex-col justify-between rounded-[20px] bg-white p-6 transition hover:bg-slate-50 dark:bg-[#141A2B] dark:hover:bg-[#172036] ${outline}`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className={`flex h-12 w-12 items-center justify-center rounded-xl border border-slate-300 dark:border-white/10 ${iconColor}`}>
                    <Icon size={24} />
                  </span>
                  <span className={`rounded-md px-2.5 py-1 text-[11px] font-bold ${outline} ${badgeColor}`}>
                    {badge}
                  </span>
                </div>

                <h3 className="mt-6 text-lg font-bold text-primary dark:text-white">
                  {title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  {description}
                </p>
              </div>

              <div className="mt-6 border-t-2 border-slate-100 pt-4 dark:border-white/10">
                <p className="text-sm font-bold text-primary dark:text-slate-200">
                  {detail}
                </p>
                <div className="mt-2 flex items-center gap-1.5 text-xs font-bold text-accent transition group-hover:translate-x-1">
                  <span>{action}</span>
                  <GoArrowUpRight size={14} />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
