'use client'

import classNames from 'classnames'
import { FiMonitor, FiMoon, FiSun } from 'react-icons/fi'
import { Theme, useTheme } from './ThemeProvider'

const OPTIONS: { value: Theme; label: string; Icon: typeof FiSun }[] = [
  { value: 'light', label: 'Light', Icon: FiSun },
  { value: 'dark', label: 'Dark', Icon: FiMoon },
  { value: 'system', label: 'System', Icon: FiMonitor },
]

type ThemeToggleProps = {
  onDarkHero?: boolean
  showLabels?: boolean
  className?: string
}

export default function ThemeToggle({ onDarkHero = false, showLabels = false, className }: ThemeToggleProps) {
  const { theme, setTheme, mounted } = useTheme()

  return (
    <div
      role="radiogroup"
      aria-label="Color theme"
      className={classNames(
        'inline-flex items-center gap-0.5 rounded-full border p-0.5',
        onDarkHero
          ? 'border-white/20 bg-white/10'
          : 'border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/5',
        className,
      )}
    >
      {OPTIONS.map(({ value, label, Icon }) => {
        // Only highlight after mount: the stored choice isn't known during SSR
        const active = mounted && theme === value
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={label}
            title={label}
            onClick={() => setTheme(value)}
            className={classNames(
              'flex items-center justify-center gap-1.5 rounded-full text-sm transition duration-150',
              showLabels ? 'flex-1 px-3 py-1.5' : 'h-7 w-7',
              active
                ? onDarkHero
                  ? 'bg-white text-primary'
                  : 'bg-white text-primary shadow-sm dark:bg-white/15 dark:text-white'
                : onDarkHero
                  ? 'text-white/70 hover:text-white'
                  : 'text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-white',
            )}
          >
            <Icon size={14} aria-hidden="true" />
            {showLabels && <span>{label}</span>}
          </button>
        )
      })}
    </div>
  )
}
