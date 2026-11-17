import type { Metadata } from 'next'
import CareersHero from '../../../components/careers/CareersHero'
import CareersFaqSection from '../../../components/careers/CareersFaqSection'

export const metadata: Metadata = {
  title: 'Careers | Lyncs',
  description:
    'Lyncs builds the corporate mobility operating system for Africa. Currently focused on vehicle sales, EV swaps, and fleet deliveries.',
}

export default function CareersPage() {
  return (
    <>
      <CareersHero />
      <CareersFaqSection />
    </>
  )
}
