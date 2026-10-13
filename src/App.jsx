import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'
import CinematicCampaign from './CinematicCampaign'
import HeroHeader from './HeroHeader'
import CollectionExperience from './CollectionExperience'
import CraftExperience from './CraftExperience'
import PerspectiveExperience from './PerspectiveExperience'
import ClosingExperience from './ClosingExperience'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const sectionRef = useRef(null)
  const heroRef = useRef(null)
  const videoRef = useRef(null)
  const [activeCategory, setActiveCategory] = useState('sun')

  useEffect(() => {
    const video = videoRef.current
    const media = gsap.matchMedia()

    const setup = () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) return

      video.pause()
      media.add(
        {
          reduceMotion: '(prefers-reduced-motion: reduce)',
          fullMotion: '(prefers-reduced-motion: no-preference)',
        },
        (context) => {
          if (context.conditions.reduceMotion) {
            video.currentTime = 0
            return
          }

          const seek = (trigger) => {
            // Stay just inside the media timeline to display the final frame.
            const targetTime = Math.min(
              trigger.progress * video.duration,
              Math.max(0, video.duration - 0.001),
            )
            if (video.currentTime !== targetTime) video.currentTime = targetTime
          }

          const trigger = ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top top',
            end: () => `+=${sectionRef.current.offsetHeight - heroRef.current.offsetHeight}`,
            onUpdate: seek,
            onRefresh: seek,
          })
          seek(trigger)

          return () => trigger.kill()
        },
      )
    }

    // Handle both a cached video and metadata that arrives after mount.
    if (video.readyState >= 1) setup()
    else video.addEventListener('loadedmetadata', setup, { once: true })

    return () => {
      video.removeEventListener('loadedmetadata', setup)
      media.revert()
      video.pause()
    }
  }, [])

  // Observe the approved trigger; typography never changes the scrub engine.
  useEffect(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const campaign = heroRef.current.querySelector('.campaign')
      const cue = heroRef.current.querySelector('.scroll-cue')
      const setCampaignOpacity = gsap.quickSetter(campaign, 'opacity')
      const setCueOpacity = gsap.quickSetter(cue, 'opacity')
      let previousProgress = -1

      const updateTypography = () => {
        const trigger = ScrollTrigger.getAll().find(
          (item) => item.trigger === sectionRef.current,
        )
        if (!trigger || trigger.progress === previousProgress) return
        previousProgress = trigger.progress
        setCampaignOpacity(1 - gsap.utils.clamp(0, 1, (previousProgress - 0.03) / 0.19))
        setCueOpacity(1 - gsap.utils.clamp(0, 1, previousProgress / 0.14))
      }

      gsap.ticker.add(updateTypography)
      return () => {
        gsap.ticker.remove(updateTypography)
        gsap.set([campaign, cue], { clearProps: 'opacity' })
      }
    })
    return () => media.revert()
  }, [])

  return (
    <main>
      <section ref={sectionRef} id="campaign" className="hero-scroll" aria-label="VEYRA sunglasses campaign">
        <div ref={heroRef} className="hero">
          <video
            ref={videoRef}
            className="hero-video"
            src="/video/veyra-hero-scrub.mp4"
            preload="auto"
            playsInline
            muted
            aria-label="VEYRA sunglasses in a studio. Scroll to explore the product motion."
          />
          <HeroHeader activeCategory={activeCategory} onSelectCategory={setActiveCategory} />

          <div className="campaign">
            <p className="eyebrow">Eyewear / 2026</p>
            <h1><span>Form follows</span><em>vision.</em></h1>
          </div>

          <div className="hero-caption">
            <p>Designed for<br />another point of view.</p>
          </div>
          <p className="scroll-cue" aria-hidden="true">
            <span>Scroll</span>
            <span>to explore</span>
          </p>
        </div>
      </section>
      <CinematicCampaign />
      <CollectionExperience activeCategory={activeCategory} onSelectCategory={setActiveCategory} />
      <CraftExperience />
      <PerspectiveExperience />
      <ClosingExperience onSelectCategory={setActiveCategory} />
    </main>
  )
}

export default App
