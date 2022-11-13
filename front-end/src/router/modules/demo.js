export default [
  {
    path: '/whiteBoard',
    name: 'whiteBoard',
    component: () => import('@/views/whiteBoard/index.vue'),
  },
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/index.vue'),
  },
];
