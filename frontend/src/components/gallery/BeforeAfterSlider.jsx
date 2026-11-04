import { useRef, useState } from 'react'

export default function BeforeAfterSlider({
  before,
  after,
  altBefore = 'Before',
  altAfter = 'After',
  className = '',
}) {
  const [position, setPosition] = useState(50)
  const dragging = useRef(false)
  const frame = useRef(null)

  const updateFromEvent = (clientX) => {
    const el = frame.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const next = ((clientX - rect.left) / rect.width) * 100
    setPosition(Math.min(100, Math.max(0, next)))
  }

  return (
    <div
      ref={frame}
      className={`relative aspect-[4/5] w-full touch-none overflow-hidden select-none ${className}`}
      onPointerDown={(e) => {
        dragging.current = true
        e.currentTarget.setPointerCapture(e.pointerId)
        updateFromEvent(e.clientX)
      }}
      onPointerMove={(e) => {
        if (!dragging.current) return
        updateFromEvent(e.clientX)
      }}
      onPointerUp={() => {
        dragging.current = false
      }}
      role="img"
      aria-label="Before and after comparison. Drag slider to compare."
    >
      <img
        src={after}
        alt={altAfter}
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
        draggable={false}
      />
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <img
          src={before}
          alt={altBefore}
          className="absolute inset-0 h-full max-w-none object-cover"
          style={{ width: frame.current?.offsetWidth || '100%' }}
          loading="lazy"
          draggable={false}
        />
      </div>
      <div
        className="absolute inset-y-0 w-0.5 bg-gold"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-gold bg-ivory text-[10px] tracking-widest text-espresso uppercase">
          Drag
        </div>
      </div>
      <span className="absolute top-4 left-4 bg-espresso/70 px-2 py-1 font-sans text-[10px] tracking-[0.18em] text-white uppercase">
        Before
      </span>
      <span className="absolute top-4 right-4 bg-espresso/70 px-2 py-1 font-sans text-[10px] tracking-[0.18em] text-white uppercase">
        After
      </span>
    </div>
  )
}
