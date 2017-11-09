const mutations = {
  clearToken: state => state.token = '',
  setToken(state, payload) {
    state.token = payload;
  },
  // getPowerArr(state, payload) {
  //   state.permInfo = payload;
  // },
  setPermInfo(state, payload) {
    state.permInfo = payload;
  },
  setRoles(state, payload) {
    state.roles = payload;
  },
}

export default mutations
