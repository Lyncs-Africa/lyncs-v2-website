import type { Metadata } from 'next'
import AboutHero from '../../../components/about/AboutHero'
import AboutProblemSection from '../../../components/about/AboutProblemSection'
import AboutValuesSection from '../../../components/about/AboutValuesSection'

export const metadata: Metadata = {
  title: 'Our Story & Mission | Lyncs',
  description:
    'Learn how Lyncs is building the corporate mobility operating system for Africa. Born in Lagos, connecting rides, shuttles, flights, and electric vehicle fleet management.',
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutProblemSection />
      <AboutValuesSection />
    </>
  )
}
