import React from 'react'
import type { Metadata } from 'next'
import { Quicksand } from 'next/font/google'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ScrollToTop from '../../components/ui/ScrollToTop'
import ThemeProvider, { themeScript } from '../../components/theme/ThemeProvider'
import 'react-international-phone/style.css'
import 'react-toastify/dist/ReactToastify.css'
import '../globals.css'

const quicksand = Quicksand({ subsets: ['latin'], variable: '--font-quicksand' })

export const metadata: Metadata = {
  title: 'Lyncs',
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    // The theme script sets the `dark` class before hydration
    <html lang="en" className={quicksand.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-white text-primary dark:bg-night dark:text-slate-100 font-Quicksand antialiased">
        <ThemeProvider>
          <Header />
          <main id="top">{children}</main>
          <Footer />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  )
}
