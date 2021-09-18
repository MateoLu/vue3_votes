<template>
  <li class="project-item">
    <div class="project-info">
      <div class="header">
        <div class="title">{{ title }}</div>
        <div class="tag"><el-tag size="mini">投票</el-tag></div>
      </div>
      <div class="content">
        <div v-if="status == 0" class="notpub">未发布</div>
        <div v-if="status == 1" class="pub">已发布</div>
        <div v-if="status == 2" class="overdue">已过期</div>
        <div class="expiration-date">截止日期：{{ overDate }}</div>
      </div>
      <ul class="toolbar">
        <li class="tool-item">
          <el-tooltip effect="light" content="编辑" placement="top">
            <el-link :underline="false" icon="el-icon-edit">编辑</el-link>
          </el-tooltip>
        </li>
        <li class="tool-item">
          <el-tooltip effect="light" content="发布" placement="top">
            <el-link
              :disabled="status == 1"
              :underline="false"
              icon="el-icon-s-promotion"
            >
              发布
            </el-link>
          </el-tooltip>
        </li>
        <li class="tool-item">
          <el-tooltip effect="light" content="数据" placement="top">
            <el-link :underline="false" icon="el-icon-s-data">数据</el-link>
          </el-tooltip>
        </li>
        <li class="tool-item">
          <el-dropdown placement="bottom-start" size="mini" trigger="click">
            <el-link :underline="false" icon="el-icon-more"></el-link>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>预览项目</el-dropdown-item>
                <el-dropdown-item>暂停项目</el-dropdown-item>
                <el-dropdown-item>删除项目</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </li>
      </ul>
    </div>
  </li>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  status: {
    type: Number,
    default: 0
  },
  title: {
    type: String
  },
  overDate: {
    type: String
  }
})
</script>

<style scoped lang="less">
.project-item {
  width: 269px;
  height: 175px;
  .project-info {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 20px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: -2px 4px 5px 0 rgb(0 0 0 / 6%);
    cursor: pointer;
    color: #484848;
    .header {
      flex: none;
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      .title {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        margin-right: 10px;
      }
    }
    .content {
      flex: auto;
      display: flex;
      padding-bottom: 48px;
      flex-direction: column;
      font-size: 18px;
      justify-content: center;
      align-items: center;
      gap: 15px;
      .notpub {
        color: #f5c156;
        margin-top: 15px;
      }
      .pub {
        color: #7ebf50;
        margin-top: 15px;
      }
      .overdue {
        color: #9898aa;
        margin-top: 15px;
      }
      .expiration-date {
        font-size: 12px;
        color: #aaa;
      }
    }
    &:hover {
      box-shadow: -3px 6px 12px 0 rgb(0 0 0 / 10%);
    }
    .toolbar {
      position: absolute;
      padding: 0;
      left: 0;
      bottom: 0;
      display: flex;
      list-style: none;
      width: 100%;
      height: 48px;
      background-color: #f7f8fa;
      border-radius: 0 0 5px 5px;
      .tool-item {
        flex: 1;
        text-align: center;
        line-height: 48px;
        .el-link {
          font-size: 12px;
        }
      }
    }
  }
}
</style>
