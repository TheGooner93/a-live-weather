<template>
  <span class="ghIconStyle" v-on:click="onClickButton">
    <i v-bind:class="faClass" />
  </span>
</template>

<script>
export default {
  name: "CustomButton",
  props: ["onClickCallback", "faClass"],
  methods: {
    onClickButton() {
      this.$emit("onClickCallback");
    },
  },
};
</script>

<style scoped>
.ghIconStyle {
  background: white;
  border: 1px solid lightgrey;
  border-radius: 1rem;
  padding: 2px;
  height: 2rem;
  width: 3rem;
  transition: all 0.3s ease;
  cursor: pointer;
}

.ghIconStyle:active {
  transform: scale(0.8);
}

.ghIconStyle:hover {
  transition: all 0.3s ease;
  box-shadow: 5px 5px black;
}
</style>