'use client'

export default function CookieSettingsLink({ className = 'text-gray-400 transition hover:text-white cursor-pointer text-left' }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent('open-cookie-preferences'))}
      className={className}
    >
      Cookie Settings
    </button>
  )
}
