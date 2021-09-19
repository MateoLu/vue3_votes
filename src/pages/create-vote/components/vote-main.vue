<template>
  <main class="main-wrapper">
    <aside class="el-aside">
      <!-- 选项 -->
      <div>
        <h4>投票类型</h4>
        <el-radio-group v-model="voteType" size="mini">
          <el-radio label="0" border>单选</el-radio>
          <el-radio label="1" border>多选</el-radio>
        </el-radio-group>
      </div>
      <div>
        <h4>投票过期时间</h4>
        <el-date-picker
          v-model="expTime"
          type="datetime"
          placeholder="选择日期时间"
          value-format="YYYY-MM-DDTHH:mm:ss.000+00:00"
          :default-time="defaultTime"
        ></el-date-picker>
      </div>
    </aside>
    <section class="el-main">
      <div class="vote-main">
        <div class="bottom-left">
          <div class="question-box">
            <input
              v-model="voteForm.question"
              class="input-dynamic input-question"
            />
          </div>
          <div class="question-choose">
            <DynamicRadioEdit
              v-for="item in optionArr"
              v-model:text="item.value"
              :key="item.id"
              :id="item.id"
              @remove="removeDynamicInput"
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
  </main>
</template>

<script>
import { defineComponent, ref, reactive, watch } from 'vue'
import DynamicRadioEdit from './dynamic-radio-edit.vue'
import { Edit, Minus } from '@element-plus/icons'
import { ElMessageBox, ElMessage } from 'element-plus'
import { nanoid } from 'nanoid'

export default defineComponent({
  name: 'Main',
  components: {
    // 全名
    [Edit.name]: Edit,
    [Minus.name]: Minus,
    DynamicRadioEdit
  },
  setup() {
    const voteForm = reactive({
      question: '问题'
    })

    const voteType = ref('0')
    const expTime = ref('')
    const defaultTime = ref(new Date())

    const optionArr = ref([])

    watch(
      optionArr.value,
      (newVal, oldVal) => {
        console.log(newVal)
      },
      { deep: true }
    )

    const removeDynamicInput = (id) => {
      optionArr.value = optionArr.value.filter((item) => item.id !== id)
    }

    const handleAddOption = () => {
      optionArr.value.push({
        id: nanoid(),
        value: '选项'
      })
    }

    // 提交问题表单
    const handleSubmit = () => {
      ElMessageBox.confirm('确认是否发布此投票?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      })
        .then(() => {
          ElMessage({
            type: 'success',
            message: '发布成功!'
          })
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '已取消发布'
          })
        })
    }

    return {
      voteForm,
      voteType,
      expTime,
      defaultTime,
      handleSubmit,
      optionArr,
      handleAddOption,
      removeDynamicInput
    }
  }
})
</script>

<style scoped lang="less">
.main-wrapper {
  display: flex;
  z-index: 1;
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
