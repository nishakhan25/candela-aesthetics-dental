import Seo from '../components/seo/Seo'
import PageHero from '../components/common/PageHero'
import Reveal from '../components/common/Reveal'
import { clinicConfig } from '../utils/clinicConfig'

export default function PrivacyPage() {
  return (
    <>
      <Seo
        title="Privacy Policy"
        description="Privacy Policy for Candela Aesthetics & Dental."
        path="/privacy"
      />
      <PageHero
        variant="quiet"
        eyebrow="Legal"
        title="Privacy Policy"
        description="How we handle personal information submitted through this website."
      />
      <section className="mx-auto max-w-3xl px-5 py-16 md:px-8 lg:py-24">
        <Reveal className="prose-candela space-y-6 font-sans text-sm leading-relaxed text-warm-grey md:text-base">
          <p>
            {clinicConfig.brandName} (“we”, “our”) respects your privacy. This policy
            explains what information we collect through the website and how it is used.
          </p>
          <h2 className="font-display text-2xl text-espresso">Information we collect</h2>
          <p>
            When you submit a contact form or appointment request, we may collect your
            name, phone number, email address, preferred treatment details, preferred
            date/time, and message content.
          </p>
          <h2 className="font-display text-2xl text-espresso">How we use information</h2>
          <p>
            We use submitted details to respond to enquiries, review appointment requests,
            and improve clinic communication. Appointment submissions are requests and do
            not automatically confirm a booking.
          </p>
          <h2 className="font-display text-2xl text-espresso">Sharing</h2>
          <p>
            We do not sell personal information. Data may be processed by trusted service
            providers required to operate hosting, messaging, or clinic systems.
          </p>
          <h2 className="font-display text-2xl text-espresso">Contact</h2>
          <p>
            For privacy questions, contact the clinic at{' '}
            {clinicConfig.addressLine} or call {clinicConfig.phones.primary}.
          </p>
          <p className="text-xs">
            This draft policy should be reviewed by the clinic before production launch.
          </p>
        </Reveal>
      </section>
    </>
  )
}
