<template>
  <div v-for="(item, index) in list" :key="item.id" class="container">
    <div class="name">{{ index + 1 + '、' + item.name }}&nbsp;</div>
    <div class="progress-container bg-line">
      <div
        :class="{ line: true, inner: true, active: isActive(item.id) }"
        :style="{ width: `${((item.recordCount / count) * 100).toFixed(2)}%` }"
      ></div>
      <div class="count">
        <div class="option">{{ item.recordCount }}票</div>
        <el-icon v-if="isActive(item.id)" color="#fff" :size="18">
          <circle-check />
        </el-icon>
      </div>

      <span class="percent">
        {{ `${((item.recordCount / count) * 100).toFixed(2)}%` }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { CircleCheck } from '@element-plus/icons'

const props = defineProps({
  list: {
    type: Array
  },
  count: {
    type: Number
  },
  activeItems: {
    type: Array
  }
})

const isActive = (itemId) => {
  return props.activeItems.some((item) => item === itemId)
}

console.log(props.activeItems)
</script>

<style lang="less" scoped>
.container {
  .name {
    margin-bottom: 10px;
    color: #484848;
  }
  .progress-container {
    position: relative;
    margin-bottom: 20px;
    width: 100%;
    height: 40px;
    border-radius: 4px;
    background-color: #f1f1f1;
    display: flex;
    align-items: center;
    color: #484848;
    font-size: 14px;

    &.bg-line {
      background-color: #f1f1f1;
    }
    .percent {
      position: absolute;
      right: 10px;
    }
    .count {
      position: absolute;
      left: 10px;
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .inner {
      position: relative;
      height: 100%;
      color: #fff;
      border-radius: 4px;
      transition: all 0.5s cubic-bezier(0, 0.64, 0.36, 1);

      &.line {
        background-color: #ccc;
      }

      &.active {
        background-color: #409eff;
      }
    }
  }
}
</style>
