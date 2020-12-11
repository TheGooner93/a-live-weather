import Vue from 'vue'
import Vuex from 'vuex'

import { TOGGLE_UNITS_SYSTEM, UPDATE_ACTIVE_WEATHER, UPDATE_COLOR_ACCENT, UPDATE_IS_LOADING, TOGGLE_DEV_INFO } from './mutations';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    units: {
      system: 'metric',
      temperature: '°C',
      humidity: '%',
      windSpeed: 'm/s',
    },
    activeWeather: {},
    colorAccent : '',
    isLoading: false,
    isDevInfoShown: false
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
    },
    [UPDATE_COLOR_ACCENT](state, payload) {
      state.colorAccent = payload;
    },
    [UPDATE_IS_LOADING](state, payload) {
      state.isLoading = payload;
    },
    [TOGGLE_DEV_INFO](state) {
      state.isDevInfoShown = !state.isDevInfoShown;
    }
  },
  actions : {
    toggleUnitsSystem({commit}) {
      commit(TOGGLE_UNITS_SYSTEM);
    },
    updateActiveWeather({commit}, payload) {
      commit(UPDATE_ACTIVE_WEATHER, payload);
    },
    updateColorAccent({commit}, payload){
      commit(UPDATE_COLOR_ACCENT, payload);
    },
    updateIsLoading({commit}, payload){
      commit(UPDATE_IS_LOADING, payload);
    },
    toggleIsDevInfoShown({commit}){
      commit(TOGGLE_DEV_INFO);
    },
  }
});

export default store;