module.exports = [
  {
    "x": 0,
    "y": 0,
    "w": 9,
    "h": 12,
    "i": "0",
    "static": false,
    "moved": false,
    custom: {
      title: '地图'
    },
    "chartConfig": {
      "type": "ve-map",
      'legend-visible': false,
      settings: {
        position: 'china',
        selectedMode: 'multiple',
        showLegendSymbolboolean: false,
        label: false,
        itemStyle: {
          borderColor: "#fff",
          emphasis: {
            areaColor: '#5984be',
          }
        }
      },
      visualMap: {
        borderColor: '#fff',
        show: false,
        text: ['High', 'Low'],
        realtime: false,
        calculable: true,
        inRange: {
          color: ['#eeeeee', '#6ea3ea']
        }
      }
    }

  },
  {
    "x": 9,
    "y": 0,
    "w": 15,
    "h": 6,
    "i": "1",
    "static": false,
    "moved": false,
    chartConfig: {
      'theme-name': 'fsfsdafs',
      "type": "ve-line",
      title: {
        text: "fsdfsd"
      },
      settings: {
      }
    }
  },
  {
    "x": 9,
    "y": 6,
    "w": 7,
    "h": 6,
    "i": "3",
    "static": false,
    "moved": false,
    chartConfig: {
      "type": "ve-histogram"
    }
  },
  {
    "x": 16,
    "y": 6,
    "w": 8,
    "h": 6,
    "i": "4",
    "static": false,
    "moved": false,
    chartConfig: {
      "type": "ve-pie"
    }
  }
]
