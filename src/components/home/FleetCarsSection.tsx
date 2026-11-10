'use client'

import type {ComponentType} from 'react'
import Link from 'next/link'
import {motion} from 'framer-motion'
import {LuCarFront} from 'react-icons/lu'
import {ToastContainer} from 'react-toastify'
import SectionBadge from '../ui/SectionBadge'
import SlideUpModal from '../car/shared/SlideUpModal.jsx'
import SmallerModalImpl from '../car/shared/SmallerModal.jsx'

// Store-driven host; all props are optional at runtime, rendered prop-less.
const SmallerModal = SmallerModalImpl as ComponentType
import {LOCAL_CARS_RAW} from '../../lib/localCarsCatalog'
import {normalizeCar} from '../../lib/api/cars'
import {numberWithCommas} from '../../lib/utils'
import {useCarStore} from '../../store/carStore'

// A few featured vehicles from the catalog (cars.json). These ids have correct
// photos and a good spread of price; the rest live on /cars.
const FEATURED_IDS = ['byd-seagull-405km', 'leapmotor-c16', 'mercedes-benz-eqe500']

const byId = Object.fromEntries(LOCAL_CARS_RAW.map((c) => [c.id, c]))
// Normalize so the cards and the details modal share the same car shape.
const FEATURED = FEATURED_IDS.map((id) => byId[id])
    .filter(Boolean)
    .map((raw) => normalizeCar(raw))

const cardVariants = {
    hidden: {opacity: 0, y: 20},
    visible: (i: number) => ({opacity: 1, y: 0, transition: {duration: 0.5, delay: i * 0.12}}),
}

export default function FleetCarsSection() {
    const {openCarDetails, openRequestVehicle} = useCarStore()

    return (
        <section className="relative overflow-hidden bg-black pb-16 font-Quicksand text-white md:pb-24">
            <div className="mx-auto max-w-7xl px-4">
                {/* Header */}
                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-2xl">
                        <SectionBadge number="03" label="Ready to drive" variant="dark"/>
                        <h2 className="mt-6 text-4xl font-bold !leading-[1.1] tracking-tight text-white md:text-[2.5rem] xl:text-[3rem]">
                            EVs ready for your fleet{' '}
                            <span className="text-accent">today</span>
                        </h2>
                        <p className="mt-4 text-base leading-relaxed text-slate-300">
                            Pick the cars that fit your team, and we’ll value your current fleet against them.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-3 lg:shrink-0">
                        <Link
                            href="/cars"
                            className="inline-flex rounded-full border bg-white px-6 py-3 text-sm font-semibold tracking-wide text-primary transition hover:bg-slate-200"
                        >
                            See all cars
                        </Link>
                        <Link
                            href="/swap"
                            className="inline-flex rounded-full border border-white/30 px-6 py-3 text-sm font-semibold tracking-wide text-white transition hover:bg-white/5"
                        >
                            Get my fleet valued
                        </Link>
                    </div>
                </div>

                {/* Car cards */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{once: true, amount: 0.2}}
                    className="mt-12 grid gap-6 md:grid-cols-3"
                >
                    {FEATURED.map((car, i) => {
                        const seats = car.seats || '5 seats'
                        return (
                            <motion.div
                                key={car.id}
                                custom={i}
                                variants={cardVariants}
                                role="button"
                                tabIndex={0}
                                onClick={() => openCarDetails(car, false)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault()
                                        openCarDetails(car, false)
                                    }
                                }}
                                className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:border-white/20 hover:bg-white/[0.07]"
                            >
                                {/* Photo */}
                                <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-white/5">
                                    {car.image ? (
                                        <img
                                            src={car.image}
                                            alt={car.name}
                                            loading="lazy"
                                            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                                        />
                                    ) : (
                                        <LuCarFront size={56} aria-hidden="true" className="text-white/25"/>
                                    )}
                                    <span className="absolute left-3 top-3 rounded-full bg-emerald-500/20 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-300">
                                        New
                                    </span>
                                </div>

                                <div className="flex flex-1 flex-col p-5">
                                    <h3 className="text-[18px] font-bold tracking-tight text-white">{car.name}</h3>
                                    <p className="mt-1.5 text-[14px] text-slate-400">
                                        {car.rangeKm} km per charge · {seats}
                                    </p>
                                    <p className="mt-3 text-[20px] font-bold text-white">
                                        From ₦{numberWithCommas(car.price)}
                                    </p>
                                    <div className="mt-5 flex gap-2.5">
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                openCarDetails(car, true)
                                            }}
                                            className="inline-flex flex-1 justify-center rounded bg-white px-4 py-3 text-sm font-semibold tracking-wide text-primary transition hover:bg-slate-200"
                                        >
                                            Purchase vehicle
                                        </button>
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                openRequestVehicle(car, 'swap')
                                            }}
                                            className="inline-flex flex-1 justify-center rounded border border-white/30 px-4 py-3 text-sm font-semibold tracking-wide text-white transition hover:bg-white/10"
                                        >
                                            Swap my fleet
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </motion.div>
            </div>

            {/* Modal host so cards can open the car details drawer from the homepage */}
            <SlideUpModal/>
            <SmallerModal/>
            <ToastContainer position="top-right" autoClose={4000} hideProgressBar={false}/>
        </section>
    )
}
