import { requestWithToken } from '@/service'

export const getCheckList = async () => {
  return await requestWithToken('check/listAll')
}
