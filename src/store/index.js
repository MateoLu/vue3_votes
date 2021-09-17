import Vuex from 'vuex'

const state = {
  token: window.localStorage.getItem('token')
}

export default new Vuex.Store({
  state
})
