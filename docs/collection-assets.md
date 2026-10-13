# VEYRA collection asset provenance

Prepared 13 October 2026 for Phase 3.1. All six images are original AI-generated fictional concept frames, created with the built-in OpenAI image generation tool for this VEYRA portfolio/demo. No external product photographs, logos, or reference images were supplied to generation or included in the website. These are concept illustrations, not photographs of manufactured products. No third-party image license is relied upon.

Exact prompts and generation source paths for every image are recorded in [collection-image-prompts.json](collection-image-prompts.json).

| Asset | Model | Direction | Full WebP bytes | 720px WebP bytes |
| --- | --- | --- | ---: | ---: |
| sun/sun-01 | FORM 01 | Bold black acetate / smoke lens | 62472 | 30074 |
| sun/sun-02 | LINE 02 | Slim graphite acetate / smoke lens | 60786 | 28092 |
| sun/sun-03 | ARC 03 | Champagne metal / taupe lens | 66356 | 30782 |
| optical/optical-01 | FORM 04 | Black acetate / clear lens | 90502 | 41018 |
| optical/optical-02 | LINE 05 | Fine metal / clear lens | 101372 | 43590 |
| optical/optical-03 | ARC 06 | Translucent champagne acetate / clear lens | 129284 | 56126 |

Each asset has two transparent WebP files under `public/images/collection/`: 1200×800 (`id.webp`) and 720×480 (`id-720.webp`). Generated PNG masters are retained at the source paths in the JSON. FFmpeg/libwebp compression uses quality 94, compression level 6, Lanczos resizing; alpha is preserved. No automated background removal was used. Responsive `srcset`, explicit dimensions, asynchronous decoding and below-fold lazy loading reduce transfer and layout shift.

## Reference research (inspiration only)

- [Cubitts](https://cubitts.com): restrained material language, large frame imagery, lookbook rhythm.
- [AHLEM sun collection](https://www.ahlemeyewear.com/collections/sun): isolated product presentation and fine metal detailing.
- [Cubitts case study](https://www.byassociationonly.com/case-studies/cubitts) and [Awwwards recognition](https://www.byassociationonly.com/articles/cubitts-receives-awwwards-site-of-day): editorial ecommerce context.
- Frame reference pages: [Dalmeny](https://cubitts.com/products/dalmeny), [Maygood](https://cubitts.com/products/maygood), [Herbrand](https://cubitts.com/products/herbrand), [Morgan](https://cubitts.com/products/morgan), [Panton](https://cubitts.com/products/panton), [Alexandre III](https://www.ahlemeyewear.com/products/alexandre-iii). Shapes/material categories informed the brief; designs and photographs were not copied.
- 21st.dev metadata inspected: Gallery Animation by n38693842, Hover Image Gallery by isaiahbjork, Image Gallery by prebuiltui. Expansion, cursor-follow and glass tooltips were rejected. No catalog source code or dependencies were imported; the final image lift and category crossfade are custom CSS.
