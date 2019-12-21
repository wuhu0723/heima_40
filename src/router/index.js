// 1. 引入vue
import Vue from 'vue'
// 2. 引入 vue-router
import VueRouter from 'vue-router'

import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Personal from '@/views/Personal.vue'
import EditPersonal from '@/views/editPersonal.vue'
import Index from '@/views/Index.vue'
import ArticleDetail from '@/views/articleDetail.vue'
import MyFollow from '@/views/myFollow.vue'
import MyCollections from '@/views/myCollections.vue'
import Comments from '@/views/comments.vue'
import Search from '@/views/search.vue'

// 3. user
Vue.use(VueRouter)

// 4. 创建路由对象，进行路由配置
var router = new VueRouter({
  routes: [
    {
      name: 'Index',
      path: '/',
      component: Index
    },
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'Register',
      path: '/register',
      component: Register
    },
    {
      name: 'Personal',
      path: '/personal/:id',
      component: Personal
    },
    {
      name: 'EditPersonal',
      path: '/editPersonal/:id',
      component: EditPersonal
    },
    {
      name: 'ArticleDetail',
      path: '/articleDetail/:id',
      component: ArticleDetail
    },
    {
      name: 'MyFollow',
      path: '/myFollow',
      component: MyFollow
    },
    {
      name: 'MyCollections',
      path: '/myCollections',
      component: MyCollections
    },
    {
      name: 'Comments',
      path: '/comments/:id',
      component: Comments
    },
    {
      name: 'Search',
      path: '/search',
      component: Search
    }
  ]
})

// 添加导航守卫
// to:目标路由对象
router.beforeEach((to, from, next) => {
  // 只有访问那些需要授权的api的时候，才需要进行守卫
  if (to.path.indexOf('/personal/') === 0) {
    // 判断当前用户是否登陆过
    let token = localStorage.getItem('heima_40_token')
    if (token) {
      next()
    } else {
      next({ name: 'login' })
    }
  } else {
    next()
  }
})

// 5. 暴露
export default router
