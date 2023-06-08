import './style.css'
import { attributes, configs } from '@/data'
import { formatDate, formatNumber, pick, resolvePlaceholder } from '@/helpers'
import { klarnaBadgeTemplate } from '@/templates'

const { departDateFormat, hscLabels, labels } = attributes
const { currency } = configs

const cruiseCardTemplate = `
  <div class="cc_cruise-card">
    <a class="cc_cruise-card__body" href="{{cruisePath}}">
      <div class="cc_cruise-card__body-header">
        <div class="cc_cruise-card__image">
          <img src="{{imagePath}}.image.620.460.low.jpg" />
        </div>
        <div class="cc_cruise-card__days">
          <div>{{duration}}</div>
          <div>${labels.days}</div>
        </div>
      </div>
      <div class="cc_cruise-card__content">
        <h3>
          <span class="cc_cruise-card__title">
            <strong>{{destinationName}}</strong>
          </span>
          <span class="cc_cruise-card__description">
            ${resolvePlaceholder(labels.fromDeparturePortLabel, { portName: '{{departurePortName}}' })}
          </span>
        </h3>
        <div class="cc_cruise-card__departures">
          <div>${resolvePlaceholder(labels.departurePluralLabel, { departuresNumber: '{{departuresNumber}}' })}</div>
          <div>{{departureDate}}</div>
        </div>
      </div>
    </a>
    <div class="cc_cruise-card__footer">
      <div class="cc_cruise-card__price">
        <div class="cc_cruise-card__price-label">${labels.priceLabel}</div>
        <div class="cc_cruise-card__price-value">
          <span tabindex="-1" aria-label="${currency.symbol}{{price}}">
            <i class="cc_cruise-card__price-currency">${currency.symbol}</i>
            {{price}}
          </span>
        </div>
      </div>
      {{klarnaBadge}}
      <div class="cc_cruise-card__legal">
        {{legal}}
      </div>
    </div>
  </div>
`

const getCruiseCardTemplate = cruise => {
  const {
    _index,
    cruiseId,
    departureDate,
    departuresNumber = 12, // TODO
    departurePortName,
    destinationName,
    duration,
    itineraryId,
    price_EUR_anonymous: price,
    portImages,
    serviceCharges, // TODO
  } = cruise

  const cruisePath = `/cruises/${itineraryId}/${cruiseId.split('_')[0]}.html`
  const { imagePath } = pick(portImages) // use random image

  const legalLabel = _index === 0 ? hscLabels.notIncludedLabel : hscLabels.includedLabel
  const legal = resolvePlaceholder(legalLabel, {
    'serviceCharges.adultAmount': `${currency.symbol}{{serviceChargesAdult}}`,
    'serviceCharges.childAmount': `${currency.symbol}{{serviceChargesChild}}`,
  })

  return resolvePlaceholder(cruiseCardTemplate, {
    _isFirst: _index === 0,
    cruisePath,
    departureDate: formatDate(departureDate, departDateFormat),
    departuresNumber,
    departurePortName,
    destinationName,
    duration,
    imagePath,
    klarnaBadge: _index === 0 ? klarnaBadgeTemplate : '',
    legal,
    price: formatNumber(price),
    serviceChargesAdult: serviceCharges[0].adultAmount,
    serviceChargesChild: serviceCharges[0].childAmount,
  })
}

export default cruiseCardTemplate
export { getCruiseCardTemplate }
