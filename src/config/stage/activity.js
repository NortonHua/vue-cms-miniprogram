const activityRouter = {
  route: null,
  name: null,
  title: '活动管理',
  type: 'folder',
  icon: 'iconfont icon-huiyuanguanli',
  filePath: 'view/activity/',
  order: null,
  inNav: true,
  children: [
    {
      route: '/activity/list',
      name: null,
      title: '活动列表',
      type: 'view', // 取 route 为默认加载页
      icon: 'iconfont icon-huiyuanguanli',
      filePath: 'view/activity/activity-list.vue',
      inNav: true,
    },
    {
      route: '/activity/create',
      name: null,
      title: '新建活动',
      type: 'view', // 取 route 为默认加载页
      icon: null,
      filePath: 'view/activity/activity-create.vue',
      inNav: true,
    },
  ],
}

export default activityRouter
