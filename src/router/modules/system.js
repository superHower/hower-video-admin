export default {
  path: '/system',
  // component: () => import('@/Layout/index.vue'),
  meta: {
    title: '系统管理',
    icon: 'personnel',
  },
  redirect: '/system/tenant',
  children: [
    {
      path: '/system/tenant',
      name: 'tenant',
      component: () => import('@/views/System/Tenant/index.vue'),
      meta: {
        title: '商户管理',
        icon: 'permission',
      },
    },
    {
      path: '/system/account',
      name: 'account',
      component: () => import('@/views/System/Account/index.vue'),
      meta: {
        title: '账号管理',
        icon: 'personnel-manage',
        keepAlive: true,
      },
      // children: [
      //   {
      //     path: '/system/accountDetail',
      //     name: 'accountDetail',
      //     component: () => import('@/views/System/Account/Detail.vue'),
      //     meta: {
      //       title: '账号详情',
      //       icon: 'personnel-manage',
      //     },
      //   },
      // ],
    },
    // {
    //   path: '/system/accountDetail',
    //   name: 'accountDetail',
    //   component: () => import('@/views/System/Account/Detail.vue'),
    //   meta: {
    //     title: '账号详情',
    //     icon: 'personnel-manage',
    //     hidden: true,
    //   },
    // },
    {
      path: '/system/role',
      name: 'role',
      component: () => import('@/views/System/Role/index.vue'),
      meta: {
        title: '角色管理',
        icon: 'role',
        keepAlive: true,
      },
    },
    {
      path: '/system/department',
      name: 'department',
      component: () => import('@/views/System/Department/index.vue'),
      meta: {
        title: '部门管理',
        icon: 'role',
        keepAlive: true,
      },
    },
    {
      path: '/system/resources',
      name: 'resources',
      component: () => import('@/views/System/Resources/index.vue'),
      meta: {
        title: '资源管理',
        icon: 'permission',
      },
    },
    {
      path: '/system/video',
      name: 'video',
      component: () => import('@/views/System/Video/index.vue'),
      meta: {
        title: '视频管理',
        icon: 'video',
      },
    },
  ],
};
