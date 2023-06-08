import { searchCostaCruises } from '@/api'
import { renderTemplate } from '@/helpers'
import { getCruiseCardTemplate, cruiseCollectionTemplate } from '@/templates'

const ITINERARY_IDS = process.env.CC_ITINERARY_IDS?.split(',') || []

if (!ITINERARY_IDS.length) throw new Error('Missing itinerary ids')
  
const params = {
  fq: [`itineraryId:(\\${ITINERARY_IDS.join(' OR ')})`],
  rows: ITINERARY_IDS.length,
}
  
;(async () => {
  const cruises = await searchCostaCruises({ params })
  const cruisesWithIndex = cruises.map((cruise, _index) => ({ ...cruise, _index }))
  const cruisesTemplate = cruisesWithIndex.map(getCruiseCardTemplate).join('')

  renderTemplate('.content-wrapper', cruiseCollectionTemplate, { cruises: cruisesTemplate })
})()
