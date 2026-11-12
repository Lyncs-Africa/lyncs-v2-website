'use client'

import {useEffect, useState} from 'react'
import {BsRocket} from 'react-icons/bs'
import {useCarStore} from '@/store/carStore'

export default function ScrollToTop() {
    const [scrolled, setScrolled] = useState(false)
    const [hasModalOpen, setHasModalOpen] = useState(false)
    const slideUpOpen = useCarStore((s) => s.slideUpOpen)
    const modal = useCarStore((s) => s.modal)
    const isSmallerModalOpen = useCarStore((s) => s.isSmallerModalOpen)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 300)
        onScroll()
        window.addEventListener('scroll', onScroll, {passive: true})
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => {
        const checkModal = () => {
            const isBodyLocked = typeof document !== 'undefined' && document.body.style.overflow === 'hidden'
            const hasOverlay =
                typeof document !== 'undefined' &&
                Boolean(
                    document.querySelector(
                        '.main-overlay.block, .smaller-modal, [role="dialog"], .slideUp.translate-y-0'
                    )
                )
            setHasModalOpen(
                Boolean(isBodyLocked) ||
                Boolean(hasOverlay) ||
                Boolean(slideUpOpen) ||
                Boolean(modal) ||
                Boolean(isSmallerModalOpen)
            )
        }

        checkModal()
        const observer = new MutationObserver(checkModal)
        if (typeof document !== 'undefined') {
            observer.observe(document.body, {attributes: true, attributeFilter: ['style', 'class']})
        }
        return () => observer.disconnect()
    }, [slideUpOpen, modal, isSmallerModalOpen])

    const isVisible = scrolled && !hasModalOpen

    const scrollToTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'})
    }

    return (
        <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className={`group fixed bottom-8 right-8 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-primary bg-white text-primary shadow-lg transition-all duration-300 hover:bg-slate-50 dark:border-white/20 dark:bg-primary dark:text-white dark:hover:bg-primary/80 ${
                isVisible ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-3 opacity-0 pointer-events-none'
            }`}
        >
            <BsRocket size={22} aria-hidden="true" className="group-hover:animate-bounce"/>
        </button>
    )
}
