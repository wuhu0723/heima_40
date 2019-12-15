import Vue from 'vue'
import App from './App.vue'

import router from '@/router/index.js'

import { Toast, Icon, Uploader, Dialog, Field, Picker } from 'vant'

import '@/styles/reset.css'
Vue.use(Toast)
Vue.use(Icon)
Vue.use(Uploader)
Vue.use(Dialog)
Vue.use(Field)
Vue.use(Picker)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
