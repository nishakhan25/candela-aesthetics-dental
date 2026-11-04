import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchAppointmentStats, fetchAppointments, getErrorMessage } from '../../services/api'
import { useToast } from '../../context/ToastContext'

const cards = [
  { key: 'total', label: 'Total' },
  { key: 'pending', label: 'Pending' },
  { key: 'confirmed', label: 'Confirmed' },
  { key: 'completed', label: 'Completed' },
]

export default function AdminDashboardPage() {
  const { push } = useToast()
  const [stats, setStats] = useState(null)
  const [recent, setRecent] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    Promise.all([fetchAppointmentStats(), fetchAppointments({ limit: 8 })])
      .then(([dashboard, appointments]) => {
        if (!active) return
        setStats(dashboard)
        setRecent(appointments)
      })
      .catch((error) => push(getErrorMessage(error), 'error'))
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [push])

  if (loading) {
    return <p className="font-sans text-sm text-warm-grey">Loading dashboard…</p>
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div key={card.key} className="border border-espresso/10 bg-ivory p-5">
            <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-gold">
              {card.label}
            </p>
            <p className="mt-3 font-display text-4xl text-espresso">{stats?.[card.key] ?? 0}</p>
          </div>
        ))}
      </div>

      <section className="border border-espresso/10 bg-ivory">
        <div className="flex items-center justify-between border-b border-espresso/10 px-5 py-4">
          <h2 className="font-display text-2xl text-espresso">Recent booking requests</h2>
          <Link
            to="/admin/appointments"
            className="font-sans text-[11px] tracking-[0.18em] uppercase text-gold"
          >
            Manage all
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left font-sans text-sm">
            <thead className="bg-beige/50 text-[11px] tracking-[0.16em] uppercase text-warm-grey">
              <tr>
                <th className="px-5 py-3">Patient</th>
                <th className="px-5 py-3">Treatment</th>
                <th className="px-5 py-3">Preferred</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((item) => (
                <tr key={item.id} className="border-t border-espresso/5">
                  <td className="px-5 py-3">
                    <p className="text-espresso">{item.full_name}</p>
                    <p className="text-xs text-warm-grey">{item.phone}</p>
                  </td>
                  <td className="px-5 py-3 text-espresso">{item.treatment_title}</td>
                  <td className="px-5 py-3 text-warm-grey">
                    {item.preferred_date} · {item.preferred_time}
                  </td>
                  <td className="px-5 py-3 capitalize text-espresso">{item.status}</td>
                </tr>
              ))}
              {recent.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-5 py-8 text-warm-grey">
                    No appointment requests yet.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
