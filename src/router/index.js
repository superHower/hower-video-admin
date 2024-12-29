import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        title: '根路由',
      },
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      meta: {
        title: '关于',
      },
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
