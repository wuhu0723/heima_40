// 1. 引入vue
import Vue from 'vue'
// 2. 引入 vue-router
import VueRouter from 'vue-router'

import Login from '@/views/Login.vue'

// 3. user
Vue.use(VueRouter)

// 4. 创建路由对象，进行路由配置
var router = new VueRouter({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    }
  ]
})

// 5. 暴露
export default router
