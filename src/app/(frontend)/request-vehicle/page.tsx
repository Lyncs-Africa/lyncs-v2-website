import {Suspense} from 'react'
import type {Metadata} from 'next'
import RequestVehicle from '../../../components/request-vehicle/RequestVehicle'

export const metadata: Metadata = {
    title: 'Request a Vehicle | Lyncs Africa',
    description:
        'Can’t find the exact vehicle in our catalog? Tell us the make, model, condition, and target budget — we’ll source, inspect, and deliver it straight to you.',
}

export default function RequestVehiclePage() {
    return (
        <Suspense>
            <RequestVehicle />
        </Suspense>
    )
}
