import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { initFlowbite } from 'flowbite'
import 'vue-toast-notification/dist/theme-sugar.css'

import './assets/index.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(initFlowbite)

app.mount('#app')
