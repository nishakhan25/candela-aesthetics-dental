import { useState } from 'react'
import { Clock, MapPin, Phone, Camera } from 'lucide-react'
import WhatsAppIcon from '../components/common/WhatsAppIcon'
import Seo from '../components/seo/Seo'
import PageHero from '../components/common/PageHero'
import Reveal from '../components/common/Reveal'
import Button from '../components/ui/Button'
import { useToast } from '../context/ToastContext'
import { useClinic } from '../context/ClinicContext'
import { getErrorMessage, submitContactMessage } from '../services/api'
import { unsplash } from '../data/unsplashAssets'
import {
  clinicConfig,
  formatDisplayPhone,
  buildWhatsAppUrl,
  defaultWhatsAppMessage,
} from '../utils/clinicConfig'

const initial = { name: '', email: '', phone: '', message: '' }

export default function ContactPage() {
  const { push } = useToast()
  const { settings } = useClinic()
  const [form, setForm] = useState(initial)
  const [loading, setLoading] = useState(false)

  const phonePrimary = settings.phone_primary || clinicConfig.phones.primary
  const phoneSecondary = settings.phone_secondary || clinicConfig.phones.secondary
  const email = settings.email || clinicConfig.email
  const instagram = settings.instagram_url || clinicConfig.instagramUrl
  const address = settings.address || clinicConfig.addressLine
  const hours = settings.hours || clinicConfig.hours
  const whatsappUrl = buildWhatsAppUrl(
    defaultWhatsAppMessage(),
    settings.whatsapp_number || clinicConfig.whatsappNumber,
  )

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) {
      push('Please complete name, phone, and message.', 'error')
      return
    }

    setLoading(true)
    try {
      await submitContactMessage(form)
      push('Message sent. We will respond shortly.', 'success')
      setForm(initial)
    } catch (error) {
      push(getErrorMessage(error), 'error')
    } finally {
      setLoading(false)
    }
  }

  const contactCards = [
    {
      icon: MapPin,
      label: 'Visit us',
      body: address,
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`,
      action: 'Open map',
    },
    {
      icon: Phone,
      label: 'Call',
      body: (
        <>
          <a href={`tel:${phonePrimary}`} className="block transition hover:text-gold">
            {formatDisplayPhone(phonePrimary)}
          </a>
          <a href={`tel:${phoneSecondary}`} className="mt-1 block transition hover:text-gold">
            {formatDisplayPhone(phoneSecondary)}
          </a>
        </>
      ),
    },
    {
      icon: Clock,
      label: 'Hours',
      body: hours,
      note: clinicConfig.hoursNote,
    },
  ]

  return (
    <>
      <Seo
        title="Contact Us"
        description="Contact Candela Aesthetics & Dental in Allama Iqbal Town, Lahore."
        path="/contact"
      />
      <PageHero
        variant="split"
        eyebrow="Contact"
        title="We would love to hear from you."
        description="Reach the clinic by phone, WhatsApp, or send a message — we respond with care."
        image={unsplash.contact}
        compact
      />

      <section className="relative overflow-hidden bg-ivory">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 50% 40% at 0% 0%, rgba(197,164,109,0.12), transparent), radial-gradient(ellipse 45% 40% at 100% 100%, rgba(47,63,138,0.06), transparent)',
          }}
        />

        <div className="relative mx-auto max-w-7xl px-5 py-14 md:px-8 lg:py-20">
          <div className="grid gap-4 md:grid-cols-3">
            {contactCards.map((card, index) => {
              const Icon = card.icon
              return (
                <Reveal key={card.label} delay={index * 0.08} from="up">
                  <div className="hover-lift h-full border border-espresso/8 bg-white/90 p-6 shadow-[0_16px_40px_rgba(24,26,64,0.04)] backdrop-blur-sm md:p-7">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-espresso to-clinic-blue text-white">
                      <Icon className="h-5 w-5" strokeWidth={1.6} />
                    </span>
                    <p className="mt-5 font-sans text-[11px] font-semibold tracking-[0.22em] uppercase text-gold">
                      {card.label}
                    </p>
                    <div className="mt-2 font-sans text-sm leading-relaxed text-espresso md:text-[15px]">
                      {card.body}
                    </div>
                    {card.note ? (
                      <p className="mt-2 font-sans text-xs text-warm-grey">{card.note}</p>
                    ) : null}
                    {card.href ? (
                      <a
                        href={card.href}
                        target="_blank"
                        rel="noreferrer"
                        className="gold-underline mt-4 inline-flex font-sans text-[11px] font-semibold tracking-[0.18em] uppercase text-espresso"
                      >
                        {card.action}
                      </a>
                    ) : null}
                  </div>
                </Reveal>
              )
            })}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {whatsappUrl ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-espresso/10 bg-white px-5 py-3 font-sans text-[11px] font-semibold tracking-[0.18em] uppercase text-espresso transition hover:border-gold"
              >
                <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
                WhatsApp
              </a>
            ) : null}
            {instagram ? (
              <a
                href={instagram}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-espresso/10 bg-white px-5 py-3 font-sans text-[11px] font-semibold tracking-[0.18em] uppercase text-espresso transition hover:border-gold"
              >
                <Camera className="h-4 w-4 text-gold" />
                Instagram
              </a>
            ) : null}
            {email ? (
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-2 border border-espresso/10 bg-white px-5 py-3 font-sans text-[11px] font-semibold tracking-[0.18em] uppercase text-espresso transition hover:border-gold"
              >
                {email}
              </a>
            ) : null}
          </div>

          <div className="mt-12 grid items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
            <Reveal className="relative hidden overflow-hidden lg:col-span-5 lg:block">
              <img
                src={unsplash.book}
                alt="Candela clinic consultation space"
                className="h-full min-h-[520px] w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-espresso/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-8">
                <p className="font-sans text-[11px] font-semibold tracking-[0.24em] uppercase text-gold">
                  Candela
                </p>
                <p className="mt-2 font-display text-3xl text-white">
                  A calm space for lasting confidence.
                </p>
                <Button to="/book" variant="gold" className="mt-6">
                  Book Consultation
                </Button>
              </div>
            </Reveal>

            <Reveal className="lg:col-span-7" delay={0.08}>
              <div className="relative overflow-hidden border border-espresso/8 bg-white p-7 shadow-[0_24px_60px_rgba(24,26,64,0.06)] md:p-10">
                <div
                  className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gold/10 blur-2xl"
                  aria-hidden
                />
                <div className="relative">
                  <p className="font-sans text-[11px] font-semibold tracking-[0.28em] uppercase text-gold">
                    Message
                  </p>
                  <div className="editorial-rule mt-3" />
                  <h2 className="mt-4 font-display text-3xl text-espresso md:text-4xl">
                    Send us a note
                  </h2>
                  <p className="mt-3 max-w-lg font-sans text-sm text-warm-grey">
                    Share your question or preferred treatment — our team will follow up
                    shortly.
                  </p>

                  <form className="mt-8 grid gap-5 sm:grid-cols-2" onSubmit={onSubmit} noValidate>
                    {[
                      { name: 'name', label: 'Full Name', type: 'text', required: true },
                      { name: 'phone', label: 'Phone Number', type: 'tel', required: true },
                      {
                        name: 'email',
                        label: 'Email Address',
                        type: 'email',
                        required: false,
                        full: true,
                      },
                    ].map((field) => (
                      <label
                        key={field.name}
                        className={`block ${field.full ? 'sm:col-span-2' : ''}`}
                      >
                        <span className="field-label">{field.label}</span>
                        <input
                          name={field.name}
                          type={field.type}
                          required={field.required}
                          value={form[field.name]}
                          onChange={onChange}
                          className="field-input mt-2"
                        />
                      </label>
                    ))}
                    <label className="block sm:col-span-2">
                      <span className="field-label">Message</span>
                      <textarea
                        name="message"
                        rows={5}
                        required
                        value={form.message}
                        onChange={onChange}
                        className="field-input mt-2"
                        placeholder="How can we help?"
                      />
                    </label>
                    <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
                      <Button type="submit" variant="gold" disabled={loading}>
                        {loading ? 'Sending…' : 'Send Message'}
                      </Button>
                      <Button to="/book" variant="ghost">
                        Or book online
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
