import { login } from '@/api/user'
import { setToken } from '@/utils/storage'
import { ElMessage } from 'element-plus'

const user = {
  namespaced: true,
  state: () => ({
    token: ''
  }),
  mutations: {
    setUser(state, payload) {
      state.token = payload
    }
  },
  actions: {
    async setUser({ commit }, payload) {
      const res = await login(payload)
      if (res.code === 200) {
        const token = res.data.token
        ElMessage.success('登录成功')
        setToken(token)
        commit('setUser', token)
      } else {
        ElMessage.error(res.message)
      }
      console.log('vuex user => ', res)
    }
  }
}

export default user
