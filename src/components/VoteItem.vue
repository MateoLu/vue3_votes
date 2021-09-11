<template>
  <div class="vote">
    <div class="vote-top">
      {{ title }}
      <span>
        ID：{{ id }}&nbsp;&nbsp;&nbsp;答卷人数：{{
          num
        }}&nbsp;&nbsp;&nbsp;创建时间：{{ time }}
      </span>
      <el-divider></el-divider>
    </div>

    <div class="vote-bottom">
      <div class="left">
        <el-button class="text-info" type="text" icon="el-icon-view">
          查看问卷
        </el-button>
        <el-button type="text" icon="el-icon-share">分享问卷</el-button>
      </div>

      <div class="right">
        <el-button type="text" icon="el-icon-setting">编辑问卷</el-button>
        <el-button class="text-danger" type="text" icon="el-icon-delete">
          删除问卷
        </el-button>
        <el-button class="text-success" type="text" icon="el-icon-s-promotion">
          已发布
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  props: ['title', 'id', 'num', 'time']
})
</script>

<style scoped lang="less">
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
  display: flex;
  padding: 0 20px;
  justify-content: space-between;
  align-items: center;
}

.text-danger {
  color: #e47370;
}

.text-success {
  color: #7ec051;
}

.text-info {
  color: #a7a9ad;
}
</style>
