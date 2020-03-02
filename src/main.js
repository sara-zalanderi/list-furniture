import Vue from 'vue'
import axios from 'axios'
import App from './index.vue'
import toCurrencyFormat from './plugins/toCurrencyFormat'

Vue.prototype.$http = axios;
Vue.filter('toCurrencyFormat', toCurrencyFormat);

new Vue({
  el: '#app',
  render: h => h(App)
})
