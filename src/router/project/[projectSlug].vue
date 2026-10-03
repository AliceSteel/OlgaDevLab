<template>
  <section v-if="projectDetails" class="bg-white w-full mx-auto flex flex-wrap sm:flex-nowrap">
    <!-- project details -->
    <div class="w-full sm:w-1/2 lg:w-1/3 text-black relative">
      <div
        class="sticky top-0 h-auto sm:h-screen flex flex-col items-end justify-center px-10 lg:px-20 py-20 text-xl"
      >
        <div class="max-w-96 flex flex-col gap-5 text-justify pb-10">
          <h1>{{ projectDetails.title }}</h1>
          <p>{{ projectDetails.descr }}</p>
          <p>Techical Details:</p>
          <ul class="list-disc pl-5">
            <li v-for="(value, key) in projectDetails.stack" :key="key">
              {{ key }}: {{ Array.isArray(value) ? value.join(', ') : value }}
            </li>
          </ul>

          <BubbleLinkBtn
            v-if="projectDetails.websiteUrl"
            :to="projectDetails.websiteUrl"
            text="visit->"
            hoverColor="#000"
            color="#fff"
            backgroundColor="#000"
            class="border-black border w-fit"
          />
        </div>
      </div>
    </div>
    <!-- project images -->
    <div class="grid w-full sm:w-1/2 lg:w-2/3 grid-cols-1 gap-5 pt-11 sm:grid-cols-11">
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
import BubbleLinkBtn from '@/components/BubbleLinkBtn.vue'

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
  const slug = String(route.params.projectSlug)

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
