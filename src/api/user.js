import { http, requestWithToken } from '@/service'

export const login = async (params) => {
  return await http('user/login', { data: params, method: 'POST' })
}

export const logout = async () => {
  return await requestWithToken('user/logout', { method: 'POST' })
}

export const register = async (params) => {
  return await http('user/register', { data: params, method: 'POST' })
}
