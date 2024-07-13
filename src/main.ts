import { createApp } from 'vue'
import App from './App.vue'
// svg
import 'virtual:svg-icons-register'

import '@/styles/index.scss'

import pinia from './stores'

const app = createApp(App)

app.use(pinia).mount('#app')
