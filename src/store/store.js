import Vue from 'vue'
import Vuex from 'vuex'

import { TOGGLE_UNITS_SYSTEM, UPDATE_ACTIVE_WEATHER } from './mutations';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    units: {
      system: 'metric',
      temperature: '°C',
      humidity: '%',
      windSpeed: 'm/s',
    },
    activeWeather: {}
  },
  mutations: {
    [TOGGLE_UNITS_SYSTEM](state) {
      const newUnitsState = {
        system: state.units.system === 'metric' ? 'imperial' : 'metric',
        temperature: state.units.system === 'metric' ? '°C' : '°F',
        humidity: '%',
        windSpeed: state.units.system === 'metric' ? 'm/s' : 'mph',
      }
      state.units = { ...newUnitsState };
    },
    [UPDATE_ACTIVE_WEATHER](state, payload) {
      state.activeWeather = { ...payload };
    }
  },
  actions : {
    toggleUnitsSystem({commit}) {
      commit(TOGGLE_UNITS_SYSTEM);
    },
    updateActiveWeather({commit}, payload) {
      commit(UPDATE_ACTIVE_WEATHER, payload);
    }
  }
});

export default store;