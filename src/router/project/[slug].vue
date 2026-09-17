<template>
  <section v-if="projectDetails" class="w-full mx-auto flex flex-wrap sm:flex-nowrap">
    <!-- project details -->
    <div class="w-full sm:w-1/2 bg-white text-black relative ">
      <div class="sticky top-0 h-screen flex flex-col items-end justify-center px-10 py-20 text-xl">
        <div class="max-w-96 flex flex-col gap-5 text-justify">
          <h1>{{ projectDetails.title }}</h1>
          <p>{{ projectDetails.descr }}</p>
          <p>
            <ul class="list-disc pl-5">Techical Details:
              <li v-for="(value, key) in projectDetails.stack" :key="key">
                {{ key }}: {{ Array.isArray(value) ? value.join(', ') : value }}
              </li>
            </ul>
            

          </p>
          <a :href="projectDetails.websiteUrl" target="_blank" rel="noopener"> Visit website </a>
        </div>
      </div>
    </div>
    <!-- project images -->
    <div class="flex flex-col gap-5 w-full sm:w-1/2 pt-11">
      <img
        v-for="(image, key) in images"
        :key="key"
        class="w-fullmin-h-[80vh] object-cover object-top-left mx-auto sm:mx-0"
        :src="image.url"
        :alt="image.altText"
      />
    </div>
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
const images = ref<{ url: string; altText: string }[]>([])

onMounted(async () => {
  const slug = String(route.params.slug)

  try {
    const project = await import(`../../assets/data/${slug}.json`)
    projectDetails.value = project.default as ProjectDetails
    images.value = [
      { url: projectDetails.value.pic1 || '', altText: `${projectDetails.value.title} Image 1` },
      { url: projectDetails.value.pic2 || '', altText: `${projectDetails.value.title} Image 2` },
      { url: projectDetails.value.pic3 || '', altText: `${projectDetails.value.title} Image 3` },
      { url: projectDetails.value.pic4 || '', altText: `${projectDetails.value.title} Image 4` },
      { url: projectDetails.value.pic5 || '', altText: `${projectDetails.value.title} Image 5` },
    ].filter((image) => image.url)
  } catch {
    projectDetails.value = null
  }
})
</script>
