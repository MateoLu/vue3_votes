// 存储
export const setItem = (key, value) => {
  window.sessionStorage.setItem(key, JSON.stringify(value) || '')
}

// 获取
export const getItem = (key) => {
  return JSON.parse(window.sessionStorage.getItem(key))
}

// 删除
export const removeItem = (key) => {
  window.sessionStorage.removeItem(key)
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

export const setCheckList = (val) => {
  setItem('checkList', val)
}

export const getCheckList = () => {
  return getItem('checkList')
}
