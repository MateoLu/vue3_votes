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
            <input type="text" class="input-text" />
            <div class="text">感谢你能抽出几分钟时间来参加答题，阿里嘎多！</div>
          </div>
          <div class="vote-main-bottom">
            <p>男孩子or女孩子？</p>
            <!-- 删除问卷 -->
            <el-button
              type="text"
              icon="el-icon-delete-solid"
              class="text-delete"
            ></el-button>
            <!-- 单选框 -->
            <p>
              <el-radio v-model="radio1" label="1">男孩子</el-radio>
            </p>
            <p>
              <el-radio v-model="radio1" label="2">女孩子</el-radio>
            </p>
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
                    <el-calendar v-model="value"></el-calendar>
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
import { defineComponent, ref } from 'vue'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { Edit } from '@element-plus/icons'
import { ElMessageBox, ElMessage } from 'element-plus'

export default defineComponent({
  name: 'Main',
  components: {
    // 全名
    [Edit.name]: Edit
    // Delete
  },
  setup() {
    const value = ref(new Date())

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
      value,
      locale: zhCn,
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
        width: 800px;
        height: 107px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        line-height: 1;
        margin: auto;
        p {
          margin: 25px 0px 0px 37px;
          font-size: 17px;
        }
        .text {
          font-size: 10px;
          color: #c5c5c5;
          margin: 21px 0px 0px 37px;
        }
      }
      .vote-main-bottom {
        border: 1px solid #ccc;
        width: 800px;
        height: 250px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        margin: 24px auto;
        p {
          font-size: 14px;
          margin: 19px 0px 12px 37px;
        }
        .icon {
          float: right;
          margin: -30px 35px 0px 0px;
        }
        .text-delete {
          color: black;
          font-size: 150%;
          float: right;
          margin: -43px 38px -5px 0px;
        }
      }
      .share {
        display: block;
        margin: auto;
        line-height: 16px;
        padding: 11px 35px 10px 35px;
      }
    }
  }
}
</style>
