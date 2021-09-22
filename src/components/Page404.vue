<template>
  <div class="falsePage_container">
    <img src="@/assets/images/404.png" alt="" />
    <div class="content">
      <h1>抱歉,你访问的页面地址有误，或者该页面不存在</h1>
      <p>请检查输入的网址是否正确，或者联系客服：</p>
      <p class="team">© GGS · 甄步绰小组</p>
      <p>
        <span>{{ countDown }}</span>
        &nbsp;秒之后自动跳转回上一页
      </p>
    </div>
  </div>
</template>

<script>
// import { defineComponent } from 'vue'
export default {
  data() {
    return {
      time: null,
      countDown: null
    }
  },
  created() {
    this.count()
  },
  methods: {
    count() {
      // 倒计时的时间count
      const count = 3
      this.countDown = count
      this.timers = setInterval(() => {
        if (this.countDown > 0) {
          this.countDown--
        } else {
          clearInterval(this.timers)
          this.$router.back()
        }
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.falsePage_container {
  img {
    float: left;
    width: 67%;
    height: 67%;
  }
  .content {
    width: 600px;
    height: 400px;
    float: left;
    margin-top: 300px;
    h1 {
      color: orange;
    }
    p {
      font-size: 20px;
    }
    .team {
      font-size: 15px;
      font-weight: 800;
      color: #ccc;
    }
    span {
      color: orange;
    }
  }
}
</style>
