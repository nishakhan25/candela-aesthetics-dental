import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Button from '../ui/Button'
import { useToast } from '../../context/ToastContext'
import { useClinic } from '../../context/ClinicContext'
import { categories as staticCategories, treatments as staticTreatments } from '../../data/treatments'
import {
  fetchTreatments,
  getErrorMessage,
  submitAppointmentRequest,
} from '../../services/api'
import { buildWhatsAppUrl, clinicConfig } from '../../utils/clinicConfig'

const timeSlots = [
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '02:00 PM',
  '04:00 PM',
  '06:00 PM',
  '08:00 PM',
]

const empty = {
  fullName: '',
  phone: '',
  email: '',
  category: '',
  treatmentSlug: '',
  preferredDate: '',
  preferredTime: '',
  message: '',
}

const normalizeTreatments = (items) =>
  items.map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title,
    category: item.category_slug || item.category,
  }))

export default function BookingForm() {
  const { push } = useToast()
  const { settings } = useClinic()
  const [params] = useSearchParams()
  const [form, setForm] = useState({
    ...empty,
    category: params.get('category') || '',
    treatmentSlug: params.get('treatment') || '',
  })
  const [treatments, setTreatments] = useState(
    normalizeTreatments(
      staticTreatments.map((item) => ({
        ...item,
        category_slug: item.category,
      })),
    ),
  )
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    fetchTreatments()
      .then((data) => setTreatments(normalizeTreatments(data)))
      .catch(() => {
        /* keep static fallback */
      })
  }, [])

  const availableTreatments = useMemo(
    () =>
      form.category
        ? treatments.filter((item) => item.category === form.category)
        : treatments,
    [form.category, treatments],
  )

  const selectedTreatment = treatments.find((t) => t.slug === form.treatmentSlug)

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => {
      const next = { ...prev, [name]: value }
      if (name === 'category') next.treatmentSlug = ''
      return next
    })
  }

  const validate = () => {
    if (!form.fullName.trim()) return 'Full name is required.'
    if (!/^[0-9+\-\s()]{10,16}$/.test(form.phone.trim())) {
      return 'Enter a valid phone number.'
    }
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      return 'Enter a valid email address.'
    }
    if (!form.category) return 'Select a treatment category.'
    if (!form.treatmentSlug) return 'Select a treatment.'
    if (!form.preferredDate) return 'Select a preferred date.'
    if (!form.preferredTime) return 'Select a preferred time.'
    const chosen = new Date(`${form.preferredDate}T12:00:00`)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (chosen < today) return 'Preferred date cannot be in the past.'
    return null
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const error = validate()
    if (error) {
      push(error, 'error')
      return
    }

    setLoading(true)
    try {
      await submitAppointmentRequest({
        full_name: form.fullName.trim(),
        phone: form.phone.trim(),
        email: form.email.trim() || null,
        category: form.category,
        treatment_slug: form.treatmentSlug,
        preferred_date: form.preferredDate,
        preferred_time: form.preferredTime,
        message: form.message.trim() || null,
      })
      setSubmitted(true)
      push(
        'Appointment request received. Confirmation follows clinic approval.',
        'success',
      )
    } catch (err) {
      push(getErrorMessage(err), 'error')
    } finally {
      setLoading(false)
    }
  }

  const whatsappMessage = `Patient Name: ${form.fullName}
Selected Treatment: ${selectedTreatment?.title || '-'}
Preferred Date: ${form.preferredDate || '-'}
Preferred Time: ${form.preferredTime || '-'}
Phone Number: ${form.phone}`

  const whatsappUrl = buildWhatsAppUrl(
    whatsappMessage,
    settings.whatsapp_number || clinicConfig.whatsappNumber,
  )

  if (submitted) {
    return (
      <div className="border border-gold/40 bg-beige/40 p-8 md:p-12">
        <p className="font-sans text-[11px] tracking-[0.24em] uppercase text-gold">
          Request received
        </p>
        <h2 className="mt-3 font-display text-3xl text-espresso md:text-4xl">
          Thank you — your appointment request is pending review.
        </h2>
        <p className="mt-4 max-w-2xl font-sans text-sm leading-relaxed text-warm-grey md:text-base">
          This is not a confirmed appointment yet. Our team will review availability and
          contact you to confirm, reschedule, or advise next steps.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button to="/" variant="primary">
            Return Home
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setSubmitted(false)
              setForm(empty)
            }}
          >
            Submit Another Request
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <form
        onSubmit={onSubmit}
        noValidate
        className="space-y-5 bg-beige/50 p-6 md:p-10 lg:col-span-8"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <label className="block md:col-span-2">
            <span className="field-label">Full Name *</span>
            <input
              name="fullName"
              value={form.fullName}
              onChange={onChange}
              className="field-input"
              autoComplete="name"
              required
            />
          </label>
          <label className="block">
            <span className="field-label">Phone Number *</span>
            <input
              name="phone"
              type="tel"
              value={form.phone}
              onChange={onChange}
              className="field-input"
              autoComplete="tel"
              required
            />
          </label>
          <label className="block">
            <span className="field-label">Email Address</span>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              className="field-input"
              autoComplete="email"
            />
          </label>
          <label className="block">
            <span className="field-label">Treatment Category *</span>
            <select
              name="category"
              value={form.category}
              onChange={onChange}
              className="field-input"
              required
            >
              <option value="">Select category</option>
              {staticCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="field-label">Treatment *</span>
            <select
              name="treatmentSlug"
              value={form.treatmentSlug}
              onChange={onChange}
              className="field-input"
              required
            >
              <option value="">Select treatment</option>
              {availableTreatments.map((item) => (
                <option key={item.id} value={item.slug}>
                  {item.title}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="field-label">Preferred Date *</span>
            <input
              name="preferredDate"
              type="date"
              value={form.preferredDate}
              onChange={onChange}
              className="field-input"
              required
            />
          </label>
          <label className="block">
            <span className="field-label">Preferred Time *</span>
            <select
              name="preferredTime"
              value={form.preferredTime}
              onChange={onChange}
              className="field-input"
              required
            >
              <option value="">Select time</option>
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </label>
          <label className="block md:col-span-2">
            <span className="field-label">Additional Message</span>
            <textarea
              name="message"
              rows={4}
              value={form.message}
              onChange={onChange}
              className="field-input"
            />
          </label>
        </div>

        <p className="font-sans text-xs leading-relaxed text-warm-grey">
          Submitting creates an appointment <strong>request</strong> only. Status remains
          pending until admin approval. Clinic hours:{' '}
          {settings.hours || clinicConfig.hours}.
        </p>

        <Button type="submit" variant="gold" disabled={loading}>
          {loading ? 'Submitting…' : 'Submit Appointment Request'}
        </Button>
      </form>

      <aside className="space-y-6 lg:col-span-4">
        <div className="border border-espresso/10 p-6">
          <p className="font-sans text-[11px] tracking-[0.22em] uppercase text-gold">
            Separate option
          </p>
          <h3 className="mt-3 font-display text-2xl text-espresso">Prefer WhatsApp?</h3>
          <p className="mt-3 font-sans text-sm text-warm-grey">
            Website booking and WhatsApp assistance are independent pathways.
          </p>
          {whatsappUrl ? (
            <Button
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              variant="ghost"
              className="mt-6 w-full"
            >
              Share Request on WhatsApp
            </Button>
          ) : (
            <p className="mt-4 font-sans text-xs text-warm-grey">
              WhatsApp activates after the clinic number is saved in Admin → Settings.
            </p>
          )}
        </div>
        <div className="bg-espresso p-6 text-white">
          <p className="font-sans text-[11px] tracking-[0.22em] uppercase text-gold">Note</p>
          <p className="mt-3 font-sans text-sm leading-relaxed text-white/75">
            Duplicate requests with the same phone, treatment, date, and time are blocked
            by the server.
          </p>
        </div>
      </aside>
    </div>
  )
}
