# Phase 4 — Anatomy of an object

## Supplied film and derivative

Source: `public/video/veyra-craft.mp4`, user-supplied Runway film. H.264, yuv420p, 1280×720, 24fps, 5.041667s, 121 frames, 1084165 bytes. One keyframe at 0s; two B-frame dependencies reported. Original retained untouched (SHA256 5B0E3A3E6588A1C9EAE34178BBF6125AAC8F8184B78B2FBB225944C0D92ACEF1).

Derivative: `public/video/veyra-craft-scrub.mp4`, same dimensions/fps/duration, H.264/yuv420p, 121 keyframes (every 0.041667s), zero B-frames, no audio, faststart. 3798258 bytes, approximately 3.50× source size. FFmpeg settings: libx264, CRF 16, preset slow, g 1, keyint_min 1, bf 0, movflags +faststart. Full-video SSIM 0.998513; representative frames inspected without visible additional softness. Poster is an extracted WebP frame at 2.083333s, not newly generated imagery.

## Actual timeline

Approximate visual boundaries, inspected at quarter-second intervals and individually around the annotated range:

- 0–0.9s: assembled starting object.
- 0.9–1.95s: separation and rotation into the exploded configuration.
- 1.95–2.2s: separated, rotating components; the most useful annotation window.
- 2.2–3.35s: rotation/reassembly; the front becomes whole again around 3.25s.
- 3.35–5.041667s: final assembled presentation.

The generated film is stylized rather than a mechanically faithful construction diagram. No isolated precision hinge can confidently be identified, so three descriptive labels are used: FRAME, LENS, TEMPLE. No unsupported manufacturing claims were added.

## Controller and annotations

300svh section, sticky 100svh stage, isolated ScrollTrigger. Scroll breakpoints `(progress, seconds)`: (0,0), (.15,.9), (.43,1.95), (.70,2.2), (.90,3.35), (1,5.04). Direct currentTime assignment, piecewise linear pacing; no playback, looping or scrub smoothing. Video remains untransformed with contain fitting.

SVG uses the intrinsic 1280×720 coordinate space inside the same aspect-ratio wrapper as the video. Three measured anchor samples (1.95s, 2.083333s, 2.2s) interpolate positions through the rotation. Anchor, line and label reveal are separate reversible progress envelopes, with 1.8 percentage-point staggering. Lines extend from the product anchor outward. They retract before the later reassembly footage.

requestVideoFrameCallback observes presented frames on the paused video, prevents callouts appearing over an outdated frame during rapid seeking, and does not drive playback or run a continuous animation loop. Older browsers use seeked. Listeners, callback and trigger are cleaned up.

Mobile replaces long leaders with numbered source-space anchors and a compact three-item HTML legend. Desktop legend remains available to assistive technology. Reduced motion presents 2.083333s with static annotations and a 100svh section.

## Research and validation

21st metadata search returned Annotation (airbnb-visx), MarkerLabel and MarkerContent (mapcn). Chart/map-oriented components would add unnecessary machinery; no code or dependencies imported. Context-aware search rejected the existing design.json format, so plain metadata search was used. `21st review` reports three informational hardcoded color findings for the intentional new graphite palette.

Build and lint passed. Initial sandboxed Vite build failed with Windows spawn EPERM; required build succeeded outside the sandbox. Tested 1440×900, 1280×720, 1024×768, 390×844. Forward/reverse time and annotation states match; no horizontal overflow, video transforms, console errors or broken assets. Original hero and campaign hashes unchanged. Header, collection source, assets and tilt hook untouched. App.jsx changes only import/render the new chapter.

Screenshots under `.playwright-mcp`: `phase-4-{1440,1280,1024,390}-{assembled,exploded,final}.png`, `phase-4-desktop-disassembly.png`, `phase-4-reduced-mobile.png`. Film contact sheets and SSIM log under `tmp/phase-4`.

Human visual judgment: the source's rotating, morphing component geometry is not a true engineering exploded model. Review the moving anchor accuracy across the entire short window and the relatively small uncropped product on mobile. Full source composition is deliberately preserved; no crop or zoom introduced.
