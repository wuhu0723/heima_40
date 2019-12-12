<template>
  <div class="personal">个人中心</div>
</template>

<script>
import { getUserInfo } from '@/api/users.js'
export default {
  mounted () {
    let id = this.$route.params.id
    getUserInfo(id)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style>

</style>
