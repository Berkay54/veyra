# Phase 3.1 validation

- `npm.cmd run build`: passed (Vite 8.3.4).
- `npm.cmd run lint`: passed (oxlint).
- `21st review`: completed; 10 informational hardcoded color findings, no source fixes required. Existing category paper/ink tokens and the two intentional plate tones retained.
- Browser: 1440×900, 1280×720, 1024×768 and 390×844; both SUN and OPTICAL. All six products load; no horizontal overflow or console errors. Full collection screenshots inspected, including lenses, hinges, temple edges and alpha compositing. No visible halos, fake logos or broken geometry at rendered sizes.
- Keyboard Enter/Tab category selection and visible focus verified. Hidden category is inert and aria-hidden. Metadata remains visible without hover. Reduced motion removes category/hover transitions and keeps both videos paused.
- Desktop hover settles at translateY(-10px); category opacity transition is 420ms. Selector stacking prevents product captions intercepting category buttons.
- Hero remains paused, without loop/autoplay, and seeks to 2.520833s at 900px scroll after refreshing existing ScrollTriggers. No hero implementation changes.
- Campaign retains native looping and existing visibility callbacks; playback and viewport pause/resume checked. Automation's background scroll throttling required explicit ScrollTrigger refresh/update for deterministic regression measurements; no application code was changed for the test.
- Reduced-motion header navigation selects OPTICAL and lands exactly at collection top; brand returns to scrollY 0. Header source remains untouched.
- Video asset SHA256 hashes and protected CSS/package hashes match the pre-change values. No dependencies added.
- Responsive WebP assets total 740454 bytes across 12 files. Explicit image dimensions/aspect ratios reserve layout space; category changes preserve section height.

Screenshots: `.playwright-mcp/phase-3-1-{1440,1280,1024,390}-{sun,optical}.png`; corresponding `-full.png` files show the entire collection. Research screenshots: `.playwright-mcp/research-cubitts.png` and `.playwright-mcp/research-ahlem.png`.

Human review: final frame styling, clear-lens reflection intensity, and the generous mobile lookbook pacing remain art-direction judgments. These are generated concept designs, not manufacturing specifications.
