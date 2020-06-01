import Vue from 'vue';
import axios from 'axios';

import router from './router';
import store from './store/store.js';
import App from './App.vue';

axios.defaults.baseURL = "http://localhost:3000";

axios.interceptors.request.use(
  (config) => {
    let token = store.state.idToken;
    if (token) {
      config.headers['Authorization'] = `Bearer ${ token }`;
    } // TODO: add else and see what happens
    return config;
  }, 
  (error) => {
    return Promise.reject(error);
  }
);

new Vue({
  el: '#app',
  router, // it can also be written as router:router
  store,
  render: h => h(App)
})
