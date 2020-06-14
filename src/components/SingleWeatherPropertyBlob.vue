<template>
  <div class="blobWrapper">
    <i v-bind:class="iconSrc"></i>
    <span class="ml-1 mr-3 propertyValue">{{propertyValue}}</span>
  </div>
</template>

<script>
export default {
  name: "SingleWeatherPropertyBlob",
  props: ["iconSrc", "propertyValue"]
};
</script>

<style scoped>
.blobWrapper {
  font-size: 1.5rem;
  text-align: center;
  display: flex;
  align-items: center;
  flex-grow: 1;
  justify-content: center;
}
.propertyValue {
  font-size: 1.2rem;
}
</style>