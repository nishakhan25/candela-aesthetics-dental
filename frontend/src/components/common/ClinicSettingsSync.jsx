import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useClinic } from '../../context/ClinicContext'

/** Refetch clinic settings on route changes so WhatsApp/contact stay current. */
export default function ClinicSettingsSync() {
  const location = useLocation()
  const { refreshSettings } = useClinic()

  useEffect(() => {
    refreshSettings()
  }, [location.pathname, refreshSettings])

  return null
}
