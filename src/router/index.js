import Vue from 'vue';
import Router from 'vue-router';

import Authentication from '@/components/authentication/authentication';
import Home from '@/components/home/home';
import TopicList from '@/components/topic-list/topic-list';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '',
          component: TopicList,
        },
      ],
    },
    {
      path: '/auth',
      name: 'Auth',
      component: Authentication,
    },
  ],
});
