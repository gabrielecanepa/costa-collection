const { configs, general } = window

const components = window.SRData?.components?.data || []
const collectionTileComponent = components.find(component => component.type === 'collectionTileV2')

const { attributes, services } = collectionTileComponent || {}

// Format currency information and add to the general configuration.
configs.currency = {
  code: general.customCurrencyCode || 'EUR',
  symbol: configs.currencyMap[general.customCurrencyCode] || '€',
}

export default { attributes, configs, services }
export { attributes, configs, services }
