import Vue from 'vue'
import VueRouter from 'vue-router'
import Position from '@/pages/Position'
import Home from '@/pages/Home'
import Shop from '@/pages/Shop'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/position',
      name: 'position',
      component: Position
    },
    {
      path: '/shop/:id',
      name: 'shop',
      component: Shop
    }
  ]
})

export default router
