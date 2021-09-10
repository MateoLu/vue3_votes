import { createStore } from 'vuex'

// 创建一个新的 store 实例
const store = createStore({
  state() {
    return {
      count: 1
    }
  },
  mutations: {
    increment(state) {
      state.count++
    }
  }
})

export default store
