<template>
  <div class="falsePage_container">
    <img src="@/assets/images/404.png" alt="" />
    <div class="content">
      <p class="desc">抱歉，你访问的页面地址有误，或者该页面不存在</p>
      <p class="intervel">
        页面将在
        <span style="color: #409eff">{{ secounds }}</span>
        秒后返回原来的页面
      </p>
      <p class="team">&copy; GGS · 甄步绰小组</p>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  data() {
    return {
      timer: null,
      secounds: 4
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      this.secounds--
      if (this.secounds === 0) {
        this.$router.back()
      }
    }, 1000)
  },
  unmounted() {
    clearInterval(this.timer)
  }
})
</script>

<style lang="less" scoped>
.falsePage_container {
  display: flex;
  align-items: center;
  flex-direction: column;
  img {
    width: 50%;
    height: 50%;
  }
  .content {
    .desc {
      font-size: 24px;
      color: #484848;
    }
    .intervel {
      text-align: center;
      color: #484848;
    }
    .team {
      text-align: center;
      color: #d0d0d0;
    }
  }
}
</style>
