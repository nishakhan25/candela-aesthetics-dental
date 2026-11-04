import Seo from '../components/seo/Seo'
import Reveal, { AnimatedTitle, Stagger } from '../components/common/Reveal'
import Button from '../components/ui/Button'
import HomeSlideshow from '../sections/home/HomeSlideshow'
import { clinicConfig } from '../utils/clinicConfig'

const pillars = [
  {
    title: 'Patient-first guidance',
    copy: 'Every pathway begins with consultation and informed consent.',
  },
  {
    title: 'Dual expertise',
    copy: 'Dental and aesthetic care under one trusted clinic address.',
  },
  {
    title: 'Calm clinical setting',
    copy: 'A composed environment at 1053-Ravi Block, Allama Iqbal Town.',
  },
]

export default function AboutPage() {
  return (
    <>
      <Seo
        title="About Us"
        description="Learn about Candela Aesthetics & Dental — a Lahore clinic uniting aesthetic wellness and dental care."
        path="/about"
      />

      <section className="relative overflow-hidden bg-ivory pt-32 pb-16 md:pt-40 md:pb-20">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 50% 40% at 100% 0%, rgba(197,164,109,0.16), transparent), radial-gradient(ellipse 40% 45% at 0% 100%, rgba(47,63,138,0.07), transparent)',
          }}
        />
        <div className="relative mx-auto max-w-4xl px-5 text-center md:px-8">
          <Reveal from="down">
            <p className="font-sans text-[11px] font-semibold tracking-[0.28em] uppercase text-gold">
              About Candela
            </p>
            <div className="editorial-rule mx-auto mt-3" />
          </Reveal>
          <AnimatedTitle
            text="Science, beauty, and quiet confidence."
            className="mt-5 font-display text-4xl leading-tight text-espresso md:text-6xl"
            delay={0.12}
          />
          <Reveal from="up" delay={0.05}>
            <p className="mx-auto mt-5 max-w-2xl font-sans text-base leading-relaxed text-warm-grey md:text-lg">
              A modern clinic experience designed around personalized care, clinical
              clarity, and lasting patient trust — where aesthetic wellness and dental
              care meet under one roof in Lahore.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:px-8 lg:grid-cols-12 lg:py-20">
        <Reveal from="left" className="lg:col-span-5">
          <p className="font-sans text-[11px] font-semibold tracking-[0.28em] uppercase text-gold">
            Our Philosophy
          </p>
          <div className="editorial-rule mt-4" />
          <AnimatedTitle
            as="h2"
            text="Care that feels considered."
            className="mt-5 font-display text-4xl text-espresso md:text-5xl"
            delay={0.1}
          />
        </Reveal>
        <Reveal from="right" className="space-y-5 lg:col-span-7" delay={0.1}>
          <p className="font-sans text-base leading-relaxed text-warm-grey md:text-lg">
            Candela Aesthetics & Dental serves patients seeking refined aesthetic and
            dental care in Lahore. Known publicly as part of Candela Medical Complex /
            Candela Laser Center & Polyclinic, the clinic brings dermatology-led
            aesthetics and dentistry into one composed environment.
          </p>
          <p className="font-sans text-base leading-relaxed text-warm-grey md:text-lg">
            We believe confidence grows from clarity: clear recommendations, honest
            timelines, and treatments chosen for the individual — never for trend alone.
          </p>
          <p className="font-sans text-base leading-relaxed text-warm-grey md:text-lg">
            From first consultation to ongoing care, every detail is designed to feel
            private, reassuring, and clinically guided.
          </p>
          <ul className="space-y-3 border-l border-gold/50 pl-5">
            {clinicConfig.facilityNames.map((name) => (
              <li key={name} className="font-sans text-sm text-espresso">
                Also known as: {name}
              </li>
            ))}
          </ul>
          <div className="pt-2">
            <Button to="/book" variant="gold">
              Book a Consultation
            </Button>
          </div>
        </Reveal>
      </section>

      <HomeSlideshow />

      <section className="bg-beige">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 lg:py-24">
          <Stagger className="grid gap-10 md:grid-cols-3" stagger={0.12}>
            {pillars.map((item, i) => (
              <div key={item.title} className="hover-lift bg-white/70 p-6 md:p-7">
                <p className="font-sans text-[11px] tracking-[0.24em] uppercase text-gold">
                  0{i + 1}
                </p>
                <h3 className="mt-3 font-display text-2xl text-espresso">{item.title}</h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-warm-grey">
                  {item.copy}
                </p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 text-center md:px-8">
        <Reveal from="scale">
          <h2 className="font-display text-4xl text-espresso md:text-5xl">
            Ready to begin your consultation?
          </h2>
          <Button to="/book" variant="gold" className="mt-8">
            Book Your Consultation
          </Button>
        </Reveal>
      </section>
    </>
  )
}
