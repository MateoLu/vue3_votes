<template>
  <div class="home-container">
    <TheHeader />
    <div class="home-wrapper">
      <div class="title">我的项目</div>
      <!-- 搜索问卷模块 -->
      <div class="home-toolbar">
        <div class="status">
          <el-select size="mini" v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="search">
          <el-input v-model="search" size="mini" placeholder="投票项目搜索">
            <template #suffix>
              <i class="el-icon-search el-input__icon"></i>
            </template>
          </el-input>
        </div>
      </div>

      <!-- 创建项目及项目列表 -->
      <ul class="projects-wrapper">
        <li class="project-item">
          <div class="create-project" @click="handleCreateVote">
            <i style="font-weight: bold" class="el-icon-plus"></i>
            创建投票
          </div>
        </li>
        <VoteItem
          v-for="item in votesByStatus"
          :id="item.id"
          :key="item.id"
          :title="item.name"
          :status="item.status"
          :overDate="item.expirationDate"
        />
      </ul>
      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :default-current-page="1"
          :page-size="7"
          :total="parseInt(pager.total)"
        ></el-pagination>
      </div>
      <Footer />
    </div>
  </div>
</template>
<script>
import { defineComponent, ref, computed, onMounted } from 'vue'
import TheHeader from '@/components/TheHeader.vue'
import VoteItem from '@/components/VoteItem.vue'
import { useRouter } from 'vue-router'
import { useVote } from '@/hooks/vote'
import store from '@/store'
import { ElLoading } from 'element-plus'
import dayjs from 'dayjs'
import Footer from '@/components/Footer.vue'

export default defineComponent({
  components: {
    TheHeader,
    VoteItem,
    Footer
  },
  setup() {
    const { setVotes, votes, pager, makeVote } = useVote()

    onMounted(async () => {
      const elLoading = ElLoading.service({ fullscreen: true, lock: true })
      await setVotes(1)
      await store.dispatch('getCheckList')
      console.log(votes.value)

      elLoading.close()
    })

    const router = useRouter()

    // 投票问卷数据及过滤
    const value = ref(3)
    const options = ref([
      {
        value: 3,
        label: '项目状态'
      },
      {
        value: 0,
        label: '未发布'
      },
      {
        value: 1,
        label: '已发布'
      },
      {
        value: 2,
        label: '已过期'
      }
    ])
    const search = ref('')
    const votesByStatus = computed(() => {
      if (value.value === 3) {
        return votes.value.filter(
          (data) =>
            !search.value ||
            data.name.toLowerCase().includes(search.value.toLowerCase())
        )
      } else {
        return votes.value
          .filter((item) => item.status === value.value)
          .filter(
            (data) =>
              !search.value ||
              data.name.toLowerCase().includes(search.value.toLowerCase())
          )
      }
    })

    // 路由跳转
    const toPage = (address) => {
      router.push(address)
    }

    // 改变当前页
    const handleCurrentChange = async (val) => {
      const elLoading = ElLoading.service({ fullscreen: true, lock: true })
      await setVotes(val)
      elLoading.close()
    }

    // 创建投票问卷
    const handleCreateVote = async () => {
      const params = {
        checkId: 3,
        expirationDate: dayjs(new Date().getTime()).format(
          'YYYY-MM-DDTHH:mm:ss.000+08:00'
        ),
        name: '投票标题',
        description:
          '感谢您能抽出几分钟时间来参加本次答题，现在我们就马上开始吧！',
        status: 0,
        optionList: [{ name: '选项1' }, { name: '选项2' }]
      }
      await makeVote(params)
    }

    return {
      toPage,
      handleCurrentChange,
      handleCreateVote,
      votesByStatus,
      options,
      value,
      pager,
      search
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
    height: calc(100% - 60px);
    margin: auto;
    .pagination {
      margin-top: 50px;
      text-align: center;
    }
    .title {
      margin: 20px 0 15px 0;
      font-size: 14px;
      color: #666766;
    }
    .home-toolbar {
      margin-bottom: 20px;
      width: 100%;
      height: 40px;
      display: flex;
      gap: 10px;
      .status {
        width: 100px;
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
