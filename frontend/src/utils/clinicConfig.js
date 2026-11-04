const cleanNumber = (value = '') => String(value).replace(/[^\d]/g, '')

export const clinicConfig = {
  brandName: 'Candela Aesthetics & Dental',
  brandShort: 'Candela',
  tagline: 'Where Science Meets Beauty.',
  supportingLine:
    'Discover a more confident you through personalized aesthetic and dental care.',
  addressLine: '1053-Ravi Block, Allama Iqbal Town, Lahore',
  phones: {
    primary: import.meta.env.VITE_CLINIC_PHONE_PRIMARY || '03454119939',
    secondary: import.meta.env.VITE_CLINIC_PHONE_SECONDARY || '03324119939',
  },
  email: import.meta.env.VITE_CLINIC_EMAIL || '',
  hours: '9:00 AM – 10:00 PM',
  hoursNote: 'Open daily for services (confirm Friday/Sunday nuances with clinic)',
  instagramUrl:
    import.meta.env.VITE_INSTAGRAM_URL ||
    'https://www.instagram.com/candelaaestheticsanddental/',
  whatsappNumber: cleanNumber(import.meta.env.VITE_WHATSAPP_NUMBER || ''),
  siteUrl: import.meta.env.VITE_SITE_URL || 'http://localhost:5173',
  apiUrl: import.meta.env.VITE_API_URL || '/api',
  facilityNames: [
    'Candela Medical Complex (CMC)',
    'Candela Laser Center & Polyclinic (CLC)',
  ],
}

export const formatDisplayPhone = (phone) => {
  const digits = cleanNumber(phone)
  if (digits.length === 11 && digits.startsWith('0')) {
    return `${digits.slice(0, 4)}-${digits.slice(4)}`
  }
  if (digits.length === 12 && digits.startsWith('92')) {
    return `0${digits.slice(2, 5)}-${digits.slice(5)}`
  }
  return phone
}

export const buildWhatsAppUrl = (message, numberOverride) => {
  let number = cleanNumber(numberOverride || clinicConfig.whatsappNumber)
  if (!number) return null
  // Convert local PK 03xxxxxxxxx to 923xxxxxxxxx for wa.me
  if (number.startsWith('0') && number.length === 11) {
    number = `92${number.slice(1)}`
  }
  const text = encodeURIComponent(message)
  return `https://wa.me/${number}?text=${text}`
}

export const defaultWhatsAppMessage = () =>
  `Hello Candela Aesthetics & Dental,\nI would like to enquire about a consultation.`
