import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vue from 'vue';

import App from './App.vue';

import store from './store';
import router from './router';
import '@/style/index.less';
import '@/assets/main.css';
import './index.css';

Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
