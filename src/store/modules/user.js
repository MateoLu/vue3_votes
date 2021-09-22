import { logout } from '@/api/user'
import router from '@/router'
import { getToken, removeToken } from '@/utils/storage'
import { ElNotification } from 'element-plus'

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
      removeToken()
      state.token = ''
    }
  },
  actions: {
    // 判断登录是否成功并获取token
    async setUser({ commit }, payload) {
      commit('setUser', payload)
    },
    async clearUser({ commit }) {
      const res = await logout()
      if (res.code == 200) {
        ElNotification({
          title: '提示',
          message: '用户已退出登陆！',
          type: 'success',
          duration: 2000
        })
        await commit('clearUser')
        router.replace('/auth')
      } else {
        ElNotification({
          title: '提示',
          message: '用户退出登陆失败！',
          type: 'error',
          duration: 2000
        })
      }
    }
  }
}

export default user
