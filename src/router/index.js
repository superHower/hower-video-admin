import { createRouter, createWebHashHistory } from 'vue-router';
import { useAppStore } from '@/stores/app';
import SystemRouter from './modules/system';
import CouponRouter from './modules/coupon';
import NProgress from 'nprogress';
import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper';

// 假设异步路由
export const asyncRoutes = [SystemRouter, CouponRouter];
const constantRoutes = [
  {
    path: '/',
    name: 'homeRoot',
    redirect: { path: '/home' },
    meta: {
      hidden: true, // 不需要再左边显示的
    },
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/Home/index.vue'),
        meta: {
          title: '首页',
          hidden: true, // 不需要再左边显示的
          affix: true,
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login/index.vue'),
    meta: {
      title: '登录',
      isNotLayout: true,
      hidden: true,
    },
  },
];

export const routes = [...constantRoutes, ...asyncRoutes];
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});
// 白名单
const whiteList = ['/login', '/home'];
router.beforeEach(async (to, from, next) => {
  const appStore = useAppStore();
  NProgress.start();

  if (appStore.globalToken) {
    // 已登录
    if (whiteList.includes(to.path)) {
      // 白名单路径直接放行
      console.log('已登录, 白名单路径直接放行');
      NProgress.done();
      next();
    } else {
      // 其他路径检查权限
      const authMenusUrlList = appStore.authMenusList.map((item) => item.url);
      if (authMenusUrlList.includes(to.path)) {
        await appStore.getBtnApi(to.path);
        next();
      } else {
        console.log('已登录, 无权访问此地址');
        next('/home'); // 无权限则回到首页
      }
    }
  } else {
    // 未登录
    if (whiteList.includes(to.path)) {
      console.log('未登录, 白名单路径直接放行');
      next();
    } else {
      console.log('未登录, 拦截回登录');
      next('/login');
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
