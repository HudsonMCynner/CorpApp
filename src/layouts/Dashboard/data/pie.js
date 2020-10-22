export default {
  series: [
    {
      name: 'Testes',
      type: 'pie',
      data: [
        { value: 335, name: 'Teste' },
        { value: 310, name: 'Teste 2' },
        { value: 234, name: 'Teste 3' },
        { value: 135, name: 'Teste 4' },
        { value: 1548, name: 'Teste 5' }
      ],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}
