import Seo from '../components/seo/Seo'
import PageHero from '../components/common/PageHero'
import Reveal from '../components/common/Reveal'
import { clinicConfig } from '../utils/clinicConfig'

export default function TermsPage() {
  return (
    <>
      <Seo
        title="Terms & Conditions"
        description="Terms and conditions for using the Candela Aesthetics & Dental website."
        path="/terms"
      />
      <PageHero
        variant="quiet"
        eyebrow="Legal"
        title="Terms & Conditions"
        description="Guidelines for using this website and requesting appointments."
      />
      <section className="mx-auto max-w-3xl px-5 py-16 md:px-8 lg:py-24">
        <Reveal className="space-y-6 font-sans text-sm leading-relaxed text-warm-grey md:text-base">
          <p>
            By using the {clinicConfig.brandName} website, you agree to these terms.
          </p>
          <h2 className="font-display text-2xl text-espresso">Appointment requests</h2>
          <p>
            Online booking submissions are requests only. An appointment is confirmed only
            after clinic approval and direct communication with the patient.
          </p>
          <h2 className="font-display text-2xl text-espresso">Medical information</h2>
          <p>
            Website content is informational and does not replace professional clinical
            advice, diagnosis, or treatment planning.
          </p>
          <h2 className="font-display text-2xl text-espresso">Accuracy</h2>
          <p>
            Treatment descriptions and clinic details are maintained in good faith and may
            be updated. Final suitability is determined during consultation.
          </p>
          <p className="text-xs">
            These draft terms should be reviewed by the clinic before production launch.
          </p>
        </Reveal>
      </section>
    </>
  )
}
