# Phase 5 — Point of view

Superseded by [Through VEYRA](through-veyra.md). The typography-only component/styles have been removed; this report is historical validation only.

218svh chapter: 18svh muted stone handoff, then a sticky 100svh mineral-paper stage. No new video/image assets, fonts, dependencies or cards. Instrument Sans provides architectural statements and metadata; Instrument Serif carries the emotional opening, face reference and final philosophy.

Four viewport compositions: quiet offset opening; two-axis WE DON’T DESIGN / AROUND THE FACE; horizontal POINT OF VIEW climax; asymmetric philosophy/About spread. Horizontal and three-line desktop title versions were captured and compared; horizontal preserves the breadth and silence of the spread. Mobile uses POINT / OF VIEW as two lines.

Six .55px perspective lines converge at source-space (650,400) in a 1000×700 SVG. Mobile reduces to three lines and moves the point to (730,470), below the text. No 3D transforms, rotation, scale, letter animation or loops. The viewpoint shifts at most 24px. Geometry is decorative, excluded from accessibility output.

One GSAP timeline/ScrollTrigger, scrub true without smoothing. Stage starts after the handoff; ends at section bottom. Opening holds to 14%, contrast enters at 22% and leaves at 39%; resolution begins at 47%, geometry converges during 56–78%, releases from 84%; philosophy enters 93–100%. All motion reverses via the same timeline. matchMedia owns cleanup; no React scroll state or per-frame layout measurements.

Reduced motion disables the timeline/sticky sequence and shows every panel in ordinary flow, with static converged geometry. All copy remains in semantic HTML in reading order in both modes. About contains independent eyewear study / 2026 and identifies the fictional portfolio brand; no invented company history or credentials.

ABOUT's centralized navigation entry now uses sectionId about, producing an actual #about anchor. Existing smooth scrolling, modified-click handling, reduced-motion navigation and focus styles are reused unchanged.

21st metadata search: Editorial Testimonial (jatin-yadav05), Text Animation (ajith66310), Rectangular Text Reveal (hyperiux), Editorial Image Hero (felipemenezes098). No result/source code imported: testimonials, hero templates and text effects do not fit the concept. Implementation uses the project's existing React/CSS/GSAP. 21st review completed with five informational intentional palette findings.

## Validation

- Build and lint pass.
- All four states inspected at 1440×900, 1280×720, 1024×768 and 390×844; no horizontal overflow.
- Native forward/reverse test: .08 → .80 → .32 → 1; timeline progress follows actual ScrollTrigger progress, returning the correct visible panel. Screenshots also sampled timeline positions directly to avoid remote compositor timing artifacts.
- ABOUT works with normal smooth navigation and keyboard/reduced-motion navigation; focus remains visible. Static mobile composition captured with all copy available.
- Hero still paused, no autoplay/loop; scrubs near 2.52s at 900px. Campaign native looping and leaving-section pause checked. Collection OPTICAL state and -10px hover lift/tilt remain functional. Craft at exploded range remains paused near 2.04s, with synchronized labels.
- Craft, collection, tilt hook, campaign source/style and all video hashes match the pre-change values. App.jsx modifications only add the new import/component; header change only connects the existing ABOUT destination.
- Initial development cleanup error (attempting to kill an already reverted timeline trigger) was corrected by letting matchMedia own lifecycle cleanup. Fresh-page checks show no console errors.

Screenshots: `.playwright-mcp/phase-5-{1440,1280,1024,390}-{opening,contrast,climax,final}.png`; transition `phase-5-transition.png`; static mobile `phase-5-reduced-mobile.png`; rejected desktop stack comparison `phase-5-desktop-stack-comparison.png`.

Human review: the measured stone-to-bone tonal step, six-line convergence strength, large horizontal title and concise scroll pacing are art-direction choices. No footer or subsequent section built. No commit/push.
