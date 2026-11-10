import type { Metadata } from 'next'
import PlatformOverviewHero from '../../../components/platform/PlatformOverviewHero'
import PlatformServicesGrid from '../../../components/platform/PlatformServicesGrid'
import PlatformIntegrationShowcase from '../../../components/platform/PlatformIntegrationShowcase'
import PlatformFaqSection from '../../../components/platform/PlatformFaqSection'
import BusinessesCtaSection from '../../../components/businesses/BusinessesCtaSection'

export const metadata: Metadata = {
  title: 'Platform Suite & Mobility Rails | Lyncs',
  description:
    'Explore the 7 integrated corporate mobility rails by Lyncs: rides, staff buses, executive flights, car rentals, emergency towing, and on-demand mechanics.',
}

export default function PlatformPage() {
  return (
    <>
      <PlatformOverviewHero />
      <PlatformServicesGrid />
      <PlatformIntegrationShowcase />
      <PlatformFaqSection />
      <BusinessesCtaSection />
    </>
  )
}
