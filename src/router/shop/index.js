const shop = [
  {
    path: '/shop/:id',
    name: 'shop',
    meta: {
      title: '门店首页'
    },
    component: () => import('@/pages/Shop')
  }
]

export default shop
