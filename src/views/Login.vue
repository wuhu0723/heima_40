<template>
  <div id="app">
    <div class="container">
      <div class="close">
        <span class="iconfont iconicon-test"></span>
      </div>
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="inputs">
        <!-- <hminput
        placeholder='请输入用户名/手机号'
        :value='users.username'
        @input='hanlderinput'
        ></hminput> -->
        <hminput
        placeholder='请输入用户名/手机号'
        v-model='users.username'
        :rules='/^1\d{10}$/'
        msg_err='手机号输入不合法，请输入11位手机号'
        ></hminput>
        <hminput type='password' v-model="users.password"></hminput>
      </div>
      <p class="tips">
        没有账号？
        <a href="#/register" class>去注册</a>
      </p>
      <hmbutton text='登陆' @click='login'></hmbutton>
    </div>
  </div>
</template>

<script>
// 引入按钮
import hmbutton from '@/components/hm_button.vue'
import hminput from '@/components/hm_input.vue'
// 引入登陆api方法
import { userLogin } from '@/api/users.js'
export default {
  data () {
    return {
      users: {
        username: '10086',
        password: '123'
      }
    }
  },
  components: {
    hmbutton, hminput
  },
  methods: {
    login (event) {
      userLogin(this.users)
        .then(res => {
          console.log(res)
          if (res.data.message === '登录成功') {
            // 将当前的token存储，本地存储
            localStorage.setItem('heima_40_token', res.data.data.token)
            // 存储用户id
            localStorage.setItem('heima_40_id', res.data.data.user.id)
            // 页面跳转
            this.$router.push({ path: `/personal/${res.data.data.user.id}` })
          } else {
            this.$toast.fail(res.data.message)
          }
        })
        .catch(err => {
          console.log(err)
          this.$toast.fail('登陆失败，请重试')
        })
    },
    // 处理文本框的输入
    hanlderinput (data) {
      this.users.username = data
    }
  }
}
</script>

<style lang='less'>
.container {
  padding: 20px;
  height: 100vh;
  background-color: rgb(242,242,242);
}

.close {
  span {
    font-size: 27 / 360 * 100vw;
  }
}

.logo {
  display: flex;
  justify-content: center;

  span {
    display: block;
    font-size: 126 / 360 * 100vw;
    color: #d81e06;
  }
}

.inputs {
  input {
    margin-bottom: 20px;
  }
}

.tips {
  text-align: right;
  margin-bottom: 20px;

  a {
    color: #3385ff;
  }
}
</style>
