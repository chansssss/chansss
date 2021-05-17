import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/style/win98.css'

// 全局组件
import MyComputer from '@/views/my-computer'
import AboutMe from '@/views/about-me'
import AboutProject from '@/views/about-project'
import StartMenu from '@/views/start-menu'
import Chess from '@/views/chess'
import Orbit from '@/views/orbit'
import ChanMarkdown from '@/views/chan-markdown'

import Win98Dialog from '@/components/Win98Dialog'
import ToolBar from '@/components/ToolBar'
import ToolTip from '@/components/ToolTip'
import Nexttt from '@/components/Nexttt'

Vue.component('MyComputer', MyComputer)
Vue.component('ChanMarkdown', ChanMarkdown)
Vue.component('AboutProject', AboutProject)
Vue.component('AboutMe', AboutMe)
Vue.component('Chess', Chess)
Vue.component('Win98Dialog', Win98Dialog)
Vue.component('ToolBar', ToolBar)
Vue.component('ToolTip', ToolTip)
Vue.component('StartMenu', StartMenu)
Vue.component('Orbit', Orbit)
Vue.component('Nexttt', Nexttt)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
