// Valuation logic for the swap estimator.
//
// Two code paths share this file:
//  - rangeFromComparables(): turns LIVE Jiji listings (real asking prices) into
//    a value range. This is the real pricing source.
//  - getCarValuation(): the offline, deterministic estimate. It's now only a
//    FALLBACK, used by the /api/valuation route when Jiji has no comparables
//    or is unreachable.
//
// fetchCarValuation() is the client-side seam the UI calls; it hits the server
// route (/api/valuation) which runs the Jiji lookup — the browser can't call
// Jiji directly (CORS), so the network call lives on the server.

import {CAR_VALUES, OLDEST_YEAR, REFERENCE_YEAR, type Condition} from './data'
import type {Comparable} from './jijiPricing'

export type ValuationInput = {
    make: string
    model: string
    year: number | ''
    km: number | ''
    condition: Condition
}

export type ValuationRange = {min: number; max: number}

// ---------------------------------------------------------------------------
// Real pricing: aggregate live Jiji comparables into a range.
// ---------------------------------------------------------------------------

// Smallest comparable set we'll trust for a narrowed (year-windowed) estimate.
const MIN_SAMPLES = 4

// The listings are working cars at asking prices, so Tokunbo rides the market
// as-is; "Needs work" takes a discount because those cars rarely appear on
// Jiji and the asking prices assume a running vehicle. ('Nigerian used' is kept
// only so the map stays total over Condition; it's no longer a form option.)
const CONDITION_ADJ: Record<Condition, number> = {
    Tokunbo: 1.0,
    'Nigerian used': 0.9,
    'Needs work': 0.78,
}

function percentile(sortedAsc: number[], p: number): number {
    if (sortedAsc.length === 1) return sortedAsc[0]
    const idx = p * (sortedAsc.length - 1)
    const lo = Math.floor(idx)
    const hi = Math.ceil(idx)
    if (lo === hi) return sortedAsc[lo]
    return sortedAsc[lo] + (sortedAsc[hi] - sortedAsc[lo]) * (idx - lo)
}

// Pick the narrowest year window that still yields enough comparables, so a
// 2012 car is priced against ~2012 cars, not the whole model's history.
function selectByYear(comps: Comparable[], target: number): Comparable[] {
    for (const w of [2, 4, 7]) {
        const sel = comps.filter((c) => Math.abs(c.year - target) <= w)
        if (sel.length >= MIN_SAMPLES) return sel
    }
    return comps // not enough in any window — use every same-model match
}

export function rangeFromComparables(comps: Comparable[], input: ValuationInput): ValuationRange | null {
    if (comps.length < 3) return null // too thin to be meaningful

    const year = Number(input.year)
    const selected = Number.isFinite(year) ? selectByYear(comps, year) : comps
    const prices = selected.map((c) => c.price).sort((a, b) => a - b)
    if (prices.length < 3) return null

    // With a real spread, use the interquartile range (the middle of the
    // market). With a thin set, bracket the median instead.
    let lo: number
    let hi: number
    if (prices.length >= 6) {
        lo = percentile(prices, 0.25)
        hi = percentile(prices, 0.75)
    } else {
        const mid = percentile(prices, 0.5)
        lo = mid * 0.9
        hi = mid * 1.1
    }

    const adj = CONDITION_ADJ[input.condition] ?? 1
    lo *= adj
    hi *= adj

    const round = (n: number) => Math.round(n / 100_000) * 100_000
    const min = round(lo)
    const max = Math.max(round(hi), min + 100_000)
    return {min, max}
}

// ---------------------------------------------------------------------------
// Offline fallback: deterministic estimate from a hand-seeded base table.
// Used only when Jiji returns no comparables (unknown/rare model, or outage).
// ---------------------------------------------------------------------------

// Condition keeps or trims the resale value.
const CONDITION_FACTOR: Record<Condition, number> = {
    Tokunbo: 1.0,
    'Nigerian used': 0.82,
    'Needs work': 0.58,
}

// Straight-line-ish depreciation away from the reference year, with a floor so
// an old-but-running car never drops to nothing.
function yearFactor(year: number): number {
    const age = REFERENCE_YEAR - year
    if (age <= 0) {
        // Newer than reference: modest uplift, capped.
        return Math.min(1.15, 1 + Math.abs(age) * 0.04)
    }
    return Math.max(0.28, 1 - age * 0.07)
}

// Mileage adjustment. ~15,000 km/year is "expected"; being well above or below
// nudges the value a little. Capped so it never dominates.
function mileageFactor(km: number, year: number): number {
    const current = new Date().getFullYear()
    const expected = Math.max(1, current - year) * 15_000
    if (!km || expected <= 0) return 1
    const ratio = km / expected
    const adj = 1 + (1 - ratio) * 0.12
    return Math.min(1.08, Math.max(0.85, adj))
}

export function getCarValuation(input: ValuationInput): ValuationRange | null {
    const {make, model, year, km, condition} = input
    if (!make || !model || !year) return null
    if (year < OLDEST_YEAR || year > new Date().getFullYear() + 1) return null

    const base = CAR_VALUES[make]?.[model]
    if (base == null) return null // not in the dataset -> "couldn't value"

    const value =
        base *
        yearFactor(Number(year)) *
        CONDITION_FACTOR[condition] *
        mileageFactor(Number(km) || 0, Number(year))

    // Present as a ±8% range rounded to the nearest ₦100k.
    const round = (n: number) => Math.round(n / 100_000) * 100_000
    return {
        min: round(value * 0.92),
        max: round(value * 1.08),
    }
}

// Central backend API base host (no trailing slash or /api)
const RAW_BASE_URL =
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.NEXT_PUBLIC_API_ORIGIN ||
    'https://staging.lyncs.africa'

export const VALUATION_API_BASE = RAW_BASE_URL.replace(/\/+$/, '').replace(/\/api$/, '')
export const API_ORIGIN = VALUATION_API_BASE

export type ValuationLeadResponse = {
    success: boolean
    id?: string
    message?: string
    errors?: Record<string, string>
}

/**
 * Async seam the UI calls (client-side).
 * Targets the backend endpoint GET /cars/valuation?make=...&model=...&year=...&km=...&condition=...
 * If the backend is unreachable or returns an error, it falls back to the deterministic
 * offline estimate from CAR_VALUES.
 * Returns null when the car cannot be valued. Never throws.
 */
export async function fetchCarValuation(input: ValuationInput): Promise<ValuationRange | null> {
    const params = new URLSearchParams()
    if (input.make) params.set('make', input.make)
    if (input.model) params.set('model', input.model)
    if (input.year) params.set('year', String(input.year))
    if (input.km !== '' && input.km !== undefined && input.km !== null) {
        params.set('km', String(input.km))
    }
    if (input.condition) params.set('condition', input.condition)

    const queryString = params.toString()

    // 1) Query live backend endpoint: GET /cars/valuation
    try {
        const res = await fetch(`${VALUATION_API_BASE}/cars/valuation?${queryString}`, {
            headers: {
                Accept: 'application/json',
            },
        })
        if (res.ok) {
            const data = (await res.json()) as {range?: ValuationRange | null}
            if ('range' in data) {
                return data.range ?? null
            }
        }
    } catch (err) {
        console.warn('Backend /cars/valuation error, using fallback:', err)
    }

    // 2) Deterministic offline fallback
    return getCarValuation(input)
}

/**
 * Captures a swap or fleet valuation lead.
 * Targets the backend endpoint POST /cars/valuation-leads with multipart/form-data.
 */
export async function submitValuationLead(fd: FormData): Promise<ValuationLeadResponse> {
    try {
        const res = await fetch(`${VALUATION_API_BASE}/cars/valuation-leads`, {
            method: 'POST',
            body: fd,
        })
        const data = (await res.json().catch(() => null)) as ValuationLeadResponse | null
        if (res.ok && data?.success) {
            return data
        }
        if (res.status === 400 && data) {
            return data
        }
        if (data?.message) {
            return data
        }
    } catch (err) {
        console.error('Backend /cars/valuation-leads error:', err)
    }

    return {
        success: false,
        message: 'Could not connect to the valuation server. Please try again or reach out on WhatsApp.',
    }
}
