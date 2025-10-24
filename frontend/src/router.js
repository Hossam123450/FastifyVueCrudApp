// src/router.js
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('./Home.vue') // adapte selon ton projet
  },
  {
    path: '/post/:slug',
    component: () => import('./Post.vue')
  },
  {
    path: '/post/:slug/edit',
    component: () => import('./EditPost.vue')
  },
  {
    path: '/post/new',
    component: () => import('./NewPost.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
