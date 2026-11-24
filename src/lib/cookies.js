const COOKIE_NAME = 'cookie_consent'
const COOKIE_MAX_DAYS = 365

function readRaw() {
  if (typeof document === 'undefined') return null
  const m = document.cookie.match(new RegExp('(?:^|; )cookie_consent=([^;]*)'))
  return m ? m[1] : null
}

function parse(raw) {
  if (!raw) return null
  if (raw === 'true')  return { necessary: true, analytics: true,  functional: true  }
  if (raw === 'false') return { necessary: true, analytics: false, functional: false }
  try   { return JSON.parse(decodeURIComponent(raw)) }
  catch { return null }
}

export function getConsentPreferences() {
  return parse(readRaw())
}

export function hasChosen() {
  return readRaw() !== null
}

/**
 * Returns true only if the user has explicitly consented to analytics cookies.
 * Safe to call server-side (returns false).
 */
export function hasConsented() {
  const p = getConsentPreferences()
  return p !== null && p.analytics === true
}

export function writeConsent(prefs) {
  if (typeof document === 'undefined') return
  const exp = new Date()
  exp.setDate(exp.getDate() + COOKIE_MAX_DAYS)
  document.cookie =
    `${COOKIE_NAME}=${encodeURIComponent(JSON.stringify(prefs))}` +
    `; expires=${exp.toUTCString()}; path=/; SameSite=Lax`
}
