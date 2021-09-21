import { requestWithToken } from '@/service'

// data: { "name": "", "questionId": "" }
export const addOption = async (data) => {
  return await requestWithToken('option/create', { method: 'POST', data })
}

export const delOption = async (id) => {
  return await requestWithToken(`option/${id}`, { method: 'DELETE' })
}

// data: { "name": "" }
export const uptOption = async (id, data) => {
  return await requestWithToken(`option/${id}`, { method: 'PUT', data })
}
