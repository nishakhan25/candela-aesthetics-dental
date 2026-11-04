import { useState } from 'react'
import { Check } from 'lucide-react'
import Seo from '../components/seo/Seo'
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
  const active = specialists.find((s) => s.id === activeId) || specialists[0]

  return (
    <>
      <Seo
        title="Our Specialists"
        description="Meet the dental, aesthetic and physiotherapy team at Candela Aesthetics & Dental in Lahore."
        path="/specialists"
      />

      <section className="bg-ivory pt-28 md:pt-32">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 md:px-8 lg:grid-cols-12 lg:gap-12">
          <div className="py-8 lg:col-span-5 lg:py-14">
            <p className="font-sans text-[11px] font-semibold tracking-[0.28em] uppercase text-gold">
              Clinical Team
            </p>
            <div className="editorial-rule mt-3" />
            <h1 className="mt-5 font-display text-4xl leading-tight text-espresso md:text-5xl lg:text-6xl">
              Specialists you can trust.
            </h1>
            <p className="mt-5 max-w-md font-sans text-sm leading-relaxed text-warm-grey md:text-base">
              Meet our dental, aesthetic, and physiotherapy specialists — select a
              profile to explore what they can do.
            </p>
          </div>
          <div className="relative min-h-[280px] overflow-hidden lg:col-span-7 lg:min-h-[420px]">
            <img
              src={unsplash.specialists}
              alt="Candela clinical team"
              className="absolute inset-0 h-full w-full object-cover"
              loading="eager"
              fetchPriority="high"
            />
          </div>
        </div>
      </section>

      <section className="bg-beige/40">
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 lg:py-16">
          <div className="mx-auto mb-10 max-w-xl text-center">
            <p className="font-sans text-[11px] font-semibold tracking-[0.28em] uppercase text-gold">
              Meet the team
            </p>
            <div className="editorial-rule mx-auto mt-3" />
            <h2 className="mt-4 font-display text-3xl text-espresso md:text-4xl">
              Expertise, refined.
            </h2>
          </div>

          <div className="flex flex-wrap items-start justify-center gap-6 md:gap-8 lg:gap-10">
            {specialists.map((person) => {
              const selected = person.id === activeId
              return (
                <button
                  key={person.id}
                  type="button"
                  onClick={() => setActiveId(person.id)}
                  aria-pressed={selected}
                  className="group flex w-[130px] flex-col items-center text-center transition duration-200 hover:-translate-y-0.5 sm:w-[150px]"
                >
                  <span
                    className={`relative flex h-28 w-28 items-center justify-center rounded-full sm:h-32 sm:w-32 ${
                      selected
                        ? 'bg-gradient-to-br from-gold via-gold/70 to-clinic-blue p-[3px] shadow-[0_12px_28px_rgba(24,26,64,0.16)]'
                        : 'bg-gradient-to-br from-espresso/15 via-beige to-gold/30 p-[2px]'
                    }`}
                  >
                    <span
                      className={`flex h-full w-full items-center justify-center rounded-full ${
                        selected ? 'bg-espresso text-white' : 'bg-white text-espresso'
                      }`}
                    >
                      <span className="font-display text-3xl tracking-wide">
                        {initials(person.name)}
                      </span>
                    </span>
                  </span>
                  <span
                    className={`mt-3 font-display text-base leading-tight sm:text-lg ${
                      selected ? 'text-espresso' : 'text-espresso/80'
                    }`}
                  >
                    {person.name}
                  </span>
                  <span
                    className={`mt-1 font-sans text-[10px] tracking-[0.12em] uppercase ${
                      selected ? 'text-gold' : 'text-warm-grey'
                    }`}
                  >
                    {person.title}
                  </span>
                </button>
              )
            })}
          </div>

          {active ? (
            <div className="relative mx-auto mt-10 max-w-5xl border border-espresso/8 bg-white p-6 shadow-[0_16px_40px_rgba(24,26,64,0.06)] md:mt-12 md:p-9">
              <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div className="flex items-start gap-4">
                  <div className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-full bg-espresso text-white sm:flex">
                    <span className="font-display text-xl">{initials(active.name)}</span>
                  </div>
                  <div>
                    <h3 className="font-display text-2xl text-espresso md:text-3xl">
                      {active.name}
                    </h3>
                    <p className="mt-1 font-sans text-sm text-gold">
                      {active.title}
                      {active.qualifications ? ` · ${active.qualifications}` : ''}
                    </p>
                    <p className="mt-2 max-w-xl font-sans text-sm text-warm-grey">
                      {active.tagline}
                    </p>
                  </div>
                </div>
                <Button to="/book" variant="gold" className="shrink-0 self-start">
                  Book Appointment
                </Button>
              </div>

              <div className="mt-7 border-t border-espresso/8 pt-5">
                <p className="font-sans text-[11px] font-semibold tracking-[0.22em] uppercase text-espresso/45">
                  Services
                </p>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {active.services.map((service) => (
                    <li
                      key={service}
                      className="flex items-start gap-2 rounded-full border border-espresso/6 bg-beige/40 px-4 py-2 font-sans text-sm text-espresso"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={2.5} />
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </>
  )
}
