import {NextResponse} from 'next/server'
import {getCarValuation, rangeFromComparables, type ValuationInput} from '@/lib/valuation/getCarValuation'
import {fetchComparables} from '@/lib/valuation/jijiPricing'
import type {Condition} from '@/lib/valuation/data'

// Server-side valuation for the /swap estimator. The browser can't call Jiji
// directly (CORS, and we don't expose the upstream), so the live lookup runs
// here on the Node runtime. Upstream Jiji responses are cached a day each
// (see jijiPricing), so repeat lookups for a popular model are cheap.
export const runtime = 'nodejs'

export async function GET(req: Request) {
    const {searchParams} = new URL(req.url)
    const make = (searchParams.get('make') ?? '').trim()
    const model = (searchParams.get('model') ?? '').trim()
    const yearRaw = searchParams.get('year') ?? ''
    const kmRaw = searchParams.get('km') ?? ''
    const condition = (searchParams.get('condition') ?? 'Tokunbo') as Condition

    const year = /^\d{4}$/.test(yearRaw) ? Number(yearRaw) : ''
    const km = /^\d+$/.test(kmRaw) ? Number(kmRaw) : ''

    if (!make || !model || !year) {
        return NextResponse.json({range: null})
    }

    const input: ValuationInput = {make, model, year, km, condition}

    // 1) Real market data: live Jiji comparables.
    let range: {min: number; max: number} | null = null
    try {
        const comps = await fetchComparables(make, model)
        range = rangeFromComparables(comps, input)
    } catch {
        range = null
    }

    // 2) Fall back to the offline estimate when Jiji has no comparables / is down.
    if (!range) range = getCarValuation(input)

    return NextResponse.json({range})
}
