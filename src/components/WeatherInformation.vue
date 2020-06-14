<template>
  <Fragment>
    <div v-if="!isWeatherLoading" class="weatherContainer">
      <h1>{{weatherAsPerTimePeriodSelected['city']}}</h1>
      <h3>{{weatherAsPerTimePeriodSelected['state']? weatherAsPerTimePeriodSelected['state'] + ',' : ''}} {{weatherAsPerTimePeriodSelected['country']}}</h3>
      <h4>{{weatherAsPerTimePeriodSelected['weather'][0]['main']}}</h4>
      <div class="propertyContainer">
        <SingleWeatherPropertyBlob
          iconSrc="fas fa-thermometer-three-quarters"
          v-bind:propertyObject="temperature"
        />
        <SingleWeatherPropertyBlob
          iconSrc="fas fa-water"
          v-bind:propertyObject="humidity"
        />
        <SingleWeatherPropertyBlob
          iconSrc="fas fa-wind"
          v-bind:propertyObject="windSpeed"
        />
      </div>
    </div>
    <div v-if="isWeatherLoading">{{LOADING_TEXT}}</div>
  </Fragment>
</template>

<script>
import { Fragment } from "vue-fragment";
import SingleWeatherPropertyBlob from "./SingleWeatherPropertyBlob";
import store from "../store/store";
import { LOADING_TEXT } from "../resources/texts/texts";

export default {
  store,
  name: "WeatherInformation",
  components: { SingleWeatherPropertyBlob, Fragment },
  data: function() {
    return {
      timePeriod: "",
      timePeriodIndex: 1, // showing from the tomorrow onwards
      weatherAsPerTimePeriodSelected: {},
      LOADING_TEXT
    };
  },
  props: {
    weatherInfo: {
      type: Object,
      required: true
    },
    isWeatherLoading: {
      type: Boolean,
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
            state: weatherInfo["state"],
            country: weatherInfo["country"],
            city: weatherInfo["city"]
          };
        } else if (this.timePeriod === "daily") {
          this.timePeriodIndex = 1;

          this.weatherAsPerTimePeriodSelected = {
            ...weatherInfo[this.timePeriod][this.timePeriodIndex],
            state: weatherInfo["state"],
            country: weatherInfo["country"],
            city: weatherInfo["city"]
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
      return {
        value: this.weatherAsPerTimePeriodSelected["temp"],
        unit: store.state.units.temperature
      };
    },
    humidity() {
      return {
        value: this.weatherAsPerTimePeriodSelected["humidity"],
        unit: store.state.units.humidity
      };
    },
    windSpeed() {
      return {
        value: this.weatherAsPerTimePeriodSelected["wind_speed"],
        unit: store.state.units.windSpeed
      };
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
  padding: 1rem 0 1rem 0 ;
  min-height: 3rem;
  display: flex;
  flex-wrap: wrap;
}

</style>