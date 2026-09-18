<template>
  <AppNav />
  <main class="bg-gray-100 min-h-screen">
    <RouterView />
  </main>
  <Analytics />
</template>

<script setup lang="ts">
import AppNav from './components/AppNav.vue'
import { Analytics } from '@vercel/analytics/vue'
</script>

<style scoped></style>
