<template>
  <div class="radio-container" @mouseover="handleOver" @mouseout="handleOut">
    <input
      @blur="handleBlur"
      @focus="handleFocus"
      v-model="this.$props.question"
      ref="conRef"
      class="input-dynamic-radio"
    />
    <el-button
      v-show="isShow"
      id="minus"
      circle
      icon="el-icon-minus"
      size="mini"
      type="info"
    ></el-button>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'
const isShow = ref(false)
const conRef = ref(undefined)

defineProps({
  question: {
    type: String,
    default: '选项'
  }
})

const handleOver = () => {
  if (conRef.value === document.activeElement) {
    conRef.value.style.border = '1px solid #f4f4f4'
  } else {
    conRef.value.style.borderStyle = 'dashed'
    conRef.value.style.borderColor = '#ccc'
    isShow.value = true
  }
}

const handleOut = () => {
  if (conRef.value === document.activeElement) {
    conRef.value.style.border = '1px solid #f4f4f4'
    isShow.value = true
  } else {
    conRef.value.style.border = '1px solid #fff'
    isShow.value = false
  }
}

const handleBlur = () => {
  conRef.value.style.border = '1px solid #fff'
  isShow.value = false
}

const handleFocus = () => {
  conRef.value.style.border = '1px solid #f4f4f4'
}
</script>

<style scoped lang="less">
.radio-container {
  position: relative;
  box-sizing: border-box;
  margin-bottom: 10px;
  &::before {
    content: '';
    position: absolute;
    left: 10px;
    top: 4px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid #cbcbcb;
    background-color: #fff;
  }
  .input-dynamic-radio {
    box-sizing: border-box;
    padding-left: 40px;
    margin-right: 20px;
    width: 80%;
    height: 30px;
    background-color: transparent;
    border: 1px solid #fff;
    outline: none;
    &:focus {
      border: 1px solid #f4f4f4;
      background-color: #f4f4f4;
    }
  }
}
</style>
