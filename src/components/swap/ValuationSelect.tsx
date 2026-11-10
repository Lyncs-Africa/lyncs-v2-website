'use client'

import {useEffect, useId, useRef, useState} from 'react'
import {AnimatePresence, motion} from 'framer-motion'
import {LuCheck, LuChevronDown} from 'react-icons/lu'

// Themed dropdown matching the rest of the site (BookDemoForm / FleetValuationForm),
// extended with a placeholder, a disabled state and keyboard handling.
export default function ValuationSelect({
    label,
    value,
    options,
    onChange,
    placeholder,
    disabled = false,
    error,
}: {
    label: string
    value: string
    options: readonly (string | number)[]
    onChange: (v: string) => void
    placeholder?: string
    disabled?: boolean
    error?: string
}) {
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)
    const btnRef = useRef<HTMLButtonElement>(null)
    const labelId = useId()

    useEffect(() => {
        if (!open) return
        const onDown = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
        }
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setOpen(false)
                btnRef.current?.focus()
            }
        }
        document.addEventListener('mousedown', onDown)
        document.addEventListener('keydown', onKey)
        return () => {
            document.removeEventListener('mousedown', onDown)
            document.removeEventListener('keydown', onKey)
        }
    }, [open])

    const hasValue = Boolean(value)

    return (
        <div className="relative" ref={ref}>
            <label id={labelId} className="block text-[13px] text-slate-500 dark:text-white/50">
                {label}
            </label>
            <button
                ref={btnRef}
                type="button"
                disabled={disabled}
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-labelledby={labelId}
                onClick={() => !disabled && setOpen((o) => !o)}
                className={`mt-1.5 flex w-full items-center justify-between gap-2 border-b pb-2 text-left text-[15px] transition-colors focus:outline-none ${
                    disabled
                        ? 'cursor-not-allowed border-slate-200 opacity-50 dark:border-white/10'
                        : error
                            ? 'border-red-400 dark:border-red-400/60'
                            : 'border-slate-300 hover:border-slate-400 focus:border-slate-900 dark:border-white/15 dark:hover:border-white/40 dark:focus:border-white'
                } ${hasValue ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-white/30'}`}
            >
                <span className="truncate">{hasValue ? value : placeholder || 'Select'}</span>
                <LuChevronDown
                    size={16}
                    aria-hidden="true"
                    className={`shrink-0 text-slate-400 transition-transform dark:text-white/40 ${open ? 'rotate-180' : ''}`}
                />
            </button>

            {error && <p className="mt-1 text-[12px] font-medium text-red-500 dark:text-red-400">{error}</p>}

            <AnimatePresence>
                {open && (
                    <motion.ul
                        role="listbox"
                        aria-labelledby={labelId}
                        initial={{opacity: 0, y: 6}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: 6}}
                        className="absolute left-0 top-full z-30 mt-3 max-h-64 w-full min-w-[200px] overflow-auto rounded-2xl border border-slate-200 bg-white p-1.5 shadow-2xl dark:border-white/10 dark:bg-[#131A28]"
                    >
                        {options.map((opt) => {
                            const str = String(opt)
                            const active = str === value
                            return (
                                <li key={str} role="option" aria-selected={active}>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            onChange(str)
                                            setOpen(false)
                                            btnRef.current?.focus()
                                        }}
                                        className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-[14px] transition ${
                                            active
                                                ? 'bg-accent font-medium text-white dark:bg-[#2D419A]'
                                                : 'text-slate-700 hover:bg-slate-100 dark:text-white/80 dark:hover:bg-white/10'
                                        }`}
                                    >
                                        <span>{str}</span>
                                        {active && <LuCheck size={15} className="shrink-0" aria-hidden="true" />}
                                    </button>
                                </li>
                            )
                        })}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    )
}
