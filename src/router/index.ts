import { createRouter, createWebHashHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import TextInputTestView from '../views/TextInputTestView.vue'
import FileUploadTestView from '../views/FileUploadTestView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView,
    },
    {
      path: '/text-input-test',
      name: 'text-input-test',
      component: TextInputTestView,
    },
    {
      path: '/file-upload-test',
      name: 'file-upload-test',
      component: FileUploadTestView,
    },
  ],
})

export default router
