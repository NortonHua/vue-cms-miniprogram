const spuRouter = {
  route: null,
  name: null,
  title: '商品管理',
  type: 'folder',
  icon: 'iconfont icon-huiyuanguanli',
  filePath: 'view/spu/',
  order: null,
  inNav: true,
  children: [
    {
      route: '/spu/list',
      name: null,
      title: '甜品列表',
      type: 'view', // 取 route 为默认加载页
      icon: 'iconfont icon-huiyuanguanli',
      filePath: 'view/spu/spu.vue',
      inNav: true,
    },
  ],
}

export default spuRouter
