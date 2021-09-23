<template>
  <Chart :options="pieChartOption({ name, data })" />
</template>

<script setup>
import { defineProps } from 'vue'
import Chart from './Chart.vue'
import pieChartOption from '@/charts/pieChartOption'

defineProps({
  name: {
    type: String
  },
  data: {
    type: Array
  }
})
</script>
