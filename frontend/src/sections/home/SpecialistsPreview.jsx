import { useEffect, useState } from 'react'
import Reveal from '../../components/common/Reveal'
import Button from '../../components/ui/Button'
import SectionHeading from '../../components/ui/SectionHeading'
import { specialistsPendingNote } from '../../data/specialists'
import { fetchDoctors } from '../../services/api'

export default function SpecialistsPreview() {
  const [specialists, setSpecialists] = useState([])

  useEffect(() => {
    fetchDoctors()
      .then(setSpecialists)
      .catch(() => setSpecialists([]))
  }, [])

  return (
    <section className="bg-ivory">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 lg:py-28">
        <SectionHeading
          eyebrow="Our Specialists"
          title="Guided by qualified clinicians."
          description="Meet the team behind Candela’s dental and aesthetic care."
        />

        {specialists.length === 0 ? (
          <Reveal className="mt-12 border border-espresso/10 bg-beige/60 px-8 py-12 md:px-12">
            <p className="font-display text-2xl text-espresso md:text-3xl">
              Profiles coming soon
            </p>
            <p className="mt-4 max-w-2xl font-sans text-sm leading-relaxed text-warm-grey md:text-base">
              {specialistsPendingNote}
            </p>
            <Button to="/specialists" variant="ghost" className="mt-8">
              View Specialists Page
            </Button>
          </Reveal>
        ) : (
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {specialists.slice(0, 3).map((doctor, index) => (
              <Reveal key={doctor.id} delay={index * 0.06}>
                {doctor.image_url ? (
                  <img
                    src={doctor.image_url}
                    alt={doctor.name}
                    className="aspect-[4/5] w-full object-cover"
                    loading="lazy"
                  />
                ) : null}
                <h3 className="mt-4 font-display text-2xl text-espresso">{doctor.name}</h3>
                <p className="mt-1 text-sm text-gold">{doctor.title}</p>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
