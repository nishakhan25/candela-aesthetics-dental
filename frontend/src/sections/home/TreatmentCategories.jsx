import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import Reveal from '../../components/common/Reveal'
import { categories } from '../../data/treatments'

export default function TreatmentCategories() {
  const reduce = useReducedMotion()

  return (
    <section className="bg-beige">
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 lg:py-16">
        <Reveal className="mb-8 max-w-2xl">
          <p className="font-sans text-[11px] font-semibold tracking-[0.28em] uppercase text-gold">
            Treatments
          </p>
          <div className="editorial-rule mt-3" />
          <h2 className="mt-4 font-display text-3xl font-medium text-espresso md:text-4xl">
            Dental Care & Aesthetic Care
          </h2>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2">
          {categories.map((category, index) => (
            <Reveal key={category.id} delay={index * 0.06}>
              <Link
                to={`/treatments/${category.slug}`}
                className="group relative block overflow-hidden bg-espresso"
              >
                <motion.img
                  src={category.image}
                  alt={category.name}
                  className="aspect-[16/10] w-full object-cover opacity-70"
                  loading="lazy"
                  decoding="async"
                  whileHover={reduce ? undefined : { scale: 1.05 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <p className="font-sans text-[11px] tracking-[0.28em] uppercase text-gold">
                    {category.eyebrow}
                  </p>
                  <h3 className="mt-2 font-display text-3xl text-white">{category.name}</h3>
                  <p className="mt-2 max-w-sm font-sans text-sm text-white/75">
                    {category.highlights.slice(0, 2).join(' · ')}
                  </p>
                  <span className="mt-4 inline-flex font-sans text-[11px] font-semibold tracking-[0.2em] uppercase text-gold transition group-hover:text-white">
                    Explore →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
