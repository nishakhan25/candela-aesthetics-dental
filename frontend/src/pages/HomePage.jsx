import Seo from '../components/seo/Seo'
import Hero from '../sections/home/Hero'
import BrandIntro from '../sections/home/BrandIntro'
import TreatmentSolutions from '../sections/home/TreatmentSolutions'
import FinalCta from '../sections/home/FinalCta'

export default function HomePage() {
  return (
    <>
      <Seo
        title="Where Science Meets Beauty"
        description="Candela Aesthetics & Dental in Lahore — personalized aesthetic and dental care with a premium patient experience."
        path="/"
      />
      <Hero />
      <BrandIntro />
      <TreatmentSolutions />
      <FinalCta />
    </>
  )
}
