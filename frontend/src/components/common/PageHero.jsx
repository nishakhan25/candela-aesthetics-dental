import { motion } from 'framer-motion'

/**
 * Variants keep inner pages from looking identical:
 * - split: ivory copy + large photo panel
 * - bloom: soft light wash, centered type, floating image strip
 * - frame: photo in elegant frame with overlay copy
 * - ribbon: bright full-bleed image, light gradient, bottom text
 * - quiet: minimal ivory hero for legal pages
 */
export default function PageHero({
  eyebrow,
  title,
  description,
  image,
  compact = false,
  variant = 'split',
  cta,
}) {
  if (variant === 'quiet') {
    return (
      <section className="bg-ivory pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="mx-auto max-w-3xl px-5 text-center md:px-8">
          {eyebrow ? (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-sans text-[11px] font-semibold tracking-[0.28em] uppercase text-gold"
            >
              {eyebrow}
            </motion.p>
          ) : null}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.04 }}
            className="mt-4 font-display text-4xl text-espresso md:text-5xl"
          >
            {title}
          </motion.h1>
          {description ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.06 }}
              className="mt-4 font-sans text-sm text-warm-grey md:text-base"
            >
              {description}
            </motion.p>
          ) : null}
        </div>
      </section>
    )
  }

  if (variant === 'bloom') {
    return (
      <section className="relative overflow-hidden bg-beige pt-28 pb-10 md:pt-36 md:pb-14">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 55% 50% at 80% 20%, rgba(197,164,109,0.22), transparent), radial-gradient(ellipse 40% 45% at 10% 90%, rgba(47,63,138,0.1), transparent)',
          }}
        />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <div className="mx-auto max-w-2xl text-center">
            {eyebrow ? (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-sans text-[11px] font-semibold tracking-[0.28em] uppercase text-gold"
              >
                {eyebrow}
              </motion.p>
            ) : null}
            <div className="editorial-rule mx-auto mt-3" />
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-5 font-display text-4xl leading-tight text-espresso md:text-6xl"
            >
              {title}
            </motion.h1>
            {description ? (
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 }}
                className="mx-auto mt-4 max-w-xl font-sans text-sm leading-relaxed text-warm-grey md:text-base"
              >
                {description}
              </motion.p>
            ) : null}
            {cta}
          </div>
          {image ? (
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.35 }}
              className="relative mx-auto mt-10 max-w-5xl overflow-hidden shadow-[0_28px_70px_rgba(24,26,64,0.14)]"
            >
              <img
                src={image}
                alt=""
                className={`w-full object-cover ${compact ? 'aspect-[21/8]' : 'aspect-[21/9]'}`}
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/25 to-transparent" />
            </motion.div>
          ) : null}
        </div>
      </section>
    )
  }

  if (variant === 'frame') {
    return (
      <section className="bg-ivory pt-28 pb-8 md:pt-36 md:pb-10">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="relative overflow-hidden">
            {image ? (
              <img
                src={image}
                alt=""
                className={`w-full object-cover ${compact ? 'min-h-[42vh]' : 'min-h-[52vh]'} max-h-[62vh]`}
                loading="eager"
              />
            ) : (
              <div className={`${compact ? 'min-h-[42vh]' : 'min-h-[52vh]'} bg-espresso`} />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 lg:p-14">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-md md:p-8"
              >
                {eyebrow ? (
                  <p className="font-sans text-[11px] font-semibold tracking-[0.28em] uppercase text-gold">
                    {eyebrow}
                  </p>
                ) : null}
                <h1 className="mt-3 font-display text-4xl text-white md:text-5xl lg:text-6xl">
                  {title}
                </h1>
                {description ? (
                  <p className="mt-3 max-w-2xl font-sans text-sm text-white/80 md:text-base">
                    {description}
                  </p>
                ) : null}
                {cta}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (variant === 'ribbon') {
    return (
      <section className={`relative overflow-hidden ${compact ? 'min-h-[44vh]' : 'min-h-[56vh]'}`}>
        {image ? (
          <img
            src={image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/88 to-white/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-ivory via-transparent to-white/40" />
        <div className="relative mx-auto flex max-w-7xl flex-col justify-end px-5 pb-14 pt-36 md:px-8 md:pb-16 md:pt-44">
          {eyebrow ? (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-sans text-[11px] font-semibold tracking-[0.28em] uppercase text-gold"
            >
              {eyebrow}
            </motion.p>
          ) : null}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="mt-4 max-w-3xl font-display text-4xl leading-tight text-espresso md:text-6xl"
          >
            {title}
          </motion.h1>
          {description ? (
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16 }}
              className="mt-4 max-w-xl font-sans text-sm leading-relaxed text-warm-grey md:text-base"
            >
              {description}
            </motion.p>
          ) : null}
          {cta}
        </div>
      </section>
    )
  }

  // Default: split
  return (
    <section className="overflow-hidden bg-ivory pt-28 md:pt-32">
      <div className="mx-auto grid max-w-7xl items-stretch gap-0 px-5 md:px-8 lg:grid-cols-12">
        <div className="flex flex-col justify-center py-10 lg:col-span-5 lg:py-16 lg:pr-10">
          {eyebrow ? (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-sans text-[11px] font-semibold tracking-[0.28em] uppercase text-gold"
            >
              {eyebrow}
            </motion.p>
          ) : null}
          <div className="editorial-rule mt-3" />
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="mt-5 font-display text-4xl leading-tight text-espresso md:text-5xl lg:text-6xl"
          >
            {title}
          </motion.h1>
          {description ? (
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16 }}
              className="mt-5 max-w-md font-sans text-sm leading-relaxed text-warm-grey md:text-base"
            >
              {description}
            </motion.p>
          ) : null}
          {cta}
        </div>
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.05, duration: 0.35 }}
          className={`relative lg:col-span-7 ${compact ? 'min-h-[36vh]' : 'min-h-[48vh]'} overflow-hidden`}
        >
          {image ? (
            <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" loading="eager" />
          ) : (
            <div className="absolute inset-0 bg-beige" />
          )}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-ivory/30 lg:to-transparent" />
          <div className="absolute -left-3 top-8 hidden h-24 w-16 border border-gold/50 lg:block" />
          <div className="absolute -right-3 bottom-8 hidden h-28 w-20 border border-gold/40 lg:block" />
        </motion.div>
      </div>
    </section>
  )
}
