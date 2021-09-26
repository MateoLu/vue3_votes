export default function barChartOption(options = { name: '', data: [] }) {
  const xData = options.data.map((item) => item.name)
  const sum = options.data.reduce((prev, cur) => prev + cur.value, 0)
  const seriesData = options.data.map((item) =>
    ((item.value / sum) * 100).toFixed(2)
  )
  // const maxNum = Math.max(...seriesData)
  return {
    xAxis: {
      type: 'category',
      data: xData
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} %'
      },
      max: 100
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: '{b}' + ': ' + '{c}%'
    },
    grid: {
      left: '25%',
      right: '25%',
      bottom: '5%',
      containLabel: true
    },
    series: [
      {
        data: seriesData,
        type: 'bar',
        itemStyle: {
          color: '#4a7bf7'
        },
        label: {
          show: true,
          position: 'top',
          valueAnimation: false,
          formatter: '{c}%'
        },
        barWidth: 50
      }
    ]
  }
}
