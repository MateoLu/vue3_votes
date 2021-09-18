// import { getToken } from '@/utils/storage'
import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'
import { getToken } from '@/utils/storage'

const token = getToken()

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    if (token) {
      next('/home')
    } else {
      next()
    }
  } else {
    if (token == null || token === '') {
      next('/login')
    } else {
      if (to.path === '/login') {
        next('/home')
      } else {
        next()
      }
    }
  }
})

export default router
