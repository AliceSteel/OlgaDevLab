<template>
  <section v-if="projectDetails">
    <h1>{{ projectDetails.title }}</h1>
    <p>{{ projectDetails.descr }}</p>

    <a :href="projectDetails.websiteUrl" target="_blank" rel="noopener"> Visit website </a>
  </section>

  <p v-else>Project not found.</p>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

type ProjectDetails = {
  title?: string
  descr?: string
  pic1?: string
  pic2?: string
  pic3?: string
  pic4?: string
  pic5?: string
  stack?: Record<string, string | string[]>
  [key: string]: unknown
  flow?: string
  websiteUrl?: string
}
const route = useRoute()
const projectDetails = ref<ProjectDetails | null>(null)

onMounted(async () => {
  const slug = String(route.params.slug)

  try {
    const project = await import(`../../assets/data/${slug}.json`)
    projectDetails.value = project.default as ProjectDetails
  } catch {
    projectDetails.value = null
  }
})
</script>
