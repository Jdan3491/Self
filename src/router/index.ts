import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: () => import('../views/WelcomeView/WelcomeView.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView/HomeView.vue')
    },
    {
      path: '/remove-item',
      name: 'removeitem',
      component: import('../views/RemoveItem/RemoveItem.vue')
    },
    {
      path: '/bag-selection',
      name: 'bagselection',
      component: import('../views/BagSelection/BagSelection.vue')
    },
    {
      path: '/payment-service',
      name: 'Payment',
      component: import('../views/Payment/Payment.vue')
    },
    {
      path: '/pay-cash',
      name: 'CashService',
      component: import('../views/Resolution/Cash.vue')
    },
    {
      path: '/sales',
      name: 'SalesView',
      component: import('../views/SalesView/SalesView.vue')
    },
    {
      path: '/.._cpass',
      name: '_Contactpass',
      component: import('../views/Resolution/_Contactpass.vue')
    },
    {
      path: '/.._paypal',
      name: '_paypal',
      component: import('../views/Resolution/_paypal.vue')
    }
  ]
})

export default router
