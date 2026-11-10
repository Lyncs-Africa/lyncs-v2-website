// EV financing breakdown + display formatting, driven by EV_CONFIG.

import {EV_CONFIG, type Tenor} from './config'
import type {ValuationRange} from './getCarValuation'

export type Breakdown = {
    carValue: number // midpoint used for the sums
    deposit: number
    covers: boolean // does the car cover the 20% down?
    topUp: number // extra needed to reach the deposit (0 if covered)
    financed: number // amount still to finance after the car is applied (>= 0)
    surplus: number // car value left over after covering the whole EV (>= 0)
    monthly: number | null // null when no interest rate is configured
}

// Standard amortised monthly payment. Returns null if no rate is configured.
function monthlyPayment(principal: number, tenor: Tenor): number | null {
    const annual = EV_CONFIG.annualInterestRate
    if (annual == null) return null
    if (principal <= 0) return 0
    const r = annual / 12
    if (r === 0) return principal / tenor
    return (principal * r) / (1 - Math.pow(1 + r, -tenor))
}

// Priced against the EV the user is swapping into (auto-matched or chosen).
// Falls back to the configured anchor price when no EV is supplied.
export function getBreakdown(range: ValuationRange, tenor: Tenor, ev?: {price: number}): Breakdown {
    const evPrice = ev?.price ?? EV_CONFIG.evPrice
    const carValue = (range.min + range.max) / 2
    const deposit = evPrice * EV_CONFIG.depositPct
    const topUp = Math.max(0, deposit - carValue)
    // Car applied to the EV price; never below zero. Anything beyond the EV's
    // full price is surplus (change), not a negative balance to finance.
    const financed = Math.max(0, evPrice - Math.max(carValue, deposit))
    const surplus = Math.max(0, carValue - evPrice)
    return {
        carValue,
        deposit,
        covers: carValue >= deposit,
        topUp,
        financed,
        surplus,
        monthly: monthlyPayment(financed, tenor),
    }
}

// --- formatting ----------------------------------------------------------

// "₦4.3M" — one decimal place.
export function nairaM(value: number): string {
    return `₦${(value / 1_000_000).toFixed(1)}M`
}

// Full currency, e.g. for the monthly figure rounded to the nearest ₦1,000.
export function naira(value: number): string {
    return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        maximumFractionDigits: 0,
    }).format(Math.round(value))
}

export function monthlyLabel(monthly: number): string {
    return naira(Math.round(monthly / 1_000) * 1_000)
}

// Add thousands separators to a raw digit string, e.g. "85000" -> "85,000".
export function formatThousands(raw: string): string {
    const digits = raw.replace(/\D/g, '')
    if (!digits) return ''
    return Number(digits).toLocaleString('en-NG')
}
