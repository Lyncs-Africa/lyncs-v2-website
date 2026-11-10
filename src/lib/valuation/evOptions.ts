// The EV side of the swap: which electric vehicle we value the car against.
//
// Default behaviour is an AUTO-MATCH — we pick the nicest EV whose 20% deposit
// the car's value already covers (so the swap credit does the most work). The
// user can override this and choose their preferred EV; resolveActiveEv() below
// honours that choice and only auto-matches when none has been made.
//
// Inventory comes from the same local catalog that powers /cars, so prices stay
// in one place.

import {fetchCarsCatalog} from '@/lib/api/cars'
import {EV_CONFIG} from './config'

export type EvOption = {
    id: string
    name: string
    price: number // landed NGN price
    image?: string
    year?: string | number
}

// The anchor used when the catalog can't be loaded, so the panel still works.
const FALLBACK_EV: EvOption = {id: '__fallback__', name: EV_CONFIG.evModel, price: EV_CONFIG.evPrice}

type RawCar = {id?: unknown; name?: string; title?: string; price?: unknown; image?: string; year?: string | number}

// Electric stock, cheapest first. Resolves to [] on any failure.
export async function fetchEvOptions(): Promise<EvOption[]> {
    try {
        const res = await fetchCarsCatalog({fuelType: 'electric'})
        const cars: RawCar[] = res?.data?.cars ?? []
        return cars
            .map((c) => ({
                id: String(c.id),
                name: c.name || c.title || 'EV',
                price: Number(c.price) || 0,
                image: c.image,
                year: c.year,
            }))
            .filter((e) => e.price > 0)
            .sort((a, b) => a.price - b.price)
    } catch {
        return []
    }
}

// Auto-match: the most expensive EV whose deposit the car value already covers;
// if the car can't cover any EV's deposit, the cheapest one (smallest top-up).
// `evs` must be sorted ascending by price (fetchEvOptions does this).
export function pickBestEv(evs: EvOption[], carValue: number): EvOption | null {
    if (evs.length === 0) return null
    const deposit = (e: EvOption) => e.price * EV_CONFIG.depositPct
    let best: EvOption | null = null
    for (const e of evs) {
        if (deposit(e) <= carValue) best = e // sorted asc, so this keeps the priciest affordable
    }
    return best ?? evs[0]
}

// The EV the panel should price against: the user's explicit pick if there is
// one and it still exists, otherwise the auto-match, otherwise the fallback.
export function resolveActiveEv(evs: EvOption[], selectedEvId: string | null, carValue: number): EvOption {
    if (selectedEvId) {
        const chosen = evs.find((e) => e.id === selectedEvId)
        if (chosen) return chosen
    }
    return pickBestEv(evs, carValue) ?? FALLBACK_EV
}
