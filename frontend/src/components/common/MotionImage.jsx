import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

export default function MotionImage({
  src,
  alt = '',
  className = '',
  imgClassName = '',
  kenBurns = false,
  parallax = false,
  reveal = true,
}) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [parallax && !reduce ? 40 : 0, parallax && !reduce ? -40 : 0])
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [kenBurns && !reduce ? 1.12 : 1, kenBurns && !reduce ? 1 : 1],
  )

  return (
    <motion.div
      ref={ref}
      className={`overflow-hidden ${className}`}
      initial={reveal && !reduce ? { opacity: 0, scale: 1.04 } : false}
      whileInView={reveal && !reduce ? { opacity: 1, scale: 1 } : undefined}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.img
        src={src}
        alt={alt}
        style={{ y: parallax ? y : 0, scale: kenBurns ? scale : 1 }}
        className={`h-full w-full object-cover ${imgClassName}`}
        loading="lazy"
        decoding="async"
      />
    </motion.div>
  )
}
