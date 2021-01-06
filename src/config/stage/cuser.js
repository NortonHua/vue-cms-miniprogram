const cuserRouter = {
  title: 'C端数据',
  type: 'folder',
  name: Symbol('cuser'),
  route: null,
  filePath: 'view/cuser/',
  inNav: true,
  icon: 'iconfont icon-daima1',
  order: null,
  children: [
    {
      title: '订单列表',
      type: 'view',
      name: 'OrderList',
      route: '/cuser/order',
      filePath: 'view/cuser/order/order.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
    {
      title: 'C端用户列表',
      type: 'view',
      name: 'UserList',
      route: '/cuser/list',
      filePath: 'view/cuser/cuser/cuser.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
  ],
}

export default cuserRouter
