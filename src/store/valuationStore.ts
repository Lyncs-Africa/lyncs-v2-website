// Shared state for the swap valuation experience. Kept in Zustand so the
// selected tab and everything typed into either form survive switching tabs.

import {create} from 'zustand'
import type {Condition} from '@/lib/valuation/data'
import type {Tenor} from '@/lib/valuation/config'
import type {ValuationRange} from '@/lib/valuation/getCarValuation'
import type {EvOption} from '@/lib/valuation/evOptions'

export type Tab = 'owner' | 'fleet'

// 'empty' -> form incomplete, 'loading' -> valuing, 'success' -> range found,
// 'couldnt' -> car not in dataset (needs a human).
export type ResultStatus = 'empty' | 'loading' | 'success' | 'couldnt'

export type OwnerForm = {
    make: string
    model: string
    year: number | ''
    km: string // kept as a formatted string ("85,000") for the input
    condition: Condition
}

export type FleetForm = {
    count: string
    fleetFileName: string
    showRough: boolean
    rough: string
    fullName: string
    company: string
    role: string
    phone: string
    email: string
}

const emptyOwner: OwnerForm = {
    make: '',
    model: '',
    year: '',
    km: '',
    condition: 'Tokunbo',
}

const emptyFleet: FleetForm = {
    count: '1–5',
    fleetFileName: '',
    showRough: false,
    rough: '',
    fullName: '',
    company: '',
    role: '',
    phone: '',
    email: '',
}

type ValuationState = {
    tab: Tab
    owner: OwnerForm
    fleet: FleetForm

    status: ResultStatus
    result: ValuationRange | null
    tenor: Tenor

    // EV the car is swapped into. `evs` is the loaded catalog; `selectedEvId` is
    // the user's explicit pick, or null to auto-match the best fit.
    evs: EvOption[]
    selectedEvId: string | null

    setTab: (tab: Tab) => void
    setOwnerField: <K extends keyof OwnerForm>(key: K, value: OwnerForm[K]) => void
    setFleetField: <K extends keyof FleetForm>(key: K, value: FleetForm[K]) => void
    setTenor: (tenor: Tenor) => void
    setResult: (status: ResultStatus, result: ValuationRange | null) => void
    setEvs: (evs: EvOption[]) => void
    setSelectedEv: (id: string | null) => void
    resetOwner: () => void
    resetFleet: () => void
}

export const useValuationStore = create<ValuationState>((set) => ({
    tab: 'owner',
    owner: {...emptyOwner},
    fleet: {...emptyFleet},

    status: 'empty',
    result: null,
    tenor: 48,

    evs: [],
    selectedEvId: null,

    setTab: (tab) => set({tab}),

    setOwnerField: (key, value) =>
        set((s) => {
            const owner = {...s.owner, [key]: value}
            // Changing the make invalidates the chosen model.
            if (key === 'make') owner.model = ''
            return {owner}
        }),

    setFleetField: (key, value) => set((s) => ({fleet: {...s.fleet, [key]: value}})),

    setTenor: (tenor) => set({tenor}),

    setResult: (status, result) => set({status, result}),

    setEvs: (evs) => set({evs}),

    setSelectedEv: (id) => set({selectedEvId: id}),

    resetOwner: () => set({owner: {...emptyOwner}, status: 'empty', result: null, selectedEvId: null}),

    resetFleet: () => set({fleet: {...emptyFleet}}),
}))
