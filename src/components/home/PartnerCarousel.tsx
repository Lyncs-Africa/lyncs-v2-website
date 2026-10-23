'use client'

import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

// Text wordmarks until we have clean, transparent partner logo files
const PARTNERS = ['Bolt', 'Immortal AI', 'Get440', 'Clan', 'Argon', 'Capital Advisors', 'Patmus', 'Lagride', 'inDrive', 'Cowry']

// Loop mode needs more slides than fit on screen, so the list is repeated
const SLIDES = [...PARTNERS, ...PARTNERS]

export default function PartnerCarousel() {
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    setReduceMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  return (
    <div
      className="partner-swiper w-full"
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
      }}
    >
      <Swiper
        key={reduceMotion ? 'still' : 'moving'}
        modules={[Autoplay]}
        slidesPerView="auto"
        spaceBetween={32}
        loop
        speed={4000}
        allowTouchMove={false}
        autoplay={
          reduceMotion ? false : { delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true }
        }
      >
        {SLIDES.map((name, i) => (
          <SwiperSlide key={i} className="!w-auto">
            <span className="whitespace-nowrap text-lg font-bold tracking-tight text-slate-400 dark:text-slate-500">
              {name}
            </span>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
