<template>
  <section
    v-bind:class="{'footerSection' : true, 'footerCollapsed' : !isFooterExpanded, 'footerExpanded': isFooterExpanded}"
  >
    <InteractiveLocationFooter v-on:footerToggle="toggleFooter" v-bind:isFooterExpanded="isFooterExpanded"/>
  </section>
</template>

<script>
import { getWeather } from "../services/weatherService";
import InteractiveLocationFooter from "./InteractiveLocationFooter";

export default {
  name: "WeatherComponent",
  components: {
    InteractiveLocationFooter
  },
  data: () => ({
    coordinates: {},
    weather: {},
    isFooterExpanded: false,
  }),
  watch: {
    coordinates: function({ lat = "", lng = "" }) {
      const weatherPromise = getWeather(lat, lng);

      weatherPromise
        .then(data => (this.weather = data))
        .catch(err => console.log(err));
    },
    weather: function(weather) {
      console.log("weather loaded: ", weather);
    }
  },
  created() {
    //Get geolocation
    this.$getLocation().then(coordinates => {
      this.coordinates = coordinates;
    });
  },
  methods : {
    toggleFooter() {
      this.isFooterExpanded = !this.isFooterExpanded;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.footerSection {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
}

.footerSection:hover {
  cursor: pointer;
}


.footerCollapsed {
  min-height: 5vh;
  transition: all 0.5s ease;
}

.footerExpanded {
  min-height: 99vh;
  transition: all 0.5s ease;
  cursor: none;
}
</style>
