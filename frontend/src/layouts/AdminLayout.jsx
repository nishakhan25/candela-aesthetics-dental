import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  CalendarDays,
  LayoutDashboard,
  LogOut,
  Images,
  Stethoscope,
  MessageSquareQuote,
  Settings,
  Sparkles,
  Users,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Logo from '../components/brand/Logo'

const links = [
  { to: '/admin', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/admin/appointments', label: 'Appointments', icon: CalendarDays },
  { to: '/admin/treatments', label: 'Treatments', icon: Sparkles },
  { to: '/admin/specialists', label: 'Specialists', icon: Users },
  { to: '/admin/gallery', label: 'Gallery', icon: Images },
  { to: '/admin/testimonials', label: 'Testimonials', icon: MessageSquareQuote },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
]

export default function AdminLayout() {
  const { admin, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-beige/40 lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="border-b border-espresso/10 bg-espresso text-ivory lg:min-h-screen lg:border-b-0 lg:border-r lg:border-white/10">
        <div className="px-6 py-6">
          <Logo inverted compact={false} />
          <p className="mt-4 font-sans text-[10px] tracking-[0.24em] uppercase text-gold">
            Admin Console
          </p>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-4 lg:flex-col lg:overflow-visible">
          {links.map((link) => {
            const Icon = link.icon
            return (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 font-sans text-xs tracking-[0.14em] uppercase transition ${
                    isActive ? 'bg-white/10 text-gold' : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <Icon size={16} />
                {link.label}
              </NavLink>
            )
          })}
        </nav>
        <div className="hidden border-t border-white/10 px-6 py-5 lg:block">
          <p className="font-sans text-sm text-white/80">{admin?.full_name}</p>
          <p className="mt-1 font-sans text-xs text-white/45">{admin?.email}</p>
          <button
            type="button"
            onClick={() => {
              logout()
              navigate('/admin/login')
            }}
            className="mt-4 inline-flex items-center gap-2 font-sans text-[11px] tracking-[0.18em] uppercase text-gold"
          >
            <LogOut size={14} />
            Sign out
          </button>
          <NavLink
            to="/"
            className="mt-3 flex items-center gap-2 font-sans text-[11px] tracking-[0.18em] uppercase text-white/50 hover:text-white"
          >
            <Stethoscope size={14} />
            View website
          </NavLink>
        </div>
      </aside>
      <div className="min-w-0">
        <header className="flex items-center justify-between border-b border-espresso/10 bg-ivory px-5 py-4 lg:px-8">
          <div>
            <p className="font-sans text-[11px] tracking-[0.22em] uppercase text-gold">
              Candela Control
            </p>
            <h1 className="font-display text-2xl text-espresso">Clinic operations</h1>
          </div>
          <button
            type="button"
            className="lg:hidden font-sans text-xs uppercase tracking-widest text-espresso"
            onClick={() => {
              logout()
              navigate('/admin/login')
            }}
          >
            Sign out
          </button>
        </header>
        <main className="px-5 py-6 lg:px-8 lg:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
