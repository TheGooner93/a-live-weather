<template>
  <Fragment>
    <section
      v-bind:class="{ weatherContentSection: true }"
      v-on:click="onWeatherContentClick"
    >
      <section class="py-3 px-2 ghSection" v-if="!isFooterExpanded && !isWeatherLoading">
        <CustomButton
          faClass='fa fa-info-circle'
          v-on:onClickCallback="onInfoButtonClick"
        />
      </section>

      <section class="canvasSection">
        <div
          v-bind:class="{
            canvasWrapper: true,
            blurredFooterExpandedWeatherContentSection: isFooterExpanded,
            blurredFooterCollapsedWeatherContentSection: !isFooterExpanded,
          }"
        >
          <CanvasComponent />
        </div>
        <div
          v-bind:class="{
            weatherTextWrapper: true,
            'weatherTextWrapper-displayed': !isFooterExpanded,
            'weatherTextWrapper-invisible': isFooterExpanded,
          }"
        >
          <WeatherSummaryCard
            v-bind:weatherInfo="weather"
            v-bind:isWeatherLoading="isWeatherLoading"
          />
        </div>
      </section>
    </section>
    <section
      v-bind:class="{
        footerSection: true,
        footerCollapsed: !isFooterExpanded,
        footerExpanded: isFooterExpanded,
      }"
    >
      <InteractiveLocationFooter
        v-on:footerToggle="toggleFooter"
        v-on:updateCoordinates="onLocationCoordinatesUpdate"
        v-on:getCurrentLocation="onGetCurrentLocation"
        v-bind:isFooterExpanded="isFooterExpanded"
        v-bind:isLocationDisabled="isLocationDisabled"
      />
    </section>
  </Fragment>
</template>

<script>
import { Fragment } from "vue-fragment";
import { UPDATE_IS_LOADING, TOGGLE_DEV_INFO } from "../store/mutations";
import { getWeatherAndLocationDetails } from "../services/weatherService";
import InteractiveLocationFooter from "./InteractiveLocationFooter";
import CanvasComponent from "./CanvasComponent";
import WeatherSummaryCard from "./WeatherSummaryCard";
import CustomButton from "./common/CustomButton";
import store from "../store/store";

export default {
  store,
  name: "WeatherComponent",
  components: {
    Fragment,
    InteractiveLocationFooter,
    CanvasComponent,
    WeatherSummaryCard,
    CustomButton,
  },
  data: () => ({
    coordinates: {},
    weather: {},
    isFooterExpanded: false,
    isWeatherLoading: false,
    isLocationDisabled: false,
    isDevInfoShown: false,
  }),
  mounted() {
    store.subscribe((mutation, state) => {
      switch (mutation.type) {
        case TOGGLE_DEV_INFO: {
          this.isDevInfoShown = state.isDevInfoShown;
          break;
        }
      }
    });
    this.$gtag.pageview({
      page_path: "/home",
    });
  },
  watch: {
    coordinates: function ({ lat = "", lng = "" }) {
      this.isWeatherLoading = true;
      const unitsSystem = store.state.units.system;
      const weatherPromise = getWeatherAndLocationDetails(
        lat,
        lng,
        unitsSystem
      );
      
      weatherPromise
        .then((weather) => {
          this.isWeatherLoading = false;
          const {
            [0]: { data: weatherData = {} },
            [1]: {
              data: {
                address: { country = "", state = "", city = "" },
              },
            },
          } = weather;

          const weatherWithLocationInfo = {
            ...weatherData,
            country,
            state,
            city,
          };

          this.weather = weatherWithLocationInfo;
          store.dispatch(UPDATE_IS_LOADING, false);
          this.toggleFooter(false);
        })
        .catch((err) => console.log(err));
    },
  },
  created() {
    //Get geolocation
    this.onGetCurrentLocation();
  },
  methods: {
    toggleFooter(status) {
      this.isFooterExpanded = status;
    },
    onWeatherContentClick() {
      if (this.isFooterExpanded && Object.keys(this.weather).length === 0) {
        this.toggleFooter(false);
      }
    },
    onLocationCoordinatesUpdate(lat = "", lng = "") {
      this.coordinates = {
        lat,
        lng,
      };
    },
    onGetCurrentLocation() {
      // if (window.location.hostname.includes("localhost")) {
      //   this.coordinates = {
      //     lat: "25.204",
      //     lng: "55.27"
      //   };
      // } else {
      this.isWeatherLoading = true;

      this.$getLocation()
        .then((coordinates) => {
          this.coordinates = coordinates;
          this.isWeatherLoading = false;
          this.isLocationDisabled = false;
        })
        .catch((err) => {
          console.log(err);
          this.isFooterExpanded = true;
          this.isLocationDisabled = true;
        });
      // }
    },
    onInfoButtonClick() {
      store.dispatch(TOGGLE_DEV_INFO);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.weatherContentSection {
  min-height: 91vh;
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
  top: 7vh;
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
  box-shadow: 0 -1px 5px lightgrey;
  border-color: lightgrey;
  border-style: solid;
  border-width: 0px 1px 1px 1px;
}

.footerSection:hover {
  box-shadow: 0 -1px 10px lightgrey;
  cursor: pointer;
}

.blurredFooterExpandedWeatherContentSection {
  filter: blur(10px);
}

.blurredFooterCollapsedWeatherContentSection {
  filter: blur(2px);
}

.footerCollapsed {
  min-height: 9vh;
  transition: all 0.5s ease;
}

.footerExpanded {
  min-height: 50vh;
  transition: all 0.5s ease;
  cursor: none;
  background: transparent;
  padding: 1rem;
}

.ghSection {
  background: state.colorAccent;
  width: 100%;
  position: fixed;
  bottom: 10vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 5vh;
  z-index: 1000;
}

@media (max-width: 720px) {
  .weatherTextWrapper {
    top: 10vh;
  }
  .footerExpanded {
    min-height: 70vh;
  }
}

@media (max-width: 1024px) {
  .weatherTextWrapper {
    width: 85%;
  }
}
</style>
