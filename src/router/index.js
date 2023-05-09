import { createRouter, createWebHashHistory } from 'vue-router'
import { getCookieToken } from '@/utils/cookie'

/**
 * 路由阻擋
 */

const checkAuth = async (to, from) => {
  if (!getCookieToken()) {
    return { path: '/signIn' }
  } else {
    return true
  }
}

const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_PUBLISH_PATH),
  linkActiveClass: 'bg-bgself-light',
  routes: [
    {
      path: '/exampleTest',
      name: 'exampleTest',
      component: () => import('@/views/ExampleTest.vue')
    },
    {
      path: '/exampleLazy',
      name: 'exampleLazy',
      component: () => import('@/views/ExampleLazy.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@/views/TestTest.vue')
    },
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/signIn',
      name: 'signIn',
      component: () => import('@/views/SignIn.vue')
    },
    {
      path: '/seat',
      name: 'seat',
      component: () => import('@/views/frontEnd/SeatView.vue'),
      beforeEnter: [checkAuth]
    },
    {
      path: '/product',
      name: 'product',
      component: () => import('@/views/frontEnd/ProductView.vue'),
      beforeEnter: [checkAuth]
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('@/views/frontEnd/OrderView.vue'),
      beforeEnter: [checkAuth]
    },
    {
      path: '/member',
      name: 'member',
      component: () => import('@/views/frontEnd/MemberView.vue'),
      beforeEnter: [checkAuth]
    },
    {
      path: '/chef',
      name: 'chef',
      component: () => import('@/views/frontEnd/ChefView.vue'),
      beforeEnter: [checkAuth]
    },
    {
      path: '/userAdmin',
      name: 'userAdmin',
      component: () => import('@/views/backEnd/UserAdmin.vue'),
      beforeEnter: [checkAuth]
    },
    {
      path: '/productAdmin',
      name: 'productAdmin',
      component: () => import('@/views/backEnd/ProductAdmin.vue'),
      beforeEnter: [checkAuth]
    },
    {
      path: '/seatAdmin',
      name: 'seatAdmin',
      component: () => import('@/views/backEnd/SeatAdmin.vue'),
      beforeEnter: [checkAuth]
    },
    {
      path: '/couponAdmin',
      name: 'couponAdmin',
      component: () => import('@/views/backEnd/CouponAdmin.vue'),
      beforeEnter: [checkAuth]
    },
    {
      path: '/reportAdmin',
      name: 'reportAdmin',
      component: () => import('@/views/backEnd/ReportAdmin.vue'),
      beforeEnter: [checkAuth]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('@/views/NotFound.vue')
    }
  ]
})

export default router
