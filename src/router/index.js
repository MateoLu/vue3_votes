// import { getToken } from '@/utils/storage'
import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'
import { getToken } from '@/utils/storage'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  const token = await getToken()
  if (to.path === '/auth') {
    if (token) {
      next('/home')
    } else {
      next()
    }
  } else if (to.name === 'survey') {
    next()
  } else {
    if (token == null || token === '') {
      next('/auth')
    } else {
      if (to.path === '/auth') {
        next('/home')
      } else {
        next()
      }
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
