import Seo from '../components/seo/Seo'
import Button from '../components/ui/Button'

export default function NotFoundPage() {
  return (
    <>
      <Seo title="Page Not Found" path="/404" />
      <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-5 py-32 text-center">
        <p className="font-sans text-[11px] tracking-[0.28em] uppercase text-gold">404</p>
        <h1 className="mt-4 font-display text-5xl text-espresso">Page not found</h1>
        <p className="mt-4 font-sans text-warm-grey">
          The page you are looking for is unavailable or has moved.
        </p>
        <Button to="/" variant="gold" className="mt-8">
          Back to Home
        </Button>
      </section>
    </>
  )
}
