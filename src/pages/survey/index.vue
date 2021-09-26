<template>
  <div class="survey-wrapper">
    <div class="container" v-if="iSError">
      <el-result
        icon="error"
        title="抱歉，没有该问卷地址，请输入正确的地址！"
      ></el-result>
    </div>
    <div class="container" v-if="detail.status == 2">
      <el-result icon="warning" title="抱歉，该投票问卷已过期！"></el-result>
    </div>
    <div class="container" v-if="detail.status == 0">
      <el-result icon="warning" title="抱歉，该投票问卷暂未发布！"></el-result>
    </div>
    <div class="container" v-if="detail.status == 1">
      <div v-if="isSuccess" class="success-result">
        <h2 class="res-title">当前关于《{{ detail.name }}》的投票结果</h2>
        <div class="info">
          <el-icon color="#67C23A" :size="20">
            <check />
          </el-icon>
          <span>投票成功</span>
        </div>
        <div class="line"></div>
        <ProgressBar
          :count="detail.recordTotalCount"
          :list="detail.optionVOList"
          :activeItems="activeItems"
        />
        <p class="static">
          已有{{ detail.participantTotalCount }}人投票 · 剩{{ timeRemaining }}
        </p>
      </div>
      <div v-if="!isSuccess" class="content-wrapper">
        <div class="begin-content">
          <p class="title">{{ detail.name }}</p>
          <div class="desc">{{ detail.description }}</div>
          <div class="check-content">
            <div class="mail-check">
              <el-form
                :model="checkForm"
                ref="checkValidateForm"
                size="mini"
                style="width: 270px"
                :rules="rules"
              >
                <el-form-item
                  v-if="detail.checkId == 2"
                  prop="email"
                  label="邮箱"
                >
                  <el-input v-model="checkForm.email"></el-input>
                </el-form-item>
                <el-form-item
                  v-if="detail.checkId == 3"
                  prop="phone"
                  label="手机号码"
                >
                  <el-input v-model="checkForm.phone"></el-input>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class="line"></div>
        </div>
        <div class="main-content">
          <h4 class="tip">
            {{ tip }}
            <span class="dot">*</span>
          </h4>
          <el-radio-group v-if="detail.isMultiple === 0" v-model="choose">
            <div v-for="item in detail.optionVOList" :key="item.id">
              <el-radio :label="item.id">{{ item.name }}</el-radio>
            </div>
          </el-radio-group>
          <el-checkbox-group v-else v-model="checkList">
            <div v-for="item in detail.optionVOList" :key="item.id">
              <el-checkbox :label="item.id">{{ item.name }}</el-checkbox>
            </div>
          </el-checkbox-group>
        </div>
        <div class="footer">
          <el-button
            @click="submitForm"
            style="width: 100px"
            type="primary"
            size="medium"
            :loading="loading"
          >
            提交
          </el-button>
        </div>
      </div>
    </div>
    <footer>
      <p>&copy; GGS · 甄步绰小组</p>
    </footer>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, computed, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { getVoteDetailStatistic, postVote } from '@/api/vote'
import { ElLoading, ElNotification } from 'element-plus'
import { debunce } from '@/utils'
import ProgressBar from '@/components/ProgressBar.vue'
import { Check } from '@element-plus/icons'
import { dateCount } from '@/utils/index'

const route = useRoute()
const voteId = window.atob(route.params.id)
const detail = ref({})
const loading = ref(false)
const choose = ref('')
const checkList = ref([])
const tip = computed(() =>
  detail.value.isMultiple === 0 ? '请选择一个选项' : '请选择一个或者多个选项'
)
const checkForm = reactive({
  email: '',
  phone: ''
})
const checkValidateForm = ref(null)
const isSuccess = ref(false)
const iSError = ref(false)

const activeItems = computed(() => {
  if (choose.value !== '') {
    return [choose.value]
  } else {
    return checkList.value
  }
})

const timeRemaining = computed(() => dateCount(detail.value.expirationDate))

onMounted(async () => {
  const elLoading = ElLoading.service({
    fullscreen: true,
    lock: true,
    text: '加载中'
  })
  try {
    const res = await getVoteDetailStatistic(voteId)
    console.log(res)
    if (res.code == 200) {
      detail.value = res.data
      document.title = detail.value.name
    } else {
      iSError.value = true
    }
  } catch (err) {
    console.log(err)
  } finally {
    elLoading.close()
  }
})

// 自定义检查手机号码规则
const checkPhone = (rule, value, callback) => {
  if (
    !/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(
      value
    )
  ) {
    callback(new Error('请输入正确的手机号码'))
  } else {
    callback()
  }
}

// 表单校验规则
const rules = reactive({
  email: [
    {
      required: true,
      message: '请输入邮箱地址',
      trigger: 'blur'
    },
    {
      type: 'email',
      message: '请输入正确的邮箱地址',
      trigger: ['blur', 'change']
    }
  ],
  phone: [
    {
      required: true,
      message: '请输入手机号码',
      trigger: 'blur'
    },
    { validator: checkPhone, trigger: ['blur', 'change'] }
  ]
})

// 提交表单的数据
const submitParams = ref([])

watch(choose, (n) => {
  submitParams.value = [
    {
      checkContent: checkForm.email || checkForm.phone,
      optionId: n,
      questionId: voteId
    }
  ]
})

watch(
  checkForm,
  debunce((n) => {
    if (submitParams.value.length) {
      submitParams.value = submitParams.value.map((item) => ({
        ...item,
        checkContent: detail.value.checkId == 2 ? n.email : n.phone
      }))
    } else {
      return false
    }
  }, 500)
)

watch(checkList, (n) => {
  submitParams.value = n.map((item) => ({
    checkContent: checkForm.email || checkForm.phone,
    optionId: item,
    questionId: voteId
  }))
})

// 表单验证
const submitForm = () => {
  checkValidateForm.value.validate(async (valid) => {
    if (valid) {
      if (choose.value || checkList.value.length) {
        loading.value = true
        const elLoading = ElLoading.service({
          fullscreen: true,
          lock: true,
          text: '提交中...'
        })
        const res = await postVote(submitParams.value)
        if (res.code == 200) {
          const res = await getVoteDetailStatistic(voteId)
          detail.value = res.data
          console.log(detail.value)
          isSuccess.value = true
        } else {
          ElNotification({
            title: '错误',
            type: 'error',
            message: res.message
          })
          location.reload()
        }
        elLoading.close()
        checkValidateForm.value.resetFields()
      } else {
        ElNotification({
          title: '温馨提示',
          type: 'warning',
          message: '请投入宝贵的一票哟'
        })
      }
    } else {
      ElNotification({
        title: '温馨提示',
        type: 'warning',
        message: '请输入有效的表单'
      })
      checkValidateForm.value.resetFields()
      return false
    }
    loading.value = false
  })
}
</script>

<style lang="less" scoped>
@media screen and (max-width: 450px) {
  .survey-wrapper {
    padding: 0 !important;
    .container {
      width: 100% !important;
      .res-title {
        font-size: 22px !important;
      }
      .main-content {
        .desc {
          font-size: 14px !important;
        }
      }
    }
  }
}

@media screen and (max-width: 814px) {
  .survey-wrapper {
    padding: 0 !important;

    .container {
      width: 100% !important;

      .main-content {
        .desc {
          font-size: 14px !important;
        }
      }
    }
  }
}

.survey-wrapper {
  width: 100%;
  height: 100%;
  padding: 70px 0 0;
  .container {
    width: 814px;
    padding: 30px 40px 66px;
    background-color: #fff;
    margin: auto;
    box-shadow: 0 0 10px #f1f1f1;
    display: flex;
    flex-direction: column;
    gap: 20px;
    .success-result {
      .res-title {
        text-align: center;
        color: #484848;
      }
      .line {
        margin: 15px 0;
        height: 3px;
        background-color: #88b9f9;
      }
      .info {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 3px;
        font-size: 14px;
        font-weight: 400;
        color: #666;
      }
      .static {
        font-size: 14px;
        color: #777;
      }
    }
    .footer {
      padding-left: 20px;
    }
    .main-content {
      padding: 20px;

      .tip {
        font-size: 16px;
        margin: 0 0 15px 0;
        color: #666;
        font-weight: normal;
      }
      .dot {
        color: #f56c6c;
        font-size: 12px;
      }
    }
    .begin-content {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .check-content {
        margin-top: 20px;
      }
      .title {
        text-align: center;
        margin: 0;
        font-size: 24px;
        color: #4c4c4c;
      }
      .desc {
        margin-top: 20px;
        font-size: 16px;
        color: #666;
      }
      .line {
        margin-top: 15px;
        height: 3px;
        background-color: #53a4f4;
      }
    }
  }
  footer {
    text-align: center;
    p {
      margin-top: 30px;
      font-size: 14px;
      color: #d0d0d0;
    }
  }
}
</style>
