# Phase 5 — Through VEYRA

The current Phase 5 is a human/architectural fashion story. It replaces the earlier typography-only manifesto; its component/styles were removed from src. Phases 1–4 and the existing header implementation remain unchanged.

## References and one interaction concept

Official contemporary research:

- [Cubitts A Golden Age](https://cubitts.com/blogs/journal/a-golden-age): eyewear campaign situated in architecture; direction informed person/environment relationships, not copied photography.
- [AHLEM Paris in Character](https://www.ahlemeyewear.com/pages/paris-in-character-lookbook): coherent styling and reciprocal relationship between person and place.
- [Cubitts agency case study](https://www.byassociationonly.com/case-studies/cubitts): award-winning editorial ecommerce context.

21st catalog metadata inspected: Reveal Image Mask (daiwiikharihar, 10905), SVG Mask Effect (manuarora700, 10757), Image Reveal (jatin-yadav05, 2522), Rectangular Text Reveal (hyperiux, 26076). No catalog source code copied/imported. The selected principle is controlled photographic masking: architectural crop reveals and a quiet optical region, implemented in existing React/CSS/GSAP. No sliders, cards or mouse-follow behavior.

## Final photography / provenance

All three final photographs were generated specifically for this fictional VEYRA portfolio using the built-in OpenAI image generation tool. No external photographs were supplied to generation, downloaded into the site, or licensed from a third-party campaign. The model is fictional, not a named real person. The portrait was used as an identity/style reference for detail and environment. An invented mark on the first portrait's temple was removed with an image-tool edit before selecting the final portrait; only the corrected version ships.

Exact generation prompts, reference identity and master source paths are recorded in [through-veyra-image-prompts.json](through-veyra-image-prompts.json). Masters remain in the recorded generated-image location; selected web assets are all inside the workspace.

| Photograph | Master | Direction | Public derivatives / bytes |
| --- | --- | --- | --- |
| 01 Portrait | exec-b2ec8ec7-b3a9-4ed4-b567-28c1614314c9.png, 1024×1536 | Olive-skinned adult model, plain black acetate, charcoal tailoring, limestone, directional sun | portrait-1024.webp 130088; portrait-640.webp 57442 |
| 02 Detail | exec-ea3eeb41-2935-4e8b-a053-f89c168b6cd1.png, 1536×1024 | Same model/frames/light, close temple/lenses/reflection/skin study | detail-1536.webp 257766; detail-640.webp 54192 |
| 03 Environment | exec-0bc82aa2-174a-4e3e-8394-428bbf7b4509.png, 1536×1024 | Same model within long limestone piers, shadow and negative space | environment-1536.webp 246286; environment-960.webp 119652; environment-640.webp 59404 |

All derivatives live in `public/images/perspective/`. WebP quality 92, compression level 6, Lanczos downsampling; 924830 bytes total. No additional image generation remains necessary. These are generated campaign concepts, not documentation of manufactured eyewear or an actual commissioned photoshoot.

## Composition

- Dark 20svh breathing space borrows a narrow limestone slice from the first photograph. No wipe/door animation. The following environment is mineral paper and natural light.
- Portrait occupies 56% desktop width on the left; restrained intro occupies negative space on the right.
- Detail offsets to the right at 32% width, overlapping the portrait's lower whitespace. Its 5:4 field gives the eyewear more prominence.
- Final environment occupies 82% width, offset 12%; wide 16:9 crop preserves face, glasses and model. The only stronger statement sits on quiet sunlit architecture, with mobile text below the image.
- About identity: VEYRA / Independent Eyewear Study / 2026, Objects for seeing differently; fictional portfolio brand noted discreetly.
- Normal scroll throughout; no sticky section. Measured length: 277svh at 1440×900, 279svh at 1280×720, 264svh at 1024×768, 260svh at 390×844. Short desktop uses a square portrait crop with safe head/eyewear positioning. Tablet moves the image axes and scale. Mobile is a large vertical portrait, offset detail, architectural crop, statement and small identity.

## Through the lens / reveals

Detail has two perfectly aligned responsive image layers. Base: saturation .82, contrast .94; clear layer: original natural sharpness/color. No blur, scale or sharpen effect. A softly rectangular optical clip region travels left to right with scroll, then back on reverse scroll. No pointer following, magnification, border or literal glasses outline.

One related crop vocabulary: vertical reveal for portrait/environment, horizontal reveal for detail. All scrubbed directly and reversible. Reveal setup waits for image.decode; IntersectionObserver prepares images two viewports ahead. Four local ScrollTriggers total, owned by a GSAP context with cleanup. No React scroll state, continuous loop or per-frame layout reads. The final statement appears with its photograph rather than before the photographic reveal.

Reduced motion removes travel/reveal triggers; all photographs remain visible, with the clear region statically centered. Meaningful alt text, decorative duplicated layer hidden from assistive technology, explicit dimensions/aspect ratios and srcset/sizes are provided. Actual fresh touch-mobile selection verified: portrait 640, detail 640, environment 960; environment sizes accounts for the extra source width needed by its tall mobile crop. ABOUT remains the existing #about anchor; no header changes needed in this replacement.

## QA and handoff

All three sources inspected at full resolution and rendered sizes: lenses, ear/temple geometry, skin, plain hinge details, architecture, hands concealed naturally, shadows and framing. No visible logo/text artifacts, broken geometry or compression damage accepted. The generated campaign art direction still merits human visual approval.

Build/lint pass. 21st review completed: six informational palette findings, intentional scoped paper/stone colors. No new dependencies. No console errors, broken image paths or horizontal overflow. Mask-layer bounding boxes match at all four sizes; measured forward/reverse clip values return exactly to their initial state.

Regression: hero still paused and seeks to ~2.52s at 900px; campaign loops naturally and pauses on leave; OPTICAL selection and -10px hover tilt work; craft remains paused near 2.04s at the annotated state. Protected component/style/tilt hashes match prior values. No videos re-encoded or assets changed in earlier phases.

Files created: PerspectiveExperience.jsx/css; seven WebP derivatives; prompt JSON; this report. App.jsx swaps the Phase 5 import/render. ManifestoExperience.jsx/css removed. Design context records the replacement; the previous manifesto report is marked superseded. No header, package or earlier chapter files changed.

Screenshots: `.playwright-mcp/through-veyra-{1440,1280,1024,390}-{portrait,detail,environment}.png`; `through-veyra-transition.png`; `through-veyra-lens-state.png`; `through-veyra-{1440,390}-full.png` (static complete compositions). Human approval: all three generated photographs, final crop choices and the understated optical contrast effect. No footer/newsletter/shop/contact work. No commit/push.
