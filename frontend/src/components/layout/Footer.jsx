import { Link } from 'react-router-dom'
import { Camera, MapPin, Phone, Clock } from 'lucide-react'
import Logo from '../brand/Logo'
import WhatsAppIcon from '../common/WhatsAppIcon'
import { useClinic } from '../../context/ClinicContext'
import {
  buildWhatsAppUrl,
  clinicConfig,
  defaultWhatsAppMessage,
  formatDisplayPhone,
} from '../../utils/clinicConfig'

const nav = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/treatments/dental', label: 'Dental' },
  { to: '/treatments/aesthetic', label: 'Aesthetic' },
  { to: '/treatments/physiotherapy', label: 'Physio' },
  { to: '/specialists', label: 'Specialists' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/book', label: 'Book' },
  { to: '/contact', label: 'Contact' },
]

export default function Footer() {
  const { settings } = useClinic()
  const phonePrimary = settings.phone_primary || clinicConfig.phones.primary
  const phoneSecondary = settings.phone_secondary || clinicConfig.phones.secondary
  const instagram = settings.instagram_url || clinicConfig.instagramUrl
  const email = settings.email || clinicConfig.email
  const whatsappUrl = buildWhatsAppUrl(
    defaultWhatsAppMessage(),
    settings.whatsapp_number || clinicConfig.whatsappNumber || phonePrimary,
  )

  return (
    <footer className="border-t border-espresso/10 bg-espresso text-ivory">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-2 md:px-8 lg:grid-cols-4 lg:py-20">
        <div className="space-y-5">
          <Logo inverted />
          <p className="max-w-xs font-sans text-sm leading-relaxed text-white/65">
            Premium aesthetic and dental care in Lahore — refined clinical expertise
            with a calm, confidence-led patient experience.
          </p>
          <div className="flex flex-col gap-3">
            <a
              href={instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.18em] uppercase text-gold transition hover:text-white"
            >
              <Camera size={16} />
              Follow on Instagram
            </a>
            {whatsappUrl ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.18em] uppercase text-gold transition hover:text-white"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Chat on WhatsApp
              </a>
            ) : null}
          </div>
        </div>

        <div>
          <h3 className="font-sans text-[11px] font-semibold tracking-[0.24em] uppercase text-gold">
            Explore
          </h3>
          <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3">
            {nav.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="font-sans text-sm text-white/70 transition hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="font-sans text-[11px] font-semibold tracking-[0.24em] uppercase text-gold">
            Visit
          </h3>
          <p className="flex items-start gap-3 font-sans text-sm text-white/70">
            <MapPin size={16} className="mt-0.5 shrink-0 text-gold" />
            {settings.address || clinicConfig.addressLine}
          </p>
          <p className="flex items-start gap-3 font-sans text-sm text-white/70">
            <Clock size={16} className="mt-0.5 shrink-0 text-gold" />
            {settings.hours || clinicConfig.hours}
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="font-sans text-[11px] font-semibold tracking-[0.24em] uppercase text-gold">
            Contact
          </h3>
          <a
            href={`tel:${phonePrimary}`}
            className="flex items-center gap-3 font-sans text-sm text-white/70 transition hover:text-white"
          >
            <Phone size={16} className="text-gold" />
            {formatDisplayPhone(phonePrimary)}
          </a>
          <a
            href={`tel:${phoneSecondary}`}
            className="flex items-center gap-3 font-sans text-sm text-white/70 transition hover:text-white"
          >
            <Phone size={16} className="text-gold" />
            {formatDisplayPhone(phoneSecondary)}
          </a>
          {email ? (
            <a
              href={`mailto:${email}`}
              className="block font-sans text-sm text-white/70 transition hover:text-white"
            >
              {email}
            </a>
          ) : (
            <p className="font-sans text-xs text-white/45">
              Email available after clinic confirmation.
            </p>
          )}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-xs text-white/45 md:flex-row md:items-center md:justify-between md:px-8">
          <p>
            © {new Date().getFullYear()} {clinicConfig.brandName}. All rights reserved.
          </p>
          <div className="flex gap-5">
            <Link to="/privacy" className="transition hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/terms" className="transition hover:text-white">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
