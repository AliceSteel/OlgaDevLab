<template>
  <AppNav />
  <main class="bg-gray-100 min-h-screen">
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import AppNav from './components/AppNav.vue'
</script>

<style scoped></style>
