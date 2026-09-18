<template>
  <section v-if="projectDetails" class="bg-white w-full mx-auto flex flex-wrap sm:flex-nowrap">
    <!-- project details -->
    <div class="w-full sm:w-1/2 text-black relative">
      <div
        class="sticky top-0 h-auto sm:h-screen flex flex-col items-end justify-center px-10 py-20 text-xl"
      >
        <div class="max-w-96 flex flex-col gap-5 text-justify">
          <h1>{{ projectDetails.title }}</h1>
          <p>{{ projectDetails.descr }}</p>
          <p>Techical Details:</p>
          <ul class="list-disc pl-5">
            <li v-for="(value, key) in projectDetails.stack" :key="key">
              {{ key }}: {{ Array.isArray(value) ? value.join(', ') : value }}
            </li>
          </ul>

          <a
            :href="projectDetails.websiteUrl"
            target="_blank"
            rel="noopener"
            class="group inline-flex w-fit items-center gap-2"
          >
            <span class="relative">
              Visit website
              <span
                class="absolute left-0 bottom-px h-px w-full origin-left scale-x-0 bg-black transition-transform duration-300 ease-out group-hover:scale-x-100"
              ></span>
            </span>
            <span
              class="h-2 w-2 border-t-2 border-r-2 border-black rotate-45 transition-transform duration-300 ease-out group-hover:translate-x-1"
            ></span>
          </a>
        </div>
      </div>
    </div>
    <!-- project images -->
    <div class="grid w-full grid-cols-1 gap-5 pt-11 sm:w-1/2 sm:grid-cols-11">
      <div
        v-for="(image, key) in images"
        :key="key"
        class="col-span-1 sm:odd:col-span-6 sm:odd:col-start-1 sm:even:col-span-7 sm:even:col-start-5"
      >
        <img
          class="h-auto w-full object-cover object-top-left"
          :src="image.url"
          :alt="image.altText"
        />
      </div>
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
