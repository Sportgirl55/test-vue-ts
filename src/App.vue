<template>
  <div id="app">
    <HomePage />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import HomePage from './components/HomePage.vue';

export default Vue.extend({
  name: 'App',
  components: {
    HomePage,
  },
});
</script>
