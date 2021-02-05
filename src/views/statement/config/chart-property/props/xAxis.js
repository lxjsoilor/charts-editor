export default {
  name: "X轴设置",
  props: {
    "chartConfig.xAxis.show": {
      label: "隐藏X轴",
      type: "el-switch",
      default: false
    },
    'chartConfig.xAxis.axisLabel.rotate': {
      label: "X轴标签倾斜度（-90-90）",
      type: "el-input-number",
      default: 0
    },
    'chartConfig.xAxis.axisLabel.fontSize': {
      label: "X轴字号",
      type: "el-input-number",
      default: 12
    },
    "chartConfig.xAxis.name": {
      label: "X轴名称",
      type: "el-input",
      default: ''
    },

  }
}
