# Phase 4.1 performance audit

Only the craft controller changed. Composition, copy, CSS, anchor definitions, timeline beats, section height, earlier components and all production video bytes are unchanged.

## Video audit / candidates

All files: H.264 High, 1280×720, 24fps, yuv420p, 5.041667 seconds, 121 frames.

| File | Bytes | Video bitrate | Keyframes / GOP | B-frame dependency | Faststart |
| --- | ---: | ---: | --- | --- | --- |
| Source | 1084165 | 1.695 Mbps | 1 / entire clip | 2 | No: mdat before moov |
| Previous production / retained final | 3798258 | 6.025 Mbps | 121 / 1 frame | 0 | Yes |
| A | 2942090 | 4.666 Mbps | 121 / 1 frame | 0 | Yes |
| B | 1843481 | 2.923 Mbps | 41 / 3 frames | 0 | Yes |

Previous production: libx264 slow, CRF 16, g 1, bf 0. Candidates A/B: libx264 slow, High, CRF 18, yuv420p, bf 0, faststart, no audio. A g/keyint_min 1; B g/keyint_min 3, sc_threshold 0. No lower-resolution or mobile encode tested because no evidence justified lowering resolution. No C needed: A/B covered all-I versus short-GOP, and the controller benchmark identified a stronger intervention.

## Browser evidence

Local Chromium, loaded files, 20 sequential forward/reverse/direction-change seeks, measuring assignment to seeked (decode completion):

| Encode | Median ms | p95 ms |
| --- | ---: | ---: |
| Previous production | 23.7 | 47.3 |
| A | 31.3 | 41.7 |
| B | 29.8 | 52.4 |

These are exploratory single-machine measurements, not statistically conclusive rankings. The initial presented-frame benchmark hit roughly 1Hz compositor callback throttling despite visible/focus emulation. Its approximately 1000ms timeout latencies and 2–3 callbacks per burst were rejected as measurement artifacts. Reliable visible frame-gap/presentation counts could not be established in this remote browser. getVideoPlaybackQuality reported zero dropped frames, but its total frame counter under seeking measures decoder work, not distinct visible images.

A 100-request sweep through 1.95–2.2s demonstrates repeated seeking to the same source frames:

| Encode | Raw assignments / seeked events / decoder-frame counter delta | Frame-gated assignments / seeked events / decoder-frame counter delta |
| --- | --- | --- |
| Previous | 100 / 51 / 313 | 7 / 7 / 28 |
| A | 100 / 1 / 225 | 7 / 7 / 28 |
| B | 100 / 1 / 298 | 7 / 7 / 32 |

Actual page controller, 100 scroll updates through progress .44–.66:

| Metric | Before | After |
| --- | ---: | ---: |
| currentTime assignments | 100 | 9 |
| Observed DOM/SVG mutations | 3119 | 247 |
| Synchronous scroll/update median | 0.30ms | 0.20ms |
| Synchronous scroll/update p95 | 0.70ms | 0.40ms |

ScrollTrigger still directly maps the approved narrative to source time, without smoothing. Source frame index is floored at 24fps and currentTime is assigned only when it changes, with a tiny timestamp epsilon to avoid boundary ambiguity. No frames are deliberately skipped and no new frame rate is introduced. Actual page counts include asynchronous ScrollTrigger/presentation activity, hence they differ from the isolated seven-frame sweep.

The primary proven bottleneck is redundant decoder seeking during sub-frame scroll changes. Secondary avoidable work: repeated element queries and SVG writes, including invisible callouts. No per-update layout reads, React state changes, duplicate triggers, or recurring refreshes exist in application code; refreshes in benchmark scripts are test setup only.

## Quality and winner

Matching source/current/A/B frames extracted at 0.5, 1.5, 2.083333, 2.75 and 4.5s. Full images plus 640×360 crops inspected at native pixel scale. All preserve silhouettes/reflections reasonably; no obvious new block artifacts or edge blur. Full-video SSIM: current 0.998513, A 0.998185, B 0.998088.

Retain the existing all-I CRF 16 production file: candidates did not demonstrate a consistent responsiveness advantage, and retaining it guarantees zero encoding quality regression. A smaller file alone does not outrank quality/decode stability. Optimization therefore targets controller behavior rather than replacing the asset. Final file remains 3798258 bytes at `/video/veyra-craft-scrub.mp4` (SHA256 3E90FD12B7FE79644FF4352EA123AD27218314399C3167CCC1A0D1341084FE82). Temporary A/B MP4s were deleted after testing.

## Implementation

- Cache circle/line/text nodes once; cache written properties; skip unchanged styles/attributes and geometry for invisible callouts.
- Keep dynamic anchor geometry where the filmed components move; avoid rebuilding identical point strings. No annotation position/design change.
- Keep requestVideoFrameCallback as the existing frame-presentation synchronization mechanism; remove repeated media-query checks. It remains event-driven on the paused video, not a continuous ticker.
- preload none at opening (verified readyState 0); IntersectionObserver upgrades to auto two viewports before the section and loads metadata/controller there. Disconnect observer/listeners/callbacks on cleanup.
- Hero remains paused and scroll-controlled; cinematic retains native loop and visibility pause/resume. Offscreen craft receives no repeated seeks at unchanged endpoints.

## Acceptance / limits

Tested 1440×900, 1280×720, 1024×768 and 390×844 with slow/normal/fast forward and reverse sweeps plus .3→.6→.4→.75→.2 direction changes. Final callouts align with presented frames at all sizes; reduced motion stays paused at 2.083333s. No horizontal overflow or console errors. Video transforms remain none. Source/hero/cinematic hashes match prior values.

Desktop/mobile automation verifies the reduction in work, source-frame following, stable stopped states, and unchanged quality. Actual physical mobile hardware and subjective full-refresh fluidity require user review; remote compositor throttling prevents an honest claim of a measured visible-fps improvement. No dedicated mobile variant or quality reduction was used.

Build and lint passed. Changed files: src/CraftExperience.jsx and this report. Evidence images/contact crops/SSIM logs: tmp/phase-4-1. Current website screenshots: .playwright-mcp/phase-4-1-{1440,1280,1024,390}-exploded.png. No commits or pushes; stopped before Phase 5.
