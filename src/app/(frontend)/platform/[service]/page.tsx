import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PlatformServiceDetail from '../../../../components/platform/PlatformServiceDetail'
import { PLATFORM_SERVICES } from '../../../../data/platformServices'

type PageProps = {
  params: Promise<{ service: string }>
}

export async function generateStaticParams() {
  return Object.keys(PLATFORM_SERVICES).map((service) => ({ service }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service } = await params
  const data = PLATFORM_SERVICES[service]
  if (!data) {
    return {
      title: 'Service Not Found | Lyncs',
    }
  }

  return {
    title: `${data.label} — Corporate Mobility Platform | Lyncs`,
    description: data.tagline,
  }
}

export default async function PlatformServicePage({ params }: PageProps) {
  const { service } = await params
  const data = PLATFORM_SERVICES[service]

  if (!data) {
    notFound()
  }

  return <PlatformServiceDetail service={data} />
}
