import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage'

Vue.use(Vuex)
const TOUTIAO_USER = 'TOUTIAO_USER'

export default new Vuex.Store({
  state: {
    user: getItem(TOUTIAO_USER)
  },
  mutations: {
    setUserToken (state, data) {
      state.user = data
      setItem(TOUTIAO_USER, data)
    }
  },
  actions: {
  },
  modules: {
  }
})
