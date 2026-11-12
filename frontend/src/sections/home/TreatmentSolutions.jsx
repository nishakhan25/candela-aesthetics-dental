import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Check } from 'lucide-react'
import Reveal, { AnimatedTitle } from '../../components/common/Reveal'
import Button from '../../components/ui/Button'
import { getTreatmentBySlug, homeSolutions } from '../../data/treatments'

export default function TreatmentSolutions() {
  const [activeId, setActiveId] = useState(homeSolutions[0].id)
  const reduce = useReducedMotion()
  const active = homeSolutions.find((item) => item.id === activeId) || homeSolutions[0]
  const detail = getTreatmentBySlug(active.slug)

  return (
    <section className="relative overflow-hidden bg-ivory">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 45% at 10% 0%, rgba(197,164,109,0.14), transparent), radial-gradient(ellipse 50% 40% at 95% 100%, rgba(47,63,138,0.07), transparent)',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 py-14 md:px-8 lg:py-16">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-sans text-[11px] font-semibold tracking-[0.28em] uppercase text-gold">
            Our Services
          </p>
          <div className="editorial-rule mx-auto mt-3" />
          <AnimatedTitle
            as="h2"
            text="How can we help?"
            className="mt-4 font-display text-3xl font-medium text-espresso md:text-5xl"
            delay={0.08}
          />
          <p className="mt-3 font-sans text-sm text-warm-grey md:text-base">
            Tap a service to see what it includes — then book a consultation.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-3 lg:gap-4">
          {homeSolutions.map((item, index) => {
            const selected = item.id === activeId
            return (
              <motion.button
                key={item.id}
                type="button"
                onClick={() => setActiveId(item.id)}
                aria-pressed={selected}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.25,
                  delay: reduce ? 0 : Math.min(index * 0.03, 0.15),
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`relative flex h-[132px] w-full flex-col items-start border p-4 text-left transition-colors duration-300 md:h-[140px] md:p-5 ${
                  selected
                    ? 'z-[1] border-espresso bg-espresso text-white'
                    : 'border-espresso/10 bg-white text-espresso hover:border-gold/70'
                }`}
              >
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center border transition ${
                    selected
                      ? 'border-gold bg-gold text-espresso'
                      : 'border-espresso/25 text-transparent'
                  }`}
                  aria-hidden
                >
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                <p
                  className={`mt-auto font-sans text-sm font-semibold leading-snug md:text-[15px] ${
                    selected ? 'text-white' : 'text-espresso'
                  }`}
                >
                  {item.label}
                </p>
                <p
                  className={`mt-1 line-clamp-2 font-sans text-[11px] leading-snug ${
                    selected ? 'text-white/65' : 'text-warm-grey'
                  }`}
                >
                  {item.blurb}
                </p>
              </motion.button>
            )
          })}
        </div>

        <AnimatePresence mode="wait">
          {detail && (
            <motion.div
              key={active.id}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 border border-espresso/10 bg-white p-6 shadow-[0_20px_50px_rgba(24,26,64,0.06)] md:mt-8 md:p-8"
            >
              <p className="font-sans text-[11px] font-semibold tracking-[0.22em] uppercase text-gold">
                {detail.category === 'dental'
                  ? 'Dental'
                  : detail.category === 'physiotherapy'
                    ? 'Physiotherapy'
                    : 'Aesthetic'}
              </p>
              <h3 className="mt-2 font-display text-2xl text-espresso md:text-4xl">
                {detail.title}
              </h3>
              <p className="mt-3 max-w-3xl font-sans text-sm leading-relaxed text-warm-grey md:text-base">
                {detail.description}
              </p>
              {detail.benefits?.length > 0 && (
                <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                  {detail.benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex items-start gap-2 font-sans text-sm text-espresso"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={2.5} />
                      {benefit}
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button
                  to={`/book?category=${detail.category}&treatment=${detail.slug}`}
                  variant="gold"
                >
                  Book This
                </Button>
                <Link
                  to={`/treatments/${detail.slug}`}
                  className="gold-underline font-sans text-[11px] font-semibold tracking-[0.2em] uppercase text-espresso"
                >
                  Full details
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
