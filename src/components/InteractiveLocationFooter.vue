<template>
  <footer v-on:click.self="onToggleFooter" class="footer">
    <span v-if="!isFooterExpanded">
      <strong v-on:click.self="onToggleFooter">{{ FOOTER_TEXT }}</strong>
    </span>
    <div
      v-bind:class="{
        invisibleElement: !isFooterExpanded,
        closeTextWrapper: isFooterExpanded,
      }"
      v-on:click="onCloseClick"
      v-if="!isLoading"
    >
      <i class="fas fa-times fa-lg"></i>
    </div>
    <div v-if="isLoading">{{ LOADING_TEXT }}</div>
    <section
      v-bind:class="{
        invisibleElement: !isFooterExpanded,
        locationInputSection: isFooterExpanded,
      }"
      v-if="!isLoading"
    >
      <div class="locationInputWrapper">
        <input
          v-bind:placeholder="FOOTER_INPUT_PLACEHOLDER"
          v-model="citySearchText"
          v-on:keyup.enter="onLocationSearch()"
        />
      </div>
      <div
        v-bind:class="{
          'pt-1 inputSubtextWrapper': true,
          invisibleElement:
            !citySearchText || (citySearchText && isSearchErrorShown),
        }"
      >
        {{ PRESS_ENTER_TEXT }}
      </div>
      <div
        v-bind:class="{
          'pt-1 inputSubtextWrapper errorText': true,
          invisibleElement: !isSearchErrorShown,
        }"
      >
        {{ UNABLE_TO_FIND_LOCATION_TEXT }}
      </div>
      <div class="pt-2">or</div>
      <div class="pt-4">
        <button
          v-bind:class="{
            detectLocationButton: true,
            'detectLocationButton-mousedown': isButtonMouseDown,
            'detectLocationButton-mouseup': !isButtonMouseDown,
          }"
          v-bind:disabled="isLocationDisabled"
          v-on:mousedown="onButtonMouseDownToggle"
          v-on:mouseup="onButtonMouseDownToggle"
        >
          {{ DETECT_LOCATION_TEXT }}
        </button>
        <div
          v-if="isLocationDisabled"
          v-bind:class="{ 'pt-1 buttonErrorWrapper errorText': true }"
        >
          {{ ENABLE_LOCATION_ACCESS }}
        </div>
      </div>
    </section>
  </footer>
</template>

<script>
import {
  FOOTER_TEXT,
  PRESS_ENTER_TEXT,
  DETECT_LOCATION_TEXT,
  ENABLE_LOCATION_ACCESS,
  FOOTER_INPUT_PLACEHOLDER,
  UNABLE_TO_FIND_LOCATION_TEXT,
  LOADING_TEXT,
} from "../resources/texts/texts";

import { getGeocodesForLocation } from "../services/weatherService";
import { UPDATE_IS_LOADING } from '../store/mutations';
import store from "../store/store";

export default {
  store,
  name: "InteractiveLocationFooter",
  data: () => ({
    FOOTER_TEXT,
    PRESS_ENTER_TEXT,
    DETECT_LOCATION_TEXT,
    ENABLE_LOCATION_ACCESS,
    FOOTER_INPUT_PLACEHOLDER,
    UNABLE_TO_FIND_LOCATION_TEXT,
    LOADING_TEXT,
    citySearchText: "",
    isButtonMouseDown: false,
    isSearchErrorShown: false,
    isLoading: store.state.isLoading,
  }),
  props: ["isFooterExpanded", "isLocationDisabled"],
  mounted: function () {
    store.subscribe((mutation, state) => {
      switch (mutation.type) {
        case UPDATE_IS_LOADING: {
          this.isLoading = state.isLoading;
          break;
        }
      }
    });
  },
  methods: {
    onButtonMouseDownToggle: function () {
      if (this.isButtonMouseDown) {
        this.isButtonMouseDown = false;
        store.dispatch(UPDATE_IS_LOADING, true);
        this.$emit("getCurrentLocation");
        // setTimeout(() => this.$emit("footerToggle", false), 100);
      } else {
        this.isButtonMouseDown = true;
      }
    },
    onToggleFooter: function () {
      if (!this.isFooterExpanded) {
        this.citySearchText = "";
        this.$emit("footerToggle", true);
      }
    },
    onCloseClick: function () {
      this.citySearchText = "";
      this.$emit("footerToggle", false);
    },
    onLocationSearchError: function (err) {
      this.isSearchErrorShown = true;
      setTimeout(() => {
        console.log(err);
        this.isSearchErrorShown = false;
      }, 3000);
    },
    onLocationSearch: function () {
      if (this.citySearchText) {
        // this.isLoading = true;
        store.dispatch(UPDATE_IS_LOADING, true);
        const geocodePromise = getGeocodesForLocation(this.citySearchText);
        geocodePromise.then(
          (res) => {
            // this.isLoading = false;
            const {
              data: { [0]: { lat = "", lon = "" } = {} },
            } = res;

            this.citySearchText = "";

            this.$emit("updateCoordinates", lat, lon);
            // this.$emit("footerToggle");
          },
          (err) => {
           store.dispatch(UPDATE_IS_LOADING, false);
            this.onLocationSearchError(err);
          }
        );
      }
    },
  },
};
</script>

<style scoped>
.footer {
  position: relative;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: inherit;
}

.closeTextWrapper {
  display: block;
  /* visibility: visible; */
  position: absolute;
  top: 0;
  right: 0;
  padding: 1rem;
  opacity: 1;
  transition: all 0.5s ease;
}

.closeTextWrapper:hover {
  cursor: pointer;
  font-weight: bold;
  transition: all 0.1s ease-out;
}

.locationInputSection {
  width: 75%;
  font-size: 2.5rem;
  text-align: center;
  opacity: 1;
  transition: all 0.2s linear;
}

.locationInputWrapper {
  border-bottom: 1px lightblue solid;
}

.inputSubtextWrapper {
  text-align: left;
  font-size: 1rem;
  opacity: 1;
  padding: 1px 2px;
  height: 2rem;
  transition: all 0.5s ease;
}

.buttonErrorWrapper {
  font-size: 1rem;
  opacity: 1;
  height: 2rem;
  transition: all 0.5s ease;
}

.errorText {
  color: red;
}

input {
  outline: none;
  border: none;
  width: 100%;
  background: transparent;
}

.detectLocationButton {
  padding: 0.35rem 0.5rem 0.25rem 0.5rem;
  border-radius: 1rem;
  text-align: left;
  color: white;
  background: black;
}

.detectLocationButton:disabled {
  background: gray;
  color: lightgray;
  border: none;
}

.detectLocationButton:focus {
  outline: none;
}

.detectLocationButton-mousedown {
  transform: scale(0.9);
}

.detectLocationButton-mouseup {
  transform: scale(1);
}

.invisibleElement {
  height: 0;
  width: 0;
  opacity: 0;
  transition: height 0.5s ease;
}
</style>