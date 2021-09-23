<template>
  <Chart :options="barChartOption({ name, data })" />
</template>

<script setup>
import { defineProps } from 'vue'
import Chart from './Chart.vue'
import barChartOption from '@/charts/barChartOption'

defineProps({
  name: {
    type: String
  },
  data: {
    type: Array
  }
})
</script>
