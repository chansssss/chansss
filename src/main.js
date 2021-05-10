import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/style/win98.css'

var Vue = createApp(App)

// 全局组件
import MyComputer from "@/views/my-computer";
Vue.component("MyComputer",MyComputer)

Vue.use(router).mount('#app')
