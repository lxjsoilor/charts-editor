export default {
  name: "Y轴设置",
  props: {
    "chartConfig.yAxis.show": {
      label: "隐藏Y轴",
      type: "el-switch",
      default: true
    },
    "chartConfig.yAxis.axisLabel.fontSize": {
      label: "Y轴字号",
      type: "el-input-number",
      default: 12
    },
    "chartConfig.yAxis.min": {
      label: "Y轴最小值",
      type: "el-input-number",
      default: 12
    },
    "chartConfig.yAxis.max": {
      label: "Y轴最大值",
      type: "el-input-number",
      default: 12
    },
    "chartConfig.yAxis.type": {
      label: "Y轴类型",
      type: "Select",
      default: 'value',
      props: {
        options: [{
          label: '数值',
          value: 'value'
        }, {
          label: '类目',
          value: 'category'
        }, {
          label: '时间',
          value: 'time'
        }, {
          label: '对数',
          value: 'log'
        }]
      }
    },
    "chartConfig.yAxis.axisLabel.formatter": {
      label: "Y轴单位",
      type: "el-input",
      default: 12
    },
    "chartConfig.yAxis.name": {
      label: "Y轴名称",
      type: "el-input",
      default: 12
    },
  }
}
