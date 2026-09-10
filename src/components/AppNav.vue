<template>
  <nav class="fixed top-5 inset-x-0 z-50 h-10 px-10">
    <div class="absolute left-10 h-full flex items-center font-bold">AliceLab</div>
    <div
      class="absolute left-1/2 -translate-x-1/2 flex w-max whitespace-nowrap rounded-full font-bold bg-white"
    >
      <RouterLink
        to="/#landing"
        class="bubbleBtn"
        :class="{ 'is-active': route.path === '/' && route.hash === '#landing' }"
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span class="z-10 hover:text-white transition-colors duration-1000">Home</span>
      </RouterLink>
      <RouterLink
        to="/#about"
        class="bubbleBtn"
        :class="{ 'is-active': route.path === '/' && route.hash === '#about' }"
        ><span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span class="z-10 hover:text-white transition-colors duration-800">About</span></RouterLink
      >
      <RouterLink
        to="/contact"
        class="bubbleBtn"
        :class="{ 'is-active': route.path === '/contact' }"
        ><span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span class="z-10 hover:text-white transition-colors duration-800"
          >Contact</span
        ></RouterLink
      >
    </div>
    <div class="absolute right-10 h-full flex items-center">languages</div>
  </nav>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<style scoped>
.bubbleBtn {
  position: relative;
  display: inline-flex;
  height: 40px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 20px;
  background-color: transparent;
  padding: 0.75rem;
  text-transform: uppercase;
  white-space: nowrap;
}
.bubbleBtn span:not(:last-child) {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 30px;
  height: 30px;
  border-radius: 9999px;
  background-color: #000;
  transform: translate(-50%, -50%);
  transition: transform 0.7s ease;
}

.bubbleBtn span:last-child {
  position: relative;
  z-index: 1;
}

.bubbleBtn span:nth-child(1) {
  transform: translate(-3.3em, -4em);
}

.bubbleBtn span:nth-child(2) {
  transform: translate(-6em, 1.3em);
}

.bubbleBtn span:nth-child(3) {
  transform: translate(-0.2em, 1.8em);
}

.bubbleBtn span:nth-child(4) {
  transform: translate(3.5em, 1.4em);
}

.bubbleBtn span:nth-child(5) {
  transform: translate(3.5em, -3.8em);
}

.bubbleBtn:hover span:not(:last-child) {
  transform: translate(-50%, -50%) scale(4);
  transition: transform 1.5s ease;
  color: #fff;
}
.bubbleBtn.is-active {
  color: white;
  background-color: black;
  pointer-events: none;
}
</style>
