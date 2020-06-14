<template>
  <!-- <footer v-on="{click.self: isFooterExpanded ? '' : onToggleFooter}" class="footer"> -->
  <footer v-on:click.self="onToggleFooter" class="footer">
    <span v-if="!isFooterExpanded">
      <strong v-on:click.self="onToggleFooter">{{footerText}}</strong>
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
        <input placeholder="Type a city..." v-model="citySearchText" />
      </div>
      <div class="pt-4">or</div>
      <div class="pt-4">
        <button>Detect Current Location</button>
      </div>
    </section>
  </footer>
</template>

<script>
import { FOOTER_TEXT } from "../resources/texts/texts";

export default {
  name: "InteractiveLocationFooter",
  data: () => ({
    footerText: FOOTER_TEXT,
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
  box-shadow: 0 -1px 5px gray;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
}

.footer:hover {
  box-shadow: 0 -1px 10px gray;
}

.closeTextWrapper {
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  padding: 1rem;
  opacity: 1;
  transition: all 0.5s ease-out;
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
  border-bottom: 1px lightgray solid;
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