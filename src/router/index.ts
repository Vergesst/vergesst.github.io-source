import { createRouter, RouteRecordRaw, createWebHistory } from 'vue-router'

import Home from '../components/Home.vue'
import JSPlayground from '../components/JSPlayground.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'HomePage',
    component: Home,
    alias: '/home'
  },
  {
    path: '/jsplayground',
    name: 'JavaScriptPlayground',
    component: JSPlayground,
    alias: '/playground',
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
