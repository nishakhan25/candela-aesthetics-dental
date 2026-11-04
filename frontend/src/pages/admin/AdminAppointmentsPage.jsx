import { useCallback, useEffect, useState } from 'react'
import Button from '../../components/ui/Button'
import { useToast } from '../../context/ToastContext'
import {
  fetchAppointments,
  getErrorMessage,
  rescheduleAppointment,
  updateAppointmentStatus,
} from '../../services/api'

const statuses = ['pending', 'confirmed', 'rejected', 'completed', 'cancelled']

export default function AdminAppointmentsPage() {
  const { push } = useToast()
  const [items, setItems] = useState([])
  const [status, setStatus] = useState('')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)
  const [notes, setNotes] = useState('')
  const [reschedule, setReschedule] = useState({ preferred_date: '', preferred_time: '' })

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const data = await fetchAppointments({
        status: status || undefined,
        search: search || undefined,
        limit: 100,
      })
      setItems(data)
    } catch (error) {
      push(getErrorMessage(error), 'error')
    } finally {
      setLoading(false)
    }
  }, [status, search, push])

  useEffect(() => {
    load()
  }, [load])

  const changeStatus = async (nextStatus) => {
    if (!selected) return
    try {
      const updated = await updateAppointmentStatus(selected.id, {
        status: nextStatus,
        admin_notes: notes || null,
      })
      setSelected(updated)
      push(`Appointment marked ${nextStatus}.`, 'success')
      load()
    } catch (error) {
      push(getErrorMessage(error), 'error')
    }
  }

  const onReschedule = async () => {
    if (!selected || !reschedule.preferred_date || !reschedule.preferred_time) {
      push('Choose a new date and time.', 'error')
      return
    }
    try {
      const updated = await rescheduleAppointment(selected.id, {
        ...reschedule,
        admin_notes: notes || null,
      })
      setSelected(updated)
      push('Appointment rescheduled.', 'success')
      load()
    } catch (error) {
      push(getErrorMessage(error), 'error')
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.3fr_0.9fr]">
      <section className="border border-espresso/10 bg-ivory">
        <div className="flex flex-col gap-3 border-b border-espresso/10 p-4 md:flex-row md:items-center">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, phone, treatment"
            className="field-input !mt-0"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="field-input !mt-0 md:max-w-[180px]"
          >
            <option value="">All statuses</option>
            {statuses.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <Button type="button" variant="ghost" onClick={load}>
            Refresh
          </Button>
        </div>
        <div className="max-h-[70vh] overflow-auto">
          {loading ? (
            <p className="p-5 text-sm text-warm-grey">Loading…</p>
          ) : (
            items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setSelected(item)
                  setNotes(item.admin_notes || '')
                  setReschedule({
                    preferred_date: item.preferred_date,
                    preferred_time: item.preferred_time,
                  })
                }}
                className={`block w-full border-b border-espresso/5 px-5 py-4 text-left transition hover:bg-beige/40 ${
                  selected?.id === item.id ? 'bg-beige/60' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-sans text-sm text-espresso">{item.full_name}</p>
                    <p className="mt-1 text-xs text-warm-grey">{item.treatment_title}</p>
                  </div>
                  <span className="font-sans text-[10px] tracking-[0.16em] uppercase text-gold">
                    {item.status}
                  </span>
                </div>
                <p className="mt-2 text-xs text-warm-grey">
                  {item.preferred_date} · {item.preferred_time}
                </p>
              </button>
            ))
          )}
        </div>
      </section>

      <aside className="border border-espresso/10 bg-ivory p-5">
        {!selected ? (
          <p className="font-sans text-sm text-warm-grey">Select an appointment to manage.</p>
        ) : (
          <div className="space-y-4">
            <h2 className="font-display text-2xl text-espresso">{selected.full_name}</h2>
            <p className="text-sm text-warm-grey">{selected.phone}</p>
            {selected.email ? <p className="text-sm text-warm-grey">{selected.email}</p> : null}
            <p className="text-sm text-espresso">{selected.treatment_title}</p>
            <p className="text-sm text-warm-grey">
              Requested: {selected.preferred_date} · {selected.preferred_time}
            </p>
            {selected.message ? (
              <p className="border border-espresso/10 bg-beige/40 p-3 text-sm text-espresso">
                {selected.message}
              </p>
            ) : null}

            <label className="block">
              <span className="field-label">Admin notes</span>
              <textarea
                className="field-input"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </label>

            <div className="flex flex-wrap gap-2">
              {statuses.map((item) => (
                <Button
                  key={item}
                  type="button"
                  variant={selected.status === item ? 'gold' : 'ghost'}
                  className="!px-3 !py-2 !text-[10px]"
                  onClick={() => changeStatus(item)}
                >
                  {item}
                </Button>
              ))}
            </div>

            <div className="border-t border-espresso/10 pt-4">
              <p className="field-label">Reschedule</p>
              <div className="mt-2 grid gap-3">
                <input
                  type="date"
                  className="field-input !mt-0"
                  value={reschedule.preferred_date}
                  onChange={(e) =>
                    setReschedule((prev) => ({ ...prev, preferred_date: e.target.value }))
                  }
                />
                <input
                  className="field-input !mt-0"
                  value={reschedule.preferred_time}
                  onChange={(e) =>
                    setReschedule((prev) => ({ ...prev, preferred_time: e.target.value }))
                  }
                  placeholder="e.g. 04:00 PM"
                />
                <Button type="button" variant="primary" onClick={onReschedule}>
                  Save reschedule
                </Button>
              </div>
            </div>
          </div>
        )}
      </aside>
    </div>
  )
}
