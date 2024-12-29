<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div id="app">
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
    <RouterView />
  </div>


</template>

<style scoped>
body {
  overflow: hidden;
}
#app {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-variant: tabular-nums;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
