<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(async () => {
  // 测试接口方法
  // const data = await $GET('https://jsonplaceholder.typicode.com/todos')
})
</script>
