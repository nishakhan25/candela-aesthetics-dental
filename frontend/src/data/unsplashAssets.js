/**
 * High-resolution Unsplash photography for cinematic site sections (4K/5K).
 * Instagram assets are reserved for Gallery + Instagram showcase only.
 */

const u = (id, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`

export const unsplash = {
  hero: u('photo-1629909613654-28e377c37b09'), // luxury dental suite
  about: u('photo-1560750588-73207b1ef5b8'), // spa aesthetic atmosphere
  dental: u('photo-1606811841689-23dfddce3e95'), // dental care
  aesthetic: u('photo-1570172619644-dfd03ed5d881'), // aesthetic facial
  physio: u('photo-1571019614242-c5c5dee9f50b'), // physiotherapy
  cta: u('photo-1600585154340-be6161a56a0c'), // serene architecture
  book: u('photo-1629909615184-74f495363b67'), // treatment room
  contact: u('photo-1629909613654-28e377c37b09'), // welcoming clinic suite
  specialists: u('photo-1579684385127-1ef15d508118'), // clinical team collaboration
  scaling: u('photo-1588776814546-1ffcf47267a5'),
  whitening: u('photo-1609840114035-3c981b782dfe'),
  composite: u('photo-1598256989800-fe5f95da9787'),
  restorative: u('photo-1629909613654-28e377c37b09'),
  laser: u('photo-1512290923902-8a9f81dc236c'),
  hydrafacial: u('photo-1616394584738-fc6e612e71b9'),
  carbon: u('photo-1487412947147-5cebf100ffc2'),
  peels: u('photo-1552693673-1bf958298935'),
  prp: u('photo-1522337360788-8b13dee7a37e'),
  mole: u('photo-1666214280557-f1b5022eb634'),
  derma: u('photo-1612349317150-e413f6a5b16d'),
  lashes: u('photo-1516975080664-ed2fc6a32937'),
}

/** Homepage hero + gallery slideshow */
export const homeSlides = [
  {
    src: u('photo-1629909613654-28e377c37b09'),
    alt: 'Luxury dental treatment suite',
    caption: 'Dental excellence',
  },
  {
    src: u('photo-1570172619644-dfd03ed5d881'),
    alt: 'Aesthetic facial care',
    caption: 'Radiant skin',
  },
  {
    src: u('photo-1631217868264-e5b90bb7e133'),
    alt: 'Modern aesthetic clinic room',
    caption: 'Calm clinical spaces',
  },
  {
    src: u('photo-1616394584738-fc6e612e71b9'),
    alt: 'Hydrafacial and skincare',
    caption: 'Glow treatments',
  },
  {
    src: u('photo-1606811841689-23dfddce3e95'),
    alt: 'Confident smile dental care',
    caption: 'Confident smiles',
  },
  {
    src: u('photo-1512290923902-8a9f81dc236c'),
    alt: 'Laser and wellness care',
    caption: 'Laser & wellness',
  },
]
