const shop = [
  {
    path: '/shop/:id',
    name: 'shop',
    meta: {
      title: '店铺首页'
    },
    component: () => import('@/pages/Shop')
  }
]

export default shop
