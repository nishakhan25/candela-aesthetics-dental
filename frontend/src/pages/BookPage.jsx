import Seo from '../components/seo/Seo'
import PageHero from '../components/common/PageHero'
import Reveal from '../components/common/Reveal'
import BookingForm from '../components/booking/BookingForm'
import { unsplash } from '../data/unsplashAssets'

export default function BookPage() {
  return (
    <>
      <Seo
        title="Book Appointment"
        description="Request a consultation at Candela Aesthetics & Dental. Appointment confirmation follows clinic approval."
        path="/book"
      />
      <PageHero
        variant="ribbon"
        eyebrow="Appointments"
        title="Book your consultation."
        description="Share your preferences below. Your submission is a request — confirmation happens after clinic review."
        image={unsplash.book}
        compact
      />
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 lg:py-24">
        <Reveal>
          <BookingForm />
        </Reveal>
      </section>
    </>
  )
}
