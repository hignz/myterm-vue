import Vue from 'vue';
import VueRouter from 'vue-router';
import VueMeta from 'vue-meta';
import Home from '../components/pages/Home';

Vue.use(VueRouter);
Vue.use(VueMeta);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/saved',
      name: 'Saved',
      component: () => import('@/components/pages/Saved')
    },
    {
      path: '/settings',
      name: 'Settings',
      component: () => import('@/components/pages/Settings')
    },
    {
      path: '/stats',
      name: 'Stats',
      props: true,
      component: () => import('@/components/pages/Stats')
    },
    {
      path: '/timetable',
      name: 'Timetable',
      props: true,
      component: () => import('@/components/pages/Timetable')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
});

export default router;
