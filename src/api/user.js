import { http } from '@/service'

export const login = async (params) => {
  return await http('user/login', { data: params, method: 'POST' })
}
