export const setItem = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value) || '')
}

export const getItem = (key) => {
  return JSON.parse(window.localStorage.getItem(key))
}

export const removeItem = (key) => {
  window.localStorage.removeItem(key)
}

export const getToken = () => {
  return getItem('token')
}

export const setToken = (value) => {
  setItem('token', value)
}
