import classNames from 'classnames'

type Variant = 'light' | 'dark' | 'auto'

const VARIANTS: Record<Variant, {circle: string; pill: string; line: string}> = {
    // Fixed light sections (white background)
    light: {
        circle: 'bg-primary text-white',
        pill: 'border border-slate-200 bg-surface text-slate-700',
        line: 'bg-slate-200',
    },
    // Fixed dark sections (black / navy background)
    dark: {
        circle: 'bg-white text-primary',
        pill: 'border border-white/15 bg-white/10 text-white',
        line: 'bg-white/20',
    },
    // Theme-responsive sections (light in light mode, dark in dark mode)
    auto: {
        circle: 'bg-primary text-white dark:bg-[#2D419A]',
        pill: 'border border-slate-200 bg-surface text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300',
        line: 'bg-slate-200 dark:bg-white/10',
    },
}

type Props = {
    number: string
    label: string
    variant?: Variant
    align?: 'left' | 'center'
    className?: string
}

export default function SectionBadge({number, label, variant = 'light', align = 'left', className}: Props) {
    const v = VARIANTS[variant]
    return (
        <div className={classNames('flex items-center gap-4', align === 'center' && 'justify-center', className)}>
            <span className={classNames('flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold', v.circle)}>
                {number}
            </span>
            <span className={classNames('rounded-full px-5 py-2.5 text-sm font-semibold', v.pill)}>{label}</span>
            {align === 'left' && (
                <span aria-hidden className={classNames('hidden h-px w-20 sm:block xl:w-28', v.line)}/>
            )}
        </div>
    )
}
