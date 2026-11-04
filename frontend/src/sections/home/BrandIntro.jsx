import { Link } from 'react-router-dom'
import Reveal from '../../components/common/Reveal'
import MotionImage from '../../components/common/MotionImage'
import Button from '../../components/ui/Button'
import { unsplash } from '../../data/unsplashAssets'

export default function BrandIntro() {
  return (
    <section className="bg-ivory">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-14 md:px-8 lg:grid-cols-12 lg:gap-12 lg:py-16">
        <Reveal from="left" className="relative lg:col-span-5">
          <MotionImage
            src={unsplash.about}
            alt="Candela clinic atmosphere"
            className="aspect-[5/4] w-full"
            imgClassName="aspect-[5/4]"
            kenBurns
            parallax
          />
        </Reveal>

        <Reveal from="right" className="lg:col-span-7" delay={0.12}>
          <p className="font-sans text-[11px] font-semibold tracking-[0.28em] uppercase text-gold">
            Candela
          </p>
          <div className="editorial-rule mt-3" />
          <h2 className="mt-4 font-display text-3xl leading-tight font-medium text-espresso md:text-4xl">
            Aesthetic and dental care, thoughtfully combined.
          </h2>
          <p className="mt-4 max-w-xl font-sans text-base leading-relaxed text-warm-grey">
            Personalized consultations in a calm clinic setting — designed for confidence,
            comfort, and lasting results.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Button to="/book" variant="gold">
              Book Consultation
            </Button>
            <Link
              to="/about"
              className="gold-underline font-sans text-[11px] font-semibold tracking-[0.22em] uppercase text-espresso"
            >
              About Us
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
