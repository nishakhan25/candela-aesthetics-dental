/**
 * Gallery uses official Instagram photography only.
 */

import { instagramPosts } from './instagramAssets'

export const galleryItems = instagramPosts.map((post) => ({
  id: post.id,
  category: post.category,
  title: post.alt.replace(' from Instagram', '').replace('Candela ', ''),
  type: 'single',
  image: post.src,
}))

export const galleryFilters = [
  { id: 'all', label: 'All' },
  { id: 'dental', label: 'Dental' },
  { id: 'aesthetic', label: 'Aesthetic' },
  { id: 'clinic', label: 'Clinic' },
]
