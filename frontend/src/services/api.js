import axios from 'axios'
import { clinicConfig } from '../utils/clinicConfig'

const api = axios.create({
  baseURL: clinicConfig.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('candela_admin_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

const unwrapError = (error) => {
  const detail = error?.response?.data?.detail
  if (typeof detail === 'string') return detail
  if (Array.isArray(detail)) {
    return detail.map((item) => item.msg || JSON.stringify(item)).join(' ')
  }
  return error.message || 'Request failed'
}

export const getErrorMessage = unwrapError

/* Public */
export const submitAppointmentRequest = async (payload) => {
  const { data } = await api.post('/appointments', payload)
  return data
}

export const submitContactMessage = async (payload) => {
  const { data } = await api.post('/contact', payload)
  return data
}

export const fetchTreatments = async (featured) => {
  const { data } = await api.get('/treatments', {
    params: featured ? { featured: true } : undefined,
  })
  return data
}

export const fetchTreatmentBySlug = async (slug) => {
  const { data } = await api.get(`/treatments/${slug}`)
  return data
}

export const fetchCategories = async () => {
  const { data } = await api.get('/categories')
  return data
}

export const fetchDoctors = async () => {
  const { data } = await api.get('/doctors')
  return data
}

export const fetchGallery = async (category) => {
  const { data } = await api.get('/gallery', {
    params: category && category !== 'all' ? { category } : undefined,
  })
  return data
}

export const fetchTestimonials = async () => {
  const { data } = await api.get('/testimonials')
  return data
}

export const fetchClinicSettings = async () => {
  const { data } = await api.get('/contact/settings')
  return data.settings || {}
}

/* Auth */
export const adminLogin = async (email, password) => {
  const { data } = await api.post('/auth/login-json', { email, password })
  return data
}

export const fetchAdminMe = async () => {
  const { data } = await api.get('/auth/me')
  return data
}

/* Admin appointments */
export const fetchAppointmentStats = async () => {
  const { data } = await api.get('/appointments/dashboard')
  return data
}

export const fetchAppointments = async (params = {}) => {
  const { data } = await api.get('/appointments', { params })
  return data
}

export const updateAppointmentStatus = async (id, payload) => {
  const { data } = await api.patch(`/appointments/${id}/status`, payload)
  return data
}

export const rescheduleAppointment = async (id, payload) => {
  const { data } = await api.patch(`/appointments/${id}/reschedule`, payload)
  return data
}

/* Admin CMS */
export const adminListTreatments = async () => {
  const { data } = await api.get('/admin/treatments')
  return data
}

export const adminCreateTreatment = async (payload) => {
  const { data } = await api.post('/admin/treatments', payload)
  return data
}

export const adminUpdateTreatment = async (id, payload) => {
  const { data } = await api.patch(`/admin/treatments/${id}`, payload)
  return data
}

export const adminDeleteTreatment = async (id) => {
  await api.delete(`/admin/treatments/${id}`)
}

export const adminListCategories = async () => {
  const { data } = await api.get('/categories/all')
  return data
}

export const adminListDoctors = async () => {
  const { data } = await api.get('/doctors/all')
  return data
}

export const adminCreateDoctor = async (payload) => {
  const { data } = await api.post('/doctors', payload)
  return data
}

export const adminUpdateDoctor = async (id, payload) => {
  const { data } = await api.patch(`/doctors/${id}`, payload)
  return data
}

export const adminDeleteDoctor = async (id) => {
  await api.delete(`/doctors/${id}`)
}

export const adminListGallery = async () => {
  const { data } = await api.get('/gallery/all')
  return data
}

export const adminCreateGallery = async (payload) => {
  const { data } = await api.post('/gallery', payload)
  return data
}

export const adminUpdateGallery = async (id, payload) => {
  const { data } = await api.patch(`/gallery/${id}`, payload)
  return data
}

export const adminDeleteGallery = async (id) => {
  await api.delete(`/gallery/${id}`)
}

export const adminListTestimonials = async () => {
  const { data } = await api.get('/testimonials/all')
  return data
}

export const adminCreateTestimonial = async (payload) => {
  const { data } = await api.post('/testimonials', payload)
  return data
}

export const adminUpdateTestimonial = async (id, payload) => {
  const { data } = await api.patch(`/testimonials/${id}`, payload)
  return data
}

export const adminDeleteTestimonial = async (id) => {
  await api.delete(`/testimonials/${id}`)
}

export const adminUpdateSettings = async (settings) => {
  const { data } = await api.put('/contact/settings', { settings })
  return data.settings
}

export default api
