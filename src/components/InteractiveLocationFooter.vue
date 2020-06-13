<template>
  <footer class="footerStyle">
   <span>{{footerText}}</span>
  </footer>
</template>

<script>
import { FOOTER_TEXT } from "../resources/texts/texts";
export default {
  name: "InteractiveLocationFooter",
  data : () => ({
      footerText : FOOTER_TEXT
  })
};
</script>

<style scoped>
.footerStyle {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  background: whitesmoke;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 5vh;
  box-shadow: 0 -1px 5px gray;
}
</style>