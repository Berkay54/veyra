import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './PerspectiveExperience.css'

const photographs = [
  { id: 'portrait', width: 1024, height: 1536, label: '01 / Portrait', alt: 'A man in plain black acetate sunglasses and charcoal tailoring in a sunlit limestone courtyard.', sizes: '(max-width: 600px) 90vw, (max-width: 1100px) 60vw, 56vw' },
  { id: 'detail', width: 1536, height: 1024, label: '02 / Detail', alt: 'Close study of black acetate, smoke lenses reflecting architecture, an unmarked temple, and sunlit skin.', sizes: '(max-width: 600px) 82vw, (max-width: 1100px) 35vw, 32vw' },
  { id: 'environment', width: 1536, height: 1024, label: '03 / Perspective', alt: 'The same model stands among limestone piers and long afternoon shadows, with open architectural space around him.', sizes: '(max-width: 600px) 190vw, 82vw' },
]
const imageProps = (photo) => ({
  src: `/images/perspective/${photo.id}-${photo.width}.webp`,
  srcSet: `/images/perspective/${photo.id}-640.webp 640w, ${photo.id === 'environment' ? '/images/perspective/environment-960.webp 960w, ' : ''}/images/perspective/${photo.id}-${photo.width}.webp ${photo.width}w`,
  sizes: photo.sizes, width: photo.width, height: photo.height,
  loading: 'lazy', decoding: 'async',
})

export default function PerspectiveExperience() {
  const rootRef = useRef(null)
  useEffect(() => {
    const root = rootRef.current
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const mobile = window.matchMedia('(max-width: 600px)')
    let dispose = () => {}
    const configure = () => {
      dispose()
      let active = true
      root.dataset.arrivals = preference.matches ? 'static' : 'active'
      const context = gsap.context(() => {}, root)
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(async ({ target: figure, isIntersecting }) => {
          if (!isIntersecting) return
          observer.unobserve(figure)
          const images = [...figure.querySelectorAll('img')]
          images.forEach((image) => { image.loading = 'eager' })
          try { await Promise.all(images.map((image) => image.decode())) } catch { return }
          if (!active || preference.matches) return
          context.add(() => {
            const field = figure.querySelector('.perspective-photo')
            const plane = figure.querySelector('.perspective-image-plane')
            const kind = figure.dataset.photo
            const statement = figure.querySelector('.perspective-statement')
            const motion = kind === 'portrait' ? 28 : kind === 'detail' ? 20 : 16
            let width, height
            const measure = () => { width = field.clientWidth; height = field.clientHeight }
            measure()
            // The mask's leading margin follows the translated image edge.
            // This supplies counter-motion without overscan, zoom or blank strips.
            const initial = () => {
              const offset = motion / (kind === 'portrait' ? height : width) * 100
              return kind === 'portrait'
                ? `polygon(0% ${offset}%, 100% ${offset}%, 100% ${offset}%, 0% ${offset}%)`
                : `polygon(${offset}% 0%, ${offset}% 0%, ${offset}% 100%, ${offset}% 100%)`
            }
            const intermediate = () => {
              const offset = motion * (kind === 'portrait' ? .35 : .3) / (kind === 'portrait' ? height : width) * 100
              return kind === 'portrait'
                ? `polygon(0% ${offset}%, 100% ${offset}%, 100% ${62 + offset}%, 0% ${69 + offset}%)`
                : `polygon(${offset}% 0%, 68% 0%, 56% 100%, ${offset}% 100%)`
            }
            const complete = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
            const positions = mobile.matches
              ? { portrait: ['top 88%', 'top 52%'], detail: ['top 90%', 'top 55%'], environment: ['top 94%', 'top 50%'] }
              : { portrait: ['top 68%', 'top 14%'], detail: ['top 88%', 'top 30%'], environment: ['top 92%', 'top 14%'] }
            const timing = mobile.matches ? .3 : kind === 'portrait' ? .45 : kind === 'detail' ? .35 : .5
            const arrival = gsap.timeline({ scrollTrigger: {
              trigger: field, start: positions[kind][0], end: positions[kind][1],
              scrub: timing, invalidateOnRefresh: true, onRefreshInit: measure,
            } })
            if (kind === 'detail') arrival.fromTo(field, { clipPath: initial }, { clipPath: complete, duration: 1, ease: 'none' }, 0)
            else {
              const split = kind === 'portrait' ? .65 : .7
              arrival.fromTo(field, { clipPath: initial }, { clipPath: intermediate, duration: split, ease: 'none' }, 0)
                .to(field, { clipPath: complete, duration: 1 - split, ease: 'none' }, split)
            }
            arrival.fromTo(plane, kind === 'portrait' ? { y: motion } : { x: motion }, {
              x: 0, y: 0, duration: 1, ease: 'none',
            }, 0)
            if (statement) arrival.fromTo(statement, { opacity: 0, y: 10 }, {
              opacity: 1, y: 0, duration: .18, ease: 'none',
            }, .82)
            const clear = figure.querySelector('.perception-clear')
            if (clear) gsap.fromTo(clear, { clipPath: 'inset(15% 39% 20% 9% round 24% 22% 26% 21%)' }, {
              clipPath: 'inset(15% 10% 20% 38% round 24% 22% 26% 21%)', ease: 'none',
              scrollTrigger: { trigger: figure, start: 'top 60%', end: 'bottom 20%', scrub: true },
            })
          })
        })
      }, { rootMargin: '300% 0px' })
      root.querySelectorAll('.perspective-figure').forEach((figure) => observer.observe(figure))
      dispose = () => { active = false; observer.disconnect(); context.revert() }
    }
    configure()
    preference.addEventListener('change', configure)
    mobile.addEventListener('change', configure)
    return () => { preference.removeEventListener('change', configure); mobile.removeEventListener('change', configure); dispose() }
  }, [])

  return (
    <section id="about" className="perspective-experience" ref={rootRef} data-arrivals="pending" aria-labelledby="perspective-title">
      <div className="perspective-handoff" aria-hidden="true" />
      <div className="perspective-story">
        <header className="perspective-heading"><p>05 / Perspective</p><p>VEYRA / 2026</p></header>
        <div className="perspective-intro">
          <h2 id="perspective-title">Through VEYRA</h2>
          <p>Designed not to change the face,<br /><em>but the way the world is framed.</em></p>
        </div>
        {photographs.map((photo) => (
          <figure className={`perspective-figure perspective-${photo.id}`} data-photo={photo.id} key={photo.id}>
            <div className="perspective-photo">
              <div className="perspective-image-plane">
              <img {...imageProps(photo)} alt={photo.alt} className={photo.id === 'detail' ? 'perception-base' : undefined} />
              {photo.id === 'detail' && <img {...imageProps(photo)} alt="" aria-hidden="true" className="perception-clear" />}
              </div>
            </div>
            <figcaption>{photo.label}{photo.id === 'detail' && <span>Through the lens</span>}</figcaption>
            {photo.id === 'environment' && <h3 className="perspective-statement"><span>A different</span><em>point of view.</em></h3>}
          </figure>
        ))}
        <div className="perspective-identity"><p>VEYRA<br />Independent Eyewear Study<br />2026</p><p>Objects for seeing differently.<span>Fictional portfolio brand</span></p></div>
      </div>
    </section>
  )
}
