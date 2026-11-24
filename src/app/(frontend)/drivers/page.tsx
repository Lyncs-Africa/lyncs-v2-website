import type { Metadata } from 'next'
import DriversHero from '../../../components/drivers/DriversHero'
import DriversProblemSection from '../../../components/drivers/DriversProblemSection'
import DriversSolutionsSection from '../../../components/drivers/DriversSolutionsSection'
import DriversFaqSection from '../../../components/drivers/DriversFaqSection'
import DriversCtaSection from '../../../components/drivers/DriversCtaSection'

export const metadata: Metadata = {
  title: 'Rent-to-Own EVs & Higher Earnings for E-Hailing Drivers | Lyncs',
  description:
    'Rent-to-own an electric vehicle, cut running costs by up to 80%, drive across Bolt, Uber and LagRide, and get 24/7 roadside rescue. Built for e-hailing drivers in Lagos.',
}

export default function DriversPage() {
  return (
    <>
      <DriversHero />
      <DriversProblemSection />
      <DriversSolutionsSection />
      <DriversFaqSection />
      <DriversCtaSection />
    </>
  )
}
