import { motion, useReducedMotion } from 'framer-motion'

const presets = {
  up: { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } },
  down: { hidden: { opacity: 0, y: -12 }, show: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 16 }, show: { opacity: 1, x: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.98 }, show: { opacity: 1, scale: 1 } },
  fade: { hidden: { opacity: 0 }, show: { opacity: 1 } },
}

export default function Reveal({
  children,
  className = '',
  delay = 0,
  y = 16,
  as = 'div',
  from = 'up',
  duration = 0.35,
}) {
  const reduce = useReducedMotion()
  const Component = motion[as] || motion.div
  const preset = presets[from] || presets.up
  const hidden =
    from === 'up' && y !== 16
      ? { opacity: 0, y }
      : preset.hidden

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <Component
      className={className}
      initial="hidden"
      animate="show"
      variants={{
        hidden,
        show: {
          ...preset.show,
          transition: {
            duration,
            delay: Math.min(delay, 0.12),
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
    >
      {children}
    </Component>
  )
}

export function Stagger({
  children,
  className = '',
  delay = 0,
  stagger = 0.04,
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
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: stagger,
            delayChildren: Math.min(delay, 0.08),
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
                  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
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

/** Instant title — no slow word-by-word wait */
export function AnimatedTitle({
  text,
  className = '',
  delay = 0,
  as = 'h1',
}) {
  const reduce = useReducedMotion()
  const Tag = motion[as] || motion.h1

  if (reduce) {
    const Static = as === 'h1' ? 'h1' : as === 'h2' ? 'h2' : 'h3'
    const El = Static
    return <El className={className}>{text}</El>
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(delay, 0.08), ease: [0.22, 1, 0.36, 1] }}
    >
      {text}
    </Tag>
  )
}
