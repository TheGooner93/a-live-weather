<template>
  <Fragment>
    <h4>Built by:</h4>
    <h5>
      <span>Mohammed Ehab </span>
      <span>© </span>
      <span>{{ new Date().getFullYear() }}</span>
    </h5>
    <div class="linkContainer">
      <CustomButton
        faClass="fas fa-globe-americas"
        v-on:onClickCallback="onWebsiteClick"
      />
      <CustomButton faClass="fab fa-github" v-on:onClickCallback="onGHClick" />
      <CustomButton
        faClass="fab fa-linkedin"
        v-on:onClickCallback="onLinkedInClick"
      />
    </div>
  </Fragment>
</template>

<script>
import CustomButton from "./common/CustomButton";
import { Fragment } from "vue-fragment";
import * as LINKS from "../resources/texts/externalLinks";
export default {
  name: "ProfileCard",
  components: { CustomButton, Fragment },
  methods: {
    onWebsiteClick() {
      window.open(LINKS.WEBSITE);
    },
    onGHClick() {
      window.open(LINKS.GITHUB);
    },
    onLinkedInClick() {
      window.open(LINKS.LINKEDIN);
    },
  },
};
</script>

<style scoped>
.linkContainer {
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
}
</style>