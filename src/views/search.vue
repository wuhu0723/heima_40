<template>
  <div class="search">
    <div class="header">
      <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
      <van-search v-model="userkey" placeholder="请输入搜索关键词" shape="round"></van-search>
      <span @click="search(userkey)">搜索</span>
    </div>
    <div class="searchList">
      <h2>历史记录</h2>
      <p v-for='(item,index) in historyList' :key='index' @click="search(item)">{{item}}</p>
    </div>
    <div class="searchResult">
      <h2>搜索结果</h2>
      <p v-for="item in searchList" :key="item.id" @click="$router.push({path: `/articleDetail/${item.id}`})">{{item.title}}</p>
    </div>
  </div>
</template>

<script>
import { searchArticle } from '@/api/article.js'
export default {
  data () {
    return {
      userkey: '',
      searchList: [],
      historyList: []
    }
  },
  mounted () {
    // 1.获取当前的可能拥有的本地存储数据
    this.historyList = JSON.parse(localStorage.getItem('toutiao_40_history') || '[]')
  },
  methods: {
    async search (item) {
      if (item.trim() === '') {
        this.$toast('请输入关键字')
        return
      }
      let res = await searchArticle({ keyword: item || this.userkey })
      console.log(res)
      if (res.status === 200) {
        this.searchList = res.data.data

        // 1.获取当前的可能拥有的本地存储数据
        let arrStr = localStorage.getItem('toutiao_40_history') || '[]'
        // 2.将字符串转换为数组
        let arr = JSON.parse(arrStr)
        // 3.操作：将当前搜索关键字添加到数组
        // 3.1 判断当前关键字是否已存在，如果存在 ，则先删除，再添加
        let index = arr.indexOf(item)
        if (index !== -1) { // 说明这个关键字已经存在
          arr.splice(index, 1)
        }
        // 3.2 如果超出了指定的记录数量，那么应该删除最先存储的记录，再添加
        if (arr.length >= 10) {
          arr.splice(arr.length - 1, 1)
        }
        arr.unshift(item)
        // 4. 5. 将搜索关键字存储到本地存储:转换 + 存储
        localStorage.setItem('toutiao_40_history', JSON.stringify(arr))
      }
    }
  }
}
</script>

<style lang='less' scoped>
.setLine(@num){
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: @num;
    overflow: hidden;
    text-overflow: ellipsis;
}
.header {
  height: 54 * 100vw/360;
  display: flex;
  align-items: center;
  background-color: #eee;
  border-bottom: 1px solid #bbb;
  .van-search {
    flex: 1;
    height: 54 * 100vw/360;
    background-color: #eee !important;
  }
  > span {
    padding: 0 10px;
  }
}
.searchList,
.searchResult {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  h2 {
    line-height: 40px;
    font-weight: bold;
  }
  p {
    line-height: 30px;
    text-decoration: underline;
    .setLine(1);
  }
}
</style>
