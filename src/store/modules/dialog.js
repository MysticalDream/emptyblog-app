export default {
  namespaced: true,
  state: {
    isDialogShowOn: false,
  },
  mutations: {
    dialogClick(state, isDialogShowOn) {
      state.isDialogShowOn = isDialogShowOn;
      console.log(state.isDialogShowOn);
    },
  },
  actions: {
    addDialog({ commit }, isDialogShowOn) {
      commit("dialogClick", isDialogShowOn);
    },
  },
  getters: {
    isDialogShowOn(state) {
      return state.isDialogShowOn;
    },
  },
};
