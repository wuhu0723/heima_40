import Vue from 'vue'
import App from './App.vue'

import router from '@/router/index.js'

import { Toast, Icon, Uploader, Dialog, Field, Picker, Tab, Tabs, List, PullRefresh, SwipeCell, Button } from 'vant'

import '@/styles/reset.css'
Vue.use(Toast)
Vue.use(Icon)
Vue.use(Uploader)
Vue.use(Dialog)
Vue.use(Field)
Vue.use(Picker)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(List)
Vue.use(PullRefresh)
Vue.use(SwipeCell)
Vue.use(Button)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
