import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router'

import Home from '../components/Home.vue'
import Blog from '../components/Blog.vue'
import NotFound from '../components/NotFound.vue'
import About from '../components/About.vue'
import Archive from '../components/Archive.vue'
import Friends from '../components/Friends.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'HomePage',
    component: Home,
    alias: '/home'
  },
  {
    path: '/blog/:slug',
    name: 'Blog',
    component: Blog,
    props: true,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/blog/archive',
    name: 'BlogArchive',
    component: Archive,
  },
  {
    path: '/friends',
    name: 'Friends',
    component: Friends,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
