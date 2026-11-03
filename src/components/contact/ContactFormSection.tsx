'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GiBrain } from 'react-icons/gi'
import { GoArrowUpRight } from 'react-icons/go'
import { IoCheckmarkCircle, IoLogoWhatsapp } from 'react-icons/io5'
import {
  LuClock,
  LuShieldCheck,
  LuSparkles,
  LuCheck,
  LuMail,
  LuPhone,
  LuMapPin,
} from 'react-icons/lu'

const outline = 'border-2 border-[#111]'

const TEAM_SIZES = ['1 - 20', '21 - 100', '101 - 500', '500+ staff']

const SERVICE_OPTIONS = [
  'All Platform Services (Full Suite)',
  'Staff Rides (Bolt, Uber, LagRide)',
  'Staff Shuttles & Commute Buses',
  'Corporate Air Travel & Flights',
  'Corporate & Staff Ride Wallets',
  'Digital Fuel & Diesel Vouchers',
  'EV Fleet Swap & Charging',
  '24/7 Car Tow & Roadside Mechanic',
  'Executive Car Rentals',
  'Other / Custom Requirement',
]

const DEMO_BENEFITS = [
  {
    title: '15-Minute Live Walkthrough',
    desc: 'No endless slides. We dive straight into live route mapping, policy limits, and the dashboard.',
    icon: LuClock,
  },
  {
    title: 'Custom Savings Calculation',
    desc: 'See exactly how much your organization will save on fuel, ride claims, and commute admin.',
    icon: LuSparkles,
  },
  {
    title: '24-Hour Fast Onboarding',
    desc: 'Bulk-add staff via spreadsheet or HRIS with zero IT disruption to daily commutes.',
    icon: LuShieldCheck,
  },
]

export default function ContactFormSection() {
  const [mode, setMode] = useState<'demo' | 'message'>('demo')
  const [teamSize, setTeamSize] = useState('21 - 100')
  const [serviceOfInterest, setServiceOfInterest] = useState(SERVICE_OPTIONS[0])
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    phone: '',
    notes: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="book-demo" className="bg-[#FAF8F6] font-Quicksand dark:bg-night py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        {/* Main 2-Column Split Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Context, Value Proposition & Direct Contact */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <p className={`flex w-fit items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-slate-700 dark:bg-white/10 dark:text-slate-200 ${outline}`}>
                <GiBrain size={15} aria-hidden="true" className="shrink-0 text-emerald-600 dark:text-emerald-400" />
                Schedule a Walkthrough • Fast 15-Min Response
              </p>

              <h2 className="mt-5 text-3xl font-bold !leading-[1.15] tracking-tight text-[#111] dark:text-white sm:text-4xl md:text-[2.65rem]">
                Let&apos;s eliminate your transport{' '}
                <span className="block mt-1">
                  reconciliation{' '}
                  <span className={`inline-block -rotate-2 rounded-full bg-[#EF6702] px-3.5 py-0.5 text-white ${outline}`}>
                    wahala
                  </span>
                  .
                </span>
              </h2>

              <p className="mt-4 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Connect staff rides, buses, flights, and digital fuel vouchers into one corporate wallet. One monthly invoice, zero manual claims.
              </p>
            </div>

            {/* What to expect cards */}
            <div className="space-y-3.5">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                What happens next:
              </p>
              {DEMO_BENEFITS.map((item, idx) => {
                const Icon = item.icon
                return (
                  <div
                    key={idx}
                    className={`flex items-start gap-3.5 rounded-2xl bg-white p-4.5 ${outline} dark:bg-[#141A2B] shadow-[3px_3px_0_#111] dark:shadow-[3px_3px_0_#fff]`}
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F6EEDD] text-[#EF6702] dark:bg-white/10">
                      <Icon size={20} />
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-[#111] dark:text-white">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Direct Quick Contact Box */}
            <div className={`rounded-2xl bg-[#E6F0DC] p-5 ${outline} dark:bg-[#141A2B] shadow-[4px_4px_0_#111] dark:shadow-[4px_4px_0_#fff]`}>
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-900 dark:text-emerald-400">
                Need an immediate answer?
              </p>
              <div className="mt-3 space-y-2.5 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                <a
                  href="https://wa.me/2349055552055?text=Hello%20Lyncs%2C%20I%20would%20like%20to%20learn%20more%20about%20corporate%20mobility."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 font-bold hover:text-[#EF6702] transition-colors"
                >
                  <IoLogoWhatsapp size={18} className="text-[#25D366]" />
                  <span>Chat with an advisor: +234 905 555 2055</span>
                </a>
                <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-400">
                  <LuMail size={16} />
                  <span>Direct email: support@lyncs.africa</span>
                </div>
                <a
                  href="https://maps.google.com/?q=77+Samuel+Adedoyin+St,+Victoria+Island,+Lagos+106104"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-white transition-colors"
                >
                  <LuMapPin size={16} className="shrink-0 mt-0.5" />
                  <span>HQ: 77 Samuel Adedoyin St, Victoria Island, Lagos 106104, Lagos</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Clean, Structured, Highly Form-y Form Card */}
          <div className="lg:col-span-7">
            <div
              className={`rounded-[32px] bg-white p-6 sm:p-8 md:p-10 ${outline} shadow-[8px_8px_0_#111] dark:bg-[#141A2B] dark:shadow-[8px_8px_0_#fff]`}
            >
              {/* Form Mode Segmented Switcher */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-5 dark:border-white/10">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#111] dark:text-white">
                    {mode === 'demo' ? 'Schedule a 15-Minute Demo' : 'Send Us a Direct Message'}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                    {mode === 'demo'
                      ? 'Pick your preferred focus and we will prepare a live demo.'
                      : 'Have a specific question or RFP? Leave us a note below.'}
                  </p>
                </div>

                <div className={`hidden sm:flex items-center rounded-xl bg-slate-100 p-1 dark:bg-white/5 ${outline}`}>
                  <button
                    type="button"
                    onClick={() => setMode('demo')}
                    className={`rounded-lg px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
                      mode === 'demo'
                        ? 'bg-[#111] text-white dark:bg-white dark:text-[#111]'
                        : 'text-slate-600 hover:text-black dark:text-slate-400 dark:hover:text-white'
                    }`}
                  >
                    Live Demo
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode('message')}
                    className={`rounded-lg px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
                      mode === 'message'
                        ? 'bg-[#111] text-white dark:bg-white dark:text-[#111]'
                        : 'text-slate-600 hover:text-black dark:text-slate-400 dark:hover:text-white'
                    }`}
                  >
                    Quick Message
                  </button>
                </div>
              </div>

              {/* Mobile mode buttons */}
              <div className="sm:hidden mt-4 flex rounded-lg bg-slate-100 p-1 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setMode('demo')}
                  className={`flex-1 rounded-md py-1.5 text-xs font-bold transition text-center ${
                    mode === 'demo'
                      ? 'bg-[#111] text-white dark:bg-white dark:text-[#111]'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Live Demo
                </button>
                <button
                  type="button"
                  onClick={() => setMode('message')}
                  className={`flex-1 rounded-md py-1.5 text-xs font-bold transition text-center ${
                    mode === 'message'
                      ? 'bg-[#111] text-white dark:bg-white dark:text-[#111]'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Quick Message
                </button>
              </div>

              {/* Form Content */}
              <div className="mt-6">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="done"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="rounded-2xl bg-[#FAF8F6] p-8 text-center dark:bg-white/5 border border-slate-200 dark:border-white/10"
                    >
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                        <IoCheckmarkCircle size={44} />
                      </div>
                      <h4 className="mt-4 text-2xl font-bold text-[#111] dark:text-white">
                        Demo Request Received!
                      </h4>
                      <p className="mx-auto mt-2 max-w-md text-sm text-slate-600 dark:text-slate-300">
                        Thank you, <span className="font-bold text-[#111] dark:text-white">{formData.fullName || 'there'}</span>. A mobility specialist from our Lagos desk is reviewing your requirements for <span className="font-bold text-[#EF6702]">{serviceOfInterest}</span>.
                      </p>
                      <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                        We will reach out to <span className="font-semibold text-slate-700 dark:text-slate-200">{formData.email}</span> within 15 minutes during business hours.
                      </p>
                      <div className="mt-6 flex flex-wrap justify-center gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            setSubmitted(false)
                            setFormData({ fullName: '', email: '', company: '', phone: '', notes: '' })
                          }}
                          className={`rounded-full px-5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 ${outline} dark:text-slate-200 dark:hover:bg-white/10`}
                        >
                          Submit another request
                        </button>
                        <a
                          href="https://wa.me/2349055552055?text=Hello%20Lyncs%2C%20I%20just%20submitted%20a%20demo%20request%20on%20the%20website"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-1.5 rounded-full bg-[#74B044] px-5 py-2.5 text-xs font-bold text-[#111] ${outline}`}
                        >
                          <IoLogoWhatsapp size={15} />
                          Chat on WhatsApp now
                        </a>
                      </div>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      {/* Row 1: Full Name & Work Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-[#111] dark:text-slate-200">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            placeholder="e.g. Babatunde Adeleke"
                            className={`mt-1.5 w-full rounded-xl bg-slate-50 px-3.5 py-3 text-sm text-[#111] placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#EF6702] ${outline} dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500`}
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-[#111] dark:text-slate-200">
                            Work Email <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="name@company.com"
                            className={`mt-1.5 w-full rounded-xl bg-slate-50 px-3.5 py-3 text-sm text-[#111] placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#EF6702] ${outline} dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500`}
                          />
                        </div>
                      </div>

                      {/* Row 2: Company Name & Phone */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-[#111] dark:text-slate-200">
                            Company / Organization Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            placeholder="e.g. Stanbic, Paystack, MTN"
                            className={`mt-1.5 w-full rounded-xl bg-slate-50 px-3.5 py-3 text-sm text-[#111] placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#EF6702] ${outline} dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500`}
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-[#111] dark:text-slate-200">
                            Phone / WhatsApp Number <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+234 (0) 800 000 0000"
                            className={`mt-1.5 w-full rounded-xl bg-slate-50 px-3.5 py-3 text-sm text-[#111] placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#EF6702] ${outline} dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500`}
                          />
                        </div>
                      </div>

                      {/* Row 3: Primary Service of Interest (Clean standard select dropdown) */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#111] dark:text-slate-200">
                          Primary Service of Interest
                        </label>
                        <select
                          value={serviceOfInterest}
                          onChange={(e) => setServiceOfInterest(e.target.value)}
                          className={`mt-1.5 w-full rounded-xl bg-slate-50 px-3.5 py-3 text-sm text-[#111] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#EF6702] ${outline} dark:bg-slate-900 dark:text-white`}
                        >
                          {SERVICE_OPTIONS.map((opt) => (
                            <option key={opt} value={opt} className="dark:bg-slate-900 text-slate-800 dark:text-white">
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Row 4: Team / Staff Commuter Size (Segmented pills) */}
                      <div>
                        <div className="flex items-center justify-between">
                          <label className="block text-xs font-bold uppercase tracking-wider text-[#111] dark:text-slate-200">
                            Estimated Commuters / Team Size:
                          </label>
                          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                            Selected: {teamSize}
                          </span>
                        </div>
                        <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {TEAM_SIZES.map((size) => {
                            const active = teamSize === size
                            return (
                              <button
                                key={size}
                                type="button"
                                onClick={() => setTeamSize(size)}
                                className={`rounded-xl py-2 px-3 text-xs font-bold transition text-center cursor-pointer ${outline} ${
                                  active
                                    ? 'bg-[#1A2747] text-white shadow-[2px_2px_0_#EF6702] dark:bg-white dark:text-[#111]'
                                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
                                }`}
                              >
                                {size}
                              </button>
                            )
                          })}
                        </div>
                      </div>

                      {/* Row 5: Notes / Project Details */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#111] dark:text-slate-200">
                          {mode === 'demo'
                            ? 'Any specific routes, pain points, or questions? (Optional)'
                            : 'How can our team help your company? *'}
                        </label>
                        <textarea
                          rows={3}
                          required={mode === 'message'}
                          value={formData.notes}
                          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                          placeholder={
                            mode === 'demo'
                              ? 'e.g. We have 60 staff commuting between Ikeja and Victoria Island, plus we want to stop petty cash fuel vouchers...'
                              : 'Tell us about your organization, current transport setup, or questions...'
                          }
                          className={`mt-1.5 w-full rounded-xl bg-slate-50 p-3.5 text-sm text-[#111] placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#EF6702] ${outline} dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500`}
                        />
                      </div>

                      {/* Row 6: Submit CTA & Trust Indicator */}
                      <div className="pt-2">
                        <button
                          type="submit"
                          className={`w-full group inline-flex items-center justify-center gap-2 rounded-2xl bg-[#EF6702] py-4 px-6 text-[15px] font-bold text-white transition hover:bg-[#d95c02] cursor-pointer ${outline} shadow-[4px_4px_0_#111] dark:shadow-[4px_4px_0_#fff]`}
                        >
                          <span>{mode === 'demo' ? 'Schedule Your 15-Minute Demo' : 'Send Message Now'}</span>
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-white transition group-hover:rotate-45">
                            <GoArrowUpRight size={16} aria-hidden="true" />
                          </span>
                        </button>

                        <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500 dark:text-slate-400 text-center">
                          <span className="inline-flex items-center gap-1.5">
                            <LuCheck size={14} className="text-emerald-500" />
                            Zero setup fee
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <LuCheck size={14} className="text-emerald-500" />
                            15-minute response in Lagos
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <LuCheck size={14} className="text-emerald-500" />
                            100% confidential
                          </span>
                        </div>
                      </div>
                    </form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
