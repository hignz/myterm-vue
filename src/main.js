import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import vuetify from './plugins/vuetify';
import VueGtag from 'vue-gtag';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const options = {};

Vue.use(Toast, options);

Vue.config.productionTip = false;

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
