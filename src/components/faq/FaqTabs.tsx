'use client'

import {useState} from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import {LuArrowRight, LuMinus, LuPlus} from 'react-icons/lu'
import type {Group} from './faqData'

type Props = {
    groups: Group[]
    // Cap questions shown per category (homepage preview). Omit for the full list.
    limit?: number
    // When set, a "See all questions" link is shown under the list.
    seeAllHref?: string
}

export default function FaqTabs({groups, limit, seeAllHref}: Props) {
    const [active, setActive] = useState(0)
    const [open, setOpen] = useState<number | null>(0)

    const selectTab = (i: number) => {
        setActive(i)
        setOpen(0)
    }

    const items = limit ? groups[active].items.slice(0, limit) : groups[active].items

    return (
        <div className="grid gap-8 lg:grid-cols-4 lg:gap-12">
            {/* Category sidebar */}
            <div
                role="tablist"
                aria-label="FAQ categories"
                className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:items-start lg:gap-1 lg:overflow-visible lg:pb-0"
            >
                {groups.map((g, i) => {
                    const isActive = active === i
                    return (
                        <button
                            key={g.category}
                            role="tab"
                            aria-selected={isActive}
                            type="button"
                            onClick={() => selectTab(i)}
                            className={classNames(
                                'whitespace-nowrap rounded-full px-5 py-3 text-left text-[15px] font-medium transition',
                                isActive
                                    ? 'border border-accent/40 bg-accent/10 text-accent'
                                    : 'text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-white',
                            )}
                        >
                            {g.category}
                        </button>
                    )
                })}
            </div>

            {/* Questions for the active category */}
            <div className="lg:col-span-3">
                {items.map((item, i) => {
                    const isOpen = open === i
                    const toggle = () => setOpen(isOpen ? null : i)

                    if (isOpen) {
                        return (
                            <div
                                key={item.q}
                                className="my-2 rounded-2xl bg-slate-50 p-5 md:p-6"
                            >
                                <button
                                    type="button"
                                    onClick={toggle}
                                    className="flex w-full items-start justify-between gap-4 text-left"
                                    aria-expanded="true"
                                >
                                    <span className="text-[16px] font-semibold text-primary md:text-[17px]">
                                        {item.q}
                                    </span>
                                    <LuMinus size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-slate-400"/>
                                </button>
                                <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-slate-500">
                                    {item.a}
                                </p>
                            </div>
                        )
                    }

                    return (
                        <button
                            key={item.q}
                            type="button"
                            onClick={toggle}
                            className="flex w-full items-center justify-between gap-4 border-b border-slate-200 px-5 py-6 text-left dark:border-white/10"
                            aria-expanded="false"
                        >
                            <span className="text-[16px] font-medium text-primary md:text-[17px] dark:text-white">
                                {item.q}
                            </span>
                            <LuPlus size={20} aria-hidden="true" className="shrink-0 text-slate-400 dark:text-slate-300"/>
                        </button>
                    )
                })}

                {seeAllHref && (
                    <Link
                        href={seeAllHref}
                        className="group mt-6 inline-flex items-center gap-2 px-5 text-[15px] font-semibold text-accent transition hover:gap-3"
                    >
                        See all questions
                        <LuArrowRight size={18} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5"/>
                    </Link>
                )}
            </div>
        </div>
    )
}
