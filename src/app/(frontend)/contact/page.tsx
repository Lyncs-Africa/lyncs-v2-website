import type { Metadata } from 'next'
import ContactFormSection from '../../../components/contact/ContactFormSection'

export const metadata: Metadata = {
  title: 'Contact Us | Lyncs',
  description:
    'Discuss your corporate mobility needs with Lyncs. Consolidate staff rides, buses, flights, and EV fleet management into one platform. Reach out and we\'ll tailor it to you.',
}

export default function ContactPage() {
  return (
    <>
      <ContactFormSection />
    </>
  )
}
