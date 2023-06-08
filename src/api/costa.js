import { fetchResource } from '@/api'
import { apis } from '@/config'
import { mergeDeep } from '@/helpers'

const { baseUrl, defaultOptions, search } = apis.costa

const fetchCostaResource = async (path, options = {}) => {
  const opts = mergeDeep(defaultOptions, options)
  return await fetchResource(`${baseUrl}${path}`, opts)
}

export const searchCostaCruises = async options => {
  try {
    const params = mergeDeep(search.defaultParams, options.params || {})
    const opts = { ...options, params }
    const { searchResults } = await fetchCostaResource(search.path, opts)
    return searchResults
  } catch (e) {
    console.error('Error while fetching cruises\n', e)
    return []
  }
}
