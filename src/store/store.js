import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    unitsSystem: 'metric'
  },
  mutations: {
    toggleUnitsSystem (state) {
      state.unitsSystem = state.unitsSystem === 'metric' ? 'imperial' : 'metric'
    }
  }
});

export default store;