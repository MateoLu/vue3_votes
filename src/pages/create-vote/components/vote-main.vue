<template>
  <div class="home-container">
    <div class="home-wrapper">
      <el-container>
        <el-aside>
          <!-- 选项 -->
          <h3>选择题</h3>
          <el-button plain>单选题</el-button>
          <el-button plain>多选题</el-button>
        </el-aside>
        <el-main>
          <div class="vote-main">
            <input v-model="voteForm.title" class="input-dynamic" />
            <div class="text">感谢你能抽出几分钟时间来参加答题，阿里嘎多！</div>
          </div>
          <div class="vote-main-bottom">
            <div class="bottom-left">
              <div class="question-box">
                <input v-model="voteForm.question" class="input-dynamic" />
              </div>
              <div class="question-choose">
                <DynamicRadioEdit />
                <DynamicRadioEdit />
              </div>
            </div>
            <div class="bottom-right"></div>
          </div>
          <!-- 发布并分享按钮 -->
          <el-button type="primary" @click="open" class="share">
            发布并分享
          </el-button>
        </el-main>
        <el-aside style="width: 450px">
          <div class="calendar">
            <!--日历图表-->
            <el-row :gutter="20" class="home_head">
              <el-col>
                <el-card>
                  <el-config-provider :locale="locale">
                    <el-calendar v-model="newDateValue"></el-calendar>
                  </el-config-provider>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </el-aside>
      </el-container>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue'
import DynamicRadioEdit from './dynamic-radio-edit.vue'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { Edit, Minus } from '@element-plus/icons'
import { ElMessageBox, ElMessage } from 'element-plus'

export default defineComponent({
  name: 'Main',
  components: {
    // 全名
    [Edit.name]: Edit,
    [Minus.name]: Minus,
    DynamicRadioEdit
  },
  setup() {
    const newDateValue = ref(new Date())

    const voteForm = reactive({
      title: '',
      question: ''
    })

    const minusRef = ref(undefined)

    const open = () => {
      ElMessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          ElMessage({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '已取消删除'
          })
        })
    }

    return {
      newDateValue,
      locale: zhCn,
      voteForm,
      minusRef,
      radio1: ref('男孩子'),
      radio2: ref('女孩子'),
      open
    }
  }
})
</script>

<style scoped lang="less">
.home-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  .home-wrapper {
    width: 100%;
    height: 100%;
    background-color: #f3f5f6;
    .el-aside {
      background-color: #f2f2f2;
      width: 257px;
      height: 100%;
      h3 {
        margin: 32px 0px 0px 27px;
      }
      button {
        margin: 23px 0px 0 75px;
        padding: 10px 33px 10px 33px;
      }
      .calendar {
        width: 450px;
        height: 100%;
        overflow: hidden;
      }
    }

    .el-main {
      background-color: #f8f8f8;
      height: calc(100vh - 50px);
      .vote-main {
        border: 1px solid #ccc;
        padding: 20px;
        width: 800px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        margin: auto;

        p {
          margin: 25px 0px 0px 37px;
          font-size: 17px;
        }
        .text {
          font-size: 10px;
          color: #c5c5c5;
        }
      }
      .vote-main-bottom {
        background-color: #fff;
        margin: auto;
        margin-top: 20px;
        padding: 20px;
        border: 1px solid #ccc;
        width: 800px;
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
        }
        .bottom-right {
          text-align: right;
          flex: 1;
        }
      }
      .share {
        margin: 112px 0px 0px 364px;
        line-height: 16px;
        padding: 11px 35px 10px 35px;
      }
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
  border: none;
  outline: none;
  &:hover {
    border: 1px dashed #ccc;
  }
  &:focus {
    background-color: #f4f4f4;
    border: 1px solid #f4f4f4;
  }
}
</style>
