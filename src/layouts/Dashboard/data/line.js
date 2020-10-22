export default function getData () {
  return {
    legend: {},
    tooltip: {},
    dataset: {
      // Provide data.
      source: [
        ['Product', 'JAN', 'FEV', 'DEZ'],
        ['Matcha Latte', 10],
        ['Milk Tea', 20],
        ['Cheese Cocoa', 30],
        ['Walnut Brownie', 40]
      ]
    },
    // Declare X axis, which is a category axis, mapping
    // to the first column by default.
    xAxis: { type: 'category' },
    // Declare Y axis, which is a value axis.
    yAxis: {},
    // Declare several series, each of them mapped to a
    // column of the dataset by default.
    series: [{ type: 'line' }, { type: 'line' }, { type: 'line' }]
  }
}
