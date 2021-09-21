<template>
  <div class="vote-container">
    <VoteHeader />
    <main class="main-wrapper">
      <router-view />
    </main>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import VoteHeader from './components/vote-header.vue'

export default defineComponent({
  setup() {},
  components: {
    VoteHeader
  }
})
</script>

<style scoped lang="less">
.vote-container {
  width: 100vw;
  height: 100%;
  overflow: hidden;
  .main-wrapper {
    display: flex;
    width: 100%;
    height: calc(100% - 60px);
  }
}
</style>
