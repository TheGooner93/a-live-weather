<template>
  <footer v-on:click.self="onToggleFooter" class="footer">
    <span v-if="!isFooterExpanded">
      <strong v-on:click.self="onToggleFooter">{{FOOTER_TEXT}}</strong>
    </span>
    <div
      v-bind:class="{'invisibleElement' : !isFooterExpanded, 'closeTextWrapper': isFooterExpanded}"
      v-on:click="onCloseClick"
    >
      <i class="fas fa-times fa-lg"></i>
    </div>
    <section
      v-bind:class="{'invisibleElement' : !isFooterExpanded, 'locationInputSection': isFooterExpanded}"
    >
      <div class="locationInputWrapper">
        <input v-bind:placeholder="FOOTER_INPUT_PLACEHOLDER" v-model="citySearchText" />
      </div>
      <div
        v-bind:class="{'pt-1 pressEnterTextWrapper' : true, 'invisibleElement' : !citySearchText}"
      >{{PRESS_ENTER_TEXT}}</div>
      <div class="pt-2">or</div>
      <div class="pt-4">
        <button>{{DETECT_LOCATION_TEXT}}</button>
      </div>
    </section>
  </footer>
</template>

<script>
import {
  FOOTER_TEXT,
  PRESS_ENTER_TEXT,
  DETECT_LOCATION_TEXT,
  FOOTER_INPUT_PLACEHOLDER
} from "../resources/texts/texts";

export default {
  name: "InteractiveLocationFooter",
  data: () => ({
    FOOTER_TEXT,
    PRESS_ENTER_TEXT,
    DETECT_LOCATION_TEXT,
    FOOTER_INPUT_PLACEHOLDER,
    citySearchText: ""
  }),
  props: ["isFooterExpanded"],
  methods: {
    onToggleFooter: function() {
      if (!this.isFooterExpanded) {
        this.$emit("footerToggle");
      }
    },
    onCloseClick: function() {
      this.citySearchText = "";
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
  border-color: lightgrey;
  border-style: solid;
  border-width: 0px 1px 1px 1px;
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
  /* visibility: visible; */
}

.locationInputWrapper {
  border-bottom: 1px lightgray solid;
}

.pressEnterTextWrapper {
  text-align: left;
  font-size: 1rem;
  opacity: 1;
  padding: 1px 2px;
  height : 2rem;
  transition: all 0.5s ease;
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