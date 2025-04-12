import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import type { Router } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('@/views/DashboardView.vue'),
  },
  {
    path: '/text-input-test',
    name: 'text-input-test',
    component: () => import('@/views/TextInputTestView.vue'),
  },
]

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
