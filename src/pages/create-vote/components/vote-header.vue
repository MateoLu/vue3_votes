<template>
  <!-- 头部区域 -->
  <div class="header-container">
    <!-- 左侧返回     -->
    <div class="left">
      <el-button type="text" style="color: black" @click="goPage('/home')">
        <el-icon>
          <arrow-left-bold />
        </el-icon>
      </el-button>
    </div>
    <!-- 中间编辑项目 -->
    <div class="center">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>编辑项目</el-breadcrumb-item>
        <el-breadcrumb-item>发布项目</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 右边发布按钮 -->
    <div class="right">
      <el-button type="primary">发布并分享</el-button>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import { Edit, ArrowLeftBold } from '@element-plus/icons'

export default defineComponent({
  name: 'VoteHeader',
  components: {
    // 全名
    [Edit.name]: Edit,
    ArrowLeftBold
  },
  methods: {
    goPage(address) {
      this.$router.push(address)
    }
  }
})
</script>

<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
}
.header-container {
  width: 100%;
  height: 50px;
  background-color: #fff;
  box-shadow: 1px 3px 2px #ccc;
  padding: 0 20px;
  .left {
    float: left;
    line-height: 50px;
  }
  .center > .el-breadcrumb {
    float: left;
    line-height: 50px;
    margin-left: 45%;
  }
  .right {
    float: right;
    line-height: 50px;
  }
  .right > .el-button {
    padding: 0 15px;
  }
}
</style>
