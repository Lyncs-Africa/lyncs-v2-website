import {isServer, QueryClient} from '@tanstack/react-query'

export const CATALOG_STALE_TIME_MS = 5 * 60 * 1000 // 5 minutes
export const CATALOG_GC_TIME_MS = 30 * 60 * 1000 // 30 minutes

export function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: CATALOG_STALE_TIME_MS,
                gcTime: CATALOG_GC_TIME_MS,
                refetchOnWindowFocus: false,
                refetchOnReconnect: false,
                retry: 1,
            },
        },
    })
}

let browserQueryClient: QueryClient | undefined

/**
 * Returns a singleton QueryClient in the browser so cached catalog queries survive
 * client-side navigation, and a fresh QueryClient per request on the server.
 */
export function getQueryClient() {
    if (isServer) {
        return makeQueryClient()
    }
    if (!browserQueryClient) {
        browserQueryClient = makeQueryClient()
    }
    return browserQueryClient
}

