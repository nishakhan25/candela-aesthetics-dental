import Reveal from '../../components/common/Reveal'
import Button from '../../components/ui/Button'
import { useClinic } from '../../context/ClinicContext'
import {
  buildWhatsAppUrl,
  clinicConfig,
  defaultWhatsAppMessage,
} from '../../utils/clinicConfig'

export default function FinalCta() {
  const { settings } = useClinic()

  const whatsappUrl = buildWhatsAppUrl(
    defaultWhatsAppMessage(),
    settings.whatsapp_number || clinicConfig.whatsappNumber,
  )

  return (
    <section className="bg-beige">
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 lg:py-16">
        <Reveal>
          <div className="relative overflow-hidden border border-espresso/8 bg-white px-6 py-12 text-center shadow-[0_24px_60px_rgba(24,26,64,0.06)] md:px-12 md:py-16">
            <div
              className="pointer-events-none absolute inset-0 opacity-80"
              style={{
                background:
                  'radial-gradient(ellipse 50% 60% at 0% 50%, rgba(197,164,109,0.12), transparent), radial-gradient(ellipse 45% 55% at 100% 50%, rgba(47,63,138,0.06), transparent)',
              }}
            />
            <div className="relative">
              <p className="font-sans text-[11px] font-semibold tracking-[0.28em] uppercase text-gold">
                Begin
              </p>
              <div className="editorial-rule mx-auto mt-3" />
              <h2 className="mt-4 font-display text-3xl text-espresso md:text-5xl">
                Ready for your consultation?
              </h2>
              <p className="mx-auto mt-4 max-w-lg font-sans text-sm text-warm-grey md:text-base">
                Book online or message us on WhatsApp — your request is reviewed before
                confirmation.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button to="/book" variant="gold">
                  Book a Consultation
                </Button>
                {whatsappUrl ? (
                  <Button href={whatsappUrl} target="_blank" rel="noreferrer" variant="ghost">
                    Chat on WhatsApp
                  </Button>
                ) : (
                  <Button to="/contact" variant="ghost">
                    Contact
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
