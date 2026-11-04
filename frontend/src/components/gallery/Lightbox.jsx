import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import BeforeAfterSlider from './BeforeAfterSlider'

export default function Lightbox({ item, onClose }) {
  useEffect(() => {
    if (!item) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [item, onClose])

  return (
    <AnimatePresence>
      {item ? (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-espresso/80 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="relative w-full max-w-4xl bg-ivory p-3 md:p-4"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={item.title}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-3 right-3 z-10 inline-flex h-10 w-10 items-center justify-center bg-white text-espresso"
              aria-label="Close gallery lightbox"
            >
              <X size={18} />
            </button>
            {item.type === 'before-after' ? (
              <BeforeAfterSlider
                before={item.before}
                after={item.after}
                className="!aspect-[16/11]"
              />
            ) : (
              <img
                src={item.image}
                alt={item.title}
                className="max-h-[75vh] w-full object-cover"
              />
            )}
            <p className="mt-3 font-display text-xl text-espresso">{item.title}</p>
            <p className="mt-1 font-sans text-xs text-warm-grey">
              Placeholder imagery — replace with authorized clinic photography.
            </p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
