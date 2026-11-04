import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Check } from 'lucide-react'
import Reveal from '../../components/common/Reveal'
import Button from '../../components/ui/Button'
import { specialists } from '../../data/specialists'

export default function DoctorsCapabilities() {
  const [activeId, setActiveId] = useState(specialists[0].id)
  const reduce = useReducedMotion()
  const active = specialists.find((d) => d.id === activeId) || specialists[0]

  return (
    <section className="bg-ivory">
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 lg:py-16">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-sans text-[11px] font-semibold tracking-[0.28em] uppercase text-gold">
            Our Doctors
          </p>
          <div className="editorial-rule mx-auto mt-3" />
          <h2 className="mt-4 font-display text-3xl font-medium text-espresso md:text-4xl">
            Who can help — and what they do
          </h2>
          <p className="mt-3 font-sans text-sm text-warm-grey md:text-base">
            Select a doctor to see their services.
          </p>
        </Reveal>

        <div className="mt-8 flex flex-wrap justify-center gap-2 md:gap-3">
          {specialists.map((doctor) => {
            const selected = doctor.id === activeId
            return (
              <button
                key={doctor.id}
                type="button"
                onClick={() => setActiveId(doctor.id)}
                aria-pressed={selected}
                className={`border px-4 py-3 text-left transition md:px-5 ${
                  selected
                    ? 'border-espresso bg-espresso text-white'
                    : 'border-espresso/15 bg-white text-espresso hover:border-gold'
                }`}
              >
                <p className="font-sans text-sm font-semibold">{doctor.name}</p>
                <p
                  className={`mt-0.5 font-sans text-[11px] ${
                    selected ? 'text-gold' : 'text-warm-grey'
                  }`}
                >
                  {doctor.title}
                </p>
              </button>
            )
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.28 }}
            className="mt-6 border border-espresso/10 bg-beige/40 p-6 md:mt-8 md:p-8"
          >
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <h3 className="font-display text-2xl text-espresso md:text-3xl">{active.name}</h3>
                <p className="mt-1 font-sans text-sm text-gold">
                  {active.title}
                  {active.qualifications ? ` · ${active.qualifications}` : ''}
                </p>
                <p className="mt-2 max-w-xl font-sans text-sm text-warm-grey">{active.tagline}</p>
              </div>
              <Button to="/book" variant="gold" className="mt-4 shrink-0 md:mt-0">
                Book Appointment
              </Button>
            </div>

            <p className="mt-6 font-sans text-[11px] font-semibold tracking-[0.2em] uppercase text-espresso/50">
              What they can do
            </p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {active.services.map((service) => (
                <li
                  key={service}
                  className="flex items-start gap-2 font-sans text-sm text-espresso"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-clinic-blue" strokeWidth={2.5} />
                  {service}
                </li>
              ))}
            </ul>

            <Link
              to="/specialists"
              className="gold-underline mt-6 inline-flex font-sans text-[11px] font-semibold tracking-[0.2em] uppercase text-espresso"
            >
              View all specialists
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
