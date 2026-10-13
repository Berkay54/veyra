import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './CraftExperience.css'

// Source-composition coordinates, measured from the supplied film.
const studies = [
  { label: 'Frame', end: [300, 150], anchors: [[580, 295], [565, 240], [550, 220]] },
  { label: 'Lens', end: [235, 490], anchors: [[546, 410], [505, 408], [500, 420]] },
  { label: 'Temple', end: [1000, 210], anchors: [[825, 282], [820, 282], [810, 290]] },
]
const beats = [[0, 0], [.15, .9], [.43, 1.95], [.70, 2.2], [.90, 3.35], [1, 5.04]]
const clamp = (value) => Math.max(0, Math.min(1, value))
const filmFps = 24
function filmTime(progress) {
  const index = beats.findIndex(([p]) => p >= progress)
  if (index <= 0) return 0
  const [start, from] = beats[index - 1]
  const [end, to] = beats[index]
  return from + ((progress - start) / (end - start)) * (to - from)
}
function position(anchors, time) {
  const times = [1.95, 2.083333, 2.2]
  const index = time <= times[1] ? 0 : 1
  const amount = clamp((time - times[index]) / (times[index + 1] - times[index]))
  return anchors[index].map((value, axis) => value + (anchors[index + 1][axis] - value) * amount)
}

export default function CraftExperience() {
  const rootRef = useRef(null)
  const videoRef = useRef(null)
  useEffect(() => {
    const root = rootRef.current
    const video = videoRef.current
    const media = gsap.matchMedia()
    const groups = [...root.querySelectorAll('.craft-callout')].map((group) => ({
      circle: group.querySelector('circle'),
      line: group.querySelector('polyline'),
      label: group.querySelector('.craft-label'),
      number: group.querySelector('.craft-mobile-number'),
    }))
    const intro = root.querySelector('.craft-intro')
    const closing = root.querySelector('.craft-closing')
    const legend = root.querySelector('.craft-legend')
    let progress = 0
    let presentedTime = 0
    let frameRequest
    let targetFrame = -1
    let reducedMotion = false
    const values = new WeakMap()
    const write = (element, property, value, attribute = false) => {
      const cached = values.get(element) || {}
      if (cached[property] === value) return
      if (attribute) element.setAttribute(property, value)
      else element.style[property] = value
      cached[property] = value
      values.set(element, cached)
    }
    const draw = (p, time, staticView = false) => {
      write(intro, 'opacity', staticView ? 1 : 1 - clamp((p - .12) / .15))
      write(closing, 'opacity', staticView ? 0 : clamp((p - .9) / .06))
      write(legend, 'opacity', staticView ? 1 : clamp((p - .48) / .06) * (1 - clamp((p - .65) / .04)))
      const frameMatches = Math.abs(time - filmTime(p)) < .085
      groups.forEach((group, i) => {
        const start = .44 + i * .018
        const end = .70 - (2 - i) * .018
        const envelope = (offset) => staticView ? 1 : frameMatches ? clamp((p - start - offset) / .012) * (1 - clamp((p - end + offset + .012) / .012)) : 0
        const anchorOpacity = envelope(0)
        const lineOpacity = envelope(.012)
        const labelOpacity = envelope(.026)
        write(group.circle, 'opacity', anchorOpacity)
        write(group.line, 'opacity', lineOpacity)
        write(group.line, 'strokeDashoffset', 1 - lineOpacity)
        write(group.label, 'opacity', labelOpacity)
        write(group.number, 'opacity', labelOpacity)
        if (!anchorOpacity && !lineOpacity && !labelOpacity) return
        const [x, y] = position(studies[i].anchors, time)
        const [ex, ey] = studies[i].end
        write(group.circle, 'cx', x, true)
        write(group.circle, 'cy', y, true)
        write(group.line, 'points', `${x},${y} ${ex + (x > ex ? 90 : -90)},${ey} ${ex},${ey}`, true)
        write(group.number, 'x', x + 14, true)
        write(group.number, 'y', y - 12, true)
      })
    }
    const setup = () => {
      video.pause()
      media.add({ full: '(prefers-reduced-motion: no-preference)', reduced: '(prefers-reduced-motion: reduce)' }, (context) => {
        reducedMotion = context.conditions.reduced
        targetFrame = -1
        if (reducedMotion) {
          video.currentTime = 2.083333
          draw(.56, 2.083333, true)
          return
        }
        const update = (trigger) => {
          progress = trigger.progress
          const time = Math.min(filmTime(progress), video.duration - .001)
          // Preserve the source frame selected by the existing mapping. Tiny
          // within-frame scroll changes must not restart the decoder's seek.
          const frame = Math.floor(time * filmFps)
          if (frame !== targetFrame) {
            targetFrame = frame
            video.currentTime = (frame + .0001) / filmFps
          }
          draw(progress, video.requestVideoFrameCallback ? presentedTime : time)
        }
        const trigger = ScrollTrigger.create({
          trigger: root, start: 'top top',
          end: () => `+=${root.offsetHeight - root.querySelector('.craft-stage').offsetHeight}`,
          onUpdate: update, onRefresh: update,
        })
        update(trigger)
        return () => trigger.kill()
      })
    }
    // Refresh anchors when the requested frame has finished decoding.
    const decoded = () => {
      if (!video.requestVideoFrameCallback && !reducedMotion) draw(progress, video.currentTime)
    }
    // Paused video invokes this only when a decoded frame is presented.
    // It does not run a continuous animation loop or drive media playback.
    const presented = (_now, metadata) => {
      presentedTime = metadata.mediaTime
      if (!reducedMotion) draw(progress, presentedTime)
      frameRequest = video.requestVideoFrameCallback(presented)
    }
    if (video.requestVideoFrameCallback) frameRequest = video.requestVideoFrameCallback(presented)
    video.addEventListener('seeked', decoded)
    if (video.readyState >= 1) setup()
    else video.addEventListener('loadedmetadata', setup, { once: true })
    // Prepare two viewports ahead without competing with the opening films.
    const prepare = () => {
      video.preload = 'auto'
      if (video.readyState === 0) video.load()
    }
    const proximity = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        prepare()
        proximity.disconnect()
      }
    }, { rootMargin: '200% 0px' })
    proximity.observe(root)
    return () => {
      proximity.disconnect()
      video.removeEventListener('loadedmetadata', setup)
      video.removeEventListener('seeked', decoded)
      if (frameRequest !== undefined) video.cancelVideoFrameCallback(frameRequest)
      media.revert()
      video.pause()
    }
  }, [])

  return (
    <section id="craft" ref={rootRef} className="craft-experience" aria-labelledby="craft-title">
      <div className="craft-stage">
        <div className="craft-composition">
          <video ref={videoRef} src="/video/veyra-craft-scrub.mp4" poster="/images/veyra-craft-exploded.webp"
            preload="none" muted playsInline aria-label="Eyewear construction film. Scroll to separate and reassemble the object." />
          <svg className="craft-annotations" viewBox="0 0 1280 720" aria-hidden="true">
            {studies.map((study, i) => (
              <g className="craft-callout" key={study.label}>
                <circle r="3" />
                <polyline pathLength="1" strokeDasharray="1" strokeDashoffset="1" />
                <text className="craft-label" x={study.end[0]} y={study.end[1] - 16} textAnchor={i === 2 ? 'end' : 'start'}>
                  {String(i + 1).padStart(2, '0')} / {study.label.toUpperCase()}
                </text>
                <text className="craft-mobile-number">{String(i + 1).padStart(2, '0')}</text>
              </g>
            ))}
          </svg>
        </div>
        <p className="craft-folio">04 / Construction</p>
        <div className="craft-intro">
          <h2 id="craft-title">Anatomy of an object</h2>
          <p>Designed as a whole.<br /><em>Considered in parts.</em></p>
        </div>
        <ol className="craft-legend" aria-label="Construction study">
          {studies.map((study, i) => <li key={study.label}><span aria-hidden="true">0{i + 1}</span>{study.label}</li>)}
        </ol>
        <p className="craft-closing">Built as an object.<br /><em>Worn as a point of view.</em></p>
        <p className="craft-signature" aria-hidden="true">VEYRA / Object study 04</p>
      </div>
    </section>
  )
}
