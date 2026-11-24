'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { hasChosen, getConsentPreferences, writeConsent } from '@/lib/cookies'

function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={[
        'relative flex-shrink-0 w-12 h-7 rounded-full outline-none',
        'transition-colors duration-300 ease-in-out',
        'focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
        checked
          ? 'bg-accent'
          : 'bg-slate-100 ring-1 ring-inset ring-slate-300 dark:bg-white/10 dark:ring-white/20',
      ].join(' ')}
    >
      <span
        className={[
          'absolute top-1 w-5 h-5 rounded-full bg-white',
          'transition-transform duration-300 ease-in-out',
          'shadow-[0_1px_4px_rgba(0,0,0,0.18),0_2px_8px_rgba(0,0,0,0.10)]',
          checked ? 'translate-x-0' : '-translate-x-5'
        ].join(' ')}
      />
    </button>
  )
}

export default function CookieBanner() {
  const [bannerOpen, setBannerOpen] = useState(false)
  const [modalOpen, setModalOpen]   = useState(false)
  const [analytics, setAnalytics]   = useState(true)
  const [functional, setFunctional] = useState(true)

  useEffect(() => {
    if (!hasChosen()) setBannerOpen(true)

    const prefs = getConsentPreferences()
    if (prefs) {
      setAnalytics(prefs.analytics ?? true)
      setFunctional(prefs.functional ?? true)
    }

    const openModal = () => setModalOpen(true)
    window.addEventListener('open-cookie-preferences', openModal)
    return () => window.removeEventListener('open-cookie-preferences', openModal)
  }, [])

  if (!bannerOpen && !modalOpen) return null

  const notify = () => window.dispatchEvent(new CustomEvent('cookie-consent-updated'))

  const acceptAll = () => {
    writeConsent({ necessary: true, analytics: true, functional: true })
    setAnalytics(true)
    setFunctional(true)
    setBannerOpen(false)
    setModalOpen(false)
    notify()
  }

  const declineNonEssential = () => {
    writeConsent({ necessary: true, analytics: false, functional: false })
    setAnalytics(false)
    setFunctional(false)
    setBannerOpen(false)
    setModalOpen(false)
    notify()
  }

  const savePreferences = () => {
    writeConsent({ necessary: true, analytics, functional })
    setBannerOpen(false)
    setModalOpen(false)
    notify()
  }

  return (
    <>
      {/* ── Bottom Banner ── */}
      {bannerOpen && !modalOpen && (
        <div className="fixed bottom-0 left-0 right-0 z-[9999] bg-slate-900 border-t border-white/10 px-6 py-6 md:px-12 font-Quicksand">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center gap-5 md:gap-10">

            <div className="flex-1 min-w-0">
              <h2 className="text-white text-base md:text-[17px] font-bold mb-1.5">
                We use cookies
              </h2>
              <p className="text-white/65 text-[13px] leading-relaxed max-w-2xl">
                We use cookies to keep Lyncs working properly, remember your preferences, and understand
                how the site is used so we can improve it. You can accept all cookies, manage your
                preferences, or decline non-essential cookies.{' '}
                <Link href="/cookies" className="text-accent underline underline-offset-2 hover:opacity-80 transition-opacity">
                  Read our Cookie Policy
                </Link>
              </p>
            </div>

            <div className="flex flex-col gap-2.5 md:w-52 flex-shrink-0">
              <button
                onClick={acceptAll}
                className="w-full bg-accent text-white font-semibold text-[13px] rounded-full py-2.5 px-6 hover:opacity-90 transition-opacity"
              >
                Accept All
              </button>
              <button
                onClick={() => setModalOpen(true)}
                className="w-full border border-white/30 text-white/80 font-medium text-[13px] rounded-full py-2.5 px-6 hover:bg-white/10 transition-colors"
              >
                Manage Preferences
              </button>
              <button
                onClick={declineNonEssential}
                className="w-full text-white/50 font-medium text-[13px] py-1 hover:text-white/75 transition-colors"
              >
                Decline Non-Essential
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ── Preferences Modal ── */}
      {modalOpen && (
        <div className="fixed inset-0 z-[10000] flex items-end sm:items-center justify-center p-4 sm:p-6 font-Quicksand">

          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
          />

          {/* Panel */}
          <div className="relative bg-white dark:bg-slate-900 dark:border dark:border-white/10 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">

            {/* Header */}
            <div className="sticky top-0 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-white/10 px-6 py-5 flex items-center justify-between rounded-t-2xl z-10">
              <div>
                <h2 className="text-primary dark:text-white text-lg font-bold">
                  Cookie Preferences
                </h2>
                <p className="text-slate-400 text-xs mt-0.5">Choose which cookies you allow</p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-primary dark:hover:text-white transition-colors p-1 rounded-md hover:bg-slate-50 dark:hover:bg-white/5"
                aria-label="Close"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Categories */}
            <div className="px-6 py-5 space-y-3">

              {/* Necessary — always on */}
              <div className="border border-slate-100 dark:border-white/10 rounded-xl p-4 bg-slate-50 dark:bg-white/5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-primary dark:text-white font-semibold text-sm">
                      Necessary Cookies
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed mt-1">
                      Required for the Website to function. These cannot be disabled.
                    </p>
                  </div>
                  <span className="flex-shrink-0 text-[11px] font-semibold text-accent bg-accent/10 px-2.5 py-1 rounded-full mt-0.5 whitespace-nowrap">
                    Always On
                  </span>
                </div>
              </div>

              {/* Analytics */}
              <div className="border border-slate-100 dark:border-white/10 rounded-xl p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-primary dark:text-white font-semibold text-sm">
                      Analytics Cookies
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed mt-1">
                      Help us understand how visitors use our Website. All data is anonymised.
                    </p>
                  </div>
                  <Toggle checked={analytics} onChange={setAnalytics} />
                </div>
              </div>

              {/* Functional */}
              <div className="border border-slate-100 dark:border-white/10 rounded-xl p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-primary dark:text-white font-semibold text-sm">
                      Functional Cookies
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed mt-1">
                      Remember your preferences for a better experience.
                    </p>
                  </div>
                  <Toggle checked={functional} onChange={setFunctional} />
                </div>
              </div>

            </div>

            {/* Actions */}
            <div className="px-6 pb-6 pt-1 flex flex-col sm:flex-row gap-3">
              <button
                onClick={savePreferences}
                className="flex-1 bg-primary dark:bg-white dark:text-primary text-white font-semibold text-sm rounded-full py-3 hover:bg-opacity-90 transition-colors"
              >
                Save Preferences
              </button>
              <button
                onClick={acceptAll}
                className="flex-1 bg-accent text-white font-semibold text-sm rounded-full py-3 hover:opacity-90 transition-opacity"
              >
                Accept All
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  )
}
