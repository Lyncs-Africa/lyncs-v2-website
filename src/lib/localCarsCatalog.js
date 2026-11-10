/**
 * Local car catalog built from the root `cars.json` file.
 *
 * These are the vehicles Lyncs actually stocks, so the /cars catalog is
 * served from here instead of the live backend. Each entry is shaped into a
 * "raw" object that `normalizeCar` (in ./api/cars.js) understands.
 *
 * Pricing: cars.json holds the ex-factory USD price only. The landed price we
 * quote = (base USD + shipping USD) x USD_TO_NGN. Clearing/customs is NOT yet
 * included — add it here once those figures are provided.
 */

import carsData from '../../cars.json'
import { classifyBodyType, getShippingFeeUsd } from './carPurchase.js'

// cars.json prices are in USD only. The store/cards display NGN, so we convert
// with this rate. UPDATE this to the rate you want quoted on the site.
export const USD_TO_NGN = 1650

// Pull the largest 4-digit year out of values like "2024/2025" for sorting.
function toNumberYear(y) {
  const matches = String(y).match(/\d{4}/g)
  return matches ? Math.max(...matches.map(Number)) : 2025
}

// Grab a seat count from the free-text spec string (e.g. "5-seat", "6-seater", "55-seat").
function seatsNumber(specs) {
  if (!specs) return undefined
  const m = String(specs).match(/(\d+)\s*[-\s]?\s*seat/i)
  return m ? Number(m[1]) : undefined
}

// Plug-in hybrids / hybrids → "hybrid"; everything else (BEV, EV, EREV, NEV) → "electric".
function powerTypeToFuel(powerType) {
  const s = String(powerType || '').toUpperCase()
  if (/PHEV|HYBRID|DM-?I|\bHEV\b/.test(s)) return 'hybrid'
  return 'electric'
}

export const LOCAL_CARS_RAW = carsData.map((c) => {
  const fuel = powerTypeToFuel(c.powerType)
  const seats = seatsNumber(c.specs)
  const bodyType = classifyBodyType(
    [c.specs, c.model, c.category].filter(Boolean).join(' '),
    seats,
  )

  const baseUsd = c?.priceUSD?.min ?? 0
  const { fee: shippingUsd, assumed: shippingAssumed } = getShippingFeeUsd(fuel, bodyType)
  const landedUsd = baseUsd + shippingUsd
  const priceNgn = Math.round(landedUsd * USD_TO_NGN)

  return {
    id: c.id,
    make: c.make,
    model: c.model,
    year: toNumberYear(c.year),
    yearDisplay: c.year,
    condition: 'NEW',
    fuelType: c.powerType,
    type: fuel,
    // Landed price (base + shipping), in NGN
    priceNgn,
    price: priceNgn,
    priceUsd: c.priceUSD,
    // Cost breakdown, for itemising in the quote / detail view
    baseUsd,
    shippingFeeUsd: shippingUsd,
    shippingFeeNgn: Math.round(shippingUsd * USD_TO_NGN),
    shippingAssumed,
    landedUsd,
    bodyType,
    image: c.thumbnail,
    headImage: c.thumbnail,
    images: Array.isArray(c.images) ? c.images : [],
    seats: seats ? `${seats} seats` : undefined,
    rangeKm: c.rangeKm,
    batteryKWh: c.batteryKWh,
    powerType: c.powerType,
    specs: c.specs,
    category: c.category,
    description: c.specs || undefined,
  }
})
