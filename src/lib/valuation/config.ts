// Central config for the swap valuation + EV financing maths.
// Everything a non-engineer is likely to want to change lives here so the
// component code never has to be touched for a price or rate tweak.

export const EV_CONFIG = {
    // Fallback EV used only when the live EV catalog can't be loaded. Normally
    // the swap auto-matches against the real EV inventory (see evOptions.ts) and
    // the user can override the choice; these two values are just the safety net.
    evModel: 'BYD Dolphin',
    // Sticker price of the fallback EV, in NGN.
    evPrice: 15_000_000,
    // Minimum down payment, as a fraction of the EV price.
    depositPct: 0.2,
    // Financing tenors offered, in months.
    // 36 = used EV, 48 = new EV.
    tenorOptions: [36, 48] as const,
    // Annual interest rate as a decimal (e.g. 0.28 for 28%).
    // null => we don't quote a monthly figure at all (the line is hidden).
    annualInterestRate: null as number | null,
    // How long a locked-in quote is honoured.
    quoteHeldDays: 30,
} as const

export type Tenor = (typeof EV_CONFIG.tenorOptions)[number]

// WhatsApp line used for the "couldn't value" and fleet fallbacks.
// TODO(production): confirm this number is monitored.
export const WHATSAPP_NUMBER = '2349055555407'
