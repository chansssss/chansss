import { createRouter, createWebHistory } from 'vue-router'
import Desktop from '../views/Desktop.vue'

const routes = [
  {
    path: '/',
    name: 'Desktop',
    component: Desktop
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
