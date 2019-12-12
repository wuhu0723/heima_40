import Vue from 'vue'
import App from './App.vue'

import router from '@/router/index.js'

import { Toast } from 'vant'

import '@/styles/reset.css'
Vue.use(Toast)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
