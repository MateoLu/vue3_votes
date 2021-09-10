<template>
  <p>home</p>
  <h1>{{ num }}</h1>
  <el-button type="primary" @click="toLogin">Login</el-button>
</template>
<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()
const toLogin = () => {
  router.push({
    name: 'login'
  })
}

const num = computed(() => store.state.count)
</script>
