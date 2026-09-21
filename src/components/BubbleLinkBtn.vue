<template>
  <RouterLink
    :to="to"
    class="bubbleBtn relative inline-flex h-10 items-center justify-center overflow-hidden rounded-full px-3 uppercase whitespace-nowrap"
    :class="{ 'is-active': isActive }"
    :style="{
      color: color,
      'background-color': backgroundColor,
      '--bubble-color': color,
      '--bubble-hover-color': hoverColor,
      '--bubble-bg': backgroundColor,
      '--bubble-hover-bg': hoverBg,
    }"
  >
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span class="z-10 hover:text-(--bubble-hover-color) sm:transition-colors duration-1000">{{
      text
    }}</span>
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

withDefaults(
  defineProps<{
    to: string
    text: string
    isActive?: boolean
    color?: string
    hoverColor?: string
    backgroundColor?: string
    hoverBg?: string
  }>(),
  {
    color: '#000',
    hoverColor: '#fff',
    backgroundColor: 'transparent',
    hoverBg: '#000',
    isActive: false,
  },
)
</script>

<style scoped>
.bubbleBtn span:not(:last-child) {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 30px;
  height: 30px;
  border-radius: 9999px;
  background-color: var(--bubble-color);
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
  background-color: var(--bubble-bg);
  box-shadow: 0 38px 50px -12px rgb(146 64 14 / 1);
  pointer-events: none;
}

@media (hover: hover) and (pointer: fine) {
  .bubbleBtn:hover span:not(:last-child) {
    transform: translate(-50%, -50%) scale(4);
    transition: transform 1.5s ease;
  }
  .bubbleBtn:hover span:last-child {
    color: var(--bubble-hover-color);
  }
}

@media (hover: none) {
  .bubbleBtn span:not(:last-child) {
    transform: translate(-3.3em, -4em);
  }
}
</style>
