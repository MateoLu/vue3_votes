import { getVotesByPage } from '@/api/vote'

const vote = {
  namespaced: true,
  state: () => ({
    list: [],
    pager: {
      pages: 1,
      total: 0
    }
  }),
  mutations: {
    setList(state, payload) {
      state.list = payload
    },
    setPager(state, payload) {
      state.pager = payload
    }
  },
  actions: {
    async setVotes({ commit }, pageNum) {
      try {
        const res = await getVotesByPage(pageNum)
        if (res.code === 200) {
          commit('setList', res.data.records)
          commit('setPager', { pages: res.data.pages, total: res.data.total })
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}

export default vote
