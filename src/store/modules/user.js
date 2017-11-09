import {
  fetchPostUrlencoded,
  fetchGet
}
from '../../utils/requestHttp.js'
const state = {
  info: {},
}

const mutations = {
  setUser(state, res) {
    state.info = res;
  }
}

const getters = {
  getUser: state => {
    return state.info
  }
}
const actions = {
  LoginByUsername({
      commit, rootState
    }, obj) {
      return fetchPostUrlencoded(obj.url, obj.params).then(res => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            // rootState.loading = 0;
            commit('setUser', res);
            resolve()
          }, 500)
        })
      })
    },
    LogOut({
      commit, rootState
    }, url) {
      return fetchGet(url).then(res => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            // rootState.loading = 0;
            rootState.state = '';
            rootState.permInfo = [];
            localStorage.removeItem('user');
            resolve()
          }, 500)
        })
      })
    }
}

export default {
  state,
  getters,
  mutations,
  actions
}
