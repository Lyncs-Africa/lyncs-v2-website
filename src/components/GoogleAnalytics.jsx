'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'
import { hasConsented } from '@/lib/cookies'

// Set NEXT_PUBLIC_GA_ID in your environment to activate Google Analytics.
// Until it is set, this component renders nothing (no tracking is loaded).
const GA_ID = process.env.NEXT_PUBLIC_GA_ID

export default function GoogleAnalytics() {
  const [consented, setConsented] = useState(false)

  useEffect(() => {
    setConsented(hasConsented())

    const onUpdate = () => setConsented(hasConsented())
    window.addEventListener('cookie-consent-updated', onUpdate)
    return () => window.removeEventListener('cookie-consent-updated', onUpdate)
  }, [])

  if (!GA_ID || !consented) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  )
}
