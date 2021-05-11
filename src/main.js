import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/style/win98.css'

var Vue = createApp(App)

// 全局组件
import MyComputer from "@/views/my-computer";
import AboutMe from "@/views/about-me";
import StartMenu from "@/views/start-menu";

import Win98Dialog from "@/components/Win98Dialog";

Vue.component("MyComputer",MyComputer)
Vue.component("AboutMe",AboutMe)
Vue.component("Win98Dialog",Win98Dialog)
Vue.component("StartMenu",StartMenu)

Vue.use(router).mount('#app')
