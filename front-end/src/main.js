import Vue from 'vue';
import ElementUI from 'element-ui';

import App from './App.vue';
import store from './store';
import router from './router';
import 'element-ui/lib/theme-chalk/index.css';
import '@/style/index.less';
import '@/assets/main.css';
import './index.css';

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
