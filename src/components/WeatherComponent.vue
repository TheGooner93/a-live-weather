<template>
  <Fragment>
    <section
      v-bind:class="{'weatherContentSection' : true, 'blurredWeatherContentSection' : isFooterExpanded}"
    >
      <section class="canvasSection">
        <div class="canvasWrapper">
          <CanvasComponent v-bind:weatherInfo="weather" />
        </div>
        <div v-bind:class="{'weatherTextWrapper' : true, 'd-none' : isFooterExpanded}">
          <WeatherInformation v-bind:weatherInfo="weather" />
        </div>
      </section>
    </section>
    <section
      v-bind:class="{'footerSection' : true, 'footerCollapsed' : !isFooterExpanded, 'footerExpanded': isFooterExpanded}"
    >
      <InteractiveLocationFooter
        v-on:footerToggle="toggleFooter"
        v-bind:isFooterExpanded="isFooterExpanded"
      />
    </section>
  </Fragment>
</template>

<script>
import { Fragment } from "vue-fragment";
import { getWeather } from "../services/weatherService";
import InteractiveLocationFooter from "./InteractiveLocationFooter";
import CanvasComponent from "./CanvasComponent";
import WeatherInformation from "./WeatherInformation";

export default {
  name: "WeatherComponent",
  components: {
    Fragment,
    InteractiveLocationFooter,
    CanvasComponent,
    WeatherInformation
  },
  data: () => ({
    coordinates: {},
    weather: {},
    isFooterExpanded: false
  }),
  watch: {
    coordinates: function({ lat = "", lng = "" }) {
      const weatherPromise = getWeather(lat, lng);

      weatherPromise
        .then(weather => (this.weather = weather.data))
        .catch(err => console.log(err));
    },
    weather: function(weather) {
      console.log("Weather: ", weather);
    }
  },
  created() {
    //Get geolocation
    this.$getLocation().then(coordinates => {
      this.coordinates = coordinates;
    });
  },
  methods: {
    toggleFooter() {
      this.isFooterExpanded = !this.isFooterExpanded;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.weatherContentSection {
  min-height: 95vh;
  transition: all 0.5s ease;
}

.canvasSection {
  width: 100%;
  min-height: inherit;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.canvasWrapper {
  position: absolute;
  z-index: 2;
}

.weatherTextWrapper {
  position: relative;
  z-index: 4;
  width: 50%;
  transition: all 0.5s ease;
}

.footerSection {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background: white;
}

.blurredWeatherContentSection {
  filter: blur(10px);
  transition: all 0.5s ease;
}

.footerSection:hover {
  cursor: pointer;
}

.footerCollapsed {
  min-height: 5vh;
  transition: all 0.5s ease;
}

.footerExpanded {
  min-height: 50vh;
  transition: all 0.5s ease;
  cursor: none;
  background: transparent;
}

@media (max-width: 720px) {
  .weatherTextWrapper {
    width: 85%;
  }
}
</style>
