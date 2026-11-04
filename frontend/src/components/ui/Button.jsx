import { Link } from 'react-router-dom'

const variants = {
  primary:
    'bg-espresso text-ivory hover:bg-espresso/90 border border-espresso',
  gold: 'bg-gold text-espresso hover:bg-gold/90 border border-gold',
  ghost:
    'bg-transparent text-espresso border border-espresso/20 hover:border-gold hover:text-espresso',
  light:
    'bg-white/10 text-white border border-white/40 hover:bg-white hover:text-espresso backdrop-blur-sm',
  outlineLight:
    'bg-transparent text-white border border-white/50 hover:border-gold hover:text-gold',
}

export default function Button({
  children,
  to,
  href,
  variant = 'primary',
  className = '',
  type = 'button',
  ...props
}) {
  const classes = `inline-flex items-center justify-center gap-2 px-7 py-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] transition duration-300 hover:-translate-y-0.5 active:translate-y-0 disabled:translate-y-0 disabled:opacity-60 ${variants[variant]} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  )
}
