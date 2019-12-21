<template>
  <div class="CateManager">
    <myheader title="频道管理">
      <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
    </myheader>
    <div class="add">
      <p>点击删除频道</p>
      <div class="list">
        <van-button type="default" v-for='(item,index) in cateList' :key='index' @click="remove(index)">{{item.name}}</van-button>
      </div>
    </div>
    <div class="add">
      <p>点击添加频道</p>
      <div class="list">
        <van-button type="default" v-for='(item,index) in delCateList' :key='index' @click="add(index)">{{item.name}}</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import myheader from '@/components/hm_header.vue'
import { getCateList } from '@/api/cate.js'
export default {
  components: {
    myheader
  },
  data () {
    return {
      cateList: [], // 已添加的栏目
      delCateList: [] // 待添加的栏目
    }
  },
  async mounted () {
    // 获取已添加的栏目数据
    let list = localStorage.getItem('user_cate_40')
    if (list) {
      this.cateList = JSON.parse(list)
    } else {
      let res = await getCateList()
      this.cateList = res.data.data.splice(2)
    }
    // 获取还可以被添加的栏目列表：待添加的栏目数据
    this.delCateList = JSON.parse(localStorage.getItem('user_cate_40_dels') || '[]')
  },
  methods: {
    // 移除已添加栏目
    remove (index) {
      // 先添加
      this.delCateList.push(this.cateList[index])
      // 再移除
      this.cateList.splice(index, 1)
      // 将栏目进行本地存储：存储已添加栏目
      localStorage.setItem('user_cate_40', JSON.stringify(this.cateList))
      // 将栏目进行本地存储，存储待添加栏目
      localStorage.setItem('user_cate_40_dels', JSON.stringify(this.delCateList))
    },
    // 添加栏目
    add (index) {
      // 先添加
      this.cateList.push(this.delCateList[index])
      // 再移除
      this.delCateList.splice(index, 1)
      // 将栏目进行本地存储：存储已添加栏目
      localStorage.setItem('user_cate_40', JSON.stringify(this.cateList))
      // 将栏目进行本地存储：存储待添加栏目
      localStorage.setItem('user_cate_40_dels', JSON.stringify(this.delCateList))
    }
  }
}
</script>

<style lang='less' scoped>
.add {
  padding: 15px;
  p {
    line-height: 30px;
    color: #999;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    /deep/.van-button {
      width: 23%;
      margin: 5px 2% 0 0px;
    }
  }
}
</style>
