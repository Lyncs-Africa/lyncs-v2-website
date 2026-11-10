'use client'

import {useEffect, useState} from 'react'
import {BsRocket} from 'react-icons/bs'

export default function ScrollToTop() {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 300)
        onScroll()
        window.addEventListener('scroll', onScroll, {passive: true})
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'})
    }

    return (
        <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className={`group fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-primary bg-white text-primary shadow-lg transition-all duration-300 hover:bg-slate-50 dark:border-white/20 dark:bg-primary dark:text-white dark:hover:bg-primary/80 ${
                visible ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-3 opacity-0 pointer-events-none'
            }`}
        >
            <BsRocket size={22} aria-hidden="true" className="group-hover:animate-bounce"/>
        </button>
    )
}
