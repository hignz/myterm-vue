import Vue from 'vue';
import VueGtag from 'vue-gtag';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import App from './App';
import router from './router';
import store from './store';
import vuetify from '@/plugins/vuetify';
import './registerServiceWorker';
import './scss/variables.scss';
import Particles from 'particles.vue';

Vue.config.productionTip = false;

Vue.use(Particles);

Vue.use(Toast, {
  timeout: 1750,
  position: 'bottom-right',
});

Vue.use(
  VueGtag,
  {
    config: { id: 'UA-131752115-1' },
  },
  router
);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
