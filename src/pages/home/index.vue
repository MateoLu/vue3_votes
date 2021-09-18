<template>
  <div class="home-container">
    <TheHeader />
    <div class="home-wrapper">
      <!-- 搜索问卷模块 -->
      <div class="home-toolbar">
        <div class="title">我的问卷</div>
        <div class="search">
          <el-input placeholder="投票项目搜索">
            <template #suffix>
              <i class="el-icon-search el-input__icon"></i>
            </template>
          </el-input>
        </div>
      </div>

      <!-- 创建项目及项目列表 -->
      <ul class="projects-wrapper">
        <li class="project-item">
          <div class="create-project" @click="toPage('/create-vote')">
            <i style="font-weight: bold" class="el-icon-plus"></i>
            创建投票
          </div>
        </li>
        <VoteItem
          v-for="item in votesData"
          :key="item.id"
          :title="item.name"
          :status="item.status"
          :overDate="item.date"
        />
      </ul>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'
import TheHeader from '@/components/TheHeader.vue'
import VoteItem from '@/components/VoteItem.vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  components: {
    TheHeader,
    VoteItem
  },
  setup() {
    const router = useRouter()
    const votesData = ref([
      {
        id: 1,
        date: '2021年9月21日',
        name: '你喜欢男孩还是女孩hahahahahahahah？',
        status: 0
      },
      { id: 2, date: '2021年9月21日', name: '你喜欢男孩还是女孩？', status: 1 },
      { id: 3, date: '2021年9月21日', name: '你喜欢男孩还是女孩？', status: 1 },
      { id: 4, date: '2021年9月21日', name: '你喜欢男孩还是女孩？', status: 2 },
      { id: 5, date: '2021年9月21日', name: '你喜欢男孩还是女孩？', status: 0 },
      { id: 6, date: '2021年9月21日', name: '你喜欢男孩还是女孩？', status: 1 }
    ])

    const toPage = (address) => {
      router.push(address)
    }

    return {
      toPage,
      votesData
    }
  }
})
</script>

<style scoped lang="less">
.home-container {
  width: 100vw;
  height: 100%;
  overflow-y: auto;
  .home-wrapper {
    max-width: 1176px;
    padding: 20px;
    height: 100%;
    margin: auto;
    .home-toolbar {
      margin-bottom: 20px;
      width: 100%;
      height: 40px;
      line-height: 40px;
      display: flex;
      justify-content: space-between;
      .title {
        font-size: 14px;
        color: #666766;
      }
    }
    .projects-wrapper {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      list-style: none;
      padding: 0;
      .project-item {
        width: 269px;
        height: 175px;
        .create-project {
          width: 100%;
          height: 100%;
          background-color: #fff;
          border-radius: 5px;
          box-shadow: -2px 4px 5px 0 rgb(0 0 0 / 6%);
          text-align: center;
          line-height: 175px;
          color: #3c70f6;
          cursor: pointer;
          &:hover {
            box-shadow: -3px 6px 12px 0 rgb(0 0 0 / 10%);
          }
        }
      }
    }
  }
}
</style>
