export default [
   { path: '/index', name: '欢迎', icon: 'smile', component: './Index' },
  {path: '/interface_info/:id',name: '查看接口信息',icon:'smile',component:'./InterfaceInfo',hideInMenu:true},
  {
    path: '/user',
    layout: false,
    routes: [{ name: '登录', path: '/user/login', component: './User/Login' }],
  },
  {
    path: '/admin',
    name: '管理',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { name: '接口管理', icon: 'table', path: '/admin/interface_info', component: './Admin/InterfaceInfo' },
      { name: '用户管理', icon: 'table', path: '/admin/user_info', component: './Admin/UserInfo' },
      // { path: '/admin', redirect: '/admin/sub-page' },
      // { path: '/admin/sub-page', name: '二级管理页', component: './Admin' },
    ],
  },
  { path: '/', redirect: '/index' },
  { path: '*', layout: false, component: './404' },
];
