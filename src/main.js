import Vue from 'vue';
import axios from 'axios';
import VueRouter from 'vue-router';
import { routes } from './routes';
import {store} from './store/store.js';
import App from './App.vue';

Vue.use(VueRouter);
const router = new VueRouter({
  routes,
  mode: 'history'
});

axios.defaults.baseURL = "http://localhost:3000";
axios.interceptors.request.use(
  (config) => {
    let token = store.state.idToken;

    if (token) {
      config.headers['Authorization'] = `Bearer ${ token }`;
    }

    return config;
  }, 

  (error) => {
    return Promise.reject(error);
  }
);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
