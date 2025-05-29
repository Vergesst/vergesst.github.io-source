import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router'

import Home from '../components/Home.vue'
import JSPlayground from '../components/JSPlayground.vue'
import Blog from '../components/Blog.vue'

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
  },
  {
    path: '/blog/:slug',
    name: 'Blog',
    component: Blog,
    props: true,
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
