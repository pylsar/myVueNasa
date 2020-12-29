import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    itemsData: [],
    pageNumber: 0
  },
  mutations: {
    SET_ITEMS_TO_STATE: (state, itemsData) => {
      state.itemsData = itemsData;
    }
  },
  actions: {
    GET_ITEMS_FROM_API({ commit }) {
      const apiKey = "Ky9mSDGPnp2nnE9bUa2TyaeMlnoUpsDEqGWQh24B";
      const url =
        "https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=" + apiKey;
      axios.get(url).then((response) => {
        console.log(response);
        commit("SET_ITEMS_TO_STATE", response.data.near_earth_objects);
      });
    }
  },
  getters: {
    ITEMSDATA(state) {
      return state.itemsData;
    }
  },
  modules: {}
});
