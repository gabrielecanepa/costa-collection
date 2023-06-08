import moment from 'moment'
import { configs } from '@/data'

// Number
export const formatNumber = (price, options = {}) => {
  const locale = configs.locale.replace('_', '-')
  return new Intl.NumberFormat(locale, options).format(price)
}

// Strings
export const resolvePlaceholder = (string, placeholders = {}, opts = { open: '{{', close: '}}' }) => {
  let resolvedString = string
  const keys = Object.keys(placeholders)

  for (const key of keys) {
    const value = placeholders[key]
    resolvedString = resolvedString.replaceAll(`${opts.open}${key}${opts.close}`, value)
  }

  return resolvedString
}

// Objects
export const isArray = item => Array.isArray(item)
export const isObject = item => item && typeof item === 'object' && !isArray(item)

export const mergeDeep = (obj1, obj2) => {
  if (!(isArray(obj1) && isArray(obj2)) && !(isObject(obj1) && isObject(obj2))) {
    throw new Error('[mergeDeep] both arguments must be either arrays or objects')
  }

  if (isArray(obj1)) return [...obj1, ...obj2]

  if (isObject(obj1)) {
    const keys = [...Object.keys(obj1), ...Object.keys(obj2)]

    return keys.reduce((obj, key) => {
      const value1 = obj1[key]
      const value2 = obj2[key]

      if ((isArray(value1) && isArray(value2)) || (isObject(value1) && isObject(value2))) {
        return { ...obj, [key]: mergeDeep(value1, value2) }
      }
      return { ...obj, [key]: value2 || value1 }
    }, {})
  }
}

export const toDotNotation = (object, previousKey = '') => {
  return Object.keys(object).reduce((acc, key) => {
    const v = object[key]
    const k = previousKey ? `${previousKey}.${key}` : key

    if (isObject(v)) return { ...acc, ...toDotNotation(v, key) }
    if (isArray(v) && v.some(el => isArray(el) || isObject(el))) {
      return { ...acc, [k]: v.map(item => toDotNotation(item, key)) }
    }

    return { ...acc, [k]: v }
  }, {})
}

export const toQueryParams = (params = {}, dotNotation = true) => {
  const parsedParams = dotNotation ? toDotNotation(params) : params

  const queryParams = Object.keys(parsedParams).reduce((acc, key) => {
    const value = parsedParams[key]
    
    if (isObject(value)) return { ...acc, [key]: toQueryParams(value) }

    if (isArray(value) && value.some(el => isArray(el) || isObject(el))) {
      return { ...acc, [k]: value.map(item => toQueryParams(item)) }
    }

    return { ...acc, [key]: value }
  }, {})

  return Object.keys(queryParams).reduce((acc, key) => {
    const value = queryParams[key]
    if (isArray(value)) return `${acc}${value.map(v => `&${key}=${v}`).join('')}`
    return `${acc}&${key}=${value}`
  }, '')
}

export const pick = array => array[Math.floor(Math.random() * array.length)]

// Date
export const formatDate = (date, format, locale) => {
  const configsLocale = configs.locale?.includes('_')
    ? configs.locale.split('_')[0]
    : configs.locale
  const momentLocale = locale || configsLocale

  if (!momentLocale) return moment(date).format(format)
  
  return moment(date).locale(momentLocale).format(format)
}

// DOM
export const renderTemplate = (container, template, placeholders = {}) => {
  const containerEl = typeof container === 'string' ? document.querySelector(container) : container
  const wrapperEl = document.createElement('div')

  wrapperEl.innerHTML = resolvePlaceholder(template, placeholders)
  containerEl.appendChild(wrapperEl.firstElementChild)
}

// Utils
export const logDev = (...args) => {
  if (process.env.NODE_ENV !== 'development') return

  // eslint-disable-next-line no-console
  console.log(
    '====================== CC_DEV ======================\n',
    ...args,
    '\n====================================================',
  )
}
