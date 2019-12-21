<template>
  <div class="commentitem">
    <!-- 添加当前组件 -->
    <!-- 我们得让递归组件能够监听下一层组件所发射的事件 -->
    <!-- 递归组件中的某个元素可以发出事件，这个事件由上一层递归组件来监听
    只不过上一层递归组件和当前层进行了相同的处理:发生事件
    这个事件最终由comments进行处理，在这个处理函数中对子组件hm_commentArea.vue赋值 -->
    <mycomment
    v-if='comment.parent'
    :comment='comment.parent'
    @replayComment='sendComment'
    ></mycomment>
    <div class="head">
      <div>
        <span class="cname">{{comment.user.nickname}}</span>
        <span>2小时前</span>
      </div>
      <span @click="sendComment(comment)">回复</span>
    </div>
    <div class="text">{{comment.content}}</div>
  </div>
</template>

<script>
// 这种引入方式只能引入其它组件，不能引入自身
// import comm from '@/components/hm_comment_item.vue'
export default {
  //   components: {
  //     comm
  //   },
  // 这个名字就相当于注册了当前组件
  name: 'mycomment',
  props: ['comment'],
  methods: {
    sendComment (comment) {
      console.log('-------------')
      this.$emit('replayComment', comment)
    }
  }
}
</script>

<style lang='less' scoped>
.commentitem {
  border: 1px solid #ccc;
  padding: 4px;
  box-sizing: border-box;
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    > div {
      flex: 1;
      display: flex;
      > span {
        font-size: 12px;
        color: #999;
      }
      .cname {
        margin-right: 10px;
      }
    }
    > span {
      color: #999;
      font-size: 13px;
    }
  }
  .text {
    font-size: 13px;
    color: #333;
    padding: 10px 0;
  }
}
</style>
