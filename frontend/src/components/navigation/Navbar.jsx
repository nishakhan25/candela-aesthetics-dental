import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Logo from '../brand/Logo'
import Button from '../ui/Button'
import { useScrollPosition } from '../../hooks/useScrollPosition'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/treatments/dental', label: 'Treatments' },
  { to: '/specialists', label: 'Specialists' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const scrolled = useScrollPosition(30)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'
  const transparent = isHome && !scrolled && !open

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        transparent
          ? 'bg-transparent'
          : 'border-b border-espresso/5 bg-ivory/90 shadow-[0_10px_40px_rgba(48,39,32,0.06)] backdrop-blur-md'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8 lg:py-5">
        <Logo inverted={transparent} />

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `font-sans text-[11px] font-semibold tracking-[0.2em] uppercase transition ${
                  transparent
                    ? isActive
                      ? 'text-gold'
                      : 'text-white/85 hover:text-gold'
                    : isActive
                      ? 'text-gold'
                      : 'text-espresso/75 hover:text-espresso'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button
            to="/book"
            variant={transparent ? 'light' : 'gold'}
            className="!px-5 !py-3"
          >
            Book Consultation
          </Button>
        </div>

        <button
          type="button"
          className={`lg:hidden ${transparent ? 'text-white' : 'text-espresso'}`}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-espresso/5 bg-ivory lg:hidden"
          >
            <nav className="flex flex-col gap-1 px-5 py-6" aria-label="Mobile">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `border-b border-espresso/5 py-3 font-sans text-sm tracking-[0.16em] uppercase ${
                      isActive ? 'text-gold' : 'text-espresso'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <Button to="/book" variant="gold" className="mt-4" onClick={() => setOpen(false)}>
                Book Consultation
              </Button>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
