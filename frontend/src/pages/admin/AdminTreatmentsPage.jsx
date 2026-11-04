import { useEffect, useState } from 'react'
import Button from '../../components/ui/Button'
import { useToast } from '../../context/ToastContext'
import {
  adminCreateTreatment,
  adminDeleteTreatment,
  adminListCategories,
  adminListTreatments,
  adminUpdateTreatment,
  getErrorMessage,
} from '../../services/api'

const empty = {
  category_id: '',
  title: '',
  slug: '',
  short_description: '',
  description: '',
  image_url: '',
  is_featured: false,
  is_active: true,
  sort_order: 0,
}

export default function AdminTreatmentsPage() {
  const { push } = useToast()
  const [items, setItems] = useState([])
  const [categories, setCategories] = useState([])
  const [form, setForm] = useState(empty)
  const [editingId, setEditingId] = useState(null)

  const load = async () => {
    try {
      const [treatments, cats] = await Promise.all([
        adminListTreatments(),
        adminListCategories(),
      ])
      setItems(treatments)
      setCategories(cats)
      if (!form.category_id && cats[0]) {
        setForm((prev) => ({ ...prev, category_id: cats[0].id }))
      }
    } catch (error) {
      push(getErrorMessage(error), 'error')
    }
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value,
    }))
  }

  const reset = () => {
    setEditingId(null)
    setForm({
      ...empty,
      category_id: categories[0]?.id || '',
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingId) {
        await adminUpdateTreatment(editingId, form)
        push('Treatment updated.', 'success')
      } else {
        await adminCreateTreatment(form)
        push('Treatment created.', 'success')
      }
      reset()
      load()
    } catch (error) {
      push(getErrorMessage(error), 'error')
    }
  }

  const onEdit = (item) => {
    setEditingId(item.id)
    setForm({
      category_id: item.category_id,
      title: item.title,
      slug: item.slug,
      short_description: item.short_description || '',
      description: item.description || '',
      image_url: item.image_url || '',
      is_featured: item.is_featured,
      is_active: item.is_active,
      sort_order: item.sort_order,
    })
  }

  const onDelete = async (id) => {
    if (!window.confirm('Delete this treatment?')) return
    try {
      await adminDeleteTreatment(id)
      push('Treatment deleted.', 'success')
      load()
    } catch (error) {
      push(getErrorMessage(error), 'error')
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <form onSubmit={onSubmit} className="space-y-3 border border-espresso/10 bg-ivory p-5">
        <h2 className="font-display text-2xl text-espresso">
          {editingId ? 'Edit treatment' : 'Create treatment'}
        </h2>
        <select name="category_id" value={form.category_id} onChange={onChange} className="field-input" required>
          <option value="">Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <input name="title" value={form.title} onChange={onChange} className="field-input" placeholder="Title" required />
        <input name="slug" value={form.slug} onChange={onChange} className="field-input" placeholder="slug-url" required />
        <input name="short_description" value={form.short_description} onChange={onChange} className="field-input" placeholder="Short description" />
        <textarea name="description" value={form.description} onChange={onChange} className="field-input" rows={4} placeholder="Description" />
        <input name="image_url" value={form.image_url} onChange={onChange} className="field-input" placeholder="Image URL" />
        <input name="sort_order" type="number" value={form.sort_order} onChange={onChange} className="field-input" />
        <label className="flex items-center gap-2 text-sm text-espresso">
          <input type="checkbox" name="is_featured" checked={form.is_featured} onChange={onChange} />
          Featured
        </label>
        <label className="flex items-center gap-2 text-sm text-espresso">
          <input type="checkbox" name="is_active" checked={form.is_active} onChange={onChange} />
          Active
        </label>
        <div className="flex gap-3">
          <Button type="submit" variant="gold">
            {editingId ? 'Update' : 'Create'}
          </Button>
          {editingId ? (
            <Button type="button" variant="ghost" onClick={reset}>
              Cancel
            </Button>
          ) : null}
        </div>
      </form>

      <div className="space-y-3">
        {items.map((item) => (
          <article key={item.id} className="border border-espresso/10 bg-ivory p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-xl text-espresso">{item.title}</h3>
                <p className="text-xs text-warm-grey">{item.slug}</p>
              </div>
              <div className="flex gap-2">
                <Button type="button" variant="ghost" className="!px-3 !py-2" onClick={() => onEdit(item)}>
                  Edit
                </Button>
                <Button type="button" variant="ghost" className="!px-3 !py-2" onClick={() => onDelete(item.id)}>
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
