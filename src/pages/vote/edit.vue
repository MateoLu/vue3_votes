<template>
  <main class="main" v-show="!isLoading">
    <aside class="el-aside">
      <!-- 选项 -->
      <div>
        <h4>投票类型</h4>
        <el-radio-group v-model="putValue.isMultiple" size="mini">
          <el-radio :label="0" border>单选</el-radio>
          <el-radio :label="1" border>多选</el-radio>
        </el-radio-group>
      </div>
      <div>
        <h4>投票过期时间</h4>
        <el-date-picker
          v-model="putValue.expirationDate"
          type="datetime"
          placeholder="选择日期时间"
          value-format="YYYY-MM-DDTHH:mm:ss.000+00:00"
          :default-time="defaultTime"
        ></el-date-picker>
      </div>
      <div>
        <h4>投票检查类型</h4>
        <el-select size="mini" v-model="putValue.checkId" placeholder="请选择">
          <el-option
            v-for="item in checkList"
            :key="item.id"
            :label="item.checkType"
            :value="parseInt(item.id)"
          ></el-option>
        </el-select>
      </div>
    </aside>
    <section class="el-main">
      <div class="vote-main">
        <div class="bottom-left">
          <div class="question-box">
            <input
              v-model="putValue.name"
              class="input-dynamic input-question"
            />
          </div>
          <div class="question-choose">
            <DynamicOptionEdit
              v-for="item in optionsData"
              v-model:text="item.name"
              :key="item.id"
              :id="item.id"
              :isMultiple="putValue.isMultiple"
              @remove="removeDynamicInput"
              @changeText="handleChangeText"
            />
          </div>
          <div class="add-option">
            <el-button @click="handleAddOption" type="text" icon="el-icon-plus">
              添加单个选项
            </el-button>
          </div>
        </div>
      </div>
      <!-- 发布并分享按钮 -->
      <el-button
        icon="el-icon-s-promotion"
        type="primary"
        @click="handleSubmit"
        class="share"
      >
        发布并分享
      </el-button>
    </section>
  </main>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import DynamicOptionEdit from './components/dynamic-option-edit.vue'
import { ElMessageBox, ElMessage, ElLoading } from 'element-plus'
import { useStore } from 'vuex'
import { useVote } from '@/hooks/vote'
import { useRoute } from 'vue-router'
import { debunce } from '@/utils'
import router from '@/router'

const store = useStore()
const route = useRoute()
const {
  getVoteDetail,
  updateVote,
  updateVoteForAddOption,
  updateVoteForDelOption,
  updateVoteForUptOption
} = useVote()
const isLoading = ref(true)

const putValue = reactive({})

const optionsData = ref([])

// 当前投票 id
const voteId = computed(() => BigInt(route.params.id))

// 挂载时获取对应投票详情数据
onMounted(async () => {
  const elLoading = ElLoading.service({ fullscreen: true, lock: true })
  const res = await getVoteDetail(voteId.value)
  Object.keys(res).forEach((key) => {
    if (key == 'checkId') {
      putValue[key] = parseInt(res[key])
    } else if (key == 'optionList') {
      optionsData.value = res[key].map((item) => ({
        id: item.id,
        name: item.name
      }))
    } else {
      putValue[key] = res[key]
    }
  })
  elLoading.close()
  isLoading.value = false
})

// 监听 putValue 的变化，自动保存功能
watch(
  putValue,
  debunce(async (n, o) => {
    if (
      new Date(n.expirationDate).getTime() >
      new Date(defaultTime.value).getTime()
    ) {
      n.status = 0
    } else {
      n.status = 2
    }

    await updateVote(voteId.value, n)
    await getVoteDetail(voteId.value)
  }, 500)
)

// 验证方式列表
const checkList = computed(() => store.state.checkList)

const defaultTime = ref(new Date())

// 更改问题名字
const handleChangeText = debunce(async ({ id, text }) => {
  await updateVoteForUptOption(id, text)
}, 500)

// 删除问题选项
const removeDynamicInput = async (id) => {
  optionsData.value = optionsData.value.filter((item) => item.id !== id)
  await updateVoteForDelOption(id)
}

// 给问题添加选项
const handleAddOption = async () => {
  const data = await updateVoteForAddOption({
    questionId: voteId.value + '',
    name: '选项'
  })
  // 添加选项业务逻辑
  optionsData.value.push({
    id: data.id,
    name: data.name
  })
}

// 提交问题表单
const handleSubmit = () => {
  ElMessageBox.confirm('确认是否发布此投票并分享?', '发布确认', {
    confirmButtonText: '确定',
    cancelButtonText: '取消'
  })
    .then(async () => {
      await updateVote(voteId.value, { ...putValue, status: 1 })
      router.replace(`/vote/publish/${voteId.value}`)
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
.main {
  display: flex;
  width: 100%;
  height: calc(100% - 60px);
  .el-aside {
    width: 400px;
    height: calc(100vh - 60px);
    padding: 20px;
    background-color: #fff;
    border-right: 1px solid #dfe5ec;
    color: #484848;
  }

  .el-main {
    flex: auto;
    height: calc(100vh - 60px);
    .vote-main {
      background-color: #fff;
      width: 70%;
      margin: auto;
      margin-top: 20px;
      padding: 20px;
      border: 1px solid #ccc;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      display: flex;
      gap: 20px;
      .bottom-left {
        flex: 2;
        display: flex;
        flex-direction: column;
        .question-choose {
          flex: auto;
        }
        .add-option {
          flex: none;
          height: 50px;
          line-height: 50px;
          padding: 0 15px;
        }
      }
    }
    .share {
      display: block;
      margin: 20px auto;
      line-height: 16px;
      padding: 11px 35px 10px 35px;
    }
  }

  .input-dynamic {
    box-sizing: border-box;
    padding: 0 10px;
    margin-bottom: 10px;
    width: 100%;
    height: 45px;
    background-color: transparent;
    border: 1px solid #fff;
    outline: none;
    color: #484848;

    &.input-question {
      font-size: 24px;
      text-align: center;
    }
    &:hover {
      border: 1px dashed #ccc;
    }
    &:focus {
      background-color: #f4f4f4;
      border: 1px solid #f4f4f4;
    }
  }
}
</style>
