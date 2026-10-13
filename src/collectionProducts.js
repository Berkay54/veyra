// Original, generated VEYRA concept frames. Asset provenance: docs/collection-assets.md.
export const collectionProducts = [
  { id: 'sun-01', category: 'sun', name: 'FORM', model: '01', material: 'Black acetate', lens: 'Smoke lens', alt: 'FORM 01 sunglasses: bold black acetate rectangular frame with smoke lenses, viewed from three quarters.' },
  { id: 'sun-02', category: 'sun', name: 'LINE', model: '02', material: 'Graphite acetate', lens: 'Smoke lens', alt: 'LINE 02 sunglasses: slim graphite acetate frame with softly oval smoke lenses and fine temples.' },
  { id: 'sun-03', category: 'sun', name: 'ARC', model: '03', material: 'Brushed metal', lens: 'Taupe lens', alt: 'ARC 03 sunglasses: champagne metal frame with rounded geometric taupe lenses and clear nose pads.' },
  { id: 'optical-01', category: 'optical', name: 'FORM', model: '04', material: 'Black acetate', lens: 'Clear lens', alt: 'FORM 04 optical glasses: black acetate panto frame with clear lenses and slim temples.' },
  { id: 'optical-02', category: 'optical', name: 'LINE', model: '05', material: 'Brushed metal', lens: 'Clear lens', alt: 'LINE 05 optical glasses: fine metal panto frame with clear lenses and adjustable nose pads.' },
  { id: 'optical-03', category: 'optical', name: 'ARC', model: '06', material: 'Translucent acetate', lens: 'Clear lens', alt: 'ARC 06 optical glasses: translucent champagne acetate rectangular frame with clear lenses and visible temple cores.' },
].map((product) => ({
  ...product,
  image: `/images/collection/${product.category}/${product.id}.webp`,
  imageSmall: `/images/collection/${product.category}/${product.id}-720.webp`,
  width: 1200,
  height: 800,
}))
