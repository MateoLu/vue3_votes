import { getCheckList } from '@/api/checkList'
import {
  setCheckList,
  getCheckList as sesstionGetCheckList
} from '@/utils/storage'
import Vuex from 'vuex'
import user from './modules/user'
import vote from './modules/vote'

const state = {
  checkList: sesstionGetCheckList() || []
}

export default new Vuex.Store({
  state,
  mutations: {
    setCheckList(state, payload) {
      state.checkList = payload
    }
  },
  actions: {
    async getCheckList({ commit }) {
      try {
        const res = await getCheckList()
        if (res.code == 200) {
          setCheckList(
            res.data.map((item) => {
              if (item.id == 2) {
                item.checkType = '邮箱'
              } else if (item.id == 3) {
                item.checkType = '手机号码'
              }
              return item
            })
          )
          commit('setCheckList', res.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  modules: {
    user,
    vote
  }
})
