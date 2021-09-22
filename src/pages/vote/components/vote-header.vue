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
      <el-button
        plain
        icon="el-icon-view"
        size="medium"
        @click="drawer = true"
        v-model="direction"
      >
        预览
      </el-button>
    </div>
  </div>

  <el-drawer
    v-model="drawer"
    :direction="direction"
    size="100%"
    :with-header="false"
  >
    <!-- 预览头部 -->
    <div class="drawer-container">
      <div class="drawer-header">
        <div class="drawer-left">
          <i class="drawer-icon"></i>
          <span class="drawer-span">退出预览</span>
        </div>
        <div class="drawer-center">
          <span class="drawer-tip">提示：当前为预览页面，答案不被记录。</span>
        </div>
        <div class="drawer-right">
          <el-button type="primary">发布并分享</el-button>
        </div>
      </div>
      <div class="drawer-main">
        <div class="main-box">
          <div class="main-title">
            {{ voteTitle }}
          </div>
          <div class="main-welcome">
            欢迎参与本次投票，现在我们就马上开始吧！
          </div>
          <div class="main-blueWire"></div>
          <div class="question-box">
            <div class="question-id">{{ voteTitle }}</div>
          </div>
          <div class="question-choose">
            <div class="radio-container">
              <div class="radio-select">
                <el-radio :label="0">{{ voteSelect }}</el-radio>
                <el-radio :label="1">
                  {{ voteValue.name }}
                </el-radio>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-drawer>
</template>
<script setup>
import { computed, ref, watch, reactive } from 'vue'
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

const drawer = ref(false)
const direction = ref('ttb')
// 预览投票
const voteTitle = computed(() => store.state.vote.currentVoteDetail.name)

const voteValue = reactive({
  id: '',
  name: ''
})

const voteSelect = computed(() =>
  store.state.vote.currentVoteDetail.optionList.forEach((key, index) => {
    console.log(key.name)
    console.log(index)
    for (let index = 0; index <= key.name.length; index++) {
      voteValue.name = key.name
      console.log(voteValue.name)
    }
  })
)
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

.drawer-container {
  background-color: #f5f5f5;
  .drawer-header {
    height: 50px;
    vertical-align: bottom;
    position: absolute;
    background: #efefef;
    width: 100%;
    // z-index: 99;
    .drawer-left {
      position: absolute;
      left: 36px;
      top: 50%;
      padding: 2px 5px;
      transform: translateY(-50%);
      cursor: pointer;
      .drawer-icon {
        width: 24px;
        height: 24px;
        display: inline-block;
        vertical-align: middle;
        margin-right: 11px;
        background: url(https://s1.wenjuan.com/static/images/icon_edit_tools.png)
          no-repeat;
        // background: url(../../../assets/images/vote_header_exit.svg)
        background-position: -360px -168px;
        background-size: 520px auto;
      }
      .drawer-span {
        font-size: 12px;
        color: #484848;
        text-align: center;
        vertical-align: middle;
      }
    }
    .drawer-center {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      .drawer-tip {
        font-size: 14px;
        color: #aaa;
      }
    }
    .drawer-right {
      position: absolute;
      right: 18px;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  .drawer-main {
    padding: 145px 557px 145px;
    width: 100%;
    height: 100vh;
    background-color: #f5f5f5;
    .main-box {
      // height: 675px;
      background-color: #ffffff;
      clear: both;
      overflow: hidden;
      padding: 10px 40px 66px;
    }
    .main-title {
      font-size: 18px;
      margin-top: 38px;
    }
    .main-welcome {
      margin-top: 26px;
      font-size: 15px;
    }
    .main-blueWire {
      background-color: #53a4f4 !important;
      float: left;
      width: 100%;
      height: 3px;
      margin-top: 26px;
    }
    .question-box {
      width: 734px;
      margin-top: 30px;
      padding-left: 15px;
      display: -webkit-inline-box;
    }
    .question-choose {
      .radio-container {
        .radio-select {
          display: inline-block;
          display: inline;
          zoom: 1;
          vertical-align: top;
          line-height: 17px;
        }
      }
    }
  }
}
</style>
