<template>
  <div class="blobWrapper">
    <i v-bind:class="iconSrc"></i>
    <span class="ml-2 propertyData">{{propertyValue}}</span>
    <span class=" ml-1 mr-4 propertyData">{{propertyUnit}}</span>
  </div>
</template>

<script>
export default {
  name: "SingleWeatherPropertyBlob",
  props: ["iconSrc", "propertyObject"],
  computed : {
    propertyValue() {
      return this.propertyObject['value']
    },
    propertyUnit() {
      return this.propertyObject['unit']
    },
  }
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
.propertyData {
  font-size: 1.2rem;
}
</style>