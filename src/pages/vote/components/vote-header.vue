<template>
  <!-- 头部区域 -->
  <div class="header-container">
    <!-- 左侧返回     -->
    <div class="left">
      <el-button
        size="medium"
        icon="el-icon-arrow-left"
        type="text"
        style="color: black; padding: 15px"
        @click="goPage('/home')"
      ></el-button>
      <div class="edit-wrapper">
        <div class="question-title">
          {{ curQuestion }}
        </div>
        <div class="update-info" v-if="$route.meta.isShow">
          <span v-if="isFirst">项目将自动保存</span>
          <span v-else>
            <span v-show="loading">
              <el-icon style="vertical-align: middle" class="is-loading">
                <refresh-right />
              </el-icon>
              正在保存中...
            </span>
            <span v-show="!loading">
              <el-icon style="vertical-align: middle; color: #67c23a">
                <circle-check />
              </el-icon>
              自动保存成功
            </span>
          </span>
        </div>
      </div>
    </div>
    <!-- 中间编辑项目 -->
    <div class="center">
      <el-menu
        :default-active="route.fullPath"
        class="el-menu-demo"
        mode="horizontal"
        router
      >
        <el-menu-item @click="toEdit">编辑项目</el-menu-item>
        <i class="el-icon-arrow-right"></i>
        <el-menu-item :index="`/vote/publish/${curVoteId}`">
          发布项目
        </el-menu-item>
        <i class="el-icon-arrow-right"></i>
        <el-menu-item :index="`/vote/report/${curVoteId}`">
          数据报表
        </el-menu-item>
      </el-menu>
    </div>
    <!-- 右边发布按钮 -->
    <div class="right">
      <el-button plain icon="el-icon-view" size="medium">预览</el-button>
    </div>
  </div>
</template>
<script setup>
import { computed, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { RefreshRight, CircleCheck } from '@element-plus/icons'
import { useVote } from '@/hooks/vote'
import { ElMessageBox } from 'element-plus'

const router = useRouter()
const route = useRoute()
const store = useStore()
const isFirst = ref(true)
const { curVoteDetail } = useVote()

const loading = computed(() => store.state.vote.loading)
const curVoteId = computed(() => route.params.id)

watch(loading, (n) => {
  if (isFirst.value) {
    isFirst.value = false
  }
})

const goPage = (address) => {
  router.push(address)
}

const toEdit = () => {
  if (curVoteDetail.value.status != 1) {
    goPage(`/vote/edit/${curVoteId.value}`)
  } else {
    ElMessageBox.confirm(
      '在您修改问卷时，问卷会暂停收集，您需要在修改完后再次发布问卷才可继续进行收集。',
      '修改提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }
    )
      .then(() => {
        goPage(`/vote/edit/${curVoteId.value}`)
      })
      .catch(() => {})
  }
}

const curQuestion = computed(() => store.state.vote.currentVoteDetail.name)
</script>

<style scoped lang="less">
.header-container {
  position: relative;
  width: 100%;
  height: 60px;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    flex: 1;
    display: flex;
    align-items: center;
    .edit-wrapper {
      flex: auto;
      display: flex;
      gap: 20px;
      .question-title {
        flex: none;
        max-width: 300px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: 14px;
        color: #484848;
      }
      .update-info {
        flex: 1;
        padding-left: 20px;
        font-size: 12px;
        line-height: 17px;
        border-left: 1px solid #ebebea;
        color: #aaa;
      }
    }
  }
  .center {
    flex: 1;
    display: flex;
    justify-content: center;
    margin-left: 5%;
    .el-menu-demo {
      width: 400px;
      display: flex;
      align-items: center;
    }
  }
  .right {
    flex: 1;
    text-align: right;
    margin-right: 30px;
  }
}
</style>
