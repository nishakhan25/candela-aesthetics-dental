import { useEffect, useState } from 'react'
import Button from '../../components/ui/Button'
import { useToast } from '../../context/ToastContext'
import {
  adminCreateGallery,
  adminDeleteGallery,
  adminListGallery,
  adminUpdateGallery,
  getErrorMessage,
} from '../../services/api'

const empty = {
  title: '',
  category: 'clinic',
  media_type: 'single',
  image_url: '',
  before_url: '',
  after_url: '',
  is_published: false,
  sort_order: 0,
}

export default function AdminGalleryPage() {
  const { push } = useToast()
  const [items, setItems] = useState([])
  const [form, setForm] = useState(empty)
  const [editingId, setEditingId] = useState(null)

  const load = async () => {
    try {
      setItems(await adminListGallery())
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
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingId) await adminUpdateGallery(editingId, form)
      else await adminCreateGallery(form)
      push('Gallery item saved.', 'success')
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
        <h2 className="font-display text-2xl text-espresso">Gallery item</h2>
        <input name="title" value={form.title} onChange={onChange} className="field-input" placeholder="Title" required />
        <select name="category" value={form.category} onChange={onChange} className="field-input">
          <option value="clinic">Clinic</option>
          <option value="dental">Dental</option>
          <option value="aesthetic">Aesthetic</option>
        </select>
        <select name="media_type" value={form.media_type} onChange={onChange} className="field-input">
          <option value="single">Single image</option>
          <option value="before-after">Before / After</option>
        </select>
        {form.media_type === 'single' ? (
          <input name="image_url" value={form.image_url} onChange={onChange} className="field-input" placeholder="Image URL" required />
        ) : (
          <>
            <input name="before_url" value={form.before_url} onChange={onChange} className="field-input" placeholder="Before URL" required />
            <input name="after_url" value={form.after_url} onChange={onChange} className="field-input" placeholder="After URL" required />
          </>
        )}
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
            <div className="flex justify-between gap-3">
              <div>
                <h3 className="font-display text-xl text-espresso">{item.title}</h3>
                <p className="text-xs text-warm-grey">
                  {item.category} · {item.media_type} · {item.is_published ? 'Published' : 'Hidden'}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  className="!px-3 !py-2"
                  onClick={() => {
                    setEditingId(item.id)
                    setForm({
                      title: item.title,
                      category: item.category,
                      media_type: item.media_type,
                      image_url: item.image_url || '',
                      before_url: item.before_url || '',
                      after_url: item.after_url || '',
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
                    if (!window.confirm('Delete gallery item?')) return
                    try {
                      await adminDeleteGallery(item.id)
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
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
