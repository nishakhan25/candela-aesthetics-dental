import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import Seo from '../../components/seo/Seo'
import Button from '../../components/ui/Button'
import Logo from '../../components/brand/Logo'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import { getErrorMessage } from '../../services/api'

export default function AdminLoginPage() {
  const { login, isAuthenticated, loading } = useAuth()
  const { push } = useToast()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('admin@candelaclinic.com')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (!loading && isAuthenticated) {
    return <Navigate to="/admin" replace />
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await login(email.trim(), password)
      push('Welcome back.', 'success')
      navigate(location.state?.from || '/admin', { replace: true })
    } catch (error) {
      push(getErrorMessage(error) || 'Login failed', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Seo title="Admin Login" path="/admin/login" />
      <div className="flex min-h-screen items-center justify-center bg-espresso px-5">
        <form
          onSubmit={onSubmit}
          className="w-full max-w-md border border-white/10 bg-ivory p-8 shadow-soft md:p-10"
        >
          <Logo />
          <p className="mt-6 font-sans text-[11px] tracking-[0.24em] uppercase text-gold">
            Secure access
          </p>
          <h1 className="mt-2 font-display text-3xl text-espresso">Admin login</h1>
          <p className="mt-2 font-sans text-sm text-warm-grey">
            Protected staff area. Public visitors cannot access clinic management tools.
          </p>

          <label className="mt-8 block">
            <span className="field-label">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="field-input"
              autoComplete="username"
            />
          </label>
          <label className="mt-4 block">
            <span className="field-label">Password</span>
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="field-input"
              autoComplete="current-password"
            />
          </label>
          <Button type="submit" variant="gold" className="mt-6 w-full" disabled={submitting}>
            {submitting ? 'Signing in…' : 'Sign in'}
          </Button>
        </form>
      </div>
    </>
  )
}
