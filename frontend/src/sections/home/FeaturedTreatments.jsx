import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import Reveal from '../../components/common/Reveal'
import SectionHeading from '../../components/ui/SectionHeading'
import { getFeaturedTreatments } from '../../data/treatments'

export default function FeaturedTreatments() {
  const featured = getFeaturedTreatments()
  const reduce = useReducedMotion()

  return (
    <section className="bg-ivory">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 lg:py-28">
        <SectionHeading
          eyebrow="Featured Care"
          title="Treatments shaped around you."
          description="A curated selection of dental and aesthetic services verified from the clinic’s public offerings."
        />

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {featured.map((treatment, index) => (
            <Reveal key={treatment.id} delay={index * 0.06}>
              <article className="group">
                <div className="overflow-hidden">
                  <motion.img
                    src={treatment.image}
                    alt={treatment.title}
                    className="aspect-[16/11] w-full object-cover"
                    loading="lazy"
                    decoding="async"
                    initial={reduce ? false : { scale: 1.08 }}
                    whileInView={{ scale: 1 }}
                    whileHover={reduce ? undefined : { scale: 1.05 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="font-sans text-[10px] tracking-[0.24em] uppercase text-gold">
                      {treatment.category === 'dental' ? 'Dental' : 'Aesthetic'}
                    </p>
                    <h3 className="mt-2 font-display text-2xl text-espresso md:text-3xl">
                      {treatment.title}
                    </h3>
                    <p className="mt-3 max-w-md font-sans text-sm leading-relaxed text-warm-grey">
                      {treatment.shortDescription}
                    </p>
                  </div>
                  <Link
                    to={`/treatments/${treatment.slug}`}
                    className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center border border-espresso/15 text-espresso transition group-hover:border-gold group-hover:text-gold"
                    aria-label={`Explore ${treatment.title}`}
                  >
                    <ArrowUpRight size={18} />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
