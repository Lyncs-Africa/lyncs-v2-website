// Valuation logic for the swap estimator.
//
// rangeFromComparables() and getCarValuation() are the pricing algorithm,
// kept here as the reference implementation for the backend's valuation
// endpoint (see docs/swap-valuation-api.md). The live site no longer runs
// them in-process — the browser can't call Jiji directly (CORS), so the
// lookup lives on the backend.
//
// fetchCarValuation() is the client-side seam the UI calls; it hits the
// backend's GET /cars/valuation endpoint, which runs the Jiji lookup.

import {CAR_VALUES, OLDEST_YEAR, REFERENCE_YEAR, type Condition} from './data'
import {API_BASE} from '../api/cars'
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

/**
 * Async seam the UI calls (client-side). It hits the server route, which does
 * the live Jiji lookup and falls back to the offline estimate. Returns null
 * when nothing could be valued, which the UI shows as the "couldn't value"
 * state. Any network/parse error also resolves to null (never throws).
 */
export async function fetchCarValuation(input: ValuationInput): Promise<ValuationRange | null> {
    const params = new URLSearchParams({
        make: input.make,
        model: input.model,
        year: String(input.year),
        km: String(input.km || ''),
        condition: input.condition,
    })
    try {
        const res = await fetch(`${API_BASE}/cars/valuation?${params.toString()}`)
        if (!res.ok) return null
        const data = (await res.json()) as {range?: ValuationRange | null}
        return data.range ?? null
    } catch {
        return null
    }
}
