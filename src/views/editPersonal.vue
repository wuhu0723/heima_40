<template>
  <div class="editPersonal">
    <hmheader title="编辑个人信息">
      <span class="iconfont iconjiantou2" slot="left" @click="$router.back()"></span>
      <!-- <span slot='right'>退出</span> -->
    </hmheader>
    <div class="head">
      <img alt :src="current.head_img" />
      <van-uploader :after-read="afterRead" />
    </div>
    <hmcell title="昵称" :desc="current.nickname" @click="nickshow=!nickshow"></hmcell>
    <!-- 下面是以组件的方式来使用dialog -->
    <van-dialog v-model="nickshow" title="标题" show-cancel-button @confirm='updateNickname'>
        <!-- 如果需要使用ref的方式获取数据，不能添加clearable -->
      <van-field required :value='current.nickname' label="昵称" placeholder="请输入昵称" ref='nickname'/>
    </van-dialog>
    <hmcell title="密码" :desc="current.password" type='password'  @click="passshow=!passshow"></hmcell>
    <van-dialog v-model="passshow" title="修改密码" show-cancel-button @confirm='updatePassword' :before-close='beforeClose'>
        <!-- 如果需要使用ref的方式获取数据，不能添加clearable -->
      <van-field required label="原密码" placeholder="请输入原密码" ref='oldPwd'/>
      <van-field required label="新密码" placeholder="请输入新密码" ref='newPwd'/>
    </van-dialog>

    <hmcell title="性别" :desc="current.gender===1?'男':'女'"></hmcell>
  </div>
</template>

<script>
import hmheader from '@/components/hm_header.vue'
import hmcell from '@/components/hm_cell.vue'
import { uploadFile } from '@/api/uploadFile.js'
import { getUserInfo, editUser } from '@/api/users.js'
export default {
  data () {
    return {
      id: '',
      current: {},
      nickshow: false,
      passshow: false
    }
  },
  components: {
    hmheader,
    hmcell
  },
  async mounted () {
    this.id = this.$route.params.id
    let res = await getUserInfo(this.id)
    if (res.data.message === '获取成功') {
      this.current = res.data.data
      if (this.current.head_img) {
        this.current.head_img =
          localStorage.getItem('hm_40_baseURL') + this.current.head_img
      } else {
        this.current.head_img =
          localStorage.getItem('hm_40_baseURL') + '/uploads/image/default.png'
      }
    } else {
      this.$toast.fail('获取用户信息失败，请重试')
    }
  },
  methods: {
    // 实现文件上传功能
    async afterRead (file) {
      // 此时可以自行将文件上传至服务器
      console.log(file)
      // 1.file.file就是我们需要的文件资源数据
      // 2.包装为formdata
      let formdata = new FormData()
      formdata.append('file', file.file)
      // 3.发起异步请求实现文件上传
      let res = await uploadFile(formdata)
      if (res.data.message === '文件上传成功') {
        // 4.实现用户头像数据的更新--编辑用户信息啦
        // 让我们可以以同步的方式调用异步方法
        let res1 = await editUser(this.id, { head_img: res.data.data.url })
        console.log(res1)
        if (res1.data.message === '修改成功') {
          this.$toast.success('修改用户头像成功')
          // 为了即时刷新头像的显示
          this.current.head_img =
            localStorage.getItem('hm_40_baseURL') + res.data.data.url
        } else {
          this.$toast.fail('修改用户头像失败')
        }
      } else {
        this.$toast.fail('文件上传失败，请重试')
      }
    },
    // 修改昵称
    async updateNickname () {
      console.log(this.$refs.nickname.$refs.input.value)
      // 获取数据
      let nickname = this.$refs.nickname.$refs.input.value
      let res = await editUser(this.id, { nickname })
      if (res.data.message === '修改成功') {
        this.$toast.success('修改昵称成功')
        this.current.nickname = nickname
      } else {
        this.$toast.fail('修改昵称失败')
      }
    },
    // 修改密码
    async updatePassword () {
      // 1.获取原密码
      let oldPwd = this.$refs.oldPwd.$refs.input.value
      // 2.判断输入的原密码是否和真正的原始密码一致
      if (this.current.password === oldPwd) {
        let password = this.$refs.newPwd.$refs.input.value
        if (!/\w{3,16}/.test(password)) {
          this.$toast.fail('请输入3~16位的新密码')
          return
        }
        // 3.调用api方法进行密码的更新
        let res = await editUser(this.id, { password })
        console.log(res)
        if (res.data.message === '修改成功') {
          this.$toast.success('修改成功')
          localStorage.removeItem('heima_40_token')
          localStorage.removeItem('hm_40_baseURL')
          this.$router.push({ name: 'login' })
        }
      } else {
        this.$toast.fail('原始密码输入不正确')
      }
    },
    // 修改密码模态框消失前的属性监听
    // action是当前操作的类型：confirm   cancel
    // done():可以关闭当前模态框
    // done(false):不关闭当前模态框
    beforeClose (action, done) {
      // 1.获取原密码
      let oldPwd = this.$refs.oldPwd.$refs.input.value
      let password = this.$refs.newPwd.$refs.input.value
      // 2.判断输入的原密码是否和真正的原始密码一致
      // 只有单击了确定的时候才需要让原始密码输入正确
      if (action === 'confirm' && this.current.password !== oldPwd) {
        this.$toast.fail('原始密码输入不正确')
        done(false)
      } else if (action === 'confirm' && !/\w{3,16}/.test(password)) {
        this.$toast.fail('请输入3~16位的新密码')
        done(false)
      } else {
        done()
      }
    }
  }
}
</script>

<style lang='less' scoped>
.head {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  position: relative;

  img {
    display: block;
    width: 100 / 360 * 100vw;
    height: 100 / 360 * 100vw;
    border-radius: 50%;
  }
  // 修改元素的大小
  /deep/.van-uploader__upload {
    width: 100 / 360 * 100vw;
    height: 100 / 360 * 100vw;
  }
  // 设置元素的对齐方式
  /deep/.van-uploader {
    // 实现任意元素居中
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
  }
}
</style>
