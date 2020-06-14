import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    units: {
      system: 'metric',
      temperature : '°C',
      humidity : '%',
      windSpeed : 'm/s',
    }
  },
  mutations: {
    toggleUnitsSystem (state) {
      const newUnitsState = {
        system: state.units.system === 'metric' ? 'imperial' : 'metric',
        temperature : state.units.system === 'metric' ? '°C' : '°F',
        humidity : '%',
        windSpeed : state.units.system === 'metric' ? 'm/s': 'mph',
      }
      state.units = {...newUnitsState};
    }
  }
});

export default store;