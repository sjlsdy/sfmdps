import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import user from './modules/user.js'
import permission from './modules/permission'


Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    permission
  },
  state: {
    permInfo: [],
    loading: 0,
    token: '',
    roles: []
  },
  mutations: mutations,
  actions: {
    GetUserRoles({
      commit, state
    }) {
      return new Promise((resolve, reject) => {
        if (state.permInfo.length === 0) {
          reject('error')
        }
        let arr;
        if (state.permInfo) {
          arr = state.permInfo.map((item) => {
            return item.code
          });
        }
        commit('setRoles', arr);
        resolve()
      })
    },
  },
  getters: {
    // getLoading: state => {
    //   return state.loading
    // }
    // roles: state => state.roles,
    getRoles: state => {
      return state.roles
    },
    permission_routers: state => state.permission.routers,
    addRouters: state => state.permission.addRouters
  }
})
