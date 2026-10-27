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
