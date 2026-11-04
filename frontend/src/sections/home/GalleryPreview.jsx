import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import Reveal from '../../components/common/Reveal'
import { galleryItems } from '../../data/gallery'
import { clinicConfig } from '../../utils/clinicConfig'

export default function GalleryPreview() {
  const preview = galleryItems.slice(0, 4)
  const reduce = useReducedMotion()

  return (
    <section className="bg-ivory">
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 lg:py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <Reveal>
            <p className="font-sans text-[11px] font-semibold tracking-[0.28em] uppercase text-gold">
              Gallery
            </p>
            <div className="editorial-rule mt-3" />
            <h2 className="mt-4 font-display text-3xl text-espresso md:text-4xl">
              From our Instagram
            </h2>
          </Reveal>
          <Link
            to="/gallery"
            className="gold-underline shrink-0 font-sans text-[11px] font-semibold tracking-[0.22em] uppercase text-espresso"
          >
            View all
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {preview.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.04}>
              <a
                href={clinicConfig.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="block overflow-hidden"
              >
                <motion.img
                  src={item.image}
                  alt={item.title}
                  className="aspect-square w-full object-cover"
                  loading="lazy"
                  whileHover={reduce ? undefined : { scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
