import { useEffect, useState } from 'react'
import Reveal from '../../components/common/Reveal'
import SectionHeading from '../../components/ui/SectionHeading'
import { fetchTestimonials } from '../../services/api'

export default function Testimonials() {
  const [items, setItems] = useState([])

  useEffect(() => {
    fetchTestimonials()
      .then(setItems)
      .catch(() => setItems([]))
  }, [])

  return (
    <section className="bg-ivory">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 lg:py-28">
        <SectionHeading
          eyebrow="Patient Voices"
          title="Stories shared with care."
          description="We only publish approved patient feedback."
        />

        {items.length === 0 ? (
          <Reveal className="mt-12 border border-dashed border-espresso/20 bg-beige/40 px-8 py-14 text-center md:px-16">
            <p className="font-display text-3xl text-espresso md:text-4xl">
              “Approved patient reflections will live in this space.”
            </p>
            <p className="mx-auto mt-5 max-w-xl font-sans text-sm text-warm-grey">
              Placeholder only — no fabricated reviews are shown.
            </p>
          </Reveal>
        ) : (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item, index) => (
              <Reveal key={item.id} delay={index * 0.05} className="border border-espresso/10 bg-beige/30 p-8">
                <p className="font-display text-2xl text-espresso">“{item.quote}”</p>
                <p className="mt-6 font-sans text-sm text-gold">{item.patient_name}</p>
                {item.treatment_label ? (
                  <p className="mt-1 font-sans text-xs text-warm-grey">{item.treatment_label}</p>
                ) : null}
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
