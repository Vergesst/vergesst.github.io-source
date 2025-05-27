import { createApp } from 'vue'
import router from './router/index'
import './style.css'
import App from './App.vue'

const app = createApp(App)

// Integrate the Router into Vue project
app.use(router)

// Mount app
app.mount('#app')

