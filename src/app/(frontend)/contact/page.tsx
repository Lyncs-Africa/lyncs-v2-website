import type { Metadata } from 'next'
import ContactHero from '../../../components/contact/ContactHero'
import ContactFormSection from '../../../components/contact/ContactFormSection'
import ContactChannelsSection from '../../../components/contact/ContactChannelsSection'
import ContactFaqSection from '../../../components/contact/ContactFaqSection'

export const metadata: Metadata = {
  title: 'Contact Us & Book a Demo | Lyncs',
  description:
    'Schedule a 15-minute live walkthrough of Lyncs. Consolidate your corporate rides, staff buses, flights, and EV fleet management into one platform.',
}

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactFormSection />
      <ContactFaqSection />
      <ContactChannelsSection />
    </>
  )
}
