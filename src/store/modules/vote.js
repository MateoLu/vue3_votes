import { getVotesByPage } from '@/api/vote'
import { setVoteDetail, getVoteDetail } from '@/utils/storage'

const vote = {
  namespaced: true,
  state: () => ({
    list: [],
    pager: {
      pages: 1,
      total: 0
    },
    currentVoteDetail: getVoteDetail() || {},
    loading: false
  }),
  mutations: {
    setList(state, payload) {
      state.list = payload
    },
    setPager(state, payload) {
      state.pager = payload
    },
    setCurrentVoteDetail(state, payload) {
      state.currentVoteDetail = payload
    },
    setLoading(state, payload) {
      state.loading = payload
    }
  },
  actions: {
    async setVotes({ commit }, pageNum) {
      try {
        const res = await getVotesByPage(pageNum)
        if (res.code == 200) {
          commit('setList', res.data.records)
          commit('setPager', { pages: res.data.pages, total: res.data.total })
        }
      } catch (err) {
        console.log(err)
      }
    },
    async setCurrentVoteDetail({ commit }, payload) {
      commit('setCurrentVoteDetail', payload)
      setVoteDetail(payload)
    }
  }
}

export default vote
