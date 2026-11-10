import FleetSwapHero from '../../components/home/FleetSwapHero'
import HowItWorksSection from '../../components/home/HowItWorksSection'
import CoverageSection from '../../components/home/CoverageSection'
import FleetCarsSection from '../../components/home/FleetCarsSection'
import DifferentiatorsSection from '../../components/home/DifferentiatorsSection'
import BeyondTheFleetSection from '../../components/home/BeyondTheFleetSection'
import IndividualsSection from '../../components/home/IndividualsSection'
import FaqSection from '../../components/home/FaqSection'
import PlatformShowcase from '../../components/home/PlatformShowcase'

export default function HomePage() {
  return (
    <>
      <FleetSwapHero />
      <HowItWorksSection />
      <CoverageSection />
      <FleetCarsSection />
      <DifferentiatorsSection />
      <BeyondTheFleetSection />
      <IndividualsSection />
      {/*<Testimonials />*/}
      <FaqSection />
      {/*<Strip />*/}
      {/*<PlugInSection />*/}
      <PlatformShowcase />
    </>
  )
}
