export default [
  {
    path: '/whiteBoard',
    name: 'whiteBoard',
    component: () => import('@/views/DrawindRoom.vue'),
  },
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/index.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
  },
];
