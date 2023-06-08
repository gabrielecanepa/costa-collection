import './style.css'
import { attributes } from '@/data'
import { resolvePlaceholder } from '@/helpers'

const { klarnaConfig } = attributes

const klarnaBadgeTemplate = `
  <div class="cc_klarna-badge">
    <span class="cc_klarna-badge__label">
      ${resolvePlaceholder(klarnaConfig.message, {
        installmentQuantity: klarnaConfig.installmentsQuantity,
        klarnaLogo: `<img class="cc_klarna-badge__logo" src="${klarnaConfig.srcImage}">`,
      })}
    </span>
    <div class="cc_klarna-badge__btn-wrapper">
      <button class="cc_klarna-badge__btn"></button>
    </div>
  </div>
`

export default klarnaBadgeTemplate
