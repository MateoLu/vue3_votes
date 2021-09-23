<template>
  <div v-show="!isLoading" class="publish-wrapper">
    <div class="publish-container">
      <!-- 未发布 -->
      <div v-if="curVoteDetail.status === 0" class="not-publish">
        <p>开启发布后，即可分享问卷哟</p>
        <el-button @click="handlePublish" size="medium" type="primary">
          开始发布
        </el-button>
      </div>
      <!-- 已发布 -->
      <div v-else-if="curVoteDetail.status === 1" class="published">
        <h4 class="title">分享链接</h4>
        <div class="share-input">
          <div class="link-address">
            {{ shareLink }}
          </div>
          <div class="copy">
            <button v-copy:[success]="shareLink" class="copy-btn">复制</button>
          </div>
          <el-button
            @click="openLink"
            size="medium"
            style="margin-left: 10px"
            plain
          >
            打开
          </el-button>
        </div>
      </div>
      <!-- 问卷过期 -->
      <div v-else-if="curVoteDetail.status === 2" class="exp-date">
        <el-result
          icon="warning"
          title="抱歉，该投票项目已过期"
          subTitle="您可以点击下方按钮进行修改项目过期时间"
        >
          <template #extra>
            <el-button
              @click="toPage(`/vote/edit/${route.params.id}`)"
              type="primary"
              size="medium"
            >
              修改问卷
            </el-button>
          </template>
        </el-result>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useVote } from '@/hooks/vote'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  ElLoading,
  ElMessageBox,
  ElMessage,
  ElNotification
} from 'element-plus'

// import { useStore } from 'vuex'

const route = useRoute()
const router = useRouter()
const isLoading = ref(true)

const toPage = (address) => {
  router.push(address)
}

const { getVoteDetail, updateVote } = useVote()
const curVoteDetail = ref({})
onMounted(async () => {
  const elLoading = ElLoading.service({
    fullscreen: true,
    lock: true,
    text: '加载中'
  })
  curVoteDetail.value = await getVoteDetail(route.params.id)
  elLoading.close()
  isLoading.value = false
})
console.log(location)
const shareLink = ref(
  `http://${location.host + location.pathname}#/survey/${window.btoa(
    route.params.id
  )}`
)
const success = (value) => {
  ElMessage.success('复制成功')
}
const openLink = () => {
  window.open(shareLink.value)
}

const handlePublish = async () => {
  ElMessageBox.confirm(
    `你要发起投票《${curVoteDetail.value.name}》吗？`,
    '发布确认',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    }
  )
    .then(async () => {
      const elLoading = ElLoading.service({
        fullscreen: true,
        lock: true,
        text: '发布中',
        spinner: 'el-icon-loading'
      })
      await updateVote(route.params.id, {
        ...curVoteDetail.value,
        status: 1
      })
      setTimeout(() => {
        elLoading.close()
        ElNotification({
          title: '成功',
          message: '投票项目已成功发布',
          type: 'success'
        })
      }, 500)

      setTimeout(() => location.reload(), 800)
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消发布'
      })
    })
}
</script>

<style scoped lang="less">
.publish-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .publish-container {
    max-width: 1176px;
    height: 100%;
    margin: auto;
    padding: 40px 0;
    .not-publish {
      text-align: center;
      width: 100%;
      margin-top: 20%;
      p {
        font-size: 22px;
        color: #484848;
      }
    }

    .published {
      width: 1118px;
      padding: 20px 20px 50px 20px;
      margin: auto;
      background-color: #fff;
      border-radius: 5px;
      box-shadow: 0 0 7px rgba(0, 0, 0, 0.2);
      .title {
        font-weight: normal;
        color: #484848;
      }
      .share-input {
        display: flex;
        width: 70%;
        height: 35px;
        .link-address {
          flex: auto;
          border-radius: 2px 0 0 2px;
          border: 1px solid #ccc;
          border-right-color: transparent;
          line-height: 35px;
          font-size: 12px;
          padding: 0 10px;
          color: #484848;
          background-color: #f7f9fa;
        }
        .copy {
          flex: none;
          width: 70px;
          .copy-btn {
            width: 100%;
            height: 100%;
            cursor: pointer;
            outline: none;
            border: none;
            color: #fff;
            font-size: 14px;
            background-color: #2672ff;
            border-radius: 0 2px 2px 0;
            border: 1px solid #2672ff;
            &:hover {
              background-color: #4a7bf7;
              border: 1px solid #4a7bf7;
            }
          }
        }
      }
    }
  }
}
</style>
