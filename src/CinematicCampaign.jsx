import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './CinematicCampaign.css'

function CinematicCampaign() {
  const stageRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    const media = gsap.matchMedia()
    let trigger

    const pause = () => video.pause()
    const play = () => {
      if (document.hidden) return
      // Native, muted looping. Visibility changes never reset the film.
      video.play().catch(() => {
        // An older play request may be cancelled by a quick leave/re-entry.
        if (!trigger?.isActive || document.hidden) pause()
      })
    }
    const handleVisibility = () => {
      if (document.hidden) pause()
      else if (trigger?.isActive) play()
    }

    video.pause()
    document.addEventListener('visibilitychange', handleVisibility)

    media.add('(prefers-reduced-motion: no-preference)', () => {
      trigger = ScrollTrigger.create({
        trigger: stageRef.current,
        start: 'top 15%',
        end: 'bottom 15%',
        onEnter: play,
        onEnterBack: play,
        onLeave: pause,
        onLeaveBack: pause,
      })
      // Also handle a restored scroll position inside this chapter.
      if (trigger.isActive) play()

      return () => {
        trigger.kill()
        trigger = undefined
        pause()
      }
    })

    return () => {
      media.revert()
      document.removeEventListener('visibilitychange', handleVisibility)
      pause()
    }
  }, [])

  return (
    <>
      <section className="cinematic-chapter" aria-labelledby="cinematic-title">
        <div className="cinematic-handoff" aria-hidden="true" />

        <div ref={stageRef} className="cinematic-stage">
          <div className="cinematic-scene">
            <span className="chapter-folio" aria-hidden="true">02</span>
            <p className="chapter-label"><span>02</span><span className="chapter-descriptor"> / Campaign</span></p>
            <h2 id="cinematic-title" className="chapter-heading">
              <span>Beyond</span><em>the frame.</em>
            </h2>
            <div className="cinematic-film">
            <video
              ref={videoRef}
              className="cinematic-video"
              src="/video/veyra-cinematic.mp4"
              preload="metadata"
              playsInline
              muted
              loop
              aria-label="VEYRA campaign film. A close study of black eyewear in light and perspective."
            />
            <div className="film-notation" aria-hidden="true">
              <span>VEYRA / Film study 02</span>
            </div>
            <p className="film-properties">05.04 sec <span aria-hidden="true">—</span> 24 fps</p>
            </div>
            <p className="chapter-note">A study in proportion,<br />light and perspective.</p>
            <p className="chapter-metadata">VEYRA / 2026</p>
          </div>
        </div>
      </section>
    </>
  )
}

export default CinematicCampaign
