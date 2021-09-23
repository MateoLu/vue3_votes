<template>
  <Chart :options="lineChartOption({ name, data })" />
</template>

<script setup>
import { defineProps } from 'vue'
import Chart from './Chart.vue'
import lineChartOption from '@/charts/lineChartOption'

defineProps({
  name: {
    type: String
  },
  data: {
    type: Array
  }
})
</script>
