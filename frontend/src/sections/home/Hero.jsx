import { useEffect, useState, useRef } from 'react'
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import Button from '../../components/ui/Button'
import { homeSlides } from '../../data/unsplashAssets'
import { clinicConfig } from '../../utils/clinicConfig'

const INTERVAL_MS = 5200

export default function Hero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 140])
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.3])

  const total = homeSlides.length

  useEffect(() => {
    if (reduce) return undefined
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % total)
    }, INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [reduce, total])

  return (
    <section
      ref={ref}
      className="relative min-h-[92vh] overflow-hidden bg-espresso lg:min-h-screen"
    >
      <motion.div style={{ y, opacity }} className="absolute inset-0">
        <AnimatePresence mode="sync" initial={false}>
          <motion.img
            key={homeSlides[index].src}
            src={homeSlides[index].src}
            alt={homeSlides[index].alt}
            className="absolute inset-0 h-full w-full object-cover"
            initial={reduce ? false : { opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            loading={index === 0 ? 'eager' : 'lazy'}
            fetchPriority={index === 0 ? 'high' : 'auto'}
            decoding="async"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-espresso/90 via-espresso/55 to-espresso/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-transparent to-espresso/20" />
      </motion.div>

      <div className="relative mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-end px-5 pb-16 pt-32 md:px-8 md:pb-20 lg:min-h-screen lg:justify-center lg:pb-16">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="font-sans text-[11px] font-semibold tracking-[0.3em] uppercase text-gold"
        >
          Lahore · Aesthetic & Dental Care
        </motion.p>

        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-5 max-w-4xl font-display text-5xl leading-[1.02] font-medium text-white text-balance md:text-7xl"
        >
          {clinicConfig.tagline}
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.55 }}
          className="mt-5 max-w-lg font-sans text-base leading-relaxed text-white/75"
        >
          {clinicConfig.supportingLine}
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.7 }}
          className="mt-8 flex flex-col gap-3 sm:flex-row"
        >
          <Button to="/book" variant="gold">
            Book Consultation
          </Button>
          <Button to="/treatments/aesthetic" variant="outlineLight">
            View Treatments
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
