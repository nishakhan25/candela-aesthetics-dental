import { Outlet, useLocation } from 'react-router-dom'
import { useLayoutEffect } from 'react'
import Navbar from '../components/navigation/Navbar'
import Footer from '../components/layout/Footer'
import BackToTop from '../components/common/BackToTop'

export default function MainLayout() {
  const location = useLocation()

  // Instant scroll before paint — avoids blank frames when navigating from a scrolled page
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-ivory">
      <Navbar />
      {/* Plain main — no motion opacity (old AnimatePresence left pages stuck at opacity: 0) */}
      <main>
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}
