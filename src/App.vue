<script setup lang="ts">
import { RouterView } from 'vue-router';
import 'primevue/resources/themes/lara-light-cyan/theme.css';
import 'normalize.css';
import Footer from './components/Footer.vue';
import ProgressSpinner from 'primevue/progressspinner'
import Nav from '@/components/Nav.vue';

</script>

<template>

  <Nav></Nav>
  <RouterView />
  <ProgressSpinner id="loadingSpinner" class="hidden"/>
  <Footer></Footer>
</template>



<style lang="scss" scoped>
@import  './vars.scss';

@font-face {
  font-family: 'glober';
  src: url('./Fontfabric - GloberRegular.otf');
}

@font-face {
  font-family: 'globerl';
  src: url('./Fontfabric\ -\ GloberLight.otf');
}


.content {
  max-width: 100vw;
  width: 1000px;
  margin-inline: auto;
}


</style>
