import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@renderer/views/home.vue'
import Layout from '@renderer/components/layout.vue'
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      children: [
        {
          path: '',
          name: '首页',
          component: HomeView
        }
      ]
    }
  ]
})

export default router
