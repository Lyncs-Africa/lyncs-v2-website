import type { Metadata } from 'next'
import CareersHero from '../../../components/careers/CareersHero'
import CareersRolesSection from '../../../components/careers/CareersRolesSection'
import CareersFaqSection from '../../../components/careers/CareersFaqSection'

export const metadata: Metadata = {
  title: 'Careers & Open Roles | Lyncs',
  description:
    'Join Lyncs in building the corporate mobility operating system for Africa. Explore open engineering, operations, and growth roles in Lagos and across Africa.',
}

export default function CareersPage() {
  return (
    <>
      <CareersHero />
      <CareersRolesSection />
      <CareersFaqSection />
    </>
  )
}
