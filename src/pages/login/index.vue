<template>
  <el-button type="primary">{{ 'login' }}</el-button>
  <p style="margin: 10px">{{ 'torres' }}</p>
  <el-button type="primary" @click="toHome">{{ 'home' }}</el-button>
</template>
<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const toHome = () => {
  router.push({
    name: 'home'
  })
}
</script>

<style scoped lang="less">
p {
  color: @color;
}
</style>
