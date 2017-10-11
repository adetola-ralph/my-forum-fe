// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import 'bootstrap-sass';
import VueCookies from 'vue-cookies';
import VueValidate from 'vee-validate';
import App from './App';
import router from './router';
import './styles/base.scss';

Vue.config.productionTip = false;
Vue.use(VueCookies);
Vue.use(VueValidate);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
