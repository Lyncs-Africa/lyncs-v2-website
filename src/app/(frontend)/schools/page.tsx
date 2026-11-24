import type { Metadata } from 'next'
import SchoolsHero from '../../../components/schools/SchoolsHero'
import SchoolsProblemSection from '../../../components/schools/SchoolsProblemSection'
import SchoolsSolutionsSection from '../../../components/schools/SchoolsSolutionsSection'
import SchoolsFaqSection from '../../../components/schools/SchoolsFaqSection'
import SchoolsCtaSection from '../../../components/schools/SchoolsCtaSection'

export const metadata: Metadata = {
  title: 'Safe, Trackable School Transport & Shuttle Fleets | Lyncs',
  description:
    'Give parents live tracking and peace of mind with a fully managed school shuttle fleet: vetted drivers, optional electric buses, 24/7 maintenance, and one monthly invoice.',
}

export default function SchoolsPage() {
  return (
    <>
      <SchoolsHero />
      <SchoolsProblemSection />
      <SchoolsSolutionsSection />
      <SchoolsFaqSection />
      <SchoolsCtaSection />
    </>
  )
}
