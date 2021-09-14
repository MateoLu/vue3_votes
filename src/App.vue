<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import { $GET } from './service'

onMounted(async () => {
  // 测试接口方法
  const data = await $GET('https://jsonplaceholder.typicode.com/todos')
  console.log(data)
})
</script>
