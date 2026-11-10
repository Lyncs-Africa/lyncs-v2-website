// Real used-car pricing sourced from Jiji (jiji.ng) classifieds.
//
// Jiji's own frontend reads an undocumented internal JSON endpoint. We call it
// SERVER-SIDE ONLY (never from the browser: it would be blocked by CORS, and we
// don't want to expose the upstream), filter the listings down to the same
// make + model, and hand the live prices to the aggregator in getCarValuation.
//
// Caveats, by design:
//  - These are ASKING prices, not sold prices, so they skew a little high.
//  - The endpoint is internal and undocumented. Treat outages / shape changes
//    as expected: fetchComparables() returns [] on any failure and the caller
//    falls back to the offline estimate.

export type Comparable = {
    price: number
    year: number
    brand: string
    model: string
    condition: string | null
}

const JIJI_ENDPOINT = 'https://jiji.ng/api_web/v1/listing'
const PAGES = 3 // 20 listings per page
const REVALIDATE_SECONDS = 60 * 60 * 24 // cache each make/model page for a day
const FETCH_TIMEOUT_MS = 6000
// Drop obvious junk: ₦1 placeholder listings and fat-finger billions.
const MIN_PRICE = 300_000
const MAX_PRICE = 500_000_000

type JijiAttr = {name?: string; value?: string}
type JijiAdvert = {
    title?: string
    price_obj?: {value?: number}
    attrs?: JijiAttr[]
    // schema_org is richer but Jiji only returns it to some clients; we treat it
    // as a bonus and fall back to the title when it's absent (see parseAdvert).
    schema_org?: {
        brand?: {name?: string}
        model?: string
        vehicleModelDate?: string | number
    }
}
type JijiResponse = {adverts_list?: {adverts?: JijiAdvert[]}}

function norm(s: string): string {
    return s.trim().toLowerCase()
}

// Whole-word (case-insensitive) match, so "Camry" doesn't hit "Camryx" and
// multi-word / punctuated models like "RX 350" or "CR-V" still match.
function wordMatch(haystack: string, needle: string): boolean {
    const esc = needle.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    if (!esc) return false
    return new RegExp(`(?:^|[^a-z0-9])${esc}(?:$|[^a-z0-9])`, 'i').test(haystack)
}

// First plausible car year in a listing title, e.g. "Honda Pilot 2011 Blue".
function yearFromTitle(title: string): number {
    const matches = title.match(/\b(19\d\d|20\d\d)\b/g)
    if (!matches) return NaN
    const ceiling = new Date().getFullYear() + 1
    for (const m of matches) {
        const n = Number(m)
        if (n >= 1990 && n <= ceiling) return n
    }
    return NaN
}

// Turn one advert into a Comparable, or null if it isn't a clean same-make,
// same-model match with a sane price. Prefers schema_org; falls back to the
// title (which also filters out description-only false matches).
function parseAdvert(a: JijiAdvert, wantMake: string, wantModel: string): Comparable | null {
    const price = a.price_obj?.value
    if (typeof price !== 'number' || !Number.isFinite(price)) return null
    if (price < MIN_PRICE || price > MAX_PRICE) return null

    const condition = a.attrs?.find((x) => norm(x.name ?? '') === 'condition')?.value ?? null

    const sBrand = a.schema_org?.brand?.name
    const sModel = a.schema_org?.model
    const sYear = Number(a.schema_org?.vehicleModelDate)
    if (sBrand && sModel && Number.isFinite(sYear)) {
        if (norm(sBrand) !== wantMake || norm(sModel) !== wantModel) return null
        return {price, year: sYear, brand: sBrand, model: sModel, condition}
    }

    const title = a.title ?? ''
    if (!wordMatch(title, wantMake) || !wordMatch(title, wantModel)) return null
    const year = yearFromTitle(title)
    if (!Number.isFinite(year)) return null
    return {price, year, brand: wantMake, model: wantModel, condition}
}

async function fetchPage(query: string, page: number): Promise<JijiAdvert[]> {
    const url = `${JIJI_ENDPOINT}?slug=cars&webp=true&query=${encodeURIComponent(query)}&page=${page}`
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)
    try {
        const res = await fetch(url, {
            signal: controller.signal,
            headers: {
                accept: 'application/json',
                // Generic client name on purpose — no personal contact details.
                'user-agent': 'LyncsValuation/1.0 (+https://lyncs.africa)',
            },
            next: {revalidate: REVALIDATE_SECONDS},
        })
        if (!res.ok) return []
        const data = (await res.json()) as JijiResponse
        return data.adverts_list?.adverts ?? []
    } catch {
        // Timeout, network error, or non-JSON body — treat as no data.
        return []
    } finally {
        clearTimeout(timer)
    }
}

// Live listings for a make + model, already filtered to real same-model cars
// with a sane price. Free-text search also returns adjacent models (Corolla
// Cross, Accord Crosstour, Matrix with "Camry" in the text); the exact
// brand + model check below keeps those out.
export async function fetchComparables(make: string, model: string): Promise<Comparable[]> {
    const query = `${make} ${model}`
    const pages = await Promise.all(Array.from({length: PAGES}, (_, i) => fetchPage(query, i + 1)))
    const adverts = pages.flat()

    const wantMake = norm(make)
    const wantModel = norm(model)

    const out: Comparable[] = []
    for (const a of adverts) {
        const c = parseAdvert(a, wantMake, wantModel)
        if (c) out.push(c)
    }
    return out
}
