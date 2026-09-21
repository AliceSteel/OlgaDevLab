<template>
  <nav class="fixed top-5 inset-x-0 z-50 h-10 px-10">
    <RouterLink
      to="/"
      title="Home"
      class="flex absolute left-10 h-full items-center font-bold bg-white rounded-full px-4 -ml-5 hover:bg-gray-100 hover:transition-colors hover:shadow-2xl"
      :class="{ 'is-active ': route.path === '/' }"
    >
      <span
        class="overflow-hidden transition-all duration-500 ease-in"
        :class="isScrolled ? 'w-3' : 'w-9'"
      >
        Olga
      </span>

      <span
        class="overflow-hidden transition-all duration-500 ease-in"
        :class="isScrolled ? 'w-2.75' : 'w-14'"
        >DevLab</span
      >
    </RouterLink>
    <!-- Links desktop -->
    <div
      class="hidden sm:flex absolute right-0 sm:left-1/2 sm:-translate-x-1/2 w-max whitespace-nowrap rounded-full font-bold bg-white"
    >
      <BubbleLinkBtn
        v-for="link in navLinks"
        :key="link.name"
        :to="link.path"
        :text="link.name"
        :is-active="
          link.isAnchor
            ? route.path === '/' && route.hash === link.routeHash
            : route.path === link.path
        "
      />
    </div>
    <!-- Links mobile trigger: two dots -->
    <button
      type="button"
      class="sm:hidden absolute right-10 h-full flex items-center gap-1.5 bg-white rounded-full px-4 -mr-5"
      aria-label="Toggle menu"
      @click="isMenuOpen = !isMenuOpen"
    >
      <span
        class="block w-2 h-2 rounded-full bg-black transition-transform duration-300"
        :class="{ 'translate-y-2.5 rotate-45': isMenuOpen }"
      ></span>
      <span
        class="block w-2 h-2 rounded-full bg-black transition-transform duration-300"
        :class="{ '-translate-y-2.5 -rotate-45': isMenuOpen }"
      ></span>
    </button>
    <!-- Mobile bubble menu -->
    <Transition name="bubble">
      <div
        v-if="isMenuOpen"
        class="sm:hidden fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
        @click="isMenuOpen = false"
      >
        <div class="bubble-panel bg-white/50 flex flex-col items-center justify-center" @click.stop>
          <div class="bubble-panel-content flex flex-col items-left gap-6">
            <RouterLink
              v-for="link in navLinks"
              :key="link.name"
              :to="link.path"
              class="text-2xl uppercase"
              :class="{
                'text-amber-800': link.isAnchor
                  ? route.path === '/' && route.hash === link.routeHash
                  : route.path === link.path,
              }"
              @click="isMenuOpen = false"
            >
              {{ link.name }}
            </RouterLink>
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import BubbleLinkBtn from '@/components/BubbleLinkBtn.vue'

const navLinks = [
  {
    name: 'Projects',
    path: '/#projects',
    routeHash: '#projects',
    isAnchor: true,
  },
  {
    name: 'About',
    path: '/about',
    isAnchor: false,
  },
  {
    name: 'Contact',
    path: '/contact',
    isAnchor: false,
  },
]

const isScrolled = ref<boolean>(false)
const isMenuOpen = ref<boolean>(false)

onMounted(() => {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 10
  })
})
const route = useRoute()

// close the mobile menu whenever navigation happens
watch(
  () => [route.path, route.hash],
  () => {
    isMenuOpen.value = false
  },
)

// prevent background scroll while the mobile menu is open
watch(isMenuOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})
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
  box-shadow: 0 38px 50px -12px rgb(146 64 14 / 1);
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
/* backdrop fade */
.bubble-enter-active,
.bubble-leave-active {
  transition: opacity 0.35s ease;
}
.bubble-enter-from,
.bubble-leave-to {
  opacity: 0;
}
/* panel: base/resting state is the expanded half-screen sheet */
.bubble-panel {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 50vh;
  border-radius: 0 0 2rem 2rem;
  overflow: hidden;
  transition:
    width 0.55s cubic-bezier(0.34, 1.56, 0.64, 1),
    height 0.55s cubic-bezier(0.34, 1.56, 0.64, 1),
    top 0.55s cubic-bezier(0.34, 1.56, 0.64, 1),
    right 0.55s cubic-bezier(0.34, 1.56, 0.64, 1),
    border-radius 0.4s ease;
}

/* only during enter-start / leave-end does it collapse to the 40px dot */
.bubble-enter-from .bubble-panel,
.bubble-leave-to .bubble-panel {
  top: 0.625rem;
  right: 2.25rem;
  width: 40px;
  height: 40px;
  border-radius: 9999px;
}

/* content: base/resting state is visible */
.bubble-panel-content {
  opacity: 1;
  transform: scale(1);
  transition:
    opacity 0.3s ease 0.25s,
    transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) 0.25s;
}

.bubble-enter-from .bubble-panel-content,
.bubble-leave-to .bubble-panel-content {
  opacity: 0;
  transform: scale(0.8);
}

.bubble-leave-active .bubble-panel-content {
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}
</style>
