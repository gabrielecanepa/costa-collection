import { configs, services } from '@/data'

const apis = {
  costa: {
    baseUrl: 'https://www.costacrociere.it',
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
        'sec-fetch-mode': 'cors',
      },
    },
    search: {
      path: services.urls.cruiseSearch,
      defaultParams: {
        fq: [
          '(price_EUR_anonymous:[1 TO *])',
          'soldOut:(false)',
        ],
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
