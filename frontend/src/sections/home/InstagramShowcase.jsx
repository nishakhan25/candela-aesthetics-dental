import Reveal from '../../components/common/Reveal'
import Button from '../../components/ui/Button'
import { instagramPosts } from '../../data/instagramAssets'
import { clinicConfig } from '../../utils/clinicConfig'

export default function InstagramShowcase() {
  const tiles = instagramPosts.slice(0, 6)

  return (
    <section className="bg-beige">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="font-sans text-[11px] font-semibold tracking-[0.28em] uppercase text-gold">
              Instagram
            </p>
            <div className="editorial-rule mt-4" />
            <h2 className="mt-5 font-display text-4xl text-espresso md:text-5xl">
              Follow the clinic diary.
            </h2>
            <p className="mt-5 font-sans text-base leading-relaxed text-warm-grey">
              Real moments from @candelaaestheticsanddental — treatments, smiles, and
              clinic life.
            </p>
            <Button
              href={clinicConfig.instagramUrl}
              target="_blank"
              rel="noreferrer"
              variant="primary"
              className="mt-8"
            >
              Follow on Instagram
            </Button>
          </Reveal>

          <Reveal className="grid grid-cols-3 gap-3 lg:col-span-7" delay={0.1}>
            {tiles.map((item) => (
              <a
                key={item.id}
                href={clinicConfig.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="overflow-hidden"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="aspect-square w-full object-cover transition duration-500 hover:scale-105"
                  loading="lazy"
                />
              </a>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
