import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/main',
    name: 'Main',
    component: Main,
    children:[{
      path: "home",
      name: "Home",
      component: () => import("../views/Home.vue")
    },{
      path: "menu",
      name: "Menu",
      component: () => import("../views/Menu.vue")
    },{
      path: "shopbag",
      name: "Shopbag",
      component: () => import("../views/Shopbag.vue")
    },{
      path: "my",
      name: "My",
      component: () => import("../views/My.vue")
    }]
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/Detail',
    name: 'Detail',
    component: () => import('../views/Detail.vue')
  },
  {
    path: '/Pay',
    name: 'Pay',
    component: () => import('../views/Pay.vue')
  },
  {
    path: '/Account',
    name: 'Account',
    component: () => import('../views/Account.vue')
  },
  {
    path: '/Order',
    name: 'Order',
    component: () => import('../views/Order.vue')
  },
  {
    path: '/Like',
    name: 'Like',
    component: () => import('../views/Like.vue')
  },
  {
    path: '/Address',
    name: 'Address',
    component: () => import('../views/Address.vue')
  },
  {
    path: '/NewAddress',
    name: 'NewAddress',
    component: () => import('../views/NewAddress.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue')
  },
  {
    path: '/secure',
    name: 'Secure',
    component: () => import('../views/Secure.vue')
  },
  // 网页重定向
  {
    path: "*",
    redirect: {
      name: "Home"
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
