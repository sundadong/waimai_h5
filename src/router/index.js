import Vue from 'vue'
import VueRouter from 'vue-router'
import util from '@/utils/util'
import Home from '@/pages/Home'
import position from './position'
import shop from './shop'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      title: '门店列表'
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
    util.setTitle(to.meta.title)
  }
  next()
})

export default router
