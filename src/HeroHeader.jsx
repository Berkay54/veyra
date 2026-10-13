// Set sectionId only after the matching section exists. Null means unavailable.
const navigation = {
  eyewear: [
    { label: 'Sun', plannedSectionId: 'sun', sectionId: 'collection', category: 'sun' },
    { label: 'Optical', plannedSectionId: 'optical', sectionId: 'collection', category: 'optical' },
  ],
  brand: [
    { label: 'Collection', plannedSectionId: 'collection', sectionId: 'collection' },
    { label: 'About', plannedSectionId: 'about', sectionId: 'about' },
  ],
}

function NavigationItem({ item, activeCategory, onSelectCategory }) {
  const props = {
    className: 'nav-item',
    'data-active': (item.category && item.category === activeCategory) || undefined,
    'data-section-id': item.plannedSectionId,
  }

  if (item.sectionId) {
    const navigate = (event) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      event.preventDefault()
      if (item.category) onSelectCategory(item.category)
      const section = document.getElementById(item.sectionId)
      if (!section) return
      const bounds = section.getBoundingClientRect()
      if (item.category && bounds.top <= 1 && bounds.bottom > 0) return
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      section.scrollIntoView({ behavior: reduce ? 'instant' : 'smooth', block: 'start' })
    }
    return <a {...props} href={`#${item.sectionId}`} onClick={navigate}>{item.label}</a>
  }

  return (
    <button
      {...props}
      type="button"
      aria-disabled="true"
      aria-label={`${item.label} — section coming soon`}
      title={`${item.label} section coming soon`}
    >
      {item.label}
    </button>
  )
}

function HeroHeader({ activeCategory, onSelectCategory }) {
  const scrollToTop = (event) => {
    // Preserve normal link behavior for modified clicks and new tabs.
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'instant' : 'smooth' })
  }

  return (
    <header className="hero-header">
      <a className="brand" href="#campaign" onClick={scrollToTop} aria-label="VEYRA home">VEYRA</a>
      <nav className="primary-nav" aria-label="Eyewear">
        {navigation.eyewear.map((item) => <NavigationItem key={item.plannedSectionId} item={item} activeCategory={activeCategory} onSelectCategory={onSelectCategory} />)}
      </nav>
      <nav className="secondary-nav" aria-label="Brand">
        {navigation.brand.map((item) => <NavigationItem key={item.plannedSectionId} item={item} activeCategory={activeCategory} onSelectCategory={onSelectCategory} />)}
      </nav>
    </header>
  )
}

export default HeroHeader
