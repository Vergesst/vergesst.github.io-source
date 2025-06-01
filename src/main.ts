import { createApp } from 'vue'
import router from './router/index'
import './style.css'
import './assets/main.css'
import App from './App.vue'

// vue-i18n
import { createI18n } from 'vue-i18n'

// translation files
import en from './assets/locales/en.json'
import zh from './assets/locales/zh.json'

const i18n = createI18n({
  legacy: false, // <-- This is correct for Composition API
  locale: 'zh', // <-- This sets the default language
  fallbackLocale: 'zh', // This is also correct
  messages: {
    en,
    zh,
  }
})

const app = createApp(App)

// Integrate i18n into Vue project
app.use(i18n)

// Integrate the Router into Vue project
app.use(router)

// Mount app
app.mount('#app')

