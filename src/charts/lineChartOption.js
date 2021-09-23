export default function barChartOption(options = { name: '', data: [] }) {
  const xData = options.data.map((item) => item.name)
  const seriesData = options.data.map((item) => item.value)
  const maxNum = Math.max(...seriesData)
  return {
    xAxis: {
      type: 'category',
      data: xData,
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      splitNumber: maxNum
    },
    grid: {
      left: '25%',
      right: '25%',
      bottom: '5%',
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'none'
      }
    },
    series: [
      {
        data: seriesData,
        type: 'line',
        itemStyle: {
          color: '#4a7bf7'
        },
        symbol: 'circle',
        symbolSize: 6
      }
    ]
  }
}
