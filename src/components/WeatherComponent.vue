<template>
  <InteractiveLocationFooter />
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
    weather: {}
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
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
