/*
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2021-10-05 03:58:15
 * @LastEditors: kongwf
 * @LastEditTime: 2021-11-04 17:40:33
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false;
Vue.use(ElementUI);

Vue.use(VueAxios, axios);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
