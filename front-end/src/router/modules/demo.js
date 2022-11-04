export default [
  {
    path: '/whiteBoard',
    name: 'whiteBoard',
    component: () => import('@/views/whiteBoard'),
  },
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/index.vue'),
  },
];
