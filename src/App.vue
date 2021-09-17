<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import { requestWithToken } from './service'

onMounted(async () => {
  // 测试接口方法
  // const data = await $GET('https://jsonplaceholder.typicode.com/todos')
  const data = await requestWithToken('user/listAll')
  console.log(data)
})
</script>
