const categoryRouter = {
  route: null,
  name: null,
  title: '分类管理',
  type: 'folder',
  icon: 'iconfont icon-moshubang',
  filePath: 'view/category',
  order: null,
  inNav: true,
  children: [
    {
      route: '/category/list',
      name: null,
      title: '分类列表',
      type: 'view',
      icon: 'iconfont icon-moshubang',
      filePath: 'view/category/category-list.vue',
      inNav: true,
    },
  ],
}

export default categoryRouter
