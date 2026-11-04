import { useEffect, useState } from 'react'
import Button from '../../components/ui/Button'
import { useToast } from '../../context/ToastContext'
import {
  adminCreateDoctor,
  adminDeleteDoctor,
  adminListDoctors,
  adminUpdateDoctor,
  getErrorMessage,
} from '../../services/api'

const empty = {
  name: '',
  slug: '',
  title: '',
  qualifications: '',
  specialization: '',
  bio: '',
  image_url: '',
  is_published: false,
  sort_order: 0,
}

export default function AdminSpecialistsPage() {
  const { push } = useToast()
  const [items, setItems] = useState([])
  const [form, setForm] = useState(empty)
  const [editingId, setEditingId] = useState(null)

  const load = async () => {
    try {
      setItems(await adminListDoctors())
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

  const reset = () => {
    setEditingId(null)
    setForm(empty)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingId) {
        await adminUpdateDoctor(editingId, form)
        push('Specialist updated.', 'success')
      } else {
        await adminCreateDoctor(form)
        push('Specialist created.', 'success')
      }
      reset()
      load()
    } catch (error) {
      push(getErrorMessage(error), 'error')
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <form onSubmit={onSubmit} className="space-y-3 border border-espresso/10 bg-ivory p-5">
        <h2 className="font-display text-2xl text-espresso">
          {editingId ? 'Edit specialist' : 'Add specialist'}
        </h2>
        <p className="text-xs text-warm-grey">
          Keep unpublished until qualifications and portraits are clinic-approved.
        </p>
        {['name', 'slug', 'title', 'qualifications', 'specialization', 'image_url'].map((field) => (
          <input
            key={field}
            name={field}
            value={form[field]}
            onChange={onChange}
            className="field-input"
            placeholder={field}
            required={field === 'name' || field === 'slug'}
          />
        ))}
        <textarea name="bio" value={form.bio} onChange={onChange} className="field-input" rows={4} placeholder="Bio" />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="is_published" checked={form.is_published} onChange={onChange} />
          Published on website
        </label>
        <div className="flex gap-3">
          <Button type="submit" variant="gold">{editingId ? 'Update' : 'Create'}</Button>
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
            <div className="flex justify-between gap-3">
              <div>
                <h3 className="font-display text-xl text-espresso">{item.name}</h3>
                <p className="text-sm text-gold">{item.title || 'Title pending'}</p>
                <p className="mt-1 text-xs text-warm-grey">
                  {item.is_published ? 'Published' : 'Hidden'}
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
                      name: item.name,
                      slug: item.slug,
                      title: item.title || '',
                      qualifications: item.qualifications || '',
                      specialization: item.specialization || '',
                      bio: item.bio || '',
                      image_url: item.image_url || '',
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
                    if (!window.confirm('Delete specialist?')) return
                    try {
                      await adminDeleteDoctor(item.id)
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
