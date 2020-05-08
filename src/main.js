import Vue from 'vue';
import VueGtag from 'vue-gtag';
import Toast from 'vue-toastification';

import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import './registerServiceWorker';
import 'vue-toastification/dist/index.css';
import './scss/variables.scss';

Vue.config.productionTip = false;

Vue.use(Toast, {});

Vue.use(
  VueGtag,
  {
    config: { id: 'UA-131752115-1' }
  },
  router
);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
