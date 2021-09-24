export default function pieChartOption(options = { name: '', data: [] }) {
  return {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      orient: 'horizontal',
      left: 'center',
      bottom: 'bottom'
    },
    series: [
      {
        name: options.name,
        type: 'pie',
        radius: '65%',
        data: options.data,
        emphasis: {
          itemStyle: {
            shadowBlur: 30,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
}
