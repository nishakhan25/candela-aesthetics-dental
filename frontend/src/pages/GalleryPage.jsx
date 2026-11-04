import { useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Seo from '../components/seo/Seo'
import PageHero from '../components/common/PageHero'
import Reveal from '../components/common/Reveal'
import Lightbox from '../components/gallery/Lightbox'
import { galleryFilters, galleryItems } from '../data/gallery'
import { unsplash } from '../data/unsplashAssets'
import { clinicConfig } from '../utils/clinicConfig'
import Button from '../components/ui/Button'

export default function GalleryPage() {
  const [filter, setFilter] = useState('all')
  const [active, setActive] = useState(null)
  const reduce = useReducedMotion()

  const filtered = useMemo(
    () => (filter === 'all' ? galleryItems : galleryItems.filter((item) => item.category === filter)),
    [filter],
  )

  return (
    <>
      <Seo
        title="Gallery"
        description="Official Instagram photography from Candela Aesthetics & Dental."
        path="/gallery"
      />
      <PageHero
        variant="ribbon"
        eyebrow="Instagram"
        title="Gallery"
        description="Images sourced exclusively from the official Candela Instagram."
        image={unsplash.aesthetic}
        compact
      />

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-3" role="tablist" aria-label="Gallery filters">
            {galleryFilters.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={filter === item.id}
                onClick={() => setFilter(item.id)}
                className={`border px-4 py-2 font-sans text-[11px] tracking-[0.18em] uppercase transition ${
                  filter === item.id
                    ? 'border-gold bg-gold text-espresso'
                    : 'border-espresso/15 text-espresso hover:border-gold'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <Button
            href={clinicConfig.instagramUrl}
            target="_blank"
            rel="noreferrer"
            variant="ghost"
            className="!px-4 !py-2"
          >
            View on Instagram
          </Button>
        </div>

        <div className="columns-1 gap-6 md:columns-2 lg:columns-3">
          {filtered.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.04} className="mb-6 break-inside-avoid">
              <button
                type="button"
                className="w-full overflow-hidden text-left"
                onClick={() => setActive(item)}
              >
                <motion.img
                  src={item.image}
                  alt={item.title}
                  className="w-full object-cover"
                  loading="lazy"
                  whileHover={reduce ? undefined : { scale: 1.03 }}
                  transition={{ duration: 0.55 }}
                />
                <p className="mt-3 font-display text-xl text-espresso">{item.title}</p>
              </button>
            </Reveal>
          ))}
        </div>
      </section>
      <Lightbox item={active} onClose={() => setActive(null)} />
    </>
  )
}
