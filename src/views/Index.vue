<template>
  <div class="index">
    <div class="header">
      <span class="iconfont iconnew icon"></span>
      <div class="center">
        <van-icon name="search" />&nbsp;&nbsp;&nbsp;搜索商品
      </div>
      <van-icon name="manager-o" class="icon" />
    </div>
    <van-tabs v-model="active" sticky swipeable>
      <van-tab :title="cate.name" v-for='cate in cateList' :key='cate.id'>
          <!-- 动态渲染当前栏目的新闻数据 -->
          <articleblock v-for='post in cate.postList' :key='post.id' :post='post'></articleblock>
      </van-tab>
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
    // 获取所有栏目数据
    let res = await getCateList()
    console.log(res)
    if (res.status === 200) {
      this.cateList = res.data.data
      // 对数据进行改造，添加能够满足业务需求的成员
      this.cateList = this.cateList.map(value => {
        return {
          ...value,
          postList: [], // 当前栏目的新闻列表数据
          pageIndex: 1, // 当前栏目的页码
          pageSize: 5 // 当前栏目每页所显示的新闻数量
        }
      })
      this.getPostList()
    }
  },
  methods: {
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
      this.cateList[this.active].postList = res.data.data
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
}
</style>
