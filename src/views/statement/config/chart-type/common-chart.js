export default {
  name: '图表',
  icon: 'fa fa-bar-chart',
  classify: [{
    name: '折线图',
    children: [{
      img: 'https://sugar.bce.baidu.com/static/sugar/static/img/tool-items/chart/line/line1_9e9c4cf.png',
      name: '折线图',
      data: {
        chartConfig: {
          title: {
            text: '折线图'
          },
          xAxis: {
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          },
          yAxis: {},
          series: [
            {
              name: '邮件营销',
              type: 'line',
              stack: '总量',
              data: [120, 132, 101, 134, 90, 230, 210]
            }
          ]
        },
        parameter: {
          downConfig: {},
          dimension: [],
          metrics: [],
          type: ['line']
        },
        custom: {
        }
      }
    }, {
      img: 'https://sugar.bce.baidu.com/static/sugar/static/img/tool-items/chart/line/stack-line_2595132.png',
      name: '区域堆积图',
      data: {
        chartConfig: {
          title: {
            text: '区域堆积图'
          },
          xAxis: {
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          },
          yAxis: {},
          series: [
            {
              name: '邮件营销',
              type: 'line',
              stack: '总量',
              areaStyle: {},
              data: [120, 132, 101, 134, 90, 230, 210]
            }
          ]
        },
        parameter: {
          downConfig: {},
          dimension: [],
          metrics: [],
          type: ['line']
        },
        custom: {
        }
      }
    }]
  }, {
    name: '柱状图',
    children: [{
      img: 'https://sugar.bce.baidu.com/static/sugar/static/img/tool-items/chart/line/line1_9e9c4cf.png',
      name: '柱状图',
      data: {
        chartConfig: {
          title: {
            text: '柱状图'
          },
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar'
          }]
        },
        parameter: {
          downConfig: {},
          dimension: [],
          metrics: [],
          type: ['line']
        },
        custom: {
        }
      }
    }, {
      img: 'https://sugar.bce.baidu.com/static/sugar/static/img/tool-items/chart/line/dy-line_9933651.png',
      name: '折柱混合',
      data: {
        chartConfig: {
          title: {
            text: '折柱混合'
          },
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar'
          }, {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'line'
          }]
        },
        parameter: {
          downConfig: {},
          dimension: [],
          metrics: [],
          type: ['line']
        },
        custom: {
        }
      }
    }, {
      img: 'https://sugar.bce.baidu.com/static/sugar/static/img/tool-items/chart/line/stack-line_2595132.png',
      name: '条形图',
      data: {
        chartConfig: {
          xAxis: {
            type: 'value',
          },
          yAxis: {
            type: 'category',
            data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)']
          },
          series: [
            {
              name: '2011年',
              type: 'bar',
              data: [18203, 23489, 29034, 104970, 131744, 630230]
            }
          ]
        },
        parameter: {
          downConfig: {},
          dimension: [],
          metrics: [],
          type: ['line']
        },
        custom: {
        }
      }
    }, {
      img: 'https://sugar.bce.baidu.com/static/sugar/static/img/tool-items/chart/line/stack-line_2595132.png',
      name: '堆叠条形图',
      data: {
        chartConfig: {
          xAxis: {
            type: 'value'
          },
          yAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          series: [{
            name: 'Direct',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: [320, 302, 301, 334, 390, 330, 320]
          },
          {
            name: 'Mail Ad',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: [120, 132, 101, 134, 90, 230, 210]
          },]
        },
        parameter: {
          downConfig: {},
          dimension: [],
          metrics: [],
          type: ['line']
        },
        custom: {
        }
      }
    }]
  }, {
    name: '饼图',
    children: [{
      img: 'https://sugar.bce.baidu.com/static/sugar/static/img/tool-items/chart/line/line1_9e9c4cf.png',
      name: '饼图',
      data: {
        chartConfig: {
          title: {
            text: '饼图'
          },
          series: [{
            name: '访问来源',
            type: 'pie',
            data: [
              { value: 1048, name: '搜索引擎' },
              { value: 735, name: '直接访问' },
              { value: 580, name: '邮件营销' },
              { value: 484, name: '联盟广告' },
              { value: 300, name: '视频广告' }
            ]
          }]
        },
        parameter: {
          downConfig: {},
          dimension: [],
          metrics: [],
          type: ['pie']
        },
        custom: {
        }
      }
    }, {
      img: 'https://sugar.bce.baidu.com/static/sugar/static/img/tool-items/chart/line/dy-line_9933651.png',
      name: '环形图',
      data: {
        chartConfig: {
          title: {
            text: '环形图'
          },
          series: [{
            name: '访问来源',
            radius: ['40%', '70%'],
            type: 'pie',
            data: [
              { value: 1048, name: '搜索引擎' },
              { value: 735, name: '直接访问' },
              { value: 580, name: '邮件营销' },
              { value: 484, name: '联盟广告' },
              { value: 300, name: '视频广告' }
            ]
          }]
        },
        parameter: {
          downConfig: {},
          dimension: [],
          metrics: [],
          type: ['line']
        },
        custom: {
        }
      }
    }, {
      img: 'https://sugar.bce.baidu.com/static/sugar/static/img/tool-items/chart/line/stack-line_2595132.png',
      name: '玫瑰图',
      data: {
        chartConfig: {
          title: {
            text: '玫瑰图'
          },
          series: [{
            name: '访问来源',
            type: 'pie',
            radius: [50, 250],
            roseType: 'area',
            itemStyle: {
              borderRadius: 8
            },
            data: [
              { value: 1048, name: '搜索引擎' },
              { value: 735, name: '直接访问' },
              { value: 580, name: '邮件营销' },
              { value: 484, name: '联盟广告' },
              { value: 300, name: '视频广告' }
            ]
          }]
        },
        parameter: {
          downConfig: {},
          dimension: [],
          metrics: [],
          type: ['pie']
        },
        custom: {
        }
      }
    }]
  }]
}
