import type { Metadata } from 'next'
import BusinessesHero from '../../../components/businesses/BusinessesHero'
import BusinessesProblemSection from '../../../components/businesses/BusinessesProblemSection'
import BusinessesSolutionsSection from '../../../components/businesses/BusinessesSolutionsSection'
import BusinessesFaqSection from '../../../components/businesses/BusinessesFaqSection'
import BusinessesCtaSection from '../../../components/businesses/BusinessesCtaSection'

export const metadata: Metadata = {
  title: 'Corporate Mobility for Businesses & Enterprises | Lyncs',
  description:
    'Consolidate employee rides, staff shuttles, executive flights, and digital fuel vouchers into one corporate wallet. One monthly tax invoice, zero manual claims.',
}

export default function BusinessesPage() {
  return (
    <>
      <BusinessesHero />
      <BusinessesProblemSection />
      <BusinessesSolutionsSection />
      <BusinessesFaqSection />
      <BusinessesCtaSection />
    </>
  )
}
