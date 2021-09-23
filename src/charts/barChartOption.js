export default function barChartOption(options = { name: '', data: [] }) {
  const xData = options.data.map((item) => item.name)
  const seriesData = options.data.map((item) => item.value)
  const maxNum = Math.max(...seriesData)
  return {
    xAxis: {
      type: 'category',
      data: xData
    },
    yAxis: {
      type: 'value',
      splitLine: { show: false },
      splitNumber: maxNum
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: (params) => {
        const tar = params[0]
        return tar.name + ' : ' + tar.value
      }
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
          valueAnimation: true
        },
        barWidth: 50
      }
    ]
  }
}
