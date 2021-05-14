import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/style/win98.css'

// 全局组件
import MyComputer from '@/views/my-computer'
import AboutMe from '@/views/about-me'
import StartMenu from '@/views/start-menu'
import Chess from '@/views/chess'
import Orbit from '@/views/orbit'

import Win98Dialog from '@/components/Win98Dialog'

Vue.component('MyComputer', MyComputer)
Vue.component('AboutMe', AboutMe)
Vue.component('Chess', Chess)
Vue.component('Win98Dialog', Win98Dialog)
Vue.component('StartMenu', StartMenu)
Vue.component('Orbit', Orbit)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
