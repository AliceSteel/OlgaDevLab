<template>
  <div class="w-full text-xl py-16 relative">
    <section class="mx-10 xl:mx-[15%] flex flex-col lg:flex-row gap-12 items-start relative">
      <article class="flex flex-col items-start justify-start h-fit gap-12 w-1/2 lg:w-1/3">
        <div>
          <span class="text-sm uppercase text-gray-500">about</span>
          <div class="border-b border-gray-500 w-7 h-2"></div>
        </div>
        <div class="z-10 text-shadow-2xl text-shadow-white">
          <h2 class="font-bold text-9xl">Hi,</h2>
          <h3 class="font-bold text-7xl md:text-8xl max-w-[50vw] text-wrap">I’m Olga.</h3>
        </div>

        <h3 class="text-sm text-wrap uppercase w-8 pb-10 border-b border-gray-500">web engineer</h3>
        <p class="flex flex-col text-sm uppercase items-start text-gray-500">
          <span>ideas</span><span>into apps.</span>
        </p>
      </article>
      <article class="w-full lg:w-1/3 flex flex-col items-start gap-5 justify-between py-10">
        <p class="text-3xl">I buil fast, well-structured web products that are built to last.</p>
        <p>
          Most recently, I worked with a major Danish building-products company, helping build and
          evolve a headless e-commerce platform that brought more than 20 regional webshops onto a
          shared Vue 3 / Nuxt codebase, with Sitecore powering the content layer. The goal was to
          make a large multi-market platform feel like one coherent product, while keeping it fast
          and maintainable as it grew.
        </p>

        <p>
          Since early 2026, I’ve been working independently on frontend builds and full-stack
          products, collaborating directly with clients. I like being involved early, understanding
          what we're actually trying to solve, and finding the simplest technical solution that will
          hold up once the product leaves the demo stage.
        </p>
        <p class="italic pl-10 border-l">
          I’m happiest somewhere between Figma, the browser and a slightly unreasonable amount of
          attention to detail.
        </p>
      </article>

      <div
        class="absolute top-0 right-0 z-0 lg:static w-2/3 sm:w-75 h-fit rounded-r-4xl overflow-hidden xl:mx-10 mt-10"
      >
        <img
          src="/assets/media/profile_photo.png"
          alt="About me image"
          class="object-cover w-full"
        />
      </div>
    </section>
    <section>
      <h2 class="text-3xl mb-10 px-10 sm:px-[15%]">My Services:</h2>
      <ul class="relative flex w-full flex-col items-start justify-around border-t border-black/80">
        <li
          v-for="(service, i) in services"
          :key="i"
          class="relative flex flex-wrap lg:flex-nowrap min-h-30 w-full items-center border-b border-black/80 px-10 sm:px-[15%] py-4 gap-5 lg:gap-10"
        >
          <h3 class="w-full lg:w-1/3 shrink-0 text-3xl lg:text-5xl">
            {{ Object.keys(service)[0] }}
          </h3>
          <p>{{ Object.values(service)[0] }}</p>
        </li>
      </ul>
    </section>
    <div class="text-base fixed bottom-5 left-10">
      <BubbleLinkBtn
        to="/contact"
        text="Let's Talk ->"
        hoverColor="#000"
        color="#fff"
        backgroundColor="#000"
        class="border-black border"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import BubbleLinkBtn from '@/components/BubbleLinkBtn.vue'

type Services = { [key: string]: string }[]

const services: Services = [
  { 'App and website development': 'Turning custom designs into pixel perfect applications.' },
  {
    'Headless e-commerce':
      'Storefronts and checkout flows built against a headless backend, including payment integrations.',
  },
  {
    'Design systems & component libraries':
      'Shared reusable UI component libraries that keep a product consistent across markets or teams, and reduce rework on new features.',
  },
  {
    'Performance & SSR':
      'Optimizing applications for speed and server-side rendering to improve user experience and SEO.',
  },
  {
    'Full-stack product builds':
      'End-to-end development of products, ensuring seamless integration and performance.',
  },
]
</script>
