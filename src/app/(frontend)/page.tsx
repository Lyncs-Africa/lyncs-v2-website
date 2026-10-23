import HomeHero from '../../components/home/HomeHero'
// Previous chat-bubble version kept in ExplainerSection.tsx
import ExplainerCircles from '../../components/home/ExplainerCircles'
import PlugInSection from '../../components/home/PlugInSection'
import EVSection from '../../components/home/EVSection'
import EVSupportSection from '../../components/home/EVSupportSection'

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <ExplainerCircles />
      <PlugInSection />
      <EVSection />
      <EVSupportSection />
    </>
  )
}
