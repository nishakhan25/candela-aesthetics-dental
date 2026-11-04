import { Link } from 'react-router-dom'
import Seo from '../components/seo/Seo'
import PageHero from '../components/common/PageHero'
import Reveal from '../components/common/Reveal'
import {
  getCategoryBySlug,
  getTreatmentsByCategory,
} from '../data/treatments'

export default function TreatmentsPage({ categorySlug }) {
  const category = getCategoryBySlug(categorySlug)
  const items = getTreatmentsByCategory(categorySlug)

  if (!category) return null

  const heroVariant =
    categorySlug === 'dental' ? 'ribbon' : categorySlug === 'physiotherapy' ? 'bloom' : 'frame'

  return (
    <>
      <Seo
        title={category.name}
        description={category.description}
        path={`/treatments/${category.slug}`}
      />
      <PageHero
        variant={heroVariant}
        eyebrow={category.eyebrow}
        title={category.title}
        description={category.description}
        image={category.image}
      />

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 lg:py-24">
        <div className="mb-10 flex flex-wrap gap-3">
          {[
            { slug: 'dental', label: 'Dental Care' },
            { slug: 'aesthetic', label: 'Aesthetic Care' },
            { slug: 'physiotherapy', label: 'Physiotherapy' },
          ].map((tab) => (
            <Link
              key={tab.slug}
              to={`/treatments/${tab.slug}`}
              className={`border px-4 py-2 font-sans text-[11px] tracking-[0.18em] uppercase ${
                categorySlug === tab.slug
                  ? 'border-gold bg-gold text-espresso'
                  : 'border-espresso/15 text-espresso'
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </div>

        <div className="grid gap-10 md:grid-cols-2">
          {items.map((treatment, index) => (
            <Reveal key={treatment.id} delay={index * 0.05}>
              <article className="group">
                <Link to={`/treatments/${treatment.slug}`} className="block overflow-hidden">
                  <img
                    src={treatment.image}
                    alt={treatment.title}
                    className="aspect-[16/11] w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </Link>
                <h2 className="mt-5 font-display text-3xl text-espresso">
                  <Link to={`/treatments/${treatment.slug}`} className="gold-underline">
                    {treatment.title}
                  </Link>
                </h2>
                <p className="mt-3 font-sans text-sm leading-relaxed text-warm-grey">
                  {treatment.shortDescription}
                </p>
                {treatment.benefits?.length > 0 && (
                  <ul className="mt-3 space-y-1">
                    {treatment.benefits.slice(0, 3).map((b) => (
                      <li key={b} className="font-sans text-xs text-espresso/70">
                        — {b}
                      </li>
                    ))}
                  </ul>
                )}
                <Link
                  to={`/treatments/${treatment.slug}`}
                  className="mt-4 inline-block font-sans text-[11px] font-semibold tracking-[0.2em] uppercase text-gold"
                >
                  Explore details
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
