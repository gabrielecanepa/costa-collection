import { searchCostaCruises } from '@/api/costa'
import { toQueryParams } from '@/helpers'

export const fetchResource = async (input, options = {}) => {
  let url = input

  const { params, ...opts } = options
  const queryParams = toQueryParams(params)
  if (queryParams) url = `${url}?${queryParams}`

  const response = await fetch(url, opts)
  return await response.json()
}

export { searchCostaCruises }
