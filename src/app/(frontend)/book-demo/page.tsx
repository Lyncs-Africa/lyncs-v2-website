import type { Metadata } from 'next'
import BookDemoSection from '../../../components/demo/BookDemoSection'

export const metadata: Metadata = {
  title: 'Book a Demo | Lyncs Africa',
  description:
    'Schedule a free 15-minute live demo of the Lyncs corporate mobility platform. Pick your preferred date and time, tell us about your team, and a specialist will walk you through everything.',
}

export default function BookDemoPage() {
  return <BookDemoSection />
}
