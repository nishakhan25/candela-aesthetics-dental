import { useEffect, useState } from 'react'
import Button from '../../components/ui/Button'
import { useToast } from '../../context/ToastContext'
import {
  adminCreateTestimonial,
  adminDeleteTestimonial,
  adminListTestimonials,
  adminUpdateTestimonial,
  getErrorMessage,
} from '../../services/api'

const empty = {
  patient_name: '',
  quote: '',
  treatment_label: '',
  rating: 5,
  is_published: false,
  sort_order: 0,
}

export default function AdminTestimonialsPage() {
  const { push } = useToast()
  const [items, setItems] = useState([])
  const [form, setForm] = useState(empty)
  const [editingId, setEditingId] = useState(null)

  const load = async () => {
    try {
      setItems(await adminListTestimonials())
    } catch (error) {
      push(getErrorMessage(error), 'error')
    }
  }

  useEffect(() => {
    load()
  }, [])

  const onChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : name === 'rating' || name === 'sort_order' ? Number(value) : value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingId) await adminUpdateTestimonial(editingId, form)
      else await adminCreateTestimonial(form)
      push('Testimonial saved.', 'success')
      setEditingId(null)
      setForm(empty)
      load()
    } catch (error) {
      push(getErrorMessage(error), 'error')
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <form onSubmit={onSubmit} className="space-y-3 border border-espresso/10 bg-ivory p-5">
        <h2 className="font-display text-2xl text-espresso">Testimonial</h2>
        <p className="text-xs text-warm-grey">Only publish approved patient feedback.</p>
        <input name="patient_name" value={form.patient_name} onChange={onChange} className="field-input" placeholder="Patient name" required />
        <textarea name="quote" value={form.quote} onChange={onChange} className="field-input" rows={4} placeholder="Quote" required />
        <input name="treatment_label" value={form.treatment_label} onChange={onChange} className="field-input" placeholder="Treatment label" />
        <input name="rating" type="number" min="1" max="5" value={form.rating} onChange={onChange} className="field-input" />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="is_published" checked={form.is_published} onChange={onChange} />
          Published
        </label>
        <Button type="submit" variant="gold">
          {editingId ? 'Update' : 'Create'}
        </Button>
      </form>

      <div className="space-y-3">
        {items.map((item) => (
          <article key={item.id} className="border border-espresso/10 bg-ivory p-4">
            <p className="font-display text-xl text-espresso">{item.patient_name}</p>
            <p className="mt-2 text-sm text-warm-grey">“{item.quote}”</p>
            <div className="mt-3 flex gap-2">
              <Button
                type="button"
                variant="ghost"
                className="!px-3 !py-2"
                onClick={() => {
                  setEditingId(item.id)
                  setForm({
                    patient_name: item.patient_name,
                    quote: item.quote,
                    treatment_label: item.treatment_label || '',
                    rating: item.rating || 5,
                    is_published: item.is_published,
                    sort_order: item.sort_order,
                  })
                }}
              >
                Edit
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="!px-3 !py-2"
                onClick={async () => {
                  if (!window.confirm('Delete testimonial?')) return
                  try {
                    await adminDeleteTestimonial(item.id)
                    push('Deleted.', 'success')
                    load()
                  } catch (error) {
                    push(getErrorMessage(error), 'error')
                  }
                }}
              >
                Delete
              </Button>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
