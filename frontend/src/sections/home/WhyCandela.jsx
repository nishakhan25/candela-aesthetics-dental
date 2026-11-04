import Reveal from '../../components/common/Reveal'
import SectionHeading from '../../components/ui/SectionHeading'

const pillars = [
  {
    title: 'Personalized patient experience',
    copy: 'Consultations begin with listening — your goals, concerns, and comfort guide every recommendation.',
  },
  {
    title: 'Professional clinical care',
    copy: 'Dental and aesthetic pathways are delivered with disciplined clinical standards and clear communication.',
  },
  {
    title: 'Modern clinic environment',
    copy: 'A composed setting designed for privacy, calm, and confidence from arrival to aftercare.',
  },
  {
    title: 'Hygiene & safety commitment',
    copy: 'Clean protocols and careful treatment planning are foundational — never optional.',
  },
]

export default function WhyCandela() {
  return (
    <section className="bg-beige">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 lg:py-28">
        <SectionHeading
          eyebrow="Why Candela"
          title="Trust built through thoughtful care."
          description="These principles reflect the experience we design for every patient. Clinical claims and specialist credentials are published only after verification."
        />

        <div className="mt-14 grid gap-px bg-espresso/10 md:grid-cols-2">
          {pillars.map((pillar, index) => (
            <Reveal key={pillar.title} delay={index * 0.05} className="bg-ivory p-8 md:p-10">
              <p className="font-sans text-[11px] tracking-[0.24em] uppercase text-gold">
                0{index + 1}
              </p>
              <h3 className="mt-4 font-display text-2xl text-espresso md:text-3xl">
                {pillar.title}
              </h3>
              <p className="mt-4 font-sans text-sm leading-relaxed text-warm-grey md:text-base">
                {pillar.copy}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
