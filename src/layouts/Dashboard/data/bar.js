export default function getData () {
  return {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      name: 'Forest',
      type: 'bar',
      barGap: 0,
      label: 'a',
      data: [320, 332, 301, 334, 390]
    },
    {
      name: 'Steppe',
      type: 'bar',
      label: 'b',
      data: [220, 182, 191, 234, 290]
    },
    {
      name: 'Desert',
      type: 'bar',
      label: 'c',
      data: [150, 232, 201, 154, 190]
    },
    {
      name: 'Wetland',
      type: 'bar',
      label: 'df',
      data: [98, 77, 101, 99, 40]
    }]
  }
}
