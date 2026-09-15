<template>
  <nav class="fixed top-5 inset-x-0 z-50 h-10 px-10">
    <div
      class="inline-flex sm:hidden absolute left-10 h-full items-center font-bold bg-white rounded-full px-4 -ml-5"
    >
      OD
    </div>
    <div
      class="hidden sm:flex absolute left-10 h-full items-center font-bold bg-white rounded-full px-4 -ml-5"
    >
      <span
        class="overflow-hidden transition-all duration-500 ease-in"
        :class="isScrolled ? 'w-3' : 'w-9'"
      >
        Olga
      </span>

      <!-- <span v-if="isScrolled">.</span> -->
      <span
        class="overflow-hidden transition-all duration-500 ease-in"
        :class="isScrolled ? 'w-2.75' : 'w-14'"
        >DevLab</span
      >
    </div>
    <div
      class="absolute right-0 sm:left-1/2 sm:-translate-x-1/2 flex w-max whitespace-nowrap rounded-full font-bold bg-white"
    >
      <RouterLink
        to="/#landing"
        class="bubbleBtn relative inline-flex h-10 items-center justify-center overflow-hidden rounded-full bg-transparent px-3 uppercase whitespace-nowrap"
        :class="{ 'is-active': route.path === '/' && route.hash === '#landing' }"
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span class="z-10 hover:text-white sm:transition-colors duration-1000">Home</span>
      </RouterLink>
      <RouterLink
        to="/#projects"
        class="bubbleBtn relative inline-flex h-10 items-center justify-center overflow-hidden rounded-full bg-transparent px-3 uppercase whitespace-nowrap"
        :class="{ 'is-active': route.path === '/' && route.hash === '#projects' }"
        ><span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span class="z-10 sm:hover:text-white sm:transition-colors duration-800"
          >Projects</span
        ></RouterLink
      >
      <RouterLink
        to="/contact"
        class="bubbleBtn relative inline-flex h-10 items-center justify-center overflow-hidden rounded-full bg-transparent px-3 uppercase whitespace-nowrap"
        :class="{ 'is-active': route.path === '/contact' }"
        ><span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span class="z-10 sm:hover:text-white transition-colors duration-800"
          >Contact</span
        ></RouterLink
      >
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const isScrolled = ref<boolean>(false)

onMounted(() => {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 10
  })
})
const route = useRoute()
</script>

<style scoped>
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

.is-active,
.bubbleBtn.is-active {
  color: #000;
  background-color: #f0f0f0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  pointer-events: none;
}
@media (hover: hover) and (pointer: fine) {
  .bubbleBtn:hover span:not(:last-child) {
    transform: translate(-50%, -50%) scale(4);
    transition: transform 1.5s ease;
  }

  .bubbleBtn:hover span:last-child {
    color: white;
  }
}

@media (hover: none) {
  .bubbleBtn span:not(:last-child) {
    transform: translate(-3.3em, -4em);
  }
}
</style>
