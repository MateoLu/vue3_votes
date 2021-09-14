<template>
  <div class="home-container">
    <vote-header />
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import VoteHeader from './components/vote-header.vue'

export default defineComponent({
  // components: {
  //   TheHeader
  // },
  setup() {},
  components: {
    VoteHeader
  }
})
</script>

<style scoped lang="less">
.header {
  background-color: #fff;
  color: var(--el-text-color-primary);
  line-height: 60px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  .header-wrapper {
    width: 1048px;
    margin: auto;
    .img {
      line-height: 60px;
      display: flex;
      align-items: center;
      cursor: pointer;
    }
  }
}
.home-container {
  width: 100vw;
  height: 100%;
  overflow: hidden;
  .home-wrapper {
    max-width: 1048px;
    height: 100%;
    margin: auto;

    .el-main {
      text-align: center;
      line-height: 160px;
      .list-container {
        margin: -42px 0 0 0px;
        .row-bg {
          padding: 10px 0;
          background-color: #f9fafc;
        }
        .el-row {
          margin-bottom: 20px;
          &:last-child {
            margin-bottom: 0;
          }
        }
        .el-col {
          border-radius: 4px;
        }
        .grid-content {
          border-radius: 4px;
          margin: 4px 173px 0px -163px;
          min-height: 36px;
          font-size: 19px;
        }
      }
      .list-votes {
        width: 100%;
        height: 50%;
      }
    }
    .el-btn {
      margin: 35px 0px 0px 19px;
      min-height: 45px;
      min-width: 163px;
      border: #e6a23c;
      font-size: 15px;
    }
    .el-border {
      background: #e9eef3;
      width: 188px;
      height: 430px;
      margin: 35px auto;

      p {
        font-size: 13px;
        margin: 0px 0px 31px 45px;
        padding: 32px 0 0 0;
      }
    }
  }
}
</style>
