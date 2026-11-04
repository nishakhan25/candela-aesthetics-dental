import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { adminLogin, fetchAdminMe } from '../services/api'

const AuthContext = createContext(null)
const TOKEN_KEY = 'candela_admin_token'

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || '')
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(Boolean(localStorage.getItem(TOKEN_KEY)))

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY)
    setToken('')
    setAdmin(null)
  }, [])

  const refreshMe = useCallback(async () => {
    if (!localStorage.getItem(TOKEN_KEY)) {
      setLoading(false)
      return null
    }
    try {
      const me = await fetchAdminMe()
      setAdmin(me)
      return me
    } catch {
      logout()
      return null
    } finally {
      setLoading(false)
    }
  }, [logout])

  useEffect(() => {
    refreshMe()
  }, [refreshMe])

  const login = useCallback(async (email, password) => {
    const data = await adminLogin(email, password)
    localStorage.setItem(TOKEN_KEY, data.access_token)
    setToken(data.access_token)
    const me = await fetchAdminMe()
    setAdmin(me)
    return me
  }, [])

  const value = useMemo(
    () => ({
      token,
      admin,
      loading,
      isAuthenticated: Boolean(token && admin),
      login,
      logout,
      refreshMe,
    }),
    [token, admin, loading, login, logout, refreshMe],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
