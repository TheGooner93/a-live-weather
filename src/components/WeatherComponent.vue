<template>
  <Fragment>
    <section v-bind:class="{'weatherContentSection' : true}" v-on:click="onWeatherContentClick">
      <section class="canvasSection">
        <div
          v-bind:class="{'canvasWrapper' : true, 'blurredFooterExpandedWeatherContentSection' : isFooterExpanded,'blurredFooterCollapsedWeatherContentSection' : !isFooterExpanded}"
        >
          <CanvasComponent v-bind:weatherInfo="weather" />
        </div>
        <div
          v-bind:class="{'weatherTextWrapper' : true, 'weatherTextWrapper-displayed' : !isFooterExpanded, 'weatherTextWrapper-invisible' : isFooterExpanded}"
        >
          <WeatherInformation v-bind:weatherInfo="weather" v-bind:isWeatherLoading="isWeatherLoading"/>
        </div>
      </section>
    </section>
    <section
      v-bind:class="{'footerSection' : true, 'footerCollapsed' : !isFooterExpanded, 'footerExpanded': isFooterExpanded}"
    >
      <InteractiveLocationFooter
        v-on:footerToggle="toggleFooter"
        v-on:updateCoordinates="onLocationCoordinatesUpdate"
        v-on:getCurrentLocation="onGetCurrentLocation"
        v-bind:isFooterExpanded="isFooterExpanded"
      />
    </section>
  </Fragment>
</template>

<script>
import { Fragment } from "vue-fragment";
import { getWeatherAndLocationDetails } from "../services/weatherService";
import InteractiveLocationFooter from "./InteractiveLocationFooter";
import CanvasComponent from "./CanvasComponent";
import WeatherInformation from "./WeatherInformation";
import store from "../store/store";

export default {
  store,
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
    isFooterExpanded: false,
    isWeatherLoading: false,
  }),
  watch: {
    coordinates: function({ lat = "", lng = "" }) {
      this.isWeatherLoading = true;
      const unitsSystem = store.state.units.system;
      const weatherPromise = getWeatherAndLocationDetails(
        lat,
        lng,
        unitsSystem
      );

      weatherPromise
        .then(weather => {
          this.isWeatherLoading = false;
          const {
            [0]: { data: weatherData = {} },
            [1]: {
              data: {
                address: { country = "", state = "", city = "" }
              }
            }
          } = weather;

          const weatherWithLocationInfo = {
            ...weatherData,
            country,
            state,
            city
          };

          this.weather = weatherWithLocationInfo;
        })
        .catch(err => console.log(err));
    },
    weather: function(weather) {
      console.log("Weather: ", weather);
    }
  },
  created() {
    //Get geolocation
    this.onGetCurrentLocation();
  },
  methods: {
    toggleFooter() {
      this.isFooterExpanded = !this.isFooterExpanded;
    },
    onWeatherContentClick() {
      if (this.isFooterExpanded) {
        this.toggleFooter();
      }
    },
    onLocationCoordinatesUpdate(lat = "", lng = "") {
      this.coordinates = {
        lat,
        lng
      };
    },
    onGetCurrentLocation() {
      this.isWeatherLoading = true
      this.$getLocation().then(coordinates => {
        this.coordinates = coordinates;
        this.isWeatherLoading = false;
      });
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
  transition: all 0.5s ease;
}

.weatherTextWrapper {
  position: relative;
  z-index: 4;
  width: 50%;
  transition: all 0.3s ease;
}

.weatherTextWrapper-displayed {
  opacity: 1;
}

.weatherTextWrapper-invisible {
  opacity: 0;
}

.footerSection {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background: white;
  overflow: hidden;
  margin-top: 1px;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  box-shadow: 0 -1px 5px gray;
}

.footerSection:hover {
  box-shadow: 0 -1px 10px gray;
}

.blurredFooterExpandedWeatherContentSection {
  filter: blur(10px);
}

.blurredFooterCollapsedWeatherContentSection {
  filter: blur(2px);
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
