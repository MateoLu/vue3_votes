<template>
  <el-header class="header">
    <div class="header-wrapper">
      <!-- 头像 -->
      <div class="logo" @click="goPage('/home')">
        <img src="@/assets/images/vote.png" width="35" alt="" />
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
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              <i class="el-icon-user"></i>
              {{ username }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="logout">
                  <i class="el-icon-switch-button"></i>
                  退出登陆
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-button>
      </div>
    </div>
  </el-header>
</template>

<script setup>
import { computed } from 'vue'
import { getToken } from '@/utils/storage'
import { ElMessageBox } from 'element-plus'
import jwtDecode from 'jwt-decode'
import { useRouter } from 'vue-router'
import { useAuth } from '@/hooks/auth'

const router = useRouter()
const { userLogout } = useAuth()

const username = computed(() => jwtDecode(getToken()).sub)

const goPage = (address) => {
  router.push(address)
}

const handleCommand = (command) => {
  switch (command) {
    case 'logout':
      ElMessageBox.confirm('确定退出登陆吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          userLogout()
        })
        .catch(() => {})
      break
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
      color: #484848;
      user-select: none;
    }
    .user-info {
      color: #484848;
    }
  }
}
</style>
