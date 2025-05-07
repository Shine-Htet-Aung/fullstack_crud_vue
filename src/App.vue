<template>
  <Header title="OutOfVerse" />
  <router-view />
</template>

<script>
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style>
#app {
  min-height: 100vh;
  background: #1a1a1a;
}

body {
  margin: 0;
  padding: 0;
  background: #1a1a1a;
}
</style>
