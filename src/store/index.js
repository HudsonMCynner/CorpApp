// noinspection NpmUsedModulesInstalled
import Vue from 'vue'
// noinspection NpmUsedModulesInstalled
import Vuex from 'vuex'
import authCommon from './auth'

const auth = {
  actions: { ...authCommon.actions },
  getters: { ...authCommon.getters },
  mutations: { ...authCommon.mutations },
  state: {
    ...authCommon.state
  },
  namespaced: true
}

Vue.use(Vuex)

// noinspection JSValidateTypes
const store = new Vuex.Store({
  modules: {
    auth
  }
})

export default store
