<template>
  <footer v-on:click.self="onToggleFooter" class="footer">
    <span v-if="!isFooterExpanded">
      <strong v-on:click.self="onToggleFooter">{{FOOTER_TEXT}}</strong>
    </span>
    <div
      v-bind:class="{'invisibleElement' : !isFooterExpanded, 'closeTextWrapper': isFooterExpanded}"
      v-on:click="onCloseClick"
      v-if="!isLoading"
    >
      <i class="fas fa-times fa-lg"></i>
    </div>
    <div v-if="isLoading">{{LOADING_TEXT}}</div>
    <section
      v-bind:class="{'invisibleElement' : !isFooterExpanded, 'locationInputSection': isFooterExpanded}"
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
        v-bind:class="{'pt-1 inputSubtextWrapper' : true, 'invisibleElement' : !citySearchText || (citySearchText && isSearchErrorShown)}"
      >{{PRESS_ENTER_TEXT}}</div>
      <div
        v-bind:class="{'pt-1 inputSubtextWrapper errorText' : true, 'invisibleElement' : !isSearchErrorShown}"
      >{{UNABLE_TO_FIND_LOCATION_TEXT}}</div>
      <div class="pt-2">or</div>
      <div class="pt-4">
        <button v-on:click='onDetectLocationButtonClick'>{{DETECT_LOCATION_TEXT}}</button>
      </div>
    </section>
  </footer>
</template>

<script>
import {
  FOOTER_TEXT,
  PRESS_ENTER_TEXT,
  DETECT_LOCATION_TEXT,
  FOOTER_INPUT_PLACEHOLDER,
  UNABLE_TO_FIND_LOCATION_TEXT,
  LOADING_TEXT
} from "../resources/texts/texts";

import { getGeocodesForLocation } from "../services/weatherService";

export default {
  name: "InteractiveLocationFooter",
  data: () => ({
    FOOTER_TEXT,
    PRESS_ENTER_TEXT,
    DETECT_LOCATION_TEXT,
    FOOTER_INPUT_PLACEHOLDER,
    UNABLE_TO_FIND_LOCATION_TEXT,
    LOADING_TEXT,
    citySearchText: "",
    isLoading: false,
    isSearchErrorShown: false
  }),
  props: ["isFooterExpanded"],
  methods: {
    onToggleFooter: function() {
      if (!this.isFooterExpanded) {
        this.citySearchText = "";
        this.$emit("footerToggle");
      }
    },
    onCloseClick: function() {
      this.citySearchText = "";
      this.$emit("footerToggle");
    },
    onLocationSearchError: function(err) {
      this.isSearchErrorShown = true;
      setTimeout(() => {
        console.log(err);
        this.isSearchErrorShown = false;
      }, 3000);
    },
    onLocationSearch: function() {
      if (this.citySearchText) {
        this.isLoading = true;
        const geocodePromise = getGeocodesForLocation(this.citySearchText);
        geocodePromise.then(
          res => {
            this.isLoading = false;
            const {
              data: { [0]: { lat = "", lon = "" } = {} }
            } = res;

            this.citySearchText = "";

            this.$emit("updateCoordinates", lat, lon);
            this.$emit("footerToggle");
          },
          err => {
            this.isLoading = false;
            this.onLocationSearchError(err);
          }
        );
      }
    },
    onDetectLocationButtonClick : function() {
      this.$emit('getCurrentLocation');
      this.$emit("footerToggle");
    }
  }
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
  transition: all 0.5s ease;
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

.errorText {
  color: red;
}

input {
  outline: none;
  border: none;
  width: 100%;
  background: transparent;
}

button {
  padding: 0.35rem 0.5rem 0.25rem 0.5rem;
  border-radius: 1rem;
  text-align: left;
  color: white;
  background: black;
}

.invisibleElement {
  height: 0;
  width: 0;
  opacity: 0;
  transition: height 0.5s ease;
}
</style>