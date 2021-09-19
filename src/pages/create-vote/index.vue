<template>
  <div class="home-container">
    <VoteHeader />
    <VoteMain />
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import VoteHeader from './components/vote-header.vue'
import VoteMain from './components/vote-main.vue'

export default defineComponent({
  setup() {},
  components: {
    VoteHeader,
    VoteMain
  }
})
</script>

<style scoped lang="less">
.home-container {
  width: 100vw;
  height: 100%;
  overflow: hidden;
}
</style>
