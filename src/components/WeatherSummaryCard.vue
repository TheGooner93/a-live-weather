<template>
  <Fragment>
    <div
      v-if="!isWeatherLoading && !isDevInfoShown"
      class="weatherContainer"
      v-bind:style="boxShadowStyle"
    >
      <h1>{{ weatherAsPerTimePeriodSelected["city"] }}</h1>
      <h3>
        {{
          weatherAsPerTimePeriodSelected["state"]
            ? weatherAsPerTimePeriodSelected["state"] + ","
            : ""
        }}
        {{ weatherAsPerTimePeriodSelected["country"] }}
      </h3>
      <h4 class="weatherDescription">
        {{ weatherAsPerTimePeriodSelected["weather"][0]["description"] }}
      </h4>
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
      <div class="timeButtonWrapper">
        <button
          v-bind:class="{
            timePeriodButton: true,
          }"
          v-bind:style="buttonBackgroundStyle"
          v-on:click="onToggleTimePeriod"
        >
          {{ buttonText }}
        </button>
      </div>
    </div>
    <div
      v-if="!isWeatherLoading && isDevInfoShown"
      class="weatherContainer"
      v-bind:style="boxShadowStyle"
    >
      <ProfileCard />
    </div>
    <div v-if="isWeatherLoading">
      <WeatherLoading />
    </div>
  </Fragment>
</template>

<script>
import { Fragment } from "vue-fragment";
import SingleWeatherPropertyBlob from "./SingleWeatherPropertyBlob";
import WeatherLoading from "./common/WeatherLoading";
import ProfileCard from "./ProfileCard";
import store from "../store/store";
import {
  NOW_TEXT,
  TOMORROW_TEXT,
} from "../resources/texts/texts";
import { getMonthName } from "../utility/months";
import {
  UPDATE_ACTIVE_WEATHER,
  UPDATE_COLOR_ACCENT,
  TOGGLE_DEV_INFO,
} from "../store/mutations";

export default {
  store,
  name: "WeatherSummaryCard",
  components: {
    SingleWeatherPropertyBlob,
    Fragment,
    ProfileCard,
    WeatherLoading
  },
  data: function () {
    return {
      timePeriod: "current",
      timePeriodIndex: 0, // showing from the tomorrow onwards
      weather: {},
      weatherAsPerTimePeriodSelected: {},
      NOW_TEXT,
      TOMORROW_TEXT,
      colorAccent: "lightblue",
      isDevInfoShown: false,
    };
  },
  props: {
    weatherInfo: {
      type: Object,
      required: true,
    },
    isWeatherLoading: {
      type: Boolean,
      required: true,
    },
  },
  watch: {
    weatherInfo: {
      deep: true,
      handler(weatherInfo) {
        this.timePeriod = "current";
        this.weatherAsPerTimePeriodSelected = {
          ...weatherInfo[this.timePeriod],
          rain:
            this.weatherInfo[this.timePeriod]["rain"] &&
            this.weatherInfo[this.timePeriod]["rain"]["1h"],
          state:
            this.weatherInfo["state"] === this.weatherInfo["city"]
              ? ""
              : this.weatherInfo["state"],
          country: weatherInfo["country"],
          city: weatherInfo["city"],
        };
      },
    },
    timePeriod: function (timePeriod) {
      if (timePeriod === "current") {
        this.timePeriodIndex = 0;
        this.weatherAsPerTimePeriodSelected = {
          ...this.weatherInfo[timePeriod],
          rain:
            this.weatherInfo[timePeriod]["rain"] &&
            this.weatherInfo[timePeriod]["rain"]["1h"],
          state:
            this.weatherInfo["state"] === this.weatherInfo["city"]
              ? ""
              : this.weatherInfo["state"],
          country: this.weatherInfo["country"],
          city: this.weatherInfo["city"],
        };
      } else if (timePeriod === "daily" && this.timePeriodIndex === 0) {
        this.weatherAsPerTimePeriodSelected = {
          ...this.weatherInfo[timePeriod][this.timePeriodIndex],
          temp: this.weatherInfo[timePeriod][this.timePeriodIndex]["temp"][
            "day"
          ],
          state:
            this.weatherInfo["state"] === this.weatherInfo["city"]
              ? ""
              : this.weatherInfo["state"],
          country: this.weatherInfo["country"],
          city: this.weatherInfo["city"],
        };
      }
    },
    timePeriodIndex: function (timePeriodIndex) {
      if (this.timePeriod === "daily") {
        this.weatherAsPerTimePeriodSelected = {
          ...this.weatherInfo[this.timePeriod][timePeriodIndex],
          temp: this.weatherInfo[this.timePeriod][this.timePeriodIndex]["temp"][
            "day"
          ],
          state:
            this.weatherInfo["state"] === this.weatherInfo["city"]
              ? ""
              : this.weatherInfo["state"],
          country: this.weatherInfo["country"],
          city: this.weatherInfo["city"],
        };
      }
    },
    weatherAsPerTimePeriodSelected: {
      deep: true,
      handler(weatherAsPerTimePeriodSelected) {
        store.dispatch(UPDATE_ACTIVE_WEATHER, weatherAsPerTimePeriodSelected);
      },
    },
  },
  computed: {
    temperature() {
      return {
        value: this.weatherAsPerTimePeriodSelected["temp"],
        unit: store.state.units.temperature,
      };
    },
    humidity() {
      return {
        value: this.weatherAsPerTimePeriodSelected["humidity"],
        unit: store.state.units.humidity,
      };
    },
    windSpeed() {
      return {
        value: this.weatherAsPerTimePeriodSelected["wind_speed"],
        unit: store.state.units.windSpeed,
      };
    },
    buttonText() {
      const monthName = getMonthName(
        new Date(this.weatherAsPerTimePeriodSelected["dt"] * 1000).getMonth()
      );

      return this.timePeriod === "current"
        ? this.NOW_TEXT
        : this.timePeriod === "daily" && this.timePeriodIndex === 1
        ? this.TOMORROW_TEXT
        : new Date(this.weatherAsPerTimePeriodSelected["dt"] * 1000)
            .getDate()
            .toString() + ` ${monthName}`;
    },
    boxShadowStyle() {
      return {
        boxShadow: `5px 5px ${this.colorAccent}`,
        border: `1px solid ${this.colorAccent}`,
      };
    },
    buttonBackgroundStyle() {
      return {
        background: `${this.colorAccent}`,
      };
    },
  },
  created() {
    this.timePeriod = "current";
  },
  mounted() {
    store.subscribe((mutation, state) => {
      switch (mutation.type) {
        case UPDATE_COLOR_ACCENT: {
          this.colorAccent = state.colorAccent;
          break;
        }
        case TOGGLE_DEV_INFO: {
          this.isDevInfoShown = state.isDevInfoShown;
          break;
        }
      }
    });
  },
  methods: {
    onToggleTimePeriod: function () {
      //GA
      this.$gtag.event("Change_Timeperiod", {
        event_category: "Change_Timeperiod",
        event_label: "Change_Timeperiod",
      });

      if (this.timePeriod === "current") {
        this.timePeriod = "daily";
        this.timePeriodIndex = 1;
      } else if (this.timePeriod === "daily") {
        if (this.timePeriodIndex === 7) {
          this.timePeriod = "current";
        } else {
          this.timePeriodIndex++;
        }
      }
    },
  },
};
</script>
<style scoped>
.weatherContainer {
  background: white;
  border-radius: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
}

.weatherDescription {
  text-transform: capitalize;
}

.propertyContainer {
  padding: 1rem 0 1rem 0;
  min-height: 3rem;
  display: flex;
  flex-wrap: wrap;
}

.timeButtonWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

.timePeriodButton {
  min-width: 25%;
  border-radius: 1rem;
  border: none;
  color: black;
  height: 3rem;
  font-size: 1.5rem;
  text-transform: capitalize;
  transition: all 0.3s ease;
}

.timePeriodButton:active {
  transform: scale(0.9);
}

.timePeriodButton:hover {
  transition: all 0.3s ease;
  box-shadow: 5px 5px black;
}

.timePeriodButton:focus {
  outline: none;
}

@media (max-width: 720px) {
  .timePeriodButton {
    min-width: 60%;
  }
}
</style>