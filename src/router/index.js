import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import Desktop from '../views/Desktop.vue'

const routes = [
  {
    path: '/',
    name: 'Desktop',
    component: Desktop
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: routes
})

const router = createRouter()

export default router
