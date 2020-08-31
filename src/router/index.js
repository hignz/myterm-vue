import Vue from 'vue';
import VueRouter from 'vue-router';
import VueMeta from 'vue-meta';
import { routeOptions } from './routes';

Vue.use(VueRouter);
Vue.use(VueMeta);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    ...routeOptions.map(route => {
      return {
        ...route,
        component: () =>
          import(
            /* webpackChunkName: "[request]" */ `../components/pages/${route.name}.vue`
          )
      };
    }),
    {
      path: '*',
      redirect: '/'
    }
  ],
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});

export default router;
