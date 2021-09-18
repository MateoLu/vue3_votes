import Vuex from 'vuex'
import user from './modules/user'

const state = {}

export default new Vuex.Store({
  state,
  modules: {
    user
  }
})
