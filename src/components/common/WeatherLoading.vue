<template>
  <div class="lottieWrapper" v-bind:style="borderStyle">
    <lottie-animation
      path="WeatherLoader.json"
      background="transparent"
      speed="1"
      style="width: 80px; height: 80px"
      loop
      controls
      autoplay
    />
  </div>
</template>

<script>
import LottieAnimation from "lottie-vuejs/src/LottieAnimation.vue"; // import lottie-vuejs
export default {
  name: "WeatherLoading",
  props : ['noBorder'],
  components: { LottieAnimation },
  computed : {
    borderStyle() {
      return {
        border: this.noBorder ? 'none' : '1px solid lightblue'
      }
    }
  }
};
</script>

<style scoped>
.lottieWrapper {
  display: inline-block;
  padding: 10px;
  border-radius: 1rem;
}
</style>