<template>
  <div>
    <section id="landing" class="h-[75vh] pb-12 px-10">
      <div class="flex flex-wrap justify-between items-end h-full">
        <p class="w-1/2 sm:w-48 text-sm">
          I specialize in crafting visually stunning and user-friendly app interfaces. My bread and
          butter lies in building a wow effects and buttons meant to be clicked.
        </p>
        <h1 class="w-full sm:w-3/5 sm text-6xl font-bold">
          Web Engineer and UX Enthusiast based in London.
        </h1>
      </div>
    </section>
    <section id="projects" class="h-screen pl-10 pt-14">
      <h2 class="text-2xl mb-6">Concept projects</h2>
      <div
        class="h-[60vh] flex items-center gap-4 overflow-x-auto snap-x snap-mandatory flex-nowrap pr-10"
      >
        <div
          v-for="project in projects"
          :key="project.id"
          @mouseenter="hoveredProject = project"
          @focusin="hoveredProject = project"
          class="w-[75vw] shrink-0 snap-start h-full rounded-2xl overflow-hidden"
        >
          <a :href="project.websiteUrl" target="_blank" class="">
            <img
              :src="project.pic1"
              :alt="project.name"
              class="w-full h-full object-cover object-top"
          /></a>
        </div>
      </div>

      <!-- Shared text placeholder -->
      <div class="project-description mt-6 min-h-20 text-2xl w-1/2">
        <div
          v-if="hoveredProject"
          :key="hoveredProject.id"
          class="typing-text"
          :aria-label="hoveredProject.descr"
        >
          <h3 class="font-bold">{{ hoveredProject.name }}</h3>
          <span
            v-for="(character, index) in hoveredProject.descr"
            :key="`${hoveredProject.id}-${index}`"
            class="typing-character"
            :style="{ animationDelay: `${index * 0.025}s` }"
          >
            {{ character }}
          </span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import projects from '@/assets/data/projects.json'
import { ref } from 'vue'

type Project = (typeof projects)[number]

const hoveredProject = ref<Project | null>(null)
</script>

<style scoped>
.typing-text {
  max-width: 100%;
  white-space: pre-wrap;
}

.typing-character {
  display: inline;
  opacity: 0;
  animation: type-character 0.01s linear forwards;
}

@keyframes type-character {
  to {
    opacity: 1;
  }
}
</style>
