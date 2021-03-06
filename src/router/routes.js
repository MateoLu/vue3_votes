/**
 * 路由配置目录
 */

// import router from '.'

const home = () => import('@/pages/home/index.vue')
const login = () => import('@/pages/login/index.vue')
const vote = () => import('@/pages/vote/index.vue')
const Page404 = () => import('@/components/Page404.vue')

const routes = [
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    name: 'home',
    component: home
  },
  {
    path: '/vote',
    name: 'vote',
    component: vote,
    children: [
      {
        path: '/vote/edit/:id',
        name: 'voteEdit',
        component: () => import('@/pages/vote/edit.vue'),
        meta: {
          isShow: true
        }
      },
      {
        path: '/vote/publish/:id',
        name: 'votePublish',
        component: () => import('@/pages/vote/publish.vue'),
        meta: {
          isPreview: true
        }
      },
      {
        path: '/vote/report/:id',
        name: 'voteReport',
        component: () => import('@/pages/vote/report.vue')
      }
    ]
  },
  {
    path: '/survey/:id',
    name: 'survey',
    component: () => import('@/pages/survey/index.vue')
  },
  {
    path: '/auth',
    name: 'auth',
    component: login
  },
  {
    path: '/:catchAll(.*)',
    name: '404',
    component: Page404
  }
]

export default routes
