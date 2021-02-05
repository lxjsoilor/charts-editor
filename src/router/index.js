import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/index'),
    hidden: true
  },

  {
    path: '/admin/statement',
    name: 'Statement',
    component: () => import('@/views/statement/index'),
  },
  {
    path: '/admin/menu',
    name: 'Menu',
    component: Layout,
    meta: { title: '菜单', icon: 'menu' },
    children: [
      {
        path: 'configuration',
        component: () => import('@/views/menu/configuration/list'),
        name: 'Configuration',
        meta: { title: '自定义菜单' }
      },
      {
        path: 'permission',
        component: () => import('@/views/menu/permission/index'),
        name: 'Permission',
        meta: { title: '权限设置' },
        children: [
          {
            path: 'role',
            component: () => import('@/views/menu/permission/role'),
            name: 'Role',
            meta: { title: '角色管理' }
          },
          {
            path: 'user',
            component: () => import('@/views/menu/permission/user'),
            name: 'User',
            meta: { title: '用户管理' }
          },
          {
            path: 'roleAuth',
            component: () => import('@/views/menu/permission/roleAuth'),
            name: 'RoleAuth',
            hidden: true
          },
          {
            path: 'userAuth',
            component: () => import('@/views/menu/permission/userAuth'),
            name: 'UserAuth',
            hidden: true
          }
        ],
      }
    ]
  },

  {
    path: '/admin/service',
    name: 'Service',
    component: Layout,
    meta: { title: '服务', icon: 'peoples' },
    children: [
      {
        path: 'develop',
        component: () => import('@/views/service/manage'),
        name: 'ServiceDevelop',
        meta: { title: '服务开发' }
      },
      {
        path: 'manage',
        component: () => import('@/views/service/manage'),
        name: 'ServiceManage',
        meta: { title: '服务管理' }
      },
    ]
  },

  {
    path: '/admin/analysis',
    name: 'Analysis',
    component: Layout,
    meta: { title: '分析', icon: 'analysis' },
    children: [
      {
        path: 'data',
        component: () => import('@/views/service/manage'),
        name: 'AnalysisData',
        meta: { title: '自定义数据' }
      },
      {
        path: 'storyboard',
        component: () => import('@/views/service/storyboard/index'),
        name: 'AnalysisStoryboard',
        meta: { title: '故事板' }
      },
      {
        path: 'storyboardAdd',
        component: () => import('@/views/service/storyboard/add'),
        name: 'AnalysisStoryboardAdd',
        meta: { title: '新建故事板' },
        hidden: true
      },
    ]
  },

  {
    path: '/admin/log',
    name: 'Log',
    component: Layout,
    meta: { title: '日志', icon: 'log' },
    children: [
      {
        path: 'access',
        component: () => import('@/views/log/access/index'),
        name: 'AccessLog',
        meta: { title: '访问日志' }
      },
      {
        path: 'operation',
        component: () => import('@/views/log/operation/index'),
        name: 'OperationLog',
        meta: { title: '操作日志' }
      },
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

export const asyncRoutes = [
  {
    path: '/admin/setting',
    name: 'Setting',
    component: Layout,
    meta: { title: '权限', icon: 'setting' },
    children: [
      {
        path: 'theme',
        component: () => import('@/views/admin/theme'),
        name: 'Theme',
        meta: { title: '租户设置', roles: ['super'] }
      },
      {
        path: 'admin',
        component: () => import('@/views/admin/admin'),
        name: 'Admin',
        meta: { title: '管理员设置', roles: ['owner', 'super'] }
      },
      {
        path: 'adminAuth',
        component: () => import('@/views/admin/adminAuth'),
        name: 'AdminAuth',
        hidden: true
      },
      {
        path: 'role',
        component: () => import('@/views/admin/role'),
        name: 'AdminRole',
        meta: { title: '角色管理', roles: ['owner', 'super'] }
      },
      {
        path: 'roleAuth',
        component: () => import('@/views/admin/roleAuth'),
        name: 'AdminRoleAuth',
        hidden: true
      },
      {
        path: 'access',
        component: () => import('@/views/admin/access'),
        name: 'Access',
        meta: { title: '权限列表', roles: ['super'] }
      }
    ]
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
