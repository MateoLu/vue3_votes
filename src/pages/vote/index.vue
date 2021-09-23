<template>
  <div class="vote-container">
    <VoteHeader />
    <section class="main-wrapper">
      <router-view />
    </section>
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
    width: 100%;
    height: calc(100% - 60px);
  }
}
</style>
