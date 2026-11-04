import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Check } from 'lucide-react'
import Seo from '../components/seo/Seo'
import PageHero from '../components/common/PageHero'
import Reveal, { AnimatedTitle, Stagger } from '../components/common/Reveal'
import Button from '../components/ui/Button'
import { specialists } from '../data/specialists'
import { unsplash } from '../data/unsplashAssets'

function initials(name) {
  return name
    .replace(/^Dr\.?\s*/i, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

export default function SpecialistsPage() {
  const [activeId, setActiveId] = useState(specialists[0]?.id)
  const reduce = useReducedMotion()
  const active = specialists.find((s) => s.id === activeId) || specialists[0]

  return (
    <>
      <Seo
        title="Our Specialists"
        description="Meet the dental, aesthetic and physiotherapy team at Candela Aesthetics & Dental in Lahore."
        path="/specialists"
      />
      <PageHero
        variant="split"
        eyebrow="Clinical Team"
        title="Specialists you can trust."
        description="Meet our dental, aesthetic, and physiotherapy specialists — select a profile to explore what they can do."
        image={unsplash.specialists}
      />

      <section className="relative overflow-hidden bg-ivory">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              'radial-gradient(ellipse 55% 40% at 15% 20%, rgba(197,164,109,0.12), transparent), radial-gradient(ellipse 50% 45% at 90% 80%, rgba(47,63,138,0.08), transparent)',
          }}
        />

        <div className="relative mx-auto max-w-7xl px-5 py-14 md:px-8 lg:py-20">
          <Reveal className="mx-auto mb-12 max-w-xl text-center">
            <p className="font-sans text-[11px] font-semibold tracking-[0.28em] uppercase text-gold">
              Meet the team
            </p>
            <div className="editorial-rule mx-auto mt-3" />
            <AnimatedTitle
              as="h2"
              text="Expertise, refined."
              className="mt-4 font-display text-3xl text-espresso md:text-4xl"
            />
          </Reveal>

          <Stagger
            className="flex flex-wrap items-start justify-center gap-8 md:gap-10 lg:gap-12"
            stagger={0.1}
            from="scale"
          >
            {specialists.map((person) => {
              const selected = person.id === activeId
              return (
                  <button
                    key={person.id}
                    type="button"
                    onClick={() => setActiveId(person.id)}
                    aria-pressed={selected}
                    className="group flex w-[140px] flex-col items-center text-center transition duration-300 hover:-translate-y-1 sm:w-[160px]"
                  >
                    <span
                      className={`relative flex h-32 w-32 items-center justify-center rounded-full transition duration-500 sm:h-36 sm:w-36 ${
                        selected
                          ? 'bg-gradient-to-br from-gold via-gold/70 to-clinic-blue p-[3px] shadow-[0_18px_40px_rgba(24,26,64,0.18)]'
                          : 'bg-gradient-to-br from-espresso/15 via-beige to-gold/30 p-[2px] group-hover:from-gold/50 group-hover:to-clinic-blue/40'
                      }`}
                    >
                      <span
                        className={`flex h-full w-full items-center justify-center rounded-full transition duration-500 ${
                          selected
                            ? 'bg-espresso text-white'
                            : 'bg-white text-espresso group-hover:bg-ivory'
                        }`}
                      >
                        <span className="font-display text-3xl tracking-wide sm:text-4xl">
                          {initials(person.name)}
                        </span>
                      </span>
                      {selected && (
                        <motion.span
                          layoutId="specialist-ring"
                          className="absolute -inset-1 rounded-full border border-gold/40"
                          transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                        />
                      )}
                    </span>
                    <span
                      className={`mt-4 font-display text-lg leading-tight transition sm:text-xl ${
                        selected ? 'text-espresso' : 'text-espresso/80'
                      }`}
                    >
                      {person.name}
                    </span>
                    <span
                      className={`mt-1 font-sans text-[11px] tracking-[0.12em] uppercase ${
                        selected ? 'text-gold' : 'text-warm-grey'
                      }`}
                    >
                      {person.title}
                    </span>
                  </button>
              )
            })}
          </Stagger>

          <AnimatePresence mode="wait">
            {active && (
              <motion.div
                key={active.id}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="relative mx-auto mt-14 max-w-5xl overflow-hidden rounded-[2rem] border border-espresso/8 bg-white/80 p-7 shadow-[0_24px_60px_rgba(24,26,64,0.08)] backdrop-blur-sm md:mt-16 md:p-10"
              >
                <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gold/10 blur-2xl" />
                <div className="pointer-events-none absolute -bottom-20 -left-10 h-52 w-52 rounded-full bg-clinic-blue/10 blur-2xl" />

                <div className="relative flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                  <div className="flex items-start gap-5">
                    <div className="hidden h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-espresso to-clinic-blue text-white sm:flex">
                      <span className="font-display text-2xl">{initials(active.name)}</span>
                    </div>
                    <div>
                      <h3 className="font-display text-3xl text-espresso md:text-4xl">
                        {active.name}
                      </h3>
                      <p className="mt-1 font-sans text-sm text-gold">
                        {active.title}
                        {active.qualifications ? ` · ${active.qualifications}` : ''}
                      </p>
                      <p className="mt-3 max-w-xl font-sans text-sm leading-relaxed text-warm-grey">
                        {active.tagline}
                      </p>
                    </div>
                  </div>
                  <Button to="/book" variant="gold" className="shrink-0 self-start">
                    Book Appointment
                  </Button>
                </div>

                <div className="relative mt-8 border-t border-espresso/8 pt-6">
                  <p className="font-sans text-[11px] font-semibold tracking-[0.22em] uppercase text-espresso/45">
                    Services
                  </p>
                  <ul className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                    {active.services.map((service) => (
                      <li
                        key={service}
                        className="flex items-start gap-2.5 rounded-full border border-espresso/6 bg-beige/40 px-4 py-2.5 font-sans text-sm text-espresso"
                      >
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-gold"
                          strokeWidth={2.5}
                        />
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  )
}
