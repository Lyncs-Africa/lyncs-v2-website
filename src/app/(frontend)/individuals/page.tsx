import type { Metadata } from 'next'
import IndividualsHero from '../../../components/individuals/IndividualsHero'
import IndividualsProblemSection from '../../../components/individuals/IndividualsProblemSection'
import IndividualsSolutionsSection from '../../../components/individuals/IndividualsSolutionsSection'
import IndividualsFaqSection from '../../../components/individuals/IndividualsFaqSection'
import IndividualsCtaSection from '../../../components/individuals/IndividualsCtaSection'

export const metadata: Metadata = {
  title: 'Smart Mobility & EV Car Swaps for Individuals | Lyncs',
  description:
    'Compare ride prices across Bolt, Uber, and LagRide. Swap your petrol car for an EV to cut fuel expenses by 80%, buy discounted fuel vouchers, and access 24/7 roadside mechanics in Lagos.',
}

export default function IndividualsPage() {
  return (
    <>
      <IndividualsHero />
      <IndividualsProblemSection />
      <IndividualsSolutionsSection />
      <IndividualsFaqSection />
      <IndividualsCtaSection />
    </>
  )
}
