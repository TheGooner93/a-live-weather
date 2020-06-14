<template>
  <div class="weatherContainer">
    <h1>{{weatherAsPerTimePeriodSelected['timezone']}}</h1>
    <h2>{{weatherAsPerTimePeriodSelected['weather'][0]['main']}}</h2>
    <div class="propertyContainer">
      <SingleWeatherPropertyBlob iconSrc="fas fa-thermometer-three-quarters" v-bind:propertyValue="temperature" />
      <SingleWeatherPropertyBlob iconSrc="fas fa-dewpoint" v-bind:propertyValue="humidity" />
      <SingleWeatherPropertyBlob iconSrc="fas fa-wind" v-bind:propertyValue="windSpeed" />
    </div>
  </div>
</template>

<script>
import SingleWeatherPropertyBlob from "./SingleWeatherPropertyBlob";

export default {
  name: "WeatherInformation",
  components: {SingleWeatherPropertyBlob},
  data: function() {
    return {
      timePeriod: "",
      timePeriodIndex: 1, // showing from the tomorrow onwards
      weatherAsPerTimePeriodSelected: {}
    };
  },
  props: {
    weatherInfo: {
      type: Object,
      required: true
    }
  },
  watch: {
    weatherInfo: {
      deep: true,
      handler(weatherInfo) {
        if (this.timePeriod === "current") {
          this.weatherAsPerTimePeriodSelected = {
            ...weatherInfo[this.timePeriod],
            timezone: weatherInfo["timezone"].match(/\/.*/)[0].substring(1)
          };
        } else if (this.timePeriod === "daily") {
          this.timePeriodIndex = 1;

          this.weatherAsPerTimePeriodSelected = {
            ...weatherInfo[this.timePeriod][this.timePeriodIndex],
            timezone: weatherInfo["timezone"].match(/\/.*/)[0].substring(1)
          };
        }
      }
    }
    // timePeriodIndex: function(index) {
    //   this.weatherAsPerTimePeriodSelected = this.weatherInfo[this.timePeriod][
    //     index
    //   ];
    // }
  },
  computed: {
    temperature() {
      return this.weatherAsPerTimePeriodSelected["temp"];
    },
    humidity() {
      return this.weatherAsPerTimePeriodSelected["humidity"];
    },
    windSpeed() {
      return this.weatherAsPerTimePeriodSelected["wind_speed"];
    }
  },
  created() {
    this.timePeriod = "current";
  }
};
</script>
<style scoped>
.weatherContainer {
  background: white;
  border: 1px solid aqua;
  border-radius: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
}

.propertyContainer {
    padding: 1rem;
    height : 3rem;
    display: flex;
}
</style>