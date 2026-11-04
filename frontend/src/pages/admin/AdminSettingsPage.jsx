import { useEffect, useState } from 'react'
import Button from '../../components/ui/Button'
import { useClinic } from '../../context/ClinicContext'
import { useToast } from '../../context/ToastContext'
import { adminUpdateSettings, fetchClinicSettings, getErrorMessage } from '../../services/api'

const fields = [
  { key: 'phone_primary', label: 'Primary phone' },
  { key: 'phone_secondary', label: 'Secondary phone' },
  { key: 'whatsapp_number', label: 'WhatsApp number (digits, e.g. 923454119939)' },
  { key: 'email', label: 'Clinic email' },
  { key: 'address', label: 'Address' },
  { key: 'hours', label: 'Opening hours' },
  { key: 'instagram_url', label: 'Instagram URL' },
]

export default function AdminSettingsPage() {
  const { push } = useToast()
  const { settings, setSettings } = useClinic()
  const [form, setForm] = useState(settings)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchClinicSettings()
      .then((data) => {
        setForm((prev) => ({ ...prev, ...data }))
        setSettings((prev) => ({ ...prev, ...data }))
      })
      .catch(() => {})
  }, [setSettings])

  const onSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const updated = await adminUpdateSettings(form)
      setSettings((prev) => ({ ...prev, ...updated }))
      push('Clinic settings updated.', 'success')
    } catch (error) {
      push(getErrorMessage(error), 'error')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-2xl space-y-4 border border-espresso/10 bg-ivory p-6">
      <h2 className="font-display text-2xl text-espresso">Clinic settings</h2>
      <p className="text-sm text-warm-grey">
        WhatsApp CTAs use the number saved here. Leave blank to hide WhatsApp buttons.
      </p>
      {fields.map((field) => (
        <label key={field.key} className="block">
          <span className="field-label">{field.label}</span>
          <input
            className="field-input"
            value={form[field.key] || ''}
            onChange={(e) => setForm((prev) => ({ ...prev, [field.key]: e.target.value }))}
          />
        </label>
      ))}
      <Button type="submit" variant="gold" disabled={saving}>
        {saving ? 'Saving…' : 'Save settings'}
      </Button>
    </form>
  )
}
