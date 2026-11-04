import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Reveal from '../../components/common/Reveal'
import { homeSlides } from '../../data/unsplashAssets'

const INTERVAL_MS = 15000

export default function HomeSlideshow() {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const total = homeSlides.length
  const go = (next) => setIndex((prev) => (next + total) % total)

  useEffect(() => {
    if (reduce || paused) return undefined
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % total)
    }, INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [reduce, paused, total])

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 lg:py-16">
        <Reveal className="mb-8 text-center">
          <p className="font-sans text-[11px] font-semibold tracking-[0.28em] uppercase text-gold">
            Inside Candela
          </p>
          <div className="editorial-rule mx-auto mt-3" />
          <h2 className="mt-4 font-display text-3xl text-espresso md:text-4xl">
            A glimpse of the experience
          </h2>
        </Reveal>

        <div
          className="relative overflow-hidden bg-espresso shadow-[0_24px_60px_rgba(24,26,64,0.1)]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative aspect-[16/9] md:aspect-[21/9]">
            <AnimatePresence mode="sync" initial={false}>
              <motion.img
                key={homeSlides[index].src}
                src={homeSlides[index].src}
                alt={homeSlides[index].alt}
                className="absolute inset-0 h-full w-full object-cover"
                initial={reduce ? false : { opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                loading="lazy"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/55 via-transparent to-transparent" />

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 md:p-8">
              <p className="font-display text-2xl text-white md:text-3xl">
                {homeSlides[index].caption}
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => go(index - 1)}
                  className="flex h-10 w-10 items-center justify-center bg-white/15 text-white backdrop-blur-sm transition hover:bg-white hover:text-espresso"
                  aria-label="Previous"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => go(index + 1)}
                  className="flex h-10 w-10 items-center justify-center bg-white/15 text-white backdrop-blur-sm transition hover:bg-white hover:text-espresso"
                  aria-label="Next"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-2 bg-ivory px-4 py-4">
            {homeSlides.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-1.5 transition-all duration-400 ${
                  i === index ? 'w-7 bg-espresso' : 'w-1.5 bg-espresso/25 hover:bg-espresso/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
