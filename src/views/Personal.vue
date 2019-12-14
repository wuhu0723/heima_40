<template>
  <div class="personal">
    <router-link :to="'/editPersonal/'+currentUser.id">
      <div class="profile">
        <!-- $axios.defaults.baseURL读取axios的服务器路径 -->
        <img :src="currentUser.head_img" alt />
        <div class="profile-center">
          <div class="name">
            <span class="iconfont iconxingbienan"></span>{{currentUser.nickname}}
          </div>
          <div class="time">2019-12-24</div>
        </div>
        <span class="iconfont iconjiantou1"></span>
      </div>
    </router-link>
    <hmcell title='我的关注' desc='关注的用户'></hmcell>
    <hmcell title='我的跟帖' desc='跟帖/回复'></hmcell>
    <hmcell title='我的收藏' desc='文章/视频'></hmcell>
    <hmcell title='设置' desc=''></hmcell>
    <div class="exit">
      <hmbutton text='退出' class="exitBtn"></hmbutton>
    </div>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/users.js'
import hmcell from '@/components/hm_cell.vue'
import hmbutton from '@/components/hm_button.vue'
export default {
  data () {
    return {
      currentUser: {}
    }
  },
  components: {
    hmcell, hmbutton
  },
  mounted () {
    let id = this.$route.params.id
    getUserInfo(id)
      .then(res => {
        console.log(res)
        if (res.data.message === '获取成功') {
          this.currentUser = res.data.data
          // 返回的数据可能没有图片数据，那么我们应该进行判断，如果有图片数据，则设置为当前图片，如果没有图片数据则需要设置为默认图片
          if (this.currentUser.head_img) {
            this.currentUser.head_img = localStorage.getItem('hm_40_baseURL') + this.currentUser.head_img
          } else {
            this.currentUser.head_img = localStorage.getItem('hm_40_baseURL') + '/uploads/image/default.png'
          }
        }
      })
      .catch(err => {
        console.log(err)
        this.$toast.fail('获取数据失败')
      })
  }
}
</script>

<style lang='less' scoped>
.personal{
    width: 100vw;
    height: 100vh;
    background-color: #eee;
}
a{
    color: #666;
}
.profile {
  display: flex;
  padding: 20px 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px #ddd solid;

  img {
    width: 70 / 360 * 100vw;
    height: 70 / 360 * 100vw;
    border-radius: 50%;
  }

  .profile-center {
    flex: 1;
    padding: 0 10px;
  }

  .name {
    span {
      color: #75b9eb;
    }
  }

  .time {
    color: #666;
    font-size: 14px;
    margin-top: 5px;
  }
  // .exit{
  //   display: flex;
  //   justify-content: center;
  // }
  // /deep/.exitBtn{
  //   margin: 0 auto!important;
  // }
}
</style>
