'use client'

import {useInfiniteQuery, useQuery} from '@tanstack/react-query'
import {fetchCarDetail, fetchCarsCatalog} from '@/lib/api/cars'
import {CATALOG_GC_TIME_MS, CATALOG_STALE_TIME_MS} from '@/lib/queryClient'

export type CarsCatalogParams = {
    page?: number
    limit?: number
    condition?: 'NEW' | 'USED'
    fuelType?: string
    bodyType?: string
    origin?: string
    make?: string
    keyword?: string
    q?: string
    keyWord?: string
    segment?: string
    sort?: string
    source?: string
    enrichImages?: string | number
    format?: string
}

/**
 * Strips empty / "all" values so logically identical catalog requests share one cache key.
 */
export function normalizeCatalogParams(params: CarsCatalogParams = {}): CarsCatalogParams {
    const clean: CarsCatalogParams = {}
    const entries = Object.entries(params).sort(([a], [b]) => a.localeCompare(b))
    for (const [key, val] of entries) {
        if (val !== undefined && val !== null && val !== '' && val !== 'all') {
            ;(clean as Record<string, unknown>)[key] = val
        }
    }
    return clean
}

export function carsCatalogQueryKey(params: CarsCatalogParams = {}) {
    return ['cars-catalog', normalizeCatalogParams(params)] as const
}

export function useCarsCatalogQuery(
    params: CarsCatalogParams = {},
    options: {enabled?: boolean; staleTime?: number} = {},
) {
    const normalized = normalizeCatalogParams(params)
    return useQuery({
        queryKey: carsCatalogQueryKey(normalized),
        // Intentionally omit AbortSignal so React Strict Mode's mount/remount deduplicates onto one in-flight fetch.
        queryFn: () => fetchCarsCatalog(normalized),
        staleTime: options.staleTime ?? CATALOG_STALE_TIME_MS,
        gcTime: CATALOG_GC_TIME_MS,
        enabled: options.enabled ?? true,
    })
}

export function carsCatalogInfiniteQueryKey(params: Omit<CarsCatalogParams, 'page'> = {}) {
    return ['cars-catalog-infinite', normalizeCatalogParams(params)] as const
}

export function useCarsCatalogInfiniteQuery(
    params: Omit<CarsCatalogParams, 'page'> = {},
    options: {enabled?: boolean; staleTime?: number} = {},
) {
    const normalized = normalizeCatalogParams(params)
    return useInfiniteQuery({
        queryKey: carsCatalogInfiniteQueryKey(normalized),
        initialPageParam: 1,
        queryFn: ({pageParam = 1}) =>
            fetchCarsCatalog({...normalized, page: Number(pageParam)}),
        getNextPageParam: (lastPage) => {
            const pagination = lastPage?.data?.pagination
            if (pagination && pagination.hasNextPage) {
                const currentPage = Number(pagination.page || pagination.currentPage || 1)
                return currentPage + 1
            }
            return undefined
        },
        staleTime: options.staleTime ?? CATALOG_STALE_TIME_MS,
        gcTime: CATALOG_GC_TIME_MS,
        enabled: options.enabled ?? true,
    })
}

export function carDetailQueryKey(carId?: string | number | null, platform?: string | null) {
    return ['car-detail', carId ? String(carId) : '', platform || null] as const
}

export function useCarDetailQuery(
    carId?: string | number | null,
    platform?: string | null,
    options: {enabled?: boolean; staleTime?: number} = {},
) {
    return useQuery({
        queryKey: carDetailQueryKey(carId, platform),
        queryFn: () => fetchCarDetail(carId, platform),
        staleTime: options.staleTime ?? CATALOG_STALE_TIME_MS,
        gcTime: CATALOG_GC_TIME_MS,
        enabled: Boolean(carId) && (options.enabled ?? true),
    })
}

