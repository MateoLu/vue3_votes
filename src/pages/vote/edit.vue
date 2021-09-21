<template>
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
          <input v-model="putValue.name" class="input-dynamic input-question" />
        </div>
        <div class="question-choose">
          <DynamicRadioEdit
            v-for="item in optionsData"
            v-model:text="item.name"
            :key="item.id"
            :id="item.id"
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
    <el-button type="primary" @click="handleSubmit" class="share">
      发布并分享
    </el-button>
  </section>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import DynamicRadioEdit from './components/dynamic-radio-edit.vue'
import { ElMessageBox, ElMessage, ElLoading } from 'element-plus'
import { useStore } from 'vuex'
import { useVote } from '@/hooks/vote'
import { useRoute } from 'vue-router'
import { debunce } from '@/utils'

const store = useStore()
const route = useRoute()
const {
  getVoteDetail,
  updateVote,
  updateVoteForAddOption,
  updateVoteForDelOption,
  updateVoteForUptOption
} = useVote()

const putValue = reactive({
  checkId: 1,
  expirationDate: '',
  isMultiple: 0,
  name: '',
  status: 0
})

const optionsData = ref([])

const voteId = computed(() => BigInt(route.params.id))
onMounted(async () => {
  const elLoading = ElLoading.service({ fullscreen: true })
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
})

const isFirst = ref(true)
watch(
  putValue,
  debunce(async (n, o) => {
    if (isFirst.value) {
      isFirst.value = false
      return
    }
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

const checkList = computed(() => store.state.checkList)

const defaultTime = ref(new Date())

const handleChangeText = debunce(async ({ id, text }) => {
  await updateVoteForUptOption(id, text)
}, 500)

const removeDynamicInput = async (id) => {
  optionsData.value = optionsData.value.filter((item) => item.id !== id)
  await updateVoteForDelOption(id)
}
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
  ElMessageBox.confirm('确认是否发布此投票?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'info'
  })
    .then(async () => {})
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消发布'
      })
    })
}
</script>

<style scoped lang="less">
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
  height: 30px;
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
</style>
