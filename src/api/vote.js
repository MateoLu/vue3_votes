/*
创建投票数据结构
{
  "checkId": 0,
  "expirationDate": "2021-09-21T02:52:36.000+00:00",
  "isMultiple": 0,
  "name": "你是男的女呀？",
  "optionList": [
    {
      "name": "男"
    },
    {
      "name": "女"
    }
  ],
  "status": 0,
  "userId": 0
}
*/

import { requestWithToken } from '@/service'

// 分页查询投票问卷接口
export const getVotesByPage = async (pageNum) => {
  return await requestWithToken('question/list/currentUser', {
    data: { pageNum, pageSize: 7 }
  })
}

// 创建投票问卷接口
export const createVote = async (params) => {
  return await requestWithToken('question/create', {
    method: 'POST',
    data: params
  })
}

// 根据投票问卷id查询问卷详情
export const getVoteDetailById = async (id) => {
  return await requestWithToken(`question/${id}`)
}

// 更改投票问卷接口
export const updateVoteById = async (id, params) => {
  return await requestWithToken(`question/${id}`, {
    method: 'PUT',
    data: params
  })
}

// 删除投票问卷接口
export const delVoteById = async (id) => {
  return await requestWithToken(`question/${id}`, { method: 'DELETE' })
}
