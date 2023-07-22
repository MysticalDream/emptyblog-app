import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import dialog from "./modules/dialog";
import getters from "@/store/getters";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: { user, dialog },
  getters,
});

export default store;
