<template>
  <div class="radio-container" @mouseover="handleOver" @mouseout="handleOut">
    <input
      @blur="handleBlur"
      @focus="handleFocus"
      @change="
        (e) => {
          if (e.target.value === '') {
            e.target.value = '选项'
            $emit('update:text', '选项')
          } else {
            $emit('update:text', e.target.value)
          }
        }
      "
      :value="text"
      ref="conRef"
      class="input-dynamic-radio"
    />
    <el-tooltip effect="dark" content="删除" placement="top">
      <el-button
        v-show="isShow"
        circle
        icon="el-icon-minus"
        size="mini"
        :type="isOver ? 'danger' : 'info'"
        style="vertical-align: middle"
        @mouseenter="btnOver"
        @mouseleave="btnOut"
        @click="$emit('remove', id)"
      ></el-button>
    </el-tooltip>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'
const isShow = ref(false)
const conRef = ref(undefined)

defineProps({
  text: {
    type: String
  },
  id: {
    type: String
  }
})

const isOver = ref(false)
const btnOver = () => {
  isOver.value = true
}

const btnOut = () => {
  isOver.value = false
}

const handleOver = () => {
  if (conRef.value === document.activeElement) {
    conRef.value.style.border = '1px solid #f4f4f4'
  } else {
    conRef.value.style.border = '1px dashed #ccc'
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
  height: 30px;
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
