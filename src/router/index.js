import Vue from 'vue';
import Router from 'vue-router';

import Authentication from '@/components/authentication/authentication';
import Home from '@/components/home/home';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/auth',
      name: 'Auth',
      component: Authentication,
    },
  ],
});
