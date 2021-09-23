<template>
  <div class="chart-container" ref="container"></div>
</template>

<script setup>
import { ref, onMounted, defineProps, toRefs, watch } from 'vue'
import * as echarts from 'echarts'

const unwrap = (obj) => obj && (obj.__v_raw || obj.valueOf() || obj)

const props = defineProps({
  options: {
    required: true,
    type: Object,
    default: () => ({})
  }
})

const container = ref('null')
const chart = ref(null)
const { options } = toRefs(props)

watch(
  options,
  (newOptions) => {
    unwrap(chart.value).setOption(newOptions)
  },
  { deep: true }
)

onMounted(() => {
  chart.value = echarts.init(container.value)
  unwrap(chart.value).setOption(props.options)
})
</script>

<style scoped lang="less">
.chart-container {
  width: 100%;
  height: 100%;
}
</style>
