import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ToastProvider } from './context/ToastContext'
import { AuthProvider } from './context/AuthContext'
import { ClinicProvider } from './context/ClinicContext'
import ClinicSettingsSync from './components/common/ClinicSettingsSync'
import ProtectedRoute from './components/admin/ProtectedRoute'
import MainLayout from './layouts/MainLayout'
import AdminLayout from './layouts/AdminLayout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import TreatmentsPage from './pages/TreatmentsPage'
import TreatmentDetailPage from './pages/TreatmentDetailPage'
import SpecialistsPage from './pages/SpecialistsPage'
import GalleryPage from './pages/GalleryPage'
import ContactPage from './pages/ContactPage'
import BookPage from './pages/BookPage'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'
import NotFoundPage from './pages/NotFoundPage'
import AdminLoginPage from './pages/admin/AdminLoginPage'
import AdminDashboardPage from './pages/admin/AdminDashboardPage'
import AdminAppointmentsPage from './pages/admin/AdminAppointmentsPage'
import AdminTreatmentsPage from './pages/admin/AdminTreatmentsPage'
import AdminSpecialistsPage from './pages/admin/AdminSpecialistsPage'
import AdminGalleryPage from './pages/admin/AdminGalleryPage'
import AdminTestimonialsPage from './pages/admin/AdminTestimonialsPage'
import AdminSettingsPage from './pages/admin/AdminSettingsPage'

export default function App() {
  return (
    <HelmetProvider>
      <ToastProvider>
        <AuthProvider>
          <BrowserRouter>
            <ClinicProvider>
              <ClinicSettingsSync />
              <Routes>
                <Route element={<MainLayout />}>
                  <Route index element={<HomePage />} />
                  <Route path="about" element={<AboutPage />} />
                  <Route
                    path="treatments/dental"
                    element={<TreatmentsPage categorySlug="dental" />}
                  />
                  <Route
                    path="treatments/aesthetic"
                    element={<TreatmentsPage categorySlug="aesthetic" />}
                  />
                  <Route
                    path="treatments/physiotherapy"
                    element={<TreatmentsPage categorySlug="physiotherapy" />}
                  />
                  <Route path="treatments/:slug" element={<TreatmentDetailPage />} />
                  <Route path="specialists" element={<SpecialistsPage />} />
                  <Route path="gallery" element={<GalleryPage />} />
                  <Route path="contact" element={<ContactPage />} />
                  <Route path="book" element={<BookPage />} />
                  <Route path="privacy" element={<PrivacyPage />} />
                  <Route path="terms" element={<TermsPage />} />
                  <Route path="home" element={<Navigate to="/" replace />} />
                </Route>

                <Route path="admin/login" element={<AdminLoginPage />} />
                <Route
                  path="admin"
                  element={
                    <ProtectedRoute>
                      <AdminLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<AdminDashboardPage />} />
                  <Route path="appointments" element={<AdminAppointmentsPage />} />
                  <Route path="treatments" element={<AdminTreatmentsPage />} />
                  <Route path="specialists" element={<AdminSpecialistsPage />} />
                  <Route path="gallery" element={<AdminGalleryPage />} />
                  <Route path="testimonials" element={<AdminTestimonialsPage />} />
                  <Route path="settings" element={<AdminSettingsPage />} />
                </Route>

                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </ClinicProvider>
          </BrowserRouter>
        </AuthProvider>
      </ToastProvider>
    </HelmetProvider>
  )
}
