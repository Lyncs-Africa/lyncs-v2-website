export const INSTALLMENT_DOWN_PAYMENT_PERCENT = 0.3; // 30% upfront down payment

export const INSTALLMENT_TERM_OPTIONS = {
  "brand-new": [3, 6, 12, 18, 24],
  used: [3, 6, 12],
};

// Default interest applied to financed amount (7.5% corporate / 15% retail)
export const INSTALLMENT_INTEREST_RATE = 0.10; // Flat 10% for public quote estimation

export const FREE_DOORSTEP_DELIVERY_MIN_PRICE = 15000000; // Free delivery threshold
export const BELOW_THRESHOLD_DELIVERY_FEE = 500000;       // Lagos flat delivery fee

export function getInstallmentInterestRate(isAdmin = false) {
  return isAdmin ? 0.075 : INSTALLMENT_INTEREST_RATE;
}

export function getInstallmentTermOptions(usage) {
  return INSTALLMENT_TERM_OPTIONS[usage] || INSTALLMENT_TERM_OPTIONS.used;
}

export function computeInstallmentBreakdown(price, months, isAdmin = false) {
  const rate = getInstallmentInterestRate(isAdmin);
  const downPayment = Math.round(price * INSTALLMENT_DOWN_PAYMENT_PERCENT);
  const financedAmount = price - downPayment;
  const interestAmount = Math.round(financedAmount * rate);
  const financedAmountWithInterest = financedAmount + interestAmount;
  const monthlyInstallment = Math.round(financedAmountWithInterest / months);
  const totalPayable = downPayment + financedAmountWithInterest;

  return {
    downPayment,
    financedAmount,
    interestRate: rate,
    interestAmount,
    financedAmountWithInterest,
    monthlyInstallment,
    totalPayable,
    months,
  };
}

export function getDeliveryFeeInfo(price) {
  const qualifiesForFreeDrive = price >= FREE_DOORSTEP_DELIVERY_MIN_PRICE;
  return {
    qualifiesForFreeDrive,
    fee: qualifiesForFreeDrive ? 0 : BELOW_THRESHOLD_DELIVERY_FEE,
    threshold: FREE_DOORSTEP_DELIVERY_MIN_PRICE,
  };
}

/* ------------------------------------------------------------------ *
 * Import shipping fees (USD), by fuel group + body type.
 * Rate card provided by ops:
 *   EV / PHEV / HYBRID  -> SUV $4,000 | Sedan $3,000 | 14-seater bus $5,000
 *   Petrol              -> Sedan $2,500 | SUV $3,000
 * ------------------------------------------------------------------ */
export const SHIPPING_FEES_USD = {
  ev_hybrid: { suv: 4000, sedan: 3000, bus: 5000 },
  petrol: { sedan: 2500, suv: 3000 },
};

// Body types not on the rate card. ASSUMPTIONS — confirm real figures with ops.
// (vans/trucks assumed at the SUV rate; large coaches billed at the bus rate.)
export const SHIPPING_FALLBACK_USD = {
  ev_hybrid: { van: 4000, truck: 4000 },
  petrol: { van: 3000, truck: 3000 },
};

// Classify a vehicle's body from free-text specs/model and an optional seat count.
export function classifyBodyType(text = "", seats) {
  const s = String(text).toLowerCase();
  if (/\bvan\b/.test(s)) return "van";
  if (/truck|pickup|lorry/.test(s)) return "truck";
  if (/\bbus\b|coach/.test(s)) return "bus";
  if (/suv|crossover/.test(s)) return "suv";
  if (/sedan|hatchback|liftback|shooting brake|saloon|\bcar\b/.test(s)) return "sedan";
  const n = Number(seats);
  if (!Number.isNaN(n) && n >= 14) return "bus";
  return "sedan";
}

// Returns { fee, assumed } — `assumed` flags a fallback rate not on the card.
export function getShippingFeeUsd(fuelType, bodyType) {
  const group = fuelType === "petrol" ? "petrol" : "ev_hybrid";
  const table = SHIPPING_FEES_USD[group] || {};
  if (table[bodyType] != null) return { fee: table[bodyType], assumed: false };
  const fallback = (SHIPPING_FALLBACK_USD[group] || {})[bodyType];
  if (fallback != null) return { fee: fallback, assumed: true };
  return { fee: table.suv ?? table.sedan ?? 3000, assumed: true };
}
