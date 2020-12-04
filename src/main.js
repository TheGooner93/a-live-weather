import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import VueGeolocation from 'vue-browser-geolocation';
import 'bootstrap'; 
import VueGtag from "vue-gtag";

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';

Vue.use(Vuex);
Vue.use(VueGeolocation);
Vue.config.productionTip = false

Vue.use(VueGtag, {
  config: { id: "UA-140382357-3" }
});

new Vue({
  render: h => h(App),
}).$mount('#app')
