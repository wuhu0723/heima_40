<template>
  <div class="collect">
    <myheader title="我的收藏">
      <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
    </myheader>
    <div class="list">
      <van-swipe-cell v-for="item in collectList" :key="item.id" >
        <articleblock :post="item"></articleblock>
        <template slot="right">
          <van-button square type="danger" text="删除" @click="del(item.id)"/>
        </template>
      </van-swipe-cell>
    </div>
  </div>
</template>

<script>
import myheader from '@/components/hm_header.vue'
import articleblock from '@/components/hm_articleBlock.vue'
import { getMyCollections } from '@/api/users.js'
export default {
  data () {
    return {
      collectList: []
    }
  },
  components: {
    myheader,
    articleblock
  },
  async mounted () {
    let res = await getMyCollections()
    console.log(res)
    if (res.status === 200) {
      this.collectList = res.data.data
    }
  },
  methods: {
    del (id) {
      alert(id)
    }
  }
}
</script>

<style>
</style>
