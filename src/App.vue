<template>
  <div id="app">
    <WeatherComponent />
  </div>
</template>

<script>
import WeatherComponent from './components/WeatherComponent.vue'

export default {
  name: 'App',
  components: {
    WeatherComponent
  }
}
</script>

<style>
#app {
  font-family: Reem-Kufi, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
  position: relative;
}

@font-face {
  font-family: 'Reem-Kufi';
  src: local('Reem-Kufi'), url(./resources/fonts/Reem-Kufi/ReemKufi-Regular.ttf) format('truetype');
}

</style>
