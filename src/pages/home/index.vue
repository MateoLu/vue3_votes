<template>
  <div class="home-container">
    <TheHeader />
    <div class="home-wrapper">
      <el-container>
        <el-container>
          <el-aside width="200px">
            <el-button type="primary" class="el-btn">创建问卷</el-button>
            <!-- 边框 -->
            <div class="el-border">
              <p>您已创建{{ voteLength }}个问卷</p>
            </div>
          </el-aside>
          <el-main>
            <!-- 问卷列表+搜索框 -->
            <div class="list-container">
              <el-row :gutter="20">
                <el-col :span="14">
                  <div class="grid-content">问卷列表</div>
                </el-col>
                <el-col :span="10">
                  <el-input
                    placeholder="请输入内容"
                    suffix-icon="el-icon-search"
                    v-model="input2"
                  ></el-input>
                </el-col>
              </el-row>
            </div>

            <div class="list-votes">
              <VoteItem
                v-for="item in votes"
                :key="item.id"
                :id="item.id"
                :title="item.title"
                :num="item.num"
                :time="item.time"
              />
            </div>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref, onMounted, computed } from 'vue'
import VoteItem from '@/components/VoteItem.vue'
import TheHeader from '@/components/TheHeader.vue'

export default defineComponent({
  components: {
    VoteItem,
    TheHeader
  },
  setup() {
    const votes = ref([
      { id: 1, title: '你喜欢男的还是女的?', num: 2, time: '2018年10月2日' },
      { id: 2, title: '你喜欢男的还是女的?', num: 2, time: '2018年10月2日' },
      { id: 3, title: '你喜欢男的还是女的?', num: 2, time: '2018年10月2日' }
    ])

    onMounted(() => {})

    return {
      votes,
      voteLength: computed(() => votes.value.length),
      input2: ref('')
    }
  }
})
</script>

<style scoped lang="less">
.home-container {
  width: 100vw;
  height: 100%;
  overflow: hidden;
  .home-wrapper {
    max-width: 1048px;
    height: 100%;
    margin: auto;

    .el-main {
      text-align: center;
      line-height: 160px;
      .list-container {
        margin: -42px 0 0 0px;
        .row-bg {
          padding: 10px 0;
          background-color: #f9fafc;
        }
        .el-row {
          margin-bottom: 20px;
          &:last-child {
            margin-bottom: 0;
          }
        }
        .el-col {
          border-radius: 4px;
        }
        .grid-content {
          border-radius: 4px;
          margin: 4px 173px 0px -163px;
          min-height: 36px;
          font-size: 19px;
        }
      }
      .list-votes {
        width: 100%;
        height: 50%;
      }
    }
    .el-btn {
      margin: 35px 0px 0px 19px;
      min-height: 45px;
      min-width: 163px;
      border: #e6a23c;
      font-size: 15px;
    }
    .el-border {
      background: #e9eef3;
      width: 188px;
      height: 430px;
      margin: 35px auto;

      p {
        font-size: 13px;
        margin: 0px 0px 31px 45px;
        padding: 32px 0 0 0;
      }
    }
  }
}
</style>
