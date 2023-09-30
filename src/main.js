import Vue from 'vue';
import VueGtag from 'vue-gtag';
import Toast from 'vue-toastification';
// import VueSocketIO from 'vue-socket.io';
import 'vue-toastification/dist/index.css';
import App from './App';
import router from './router';
import store from './store';
import vuetify from '@/plugins/vuetify';
import './registerServiceWorker';
import './scss/variables.scss';

Vue.config.productionTip = false;

Vue.use(Toast, {
  timeout: 2000,
  position: 'top-right',
});

// Vue.use(
//   new VueSocketIO({
//     debug: true,
//     connection: 'https://myterm-socket.herokuapp.com/',
//   })
// );

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
