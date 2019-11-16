import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/wifi',
    name: 'wifi',
    component: () => import('../views/WIFI.vue')
  },
  {
    path: '/ntrip',
    name: 'ntrip',
    component: () => import('../views/NTRIP.vue')
  },
  {
    path: '/gps',
    name: 'gps',
    component: () => import('../views/GPS.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
