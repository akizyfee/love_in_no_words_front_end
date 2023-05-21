import c3 from 'c3'

const useDountChart = (data) => {
  c3.generate({
    bindto: '#dountChar',
    data: {
      columns: data,
      type: 'donut'
    },
    donut: {
      label: {
        format: function (value, ratio, id) {
          const filterPersent = parseFloat(ratio * 100).toFixed(1)
          return `${filterPersent}%`
        }
      }
    },
    tooltip: {
      format: {
        value: function (value, ratio, id, index) {
          return `${value}個`
        }
      }
    }
  })
}

export default useDountChart
