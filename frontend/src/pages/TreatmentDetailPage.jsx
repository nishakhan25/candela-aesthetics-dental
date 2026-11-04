import { Link, useParams } from 'react-router-dom'
import Seo from '../components/seo/Seo'
import PageHero from '../components/common/PageHero'
import Reveal from '../components/common/Reveal'
import Button from '../components/ui/Button'
import { getTreatmentBySlug } from '../data/treatments'

export default function TreatmentDetailPage() {
  const { slug } = useParams()
  const treatment = getTreatmentBySlug(slug)

  if (!treatment) {
    return (
      <section className="mx-auto max-w-3xl px-5 py-40 text-center">
        <h1 className="font-display text-4xl text-espresso">Treatment not found</h1>
        <Button to="/treatments/aesthetic" variant="ghost" className="mt-8">
          Browse Treatments
        </Button>
      </section>
    )
  }

  return (
    <>
      <Seo
        title={treatment.title}
        description={treatment.shortDescription}
        path={`/treatments/${treatment.slug}`}
      />
      <PageHero
        variant="frame"
        eyebrow={
          treatment.category === 'dental'
            ? 'Dental Care'
            : treatment.category === 'physiotherapy'
              ? 'Physiotherapy'
              : 'Aesthetic Care'
        }
        title={treatment.title}
        description={treatment.shortDescription}
        image={treatment.image}
        compact
      />

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:px-8 lg:grid-cols-12 lg:py-24">
        <Reveal className="lg:col-span-7">
          <h2 className="font-display text-3xl text-espresso md:text-4xl">
            About this treatment
          </h2>
          <p className="mt-6 font-sans text-base leading-relaxed text-warm-grey md:text-lg">
            {treatment.description}
          </p>
          {treatment.benefits?.length > 0 && (
            <ul className="mt-6 space-y-2">
              {treatment.benefits.map((benefit) => (
                <li key={benefit} className="font-sans text-sm text-espresso">
                  — {benefit}
                </li>
              ))}
            </ul>
          )}
          <p className="mt-4 font-sans text-sm leading-relaxed text-warm-grey">
            Final suitability, protocols, and pricing are confirmed during consultation.
            Website booking creates a request only — confirmation follows clinic review.
          </p>
        </Reveal>
        <Reveal className="border border-espresso/10 bg-beige/50 p-8 lg:col-span-5" delay={0.08}>
          <p className="font-sans text-[11px] tracking-[0.24em] uppercase text-gold">
            Next step
          </p>
          <h3 className="mt-3 font-display text-2xl text-espresso">
            Request a consultation
          </h3>
          <p className="mt-3 font-sans text-sm text-warm-grey">
            Share your preferred date and time. Our team will review and respond.
          </p>
          <Button
            to={`/book?treatment=${treatment.slug}&category=${treatment.category}`}
            variant="gold"
            className="mt-6 w-full"
          >
            Book This Treatment
          </Button>
          <Link
            to={`/treatments/${treatment.category}`}
            className="mt-4 inline-block font-sans text-[11px] tracking-[0.18em] uppercase text-espresso"
          >
            ← Back to{' '}
            {treatment.category === 'dental'
              ? 'Dental'
              : treatment.category === 'physiotherapy'
                ? 'Physiotherapy'
                : 'Aesthetic'}
          </Link>
        </Reveal>
      </section>
    </>
  )
}
