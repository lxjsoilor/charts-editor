import Cookies from 'js-cookie'

export function getSymbol(key) {
  return Cookies.get(key)
}

export function setSymbol(key, value) {
  return Cookies.set(key, value)
}

export function removeSymbol(key) {
  return Cookies.remove(key)
}
