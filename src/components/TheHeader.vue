<template>
  <el-header class="header">
    <div class="header-wrapper">
      <!-- 头像 -->
      <div class="logo" @click="goPage('/home')">
        <img src="@/assets/images/zbc_logo.jpg" width="30" alt="" />
        &nbsp;甄布绰投票系统
      </div>
      <div class="user-info">
        <!-- 我的问卷 -->
        <span>
          <i class="el-icon-document"></i>
          我的问卷
        </span>

        <!-- 个人信息和退出 -->
        <el-button>
          <el-dropdown>
            <span class="el-dropdown-link">
              <i class="el-icon-user"></i>
              admin
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <i class="el-icon-document">退出</i>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-button>
      </div>
    </div>
  </el-header>
</template>

<script>
export default {
  name: 'TheHeader',
  methods: {
    goPage(address) {
      this.$router.push(address)
    }
  }
}
</script>

<style scoped lang="less">
.header {
  background-color: #fff;
  color: var(--el-text-color-primary);
  line-height: 60px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  .header-wrapper {
    width: 1176px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    .logo {
      line-height: 60px;
      display: flex;
      align-items: center;
      cursor: pointer;
    }
  }
}
</style>
