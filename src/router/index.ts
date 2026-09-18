import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }

    return { top: 0 }
  },

  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('./HomePage.vue'),
    },
    {
      path: '/contact',
      name: 'Contact',
      component: () => import('./ContactPage.vue'),
    },
    {
      path: '/project/:slug',
      name: 'project',
      component: () => import('./project/[slug].vue'),
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('./AboutPage.vue'),
    },
  ],
})

export default router
