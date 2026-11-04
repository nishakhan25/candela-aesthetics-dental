import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from '../components/navigation/Navbar'
import Footer from '../components/layout/Footer'
import BackToTop from '../components/common/BackToTop'

export default function MainLayout() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-ivory">
      <Navbar />
      <main key={location.pathname}>
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}
