import './style.css'
import { attributes } from '@/data'

const { discoverMoreCta, subtitle, title } = attributes

const cruiseCollectionTemplate = `
  <div class="cc_collection">
    <div class="cc_collection__header">
      <div class="cc_collection__intro">
        <h2 class="cc_collection__title">${title}</h2>
        <div class="cc_collection__subtitle">${subtitle}</div>
      </div>
      <div class="cc_collection__link">
        <a href="${discoverMoreCta.url}" data-linktext="${discoverMoreCta.label}">
          <span>${discoverMoreCta.label}</span>
        </a>
      </div>
    </div>

    <div class="cc_collection__content">
      {{cruises}}
    </div>
  </div>  
`

export default cruiseCollectionTemplate
