import { motion } from 'framer-motion'

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  light = false,
  className = '',
}) {
  const alignClass =
    align === 'center' ? 'mx-auto text-center items-center' : 'items-start text-left'

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={`flex max-w-3xl flex-col gap-4 ${alignClass} ${className}`}
    >
      {eyebrow ? (
        <p
          className={`font-sans text-[11px] font-semibold uppercase tracking-[0.28em] ${
            light ? 'text-gold' : 'text-gold'
          }`}
        >
          {eyebrow}
        </p>
      ) : null}
      <div className={`editorial-rule ${align === 'center' ? 'mx-auto' : ''}`} />
      <h2
        className={`font-display text-4xl leading-[1.1] font-medium md:text-5xl ${
          light ? 'text-white' : 'text-espresso'
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`max-w-2xl font-sans text-base leading-relaxed md:text-lg ${
            light ? 'text-white/80' : 'text-warm-grey'
          }`}
        >
          {description}
        </p>
      ) : null}
    </motion.div>
  )
}
