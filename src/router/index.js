import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_PUBLISH_PATH),
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
      component: () => import('@/views/frontEnd/SeatView.vue')
    },
    {
      path: '/product',
      name: 'product',
      component: () => import('@/views/frontEnd/ProductView.vue')
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('@/views/frontEnd/OrderView.vue')
    },
    {
      path: '/member',
      name: 'member',
      component: () => import('@/views/frontEnd/MemberView.vue')
    },
    {
      path: '/chef',
      name: 'chef',
      component: () => import('@/views/frontEnd/ChefView.vue')
    },
    {
      path: '/userAdmin',
      name: 'userAdmin',
      component: () => import('@/views/backEnd/UserAdmin.vue')
    },
    {
      path: '/productAdmin',
      name: 'productAdmin',
      component: () => import('@/views/backEnd/ProductAdmin.vue')
    },
    {
      path: '/seatAdmin',
      name: 'seatAdmin',
      component: () => import('@/views/backEnd/SeatAdmin.vue')
    },
    {
      path: '/couponAdmin',
      name: 'couponAdmin',
      component: () => import('@/views/backEnd/CouponAdmin.vue')
    },
    {
      path: '/reportAdmin',
      name: 'reportAdmin',
      component: () => import('@/views/backEnd/ReportAdmin.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('@/views/NotFound.vue')
    }
  ]
})

export default router
