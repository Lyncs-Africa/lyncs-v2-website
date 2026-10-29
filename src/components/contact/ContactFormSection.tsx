'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GiBrain } from 'react-icons/gi'
import { GoArrowUpRight } from 'react-icons/go'
import { IoCheckmarkCircle } from 'react-icons/io5'

const outline = 'border-2 border-[#111]'

// Providers and services matching PlugInSection aesthetic exactly
const PLUGS = [
  { id: 'bolt', name: 'Bolt', color: 'bg-[#74B044] text-[#111]' },
  { id: 'uber', name: 'Uber', color: 'bg-white text-[#111]' },
  { id: 'indrive', name: 'inDrive', color: 'bg-[#FEC804] text-[#111]' },
  { id: 'lagride', name: 'LagRide', color: 'bg-[#F49AC1] text-[#111]' },
  { id: 'shuttles', name: 'Staff Shuttles', color: 'bg-[#3DA5E0] text-[#111]' },
  { id: 'korope', name: 'Korope', color: 'bg-[#E7341B] text-white' },
  { id: 'flights', name: 'Corporate Flights', color: 'bg-[#FEC804] text-[#111]' },
  { id: 'ev', name: 'EV Fleet Swap', color: 'bg-[#EF6702] text-white' },
  { id: 'fuel', name: 'Fuel & Wallets', color: 'bg-[#111] text-white' },
]

const TEAM_SIZES = ['1 - 20', '21 - 100', '101 - 500', '500+ staff']

export default function ContactFormSection() {
  const [selectedPlugs, setSelectedPlugs] = useState<string[]>(['bolt', 'uber', 'shuttles'])
  const [teamSize, setTeamSize] = useState('21 - 100')
  const [singleWallet, setSingleWallet] = useState(true)
  const [mode, setMode] = useState<'demo' | 'note'>('demo')
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    phone: '',
    notes: '',
  })

  const togglePlug = (id: string) => {
    setSelectedPlugs((prev) =>
      prev.includes(id) ? (prev.length > 1 ? prev.filter((p) => p !== id) : prev) : [...prev, id]
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="book-demo" className="bg-[#FAF8F6] font-Quicksand dark:bg-night py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        {/* Outer Neo-brutalist Card matching PlugInSection */}
        <div className={`relative rounded-[32px] bg-[#F6EEDD] p-6 sm:p-10 md:p-12 ${outline} shadow-[8px_8px_0_#111] dark:bg-[#141A2B] dark:shadow-[8px_8px_0_#fff]`}>
          <div className="max-w-3xl">
            <p className={`flex w-fit items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm text-slate-700 dark:bg-white/10 dark:text-slate-200 ${outline}`}>
              <GiBrain size={14} aria-hidden="true" className="shrink-0 text-emerald-600 dark:text-emerald-400" />
              So how do we get started? Which services do you plug in?
            </p>

            <h2 className="mt-6 text-3xl font-bold !leading-[1.1] tracking-tight text-[#111] dark:text-white sm:text-4xl md:text-[2.75rem]">
              Pick what your company wants to connect.{' '}
              <span className="mt-2 block">
                We{' '}
                <span className={`inline-block -rotate-2 rounded-full bg-[#EF6702] px-3.5 py-0.5 text-white md:px-4 ${outline}`}>
                  plug into
                </span>{' '}
                the lot.
              </span>
            </h2>

            <p className="mt-4 text-base text-slate-700 dark:text-slate-300 md:text-lg">
              Click the providers your staff already use. We’ll show your ops and finance team how to control them all from one central dashboard.
            </p>
          </div>

          {/* Interactive Providers / Plugs matching PlugInSection */}
          <div className="mt-8">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Providers & Services (Click to plug in / out):
            </p>
            <ul className="mt-3 flex flex-wrap gap-3" aria-label="Providers to connect">
              {PLUGS.map(({ id, name, color }) => {
                const isPlugged = selectedPlugs.includes(id)
                return (
                  <li key={id}>
                    <button
                      type="button"
                      onClick={() => togglePlug(id)}
                      className="group flex items-center transition cursor-pointer"
                    >
                      {/* Plug prongs */}
                      <span aria-hidden className="flex flex-col gap-1">
                        <span
                          className={`h-1 w-2.5 rounded-l-sm transition ${
                            isPlugged ? 'bg-[#111] dark:bg-slate-200' : 'bg-slate-300 dark:bg-slate-600'
                          }`}
                        />
                        <span
                          className={`h-1 w-2.5 rounded-l-sm transition ${
                            isPlugged ? 'bg-[#111] dark:bg-slate-200' : 'bg-slate-300 dark:bg-slate-600'
                          }`}
                        />
                      </span>
                      {/* Plug Body */}
                      <span
                        className={`rounded-lg px-3.5 py-1.5 text-[14px] font-bold transition ${outline} ${
                          isPlugged
                            ? color
                            : 'bg-white/60 text-slate-400 opacity-60 dark:bg-white/5 dark:text-slate-500'
                        }`}
                      >
                        {isPlugged ? `✓ ${name}` : `+ ${name}`}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Socket Toggle: One wallet for the company */}
          <div className={`mt-8 flex flex-col gap-4 rounded-2xl bg-white p-4 sm:flex-row sm:items-center sm:justify-between md:p-5 ${outline} dark:bg-white/5`}>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setSingleWallet(!singleWallet)}
                className={`flex h-7 w-12 shrink-0 items-center rounded-full p-0.5 transition cursor-pointer ${outline} ${
                  singleWallet ? 'justify-end bg-[#EF6702]' : 'justify-start bg-slate-200 dark:bg-slate-700'
                }`}
                aria-label="Toggle central wallet"
              >
                <span className="h-5 w-5 rounded-full border-2 border-[#111] bg-white" />
              </button>
              <p className="text-[15px] leading-snug text-slate-700 dark:text-slate-300 md:text-base">
                Connect central billing & consolidated invoice:{' '}
                <span className="font-bold text-[#111] dark:text-white">
                  {singleWallet ? 'Active (One bill at month end)' : 'Separate department accounts'}
                </span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setMode('demo')}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                  mode === 'demo' ? 'bg-[#111] text-white dark:bg-white dark:text-[#111]' : 'text-slate-600 hover:text-black dark:text-slate-400'
                }`}
              >
                15-Min Live Demo
              </button>
              <button
                type="button"
                onClick={() => setMode('note')}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                  mode === 'note' ? 'bg-[#111] text-white dark:bg-white dark:text-[#111]' : 'text-slate-600 hover:text-black dark:text-slate-400'
                }`}
              >
                Direct Message
              </button>
            </div>
          </div>

          {/* Clean Flat Form Area (NO fuzzy drop shadows) */}
          <div className="mt-8 border-t-2 border-[#111] pt-8 dark:border-white/10">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-2xl bg-white p-8 text-center ${outline} dark:bg-[#0B1120]`}
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                    <IoCheckmarkCircle size={40} />
                  </div>
                  <h3 className="mt-4 text-2xl font-bold text-[#111] dark:text-white">
                    Request Received!
                  </h3>
                  <p className="mx-auto mt-2 max-w-md text-sm text-slate-600 dark:text-slate-300">
                    A mobility specialist from our Lagos desk is setting up your demo with the{' '}
                    <span className="font-bold text-[#EF6702]">{selectedPlugs.join(', ')}</span> integrations. We will reach out to{' '}
                    <span className="font-semibold text-[#111] dark:text-white">{formData.email || 'your email'}</span> within 15 minutes.
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className={`rounded-full px-5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 ${outline} dark:text-slate-200 dark:hover:bg-white/5`}
                    >
                      Make changes
                    </button>
                    <a
                      href="https://wa.me/2348028859627?text=Hello%20Lyncs%2C%20I%20just%20booked%20a%20demo%20on%20the%20website"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1.5 rounded-full bg-[#74B044] px-5 py-2.5 text-xs font-bold text-[#111] ${outline}`}
                    >
                      Chat on WhatsApp now
                      <GoArrowUpRight size={14} />
                    </a>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Grid 1: Name, Email, Company, Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#111] dark:text-slate-200">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Babatunde Adeleke"
                        className={`mt-1.5 w-full rounded-xl bg-white px-3.5 py-3 text-sm text-[#111] focus:outline-none focus:ring-2 focus:ring-[#EF6702] ${outline} dark:bg-slate-900 dark:text-white`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#111] dark:text-slate-200">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@company.com"
                        className={`mt-1.5 w-full rounded-xl bg-white px-3.5 py-3 text-sm text-[#111] focus:outline-none focus:ring-2 focus:ring-[#EF6702] ${outline} dark:bg-slate-900 dark:text-white`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#111] dark:text-slate-200">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. Paystack, MTN, Stanbic"
                        className={`mt-1.5 w-full rounded-xl bg-white px-3.5 py-3 text-sm text-[#111] focus:outline-none focus:ring-2 focus:ring-[#EF6702] ${outline} dark:bg-slate-900 dark:text-white`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#111] dark:text-slate-200">
                        Phone (WhatsApp) *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+234 800 000 0000"
                        className={`mt-1.5 w-full rounded-xl bg-white px-3.5 py-3 text-sm text-[#111] focus:outline-none focus:ring-2 focus:ring-[#EF6702] ${outline} dark:bg-slate-900 dark:text-white`}
                      />
                    </div>
                  </div>

                  {/* Team Size Pills */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#111] dark:text-slate-200">
                      Team / Staff Commuters Size:
                    </label>
                    <div className="mt-2 flex flex-wrap gap-2.5">
                      {TEAM_SIZES.map((size) => {
                        const active = teamSize === size
                        return (
                          <button
                            key={size}
                            type="button"
                            onClick={() => setTeamSize(size)}
                            className={`rounded-lg px-4 py-2 text-xs font-bold transition cursor-pointer ${outline} ${
                              active
                                ? 'bg-[#EF6702] text-white'
                                : 'bg-white text-slate-700 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-300'
                            }`}
                          >
                            {size}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Notes / Message */}
                  {mode === 'note' && (
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#111] dark:text-slate-200">
                        How can we help your team?
                      </label>
                      <textarea
                        rows={3}
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="Tell us about your routes, airport transfers, vehicle swap desires, or budget expectations..."
                        className={`mt-1.5 w-full rounded-xl bg-white p-3.5 text-sm text-[#111] focus:outline-none focus:ring-2 focus:ring-[#EF6702] ${outline} dark:bg-slate-900 dark:text-white`}
                      />
                    </div>
                  )}

                  {/* Submit CTA Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      🔒 No credit card required • Response within 15 minutes during Lagos business hours
                    </p>

                    <button
                      type="submit"
                      className={`group inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-[#111] py-3 pl-6 pr-3 text-[15px] font-bold text-white transition hover:bg-primary sm:self-auto ${outline} dark:bg-white dark:text-[#111] dark:hover:bg-slate-200`}
                    >
                      {mode === 'demo' ? 'Schedule 15-Minute Demo' : 'Send Message'}
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#EF6702] text-white transition group-hover:rotate-45">
                        <GoArrowUpRight size={16} aria-hidden="true" />
                      </span>
                    </button>
                  </div>
                </form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
