// import { getToken } from '@/utils/storage'
import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { getToken } from '@/utils/storage'

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else if (getToken()) {
    next('/login')
  } else {
    next()
  }
})

export default router
