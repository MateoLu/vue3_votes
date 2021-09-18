// 存储
export const setItem = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value) || '')
}

// 获取
export const getItem = (key) => {
  return JSON.parse(window.localStorage.getItem(key))
}

// 删除
export const removeItem = (key) => {
  window.localStorage.removeItem(key)
}

export const getToken = () => {
  return getItem('token')
}

export const setToken = (value) => {
  setItem('token', value)
}

export const removeToken = () => {
  removeItem('token')
}
