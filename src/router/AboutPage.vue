<template>
  <div class="w-full text-xl py-20">
    <section class="mx-[15%] py-24 text-2xl">
      <h2 class="text-3xl mb-5">About me</h2>

      <img
        src="/assets/media/about_me.jpg"
        alt="About me image"
        class="object-cover w-52 float-right rounded-4xl ml-1 shadow-2xl shadow-amber-800"
      />
      <p class="mb-5">
        I’m a web engineer focused on building fast, well-structured web products that are built to
        last. Most recently, I worked with a major Danish building-products company, helping build
        and evolve a headless e-commerce platform that brought more than 20 regional webshops onto a
        shared Vue 3 / Nuxt codebase, with Sitecore powering the content layer. The goal was to make
        a large multi-market platform feel like one coherent product, while keeping it fast and
        maintainable as it grew.
      </p>

      <p class="mb-5">
        Since early 2026, I’ve been working independently on frontend builds and full-stack
        products, collaborating directly with clients. I like being involved early, understanding
        what we're actually trying to solve, and finding the simplest technical solution that will
        hold up once the product leaves the demo stage.
      </p>
      <p>
        I’m happiest somewhere between Figma, the browser and a slightly unreasonable amount of
        attention to detail.
      </p>
    </section>
    <section>
      <h2 class="text-3xl mb-10 px-[15%]">My Services:</h2>
      <ul class="relative flex w-full flex-col items-start justify-around border-t border-black/80">
        <li
          v-for="(service, i) in services"
          :key="i"
          class="relative flex flex-wrap lg:flex-nowrap min-h-30 w-full items-center border-b border-black/80 px-[15%] py-4 gap-5 lg:gap-10"
        >
          <h3 class="w-full lg:w-1/3 shrink-0 text-3xl lg:text-5xl">
            {{ Object.keys(service)[0] }}
          </h3>
          <p>{{ Object.values(service)[0] }}</p>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
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
