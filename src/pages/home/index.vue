<template>
  <div class="home-container">
    <div class="home-wrapper">
      <el-container>
        <el-header>
          <!-- 头像 -->
          <div class="img">
            <img src="@/assets/images/zbc_logo.jpg" width="30" alt="" />
            &nbsp;甄布绰投票系统

            <!-- 我的问卷 -->
            <span style="margin-left: 600px">
              <i class="el-icon-document"></i>
              我的问卷
            </span>

            <!-- 个人信息和退出 -->
            <el-button style="margin: 13px">
              <el-dropdown>
                <span class="el-dropdown-link">
                  <i class="el-icon-user"></i>
                  admin
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>
                      <i class="el-icon-document">退出</i>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </el-button>
          </div>
        </el-header>

        <el-container>
          <el-aside width="200px">
            <el-button type="primary" class="el-btn">创建问卷</el-button>
            <!-- 边框 -->
            <div class="el-border">
              <p>您已创建3个问卷</p>
              <div style="font-size: 12px; margin: 0 8px 0 22px">
                已有三个人回答了您的问卷，超越了全国100%的人
              </div>
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
              <div class="vote">
                <div class="vote-top">
                  你们喜欢男孩子还是女孩子?
                  <span>
                    ID：1&nbsp;&nbsp;&nbsp;答卷人数：1&nbsp;&nbsp;&nbsp;创建时间:2021年9月11号
                  </span>
                  <el-divider></el-divider>
                </div>

                <div class="vote-bottom">
                  <i class="el-icon-view">查看问卷</i>
                  <i class="el-icon-share">分享问卷</i>
                  <div class="vote-icon">
                    <i class="el-icon-setting">编辑问卷</i>
                    <i class="el-icon-delete">删除问卷</i>
                    <i class="el-icon-s-promotion">已发布</i>
                  </div>
                </div>
              </div>
              <div class="vote">
                <div class="vote-top">
                  你们喜欢男孩子还是女孩子?
                  <span>
                    ID：1&nbsp;&nbsp;&nbsp;答卷人数：1&nbsp;&nbsp;&nbsp;创建时间:2021年9月11号
                  </span>
                  <el-divider></el-divider>
                </div>
                <div class="vote-bottom">
                  <i class="el-icon-view">查看问卷</i>
                  <i class="el-icon-share">分享问卷</i>
                  <div class="vote-icon">
                    <i class="el-icon-setting">编辑问卷</i>
                    <i class="el-icon-delete">删除问卷</i>
                    <i class="el-icon-s-promotion">已发布</i>
                  </div>
                </div>
              </div>
              <div class="vote">
                <div class="vote-top">
                  你们喜欢男孩子还是女孩子?
                  <span>
                    ID：1&nbsp;&nbsp;&nbsp;答卷人数：1&nbsp;&nbsp;&nbsp;创建时间:2021年9月11号
                  </span>
                  <el-divider></el-divider>
                </div>
                <div class="vote-bottom">
                  <i class="el-icon-view">查看问卷</i>
                  <i class="el-icon-share">分享问卷</i>
                  <div class="vote-icon">
                    <i class="el-icon-setting">编辑问卷</i>
                    <i class="el-icon-delete">删除问卷</i>
                    <i class="el-icon-s-promotion">已发布</i>
                  </div>
                </div>
              </div>
            </div>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {}
})
</script>

<style scoped lang="less">
.home-container {
  width: 100%;
  height: 100%;
  .home-wrapper {
    max-width: 1048px;
    height: 100%;
    margin: auto;
    .el-header,
    .el-footer {
      background-color: #fff;
      color: var(--el-text-color-primary);
      line-height: 60px;
      .img {
        line-height: 60px;
        display: flex;
        align-items: center;
      }
    }
    .el-main {
      text-align: center;
      line-height: 160px;
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
      .vote {
        border: 1px solid #ccc;
        width: 808px;
        height: 121px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        margin-bottom: 18px;
        line-height: 1;
        text-align: left;
      }
      .vote-top {
        margin: 15px 0px 0px 23px;
        font-size: 14px;

        span {
          float: right;
          margin: 0px 37px 0 0;
          font-size: 11px;
        }
      }
      .vote-bottom {
        i {
          margin: 0px 13px -1px 24px;
          font-size: 13px;
        }
        .vote-icon {
          padding: 0px 0px 0px 489px;
          margin: -14px 0 0 0;
        }
      }
    }
  }
}
</style>
