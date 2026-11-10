'use client'

// Drives the owner-tab valuation: watches the form, debounces changes, calls
// the async valuation seam and writes status/result into the store.
//
// NOTE: the brief asked for TanStack Query here, but it isn't in the project
// (and the brief said to use it only "if already in the project"). This is the
// plain-React equivalent — debounce + request-id guard against stale results.
// fetchCarValuation() is the single swap point for a real API later.

import {useEffect, useRef} from 'react'
import {fetchCarValuation} from '@/lib/valuation/getCarValuation'
import {useValuationStore} from '@/store/valuationStore'

const DEBOUNCE_MS = 400

export function useCarValuation() {
    const owner = useValuationStore((s) => s.owner)
    const setResult = useValuationStore((s) => s.setResult)

    // Monotonic id so a slow earlier request can't overwrite a newer result.
    const reqId = useRef(0)

    const {make, model, year, km, condition} = owner
    const complete = Boolean(make && model && year)

    useEffect(() => {
        if (!complete) {
            setResult('empty', null)
            return
        }

        setResult('loading', null)
        const id = ++reqId.current
        const timer = setTimeout(async () => {
            const range = await fetchCarValuation({
                make,
                model,
                year,
                km: Number(String(km).replace(/\D/g, '')) || '',
                condition,
            })
            if (id !== reqId.current) return // superseded
            setResult(range ? 'success' : 'couldnt', range)
        }, DEBOUNCE_MS)

        return () => clearTimeout(timer)
    }, [complete, make, model, year, km, condition, setResult])
}
