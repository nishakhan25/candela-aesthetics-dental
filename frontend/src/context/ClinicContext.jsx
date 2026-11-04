import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { fetchClinicSettings } from '../services/api'
import { clinicConfig } from '../utils/clinicConfig'

const ClinicContext = createContext(null)

const defaults = {
  phone_primary: clinicConfig.phones.primary,
  phone_secondary: clinicConfig.phones.secondary,
  whatsapp_number: clinicConfig.whatsappNumber,
  email: clinicConfig.email,
  address: clinicConfig.addressLine,
  hours: clinicConfig.hours,
  instagram_url: clinicConfig.instagramUrl,
}

export function ClinicProvider({ children }) {
  const [settings, setSettings] = useState(defaults)

  const refreshSettings = useCallback(async () => {
    try {
      const data = await fetchClinicSettings()
      setSettings((prev) => ({
        ...prev,
        ...Object.fromEntries(
          Object.entries(data || {}).filter(([, value]) => value != null && value !== ''),
        ),
      }))
    } catch {
      /* keep current / defaults */
    }
  }, [])

  useEffect(() => {
    refreshSettings()
  }, [refreshSettings])

  const value = useMemo(
    () => ({ settings, setSettings, refreshSettings }),
    [settings, refreshSettings],
  )
  return <ClinicContext.Provider value={value}>{children}</ClinicContext.Provider>
}

export function useClinic() {
  const ctx = useContext(ClinicContext)
  if (!ctx) throw new Error('useClinic must be used within ClinicProvider')
  return ctx
}
