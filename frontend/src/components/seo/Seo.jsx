import { Helmet } from 'react-helmet-async'
import { clinicConfig } from '../../utils/clinicConfig'

export default function Seo({
  title,
  description = 'Premium aesthetic and dental care in Lahore. Personalized consultations, refined clinical environments, and confidence-led patient experiences.',
  path = '/',
}) {
  const fullTitle = title
    ? `${title} | ${clinicConfig.brandName}`
    : clinicConfig.brandName
  const url = `${clinicConfig.siteUrl}${path}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  )
}
