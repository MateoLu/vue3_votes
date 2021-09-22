import { getToken } from '@/utils/storage'
import qs from 'qs'

const apiUrl = import.meta.env.VITE_APP_SERVER_API

// 该函数是请求后端主接口的，有些请求需要token，这里可以传入
export const http = async (
  endpoint,
  { data, token, headers, ...customConfig }
) => {
  const config = {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': data ? 'application/json' : ''
    },
    ...customConfig
  }
  if (config.method.toUpperCase() === 'GET') {
    endpoint += `?${qs.stringify(data)}`
  } else {
    config.body = JSON.stringify(data || {})
  }
  return window.fetch(`${apiUrl}/${endpoint}`, config).then(async (res) => {
    if (res.status === 401) {
      window.location.reload()
      return Promise.reject(new Error('请重新登录'))
    }
    const data = await res.json()
    if (res.ok) {
      return data
    } else {
      // fetch api 服务端返回的无论401还是500，fetch catch都抓不到异常，只有在断网或者链接失败才会抓住异常
      // 所以，我们这里只能手动抛出异常
      // axios和fetch表现不一样，axios可以直接在返回状态不在2xx的情况下，返回异常
      return Promise.reject(data)
    }
  })
}

// 该函数可以请求任意网络地址的接口，只能 get 请求
export const $GET = async (url, data = '') => {
  if (data) {
    url += `?${qs.stringify(data)}`
  }
  return await fetch(url, { method: 'GET' }).then(async (res) => {
    const data = await res.json()
    if (res.ok) {
      return data
    } else {
      return Promise.reject(data)
    }
  })
}

export const requestWithToken = async (
  url,
  config = { method: 'GET', data: '' }
) => {
  const token = getToken()
  const result = await http(url, { ...config, token })
  return result
}
