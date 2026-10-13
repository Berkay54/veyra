import { useEffect } from 'react'

// Pointer feedback only: no render state, ticker, or scroll animation.
export function useProductTilt(sectionRef, activeCategory) {
  useEffect(() => {
    const media = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)')
    let dispose = () => {}

    const configure = () => {
      dispose()
      if (!media.matches) return

      const cleanups = [...sectionRef.current.querySelectorAll('.product-composition[data-active="true"] .product-plate')].map((plate) => {
        const field = plate.querySelector('.product-visual')
        const image = field.querySelector('img')
        let bounds
        let entered = false
        const invalidate = () => { bounds = undefined }
        const track = (event) => {
          if (!entered || event.pointerType === 'touch') return
          bounds ||= field.getBoundingClientRect()
          const x = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width) * 2 - 1))
          const y = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height) * 2 - 1))
          image.style.transform = `translateY(-10px) rotateX(${-y * 1.5}deg) rotateY(${x * 5}deg)`
        }
        const enter = (event) => {
          if (event.pointerType === 'touch') return
          entered = true
          invalidate()
          image.dataset.tracking = 'true'
          track(event)
        }
        const leave = () => {
          entered = false
          delete image.dataset.tracking
          image.style.transform = 'translateY(0px) rotateX(0deg) rotateY(0deg)'
        }
        plate.addEventListener('pointerenter', enter)
        plate.addEventListener('pointermove', track)
        plate.addEventListener('pointerleave', leave)
        plate.addEventListener('pointercancel', leave)
        window.addEventListener('scroll', invalidate, { passive: true })
        window.addEventListener('resize', invalidate, { passive: true })
        return () => {
          plate.removeEventListener('pointerenter', enter)
          plate.removeEventListener('pointermove', track)
          plate.removeEventListener('pointerleave', leave)
          plate.removeEventListener('pointercancel', leave)
          window.removeEventListener('scroll', invalidate)
          window.removeEventListener('resize', invalidate)
          delete image.dataset.tracking
          image.style.removeProperty('transform')
        }
      })
      dispose = () => cleanups.forEach((cleanup) => cleanup())
    }
    configure()
    media.addEventListener('change', configure)
    return () => {
      media.removeEventListener('change', configure)
      dispose()
    }
  }, [sectionRef, activeCategory])
}
