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
        if (res.code === 200) {
          setCheckList(res.data)
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
