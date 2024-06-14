import { createApp } from 'vue'
import App from './App.vue'
// svg
import 'virtual:svg-icons-register'

import '@/styles/index.scss'

import pinia from './stores'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(ElementPlus).use(pinia).mount('#app')
