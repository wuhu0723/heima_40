<template>
  <div class="index">
    <div class="header">
      <span class="iconfont iconnew icon"></span>
      <div class="center" @click="$router.push({name: 'Search'})">
        <van-icon name="search" />&nbsp;&nbsp;&nbsp;搜索商品
      </div>
      <van-icon name="manager-o" class="icon" @click="jump"/>
    </div>
    <!-- 1.标签页 -->
    <van-tabs v-model="active" sticky swipeable>
      <!-- 2.上拉加载 -->
      <van-tab :title="cate.name" v-for='cate in cateList' :key='cate.id'>
        <van-list
          :immediate-check='false'
          :offset='10'
          v-model="cate.loading"
          :finished="cate.finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
        <!-- 3.下拉刷新 -->
        <van-pull-refresh v-model="cate.isLoading" @refresh="onRefresh">
           <!-- 动态渲染当前栏目的新闻数据 -->
           <articleblock v-for='post in cate.postList' :key='post.id' :post='post'></articleblock>
        </van-pull-refresh>
        </van-list>
      </van-tab>
      <span style="position:absolute;top:0;right:0;text-align:center;line-height:40px;font-size:30px" @click="$router.push({name:'CateManager'})">+</span>
    </van-tabs>
    <div class="newsList"></div>
  </div>
</template>

<script>
import { getCateList } from '@/api/cate.js'
import { getArticleList } from '@/api/article.js'
import articleblock from '@/components/hm_articleBlock.vue'
export default {
  components: {
    articleblock
  },
  data () {
    return {
      active: localStorage.getItem('heima_40_token') ? 1 : 0,
      cateList: []
    }
  },
  watch: {
    active () {
      // 获取当前栏目的新闻数据
      // 如果当前栏目的新闻列表数据长度为0,说明还没有获取过这个栏目的新闻数据，那么就需要发起请求获取数据
      // 如果已经有数据，则无需再次发起请求
      if (this.cateList[this.active].postList.length === 0) {
        this.getPostList()
      }
    }
  },
  async mounted () {
    let list = localStorage.getItem('user_cate_40')
    // 先获取本地数据，如果是就直接使用本地存储的数据进行栏目的渲染
    if (list) {
      this.cateList = JSON.parse(list)
      this.cateList.unshift({ id: 999, name: '头条', is_top: '1' })
      if (localStorage.getItem('heima_40_token')) {
        this.cateList.unshift({ id: 0, name: '关注', is_top: '1' })
      }
    } else { // 没有，就发起请求
    // 获取所有栏目数据
      let res = await getCateList()
      if (res.status === 200) {
        this.cateList = res.data.data
      }
    }
    // 对数据进行改造，添加能够满足业务需求的成员
    this.cateList = this.cateList.map(value => {
      return {
        ...value,
        postList: [], // 当前栏目的新闻列表数据
        pageIndex: 1, // 当前栏目的页码
        pageSize: 5, // 当前栏目每页所显示的新闻数量
        loading: false, // 当前栏目更多数据加载状态，默认为不在加载数据
        finished: false, // 数据是否已经完毕加载完毕，默认为没有完毕
        isLoading: false // 标记是否处于下拉刷新的状态，默认为false
      }
    })
    this.getPostList()
  },
  methods: {
    // 跳转到个人中心页
    jump () {
      this.$router.push({ path: `Personal/${window.localStorage.getItem('heima_40_id')}` })
    },
    // 获取栏目的新闻数据
    async getPostList () {
      // 获取默认栏目的新闻数据
      let res = await getArticleList({
        pageIndex: this.cateList[this.active].pageIndex,
        pageSize: this.cateList[this.active].pageSize,
        category: this.cateList[this.active].id
      })
      console.log(res)
      // 新闻数据存储在当前栏目的postList中，每个栏目都有一个单独的文章列表数组
      // this.cateList[this.active].postList = res.data.data
      this.cateList[this.active].postList.push(...res.data.data)
      // 本次获取了数据之后，将loading重置为false
      this.cateList[this.active].loading = false
      // 重置isLoading,让下拉刷新的提示消失
      this.cateList[this.active].isLoading = false
      // 判断是否数据已经完全加载完毕
      if (res.data.data.length < this.cateList[this.active].pageSize) {
        this.cateList[this.active].finished = true
      }
    },
    // 上拉加载更多数据
    onLoad () {
      // 加载下一页数据
      // 1.页码加1
      this.cateList[this.active].pageIndex++
      // 2.根据新的页码参数获取数据
      setTimeout(() => {
        this.getPostList()
      }, 3000)
    },
    // 下拉刷新
    onRefresh () {
      this.cateList[this.active].pageIndex = 1
      // 重置为False的作用就是让这个栏目可以重新的上拉加载更多数据
      this.cateList[this.active].finished = false
      setTimeout(() => {
        // 清除数组的所有数据，可以避免反复的创建新的数组
        this.cateList[this.active].postList.length = 0
        // 获取数据
        this.getPostList()
      }, 2000)
    }
  }
}
</script>

<style lang='less' scoped>
.index {
  .header {
    height: 50 * 100vw/360;
    display: flex;
    justify-content: space-between;
    background-color: #f00;
    align-items: center;
    color: #fff;
    .icon {
      font-size: 25px;
      padding: 0 10px;
    }
    .iconnew {
      font-size: 60px;
    }
    .center {
      flex: 1;
      height: 40px;
      line-height: 40px;
      background-color: rgba(255, 255, 255, 0.5);
      text-align: center;
      border-radius: 20px;
    }
  }
  /deep/.van-sticky{
    padding-right: 40px!important;
  }
}
</style>
