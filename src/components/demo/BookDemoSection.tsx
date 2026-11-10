import type {IconType} from 'react-icons'
import {LuBus, LuCalendarDays, LuCar, LuFuel, LuKey, LuPlane, LuTruck, LuWallet, LuWrench,} from 'react-icons/lu'
import BookDemoForm from './BookDemoForm'
import {MdElectricCar} from "react-icons/md";
import {FaChargingStation} from "react-icons/fa";

const SERVICES: { label: string; Icon: IconType }[] = [
    {label: 'EVs', Icon: MdElectricCar},
    {label: 'Charging', Icon: FaChargingStation},
    {label: 'Rides', Icon: LuCar},
    {label: 'Buses', Icon: LuBus},
    {label: 'Flights', Icon: LuPlane},
    {label: 'Ride wallets', Icon: LuWallet},
    {label: 'Car rentals', Icon: LuKey},
    {label: 'On demand tow', Icon: LuTruck},
    {label: 'On demand mechanic', Icon: LuWrench},
]

export default function BookDemoSection() {
    return (
        <section
            style={{
                backgroundImage:
                    'linear-gradient(rgba(26,39,71,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(26,39,71,0.05) 1px, transparent 1px)',
                backgroundSize: '48px 48px, 48px 48px',
            }}
            className="-mt-20 md:-mt-[130px] font-Quicksand dark:bg-night">
            <div
                className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 pb-16 pt-28 sm:px-6 md:pb-28 md:pt-[160px] xl:grid-cols-2 lg:gap-16 lg:px-8">
                <div className="flex flex-col justify-center">
          <span
              className="flex w-fit items-center gap-2 text-sm font-bold tracking-tight text-slate-700 dark:text-slate-300">
            <LuCalendarDays size={20} className="text-accent"/>
            Book a demo
          </span>

                    <h1 className="mt-7 text-[2.75rem] font-bold leading-[0.98] tracking-tight text-primary dark:text-white sm:text-6xl">
                        Take Lyncs for a
                        <br/>
                        <span className="text-accent">test drive.</span>
                    </h1>

                    <p className="mt-6 max-w-md text-[15px] leading-relaxed text-neutral-600 dark:text-slate-300">
                        Tell us about your fleet, and in 30 minutes we’ll show you the cars, the charging setup and what
                        the switch would cost, plus the dashboard that tracks it all.
                    </p>

                    <hr className="mt-10 max-w-md border-black/10 dark:border-white/10"/>

                    <p className="mt-8 text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-slate-500">
                        Everything we&apos;ll cover
                    </p>
                    <div className="mt-5 flex flex-wrap max-w-md gap-x-6 gap-y-5">
                        {SERVICES.map(({label, Icon}) => (
                            <div key={label} className="flex items-center gap-2.5">
                <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/[0.1] text-accent ring-1 ring-black/5 dark:bg-white/5 dark:ring-white/10">
                  <Icon size={18} aria-hidden="true"/>
                </span>
                                <span
                                    className="text-sm font-semibold tracking-tight text-neutral-600 dark:text-slate-300">
                  {label}
                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <BookDemoForm/>
            </div>
        </section>
    )
}
