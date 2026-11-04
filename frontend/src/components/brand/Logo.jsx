import { Link } from 'react-router-dom'
import { brandLogo } from '../../data/instagramAssets'

export default function Logo({ inverted = false, compact = false, className = '' }) {
  const titleColor = inverted ? 'text-white' : 'text-espresso'
  const subColor = inverted ? 'text-white/70' : 'text-warm-grey'

  return (
    <Link
      to="/"
      className={`group inline-flex items-center gap-3 ${className}`}
      aria-label="Candela Aesthetics & Dental home"
    >
      <span className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gold/40 bg-white shadow-soft md:h-12 md:w-12">
        <img
          src={brandLogo}
          alt="Candela Medical Complex logo"
          className="h-full w-full object-cover"
          width={48}
          height={48}
        />
      </span>
      {!compact ? (
        <span className="flex flex-col">
          <span
            className={`font-display text-[1.35rem] leading-none tracking-[0.16em] uppercase md:text-[1.5rem] ${titleColor} transition group-hover:opacity-90`}
          >
            Candela
          </span>
          <span className={`mt-1.5 h-px w-10 bg-gold`} aria-hidden="true" />
          <span
            className={`mt-1.5 font-sans text-[9px] font-medium tracking-[0.24em] uppercase ${subColor}`}
          >
            Aesthetics & Dental
          </span>
        </span>
      ) : (
        <span className={`font-display text-lg tracking-[0.14em] uppercase ${titleColor}`}>
          Candela
        </span>
      )}
    </Link>
  )
}
