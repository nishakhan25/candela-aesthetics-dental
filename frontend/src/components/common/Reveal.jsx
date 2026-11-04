import { motion, useReducedMotion } from 'framer-motion'

const presets = {
  up: { hidden: { opacity: 0, y: 36 }, show: { opacity: 1, y: 0 } },
  down: { hidden: { opacity: 0, y: -28 }, show: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -40 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 40 }, show: { opacity: 1, x: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.92 }, show: { opacity: 1, scale: 1 } },
  fade: { hidden: { opacity: 0 }, show: { opacity: 1 } },
}

export default function Reveal({
  children,
  className = '',
  delay = 0,
  y = 28,
  as = 'div',
  from = 'up',
  duration = 0.8,
  once = true,
}) {
  const reduce = useReducedMotion()
  const Component = motion[as] || motion.div
  const preset = presets[from] || presets.up
  const hidden =
    from === 'up' && y !== 28
      ? { opacity: 0, y }
      : preset.hidden

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.2 }}
      variants={{
        hidden,
        show: {
          ...preset.show,
          transition: {
            duration,
            delay,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
    >
      {children}
    </Component>
  )
}

/** Stagger children like Cosmolux Elementor delay cascade */
export function Stagger({
  children,
  className = '',
  delay = 0,
  stagger = 0.1,
  from = 'up',
}) {
  const reduce = useReducedMotion()
  const preset = presets[from] || presets.up

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div
              key={child?.key ?? i}
              className="h-full min-w-0"
              variants={{
                hidden: preset.hidden,
                show: {
                  ...preset.show,
                  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  )
}

/** Word-by-word title reveal */
export function AnimatedTitle({
  text,
  className = '',
  delay = 0,
  as = 'h1',
}) {
  const reduce = useReducedMotion()
  const Tag = motion[as] || motion.h1
  const words = String(text).split(' ')

  if (reduce) {
    const Static = as === 'h1' ? 'h1' : as === 'h2' ? 'h2' : 'h3'
    const El = Static
    return <El className={className}>{text}</El>
  }

  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block pr-[0.28em]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.55,
            delay: delay + i * 0.06,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  )
}
