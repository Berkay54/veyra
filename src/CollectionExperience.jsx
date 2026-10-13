import './CollectionExperience.css'
import { collectionProducts } from './collectionProducts'
import { useRef } from 'react'
import { useProductTilt } from './useProductTilt'

// Editorial worlds and concept product IDs share the existing selection state.
const eyewearWorlds = [
  {
    id: 'sun', label: 'Sun', index: '01',
    statement: ['Light,', 'held in form.'],
    description: ['Sculpted silhouettes', 'for changing light.'],
  },
  {
    id: 'optical', label: 'Optical', index: '02',
    statement: ['Clarity,', 'given shape.'],
    description: ['Precision frames', 'for everyday perspective.'],
  },
]

function CollectionExperience({ activeCategory, onSelectCategory }) {
  const sectionRef = useRef(null)
  useProductTilt(sectionRef, activeCategory)
  const active = eyewearWorlds.find((world) => world.id === activeCategory)
  return (
    <section ref={sectionRef} id="collection" className="collection-experience" data-world={activeCategory} aria-labelledby="collection-title">
      <header className="collection-heading">
        <h2 id="collection-title">03 / Collection</h2>
        <p>VEYRA / Eyewear 2026</p>
      </header>
      <div className="collection-index">
        <div className="world-selectors" role="group" aria-label="Choose an eyewear world">
          {eyewearWorlds.map((world) => (
            <button key={world.id} type="button" className={`world-selector world-selector-${world.id}`}
              aria-pressed={activeCategory === world.id} aria-controls="world-editorial"
              onClick={() => onSelectCategory(world.id)}>
              <span className="world-number">{world.index}</span>
              <span className="world-name">{world.label}</span>
              <span className="world-selection">{activeCategory === world.id ? 'Selected' : 'Explore'}</span>
            </button>
          ))}
        </div>
        <div id="world-editorial" className="world-editorial" aria-live="polite" aria-atomic="true">
          <div key={active.id} className="world-copy">
            <p className="world-caption">{active.label} / {active.index}</p>
            <p className="world-statement"><span>{active.statement[0]}</span><em>{active.statement[1]}</em></p>
            <p className="world-description">{active.description[0]}<br />{active.description[1]}</p>
          </div>
        </div>
        <span className="collection-axis" aria-hidden="true" />
        {eyewearWorlds.map((world) => (
          <ol key={world.id} className="product-composition" role="list"
            data-active={activeCategory === world.id}
            aria-label={`${world.label} frame studies`} aria-hidden={activeCategory !== world.id}
            inert={activeCategory !== world.id}>
            {collectionProducts.filter((product) => product.category === world.id).map((product, index) => (
              <li key={product.id} className={`product-plate product-plate-${index + 1}`}>
                <figure>
                  <div className="product-visual">
                    <img src={product.image} srcSet={`${product.imageSmall} 720w, ${product.image} 1200w`}
                      sizes={index === 0 ? '(max-width: 600px) 90vw, 48vw' : index === 1 ? '(max-width: 600px) 80vw, 30vw' : '(max-width: 600px) 90vw, 44vw'}
                      width={product.width} height={product.height} alt={product.alt}
                      loading={index === 0 && activeCategory === world.id ? 'eager' : 'lazy'} decoding="async" />
                  </div>
                  <figcaption className="product-caption">
                    <span className="product-counter" aria-hidden="true">V / {String(index + 1).padStart(2, '0')}</span>
                    <div>
                      <h3>{product.name} {product.model}</h3>
                      <p>{product.material}<br />{product.lens}</p>
                    </div>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ol>
        ))}
      </div>
    </section>
  )
}

export default CollectionExperience
