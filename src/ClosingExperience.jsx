import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ClosingExperience.css'

function ClosingExperience({ onSelectCategory }) {
  const rootRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const wordmark = root.querySelector('.closing-wordmark')
      const frame = root.querySelector('.closing-frame')
      const trigger = ScrollTrigger.create({
        trigger: frame,
        start: 'top 78%',
        end: 'bottom 58%',
        scrub: 0.45,
        animation: gsap.fromTo(wordmark,
          { letterSpacing: '0.18em' },
          { letterSpacing: '-0.075em', ease: 'none' },
        ),
      })
      return () => trigger.kill()
    })
    return () => media.revert()
  }, [])

  const navigate = (event, sectionId, category) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    if (category) onSelectCategory(category)
    const section = document.getElementById(sectionId)
    if (!section) return
    section.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
      block: 'start',
    })
  }

  return (
    <section id="closing" ref={rootRef} className="closing-experience" aria-labelledby="closing-title">
      <div className="closing-frame">
        <p className="closing-folio">06 / Closing frame</p>
        <p className="closing-note">See differently.</p>
        <h2 id="closing-title" className="closing-wordmark" aria-label="VEYRA">VEYRA</h2>
        <p className="closing-index">A final study in form, light<br />and point of view.</p>
      </div>

      <footer className="closing-footer">
        <div className="closing-colophon">
          <p>VEYRA<br />Independent Eyewear Study<br />2026</p>
          <p>Concept project / 2026</p>
        </div>
        <nav className="closing-nav" aria-label="Footer">
          <a href="#collection" onClick={(event) => navigate(event, 'collection', 'sun')}>Sun</a>
          <a href="#collection" onClick={(event) => navigate(event, 'collection', 'optical')}>Optical</a>
          <a href="#collection" onClick={(event) => navigate(event, 'collection')}>Collection</a>
          <a href="#about" onClick={(event) => navigate(event, 'about')}>About</a>
          <a href="#campaign" onClick={(event) => navigate(event, 'campaign')}>Top</a>
        </nav>
      </footer>
    </section>
  )
}

export default ClosingExperience
