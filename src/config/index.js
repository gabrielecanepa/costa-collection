import { configs, services } from '@/data'

const { hostname: costaHostname, protocol: costaProtocol } = new URL(configs.searchResultsUrl)
const costaBaseUrl = `${costaProtocol}//${costaHostname}`

const apis = {
  costa: {
    baseUrl: costaBaseUrl,
    defaultOptions: {
      mode: 'cors',
      credentials: 'omit',
      referrerPolicy: 'strict-origin-when-cross-origin',
      headers: {
        accept: 'application/json',
        cache: 'no-store',
        'content-type': 'application/json',
        country: configs.country,
        locale: configs.locale,
        referrer: costaBaseUrl,
        'sec-fetch-mode': 'cors',
      },
    },
    search: {
      path: services.urls.cruiseSearch,
      defaultParams: {
        fq: ['soldOut:(false)'],
        sort: 'departDate asc',
        group: {
          sort: 'departDate asc',
        },
      },
    },
  },
}

export { apis }
export default { apis }
