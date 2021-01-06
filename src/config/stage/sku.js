const skuRouter = {
  route: null,
  name: null,
  title: 'SKU管理',
  type: 'folder',
  icon: 'iconfont icon-huiyuanguanli',
  filePath: 'view/sku/',
  order: null,
  inNav: true,
  children: [
    {
      route: '/sku/list',
      name: null,
      title: 'SKU列表',
      type: 'view', // 取 route 为默认加载页
      icon: 'iconfont icon-huiyuanguanli',
      filePath: 'view/sku/sku.vue',
      inNav: true,
    },
  ],
}

export default skuRouter
