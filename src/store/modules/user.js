import { login, logout } from '@/api/user'
import { getToken, removeToken, setToken } from '@/utils/storage'
import { ElMessage } from 'element-plus'

const user = {
  namespaced: true,
  state: () => ({
    token: getToken() || ''
  }),
  mutations: {
    setUser(state, payload) {
      state.token = payload
    },
    clearUser(state) {
      state.token = ''
    }
  },
  actions: {
    // 判断登录是否成功并获取token
    async setUser({ commit }, payload) {
      const res = await login(payload)
      if (res.code === 200) {
        const token = res.data.token
        ElMessage.success('登录成功')
        setToken(token)
        commit('setUser', token)
        window.location.reload()
      } else {
        ElMessage.error(res.message)
      }
    },
    async clearUser({ commit }) {
      const res = await logout()
      if (res.code === 200) {
        ElMessage.success('退出登陆成功')
        removeToken()
        commit('clearUser')
        window.location.reload()
      } else {
        ElMessage.error(res.message)
      }
    }
  }
}

export default user
