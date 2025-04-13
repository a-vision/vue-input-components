import { createRouter, createWebHistory } from 'vue-router'
import TextInputTestView from '../views/TextInputTestView.vue'
import FileUploadTestView from '../views/FileUploadTestView.vue'
import ActionTestView from '../views/ActionTestView.vue'
import DashboardView from '../views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView,
      meta: { title: 'Dashboard' },
    },
    {
      path: '/text-input',
      name: 'text-input',
      component: TextInputTestView,
      meta: { title: 'Text Input Test' },
    },
    {
      path: '/file-upload',
      name: 'file-upload',
      component: FileUploadTestView,
      meta: { title: 'File Upload Test' },
    },
    {
      path: '/action',
      name: 'action',
      component: ActionTestView,
      meta: { title: 'Action Test' },
    },
  ],
})

export default router
