import * as echarts from 'echarts/core'
import {
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent
} from 'echarts/components'
import { BarChart, LineChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  LineChart,
  CanvasRenderer,
  UniversalTransition
])

const useBarChart = (e) => {
  const BarChart = echarts.init(e)

  return (dataCash, dataOrder) => {
    const filterDataCash = dataCash.map(item => ({
      value: item.monthTotal,
      month: item.month
    }))

    const filterDataOrder = dataOrder.map(item => ({
      value: item.orderNumber,
      month: item.month
    }))

    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        }
      },
      toolbox: {
        feature: {
          magicType: { show: true, type: ['line', 'bar'] },
          restore: { show: true }
          // saveAsImage: { show: true }
        }
      },
      legend: {
        data: ['Revenue', 'Order']
      },
      xAxis: [
        {
          type: 'category',
          data: filterDataCash.map(item => `Mouth ${item.month}`),
          axisPointer: {
            type: 'shadow'
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: 'Revenue',
          min: 0,
          max: 100000,
          interval: 10000,
          axisLabel: {
            formatter: '{value} NT'
          }
        },
        {
          type: 'value',
          name: 'Order',
          min: 0,
          max: 100,
          interval: 10,
          axisLabel: {
            formatter: '{value} order'
          }
        }
      ],
      series: [
        {
          name: 'Revenue',
          type: 'bar',
          tooltip: {
            valueFormatter: function (value) {
              return 'NT' + value
            }
          },
          data: filterDataCash.map(item => item.value)
        },
        {
          name: 'Order',
          type: 'line',
          yAxisIndex: 1,
          tooltip: {
            valueFormatter: function (value) {
              return value + ' order'
            }
          },
          data: filterDataOrder.map(item => item.value)
        }
      ]
    }

    BarChart.setOption(option)
  }
}

export default useBarChart
