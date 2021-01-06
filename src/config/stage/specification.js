const specificationRouter = {
  route: null,
  name: null,
  title: '规格管理',
  type: 'folder',
  icon: 'iconfont icon-huiyuanguanli',
  filePath: 'view/specification/',
  order: null,
  inNav: true,
  children: [
    {
      route: '/specification/list',
      name: null,
      title: '规格名列表',
      type: 'view', // 取 route 为默认加载页
      icon: 'iconfont icon-huiyuanguanli',
      filePath: 'view/specifications/spec-list.vue',
      inNav: true,
    },
    {
      route: '/specification/create',
      name: null,
      title: '创建规格名',
      type: 'view', // 取 route 为默认加载页
      icon: null,
      filePath: 'view/specifications/spec-create.vue',
      inNav: true,
    },
  ],
}

export default specificationRouter
