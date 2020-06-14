<template>
  <div class="weatherContainer">
    <h1>{{weatherAsPerTimePeriodSelected['timezone']}}</h1>
    <h2>{{weatherAsPerTimePeriodSelected['weather'][0]['main']}}</h2>
    <div>
        
    </div>
  </div>
</template>

<script>
export default {
  name: "WeatherInformation",
  data: function() {
    return {
      timePeriod: "",
      timePeriodIndex: 1, // showing from the tomorrow onwards
      weatherAsPerTimePeriodSelected: {},
      weatherObject: {}
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
        this.weatherObject = weatherInfo;
        if (this.timePeriod === "current") {
          this.weatherAsPerTimePeriodSelected = {
            ...this.weatherObject[this.timePeriod],
            timezone: this.weatherObject["timezone"]
              .match(/\/.*/)[0]
              .substring(1)
          };
        } else if (this.timePeriod === "daily") {
          this.timePeriodIndex = 1;

          this.weatherAsPerTimePeriodSelected = {
            ...this.weatherObject[this.timePeriod][this.timePeriodIndex],
            timezone: this.weatherObject["timezone"]
              .match(/\/.*/)[0]
              .substring(1)
          };
        }
      }
    },
    timePeriodIndex: function(index) {
      this.weatherAsPerTimePeriodSelected = this.weatherInfo[this.timePeriod][
        index
      ];
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
  padding : 1rem;
}
</style>