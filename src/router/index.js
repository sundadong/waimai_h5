import Vue from 'vue'
import VueRouter from 'vue-router'
import * as Util from '@/util/util'
import Home from '@/pages/Home'
import position from './position'
import shop from './shop'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      title: '微外卖'
    },
    component: Home
  },
  ...position,
  ...shop
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    Util.setTitle(to.meta.title)
  }
  next()
})

export default router
