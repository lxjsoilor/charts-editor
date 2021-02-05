export default {
  name: "柱体设置",
  props:{
    "chartConfig.settings.barMaxWidth": {
      "label": "柱体最大宽度",
      "type": "el-input-number",
      "default": 0
    },
    "chartConfig.settings.itemStyle.borderRadius": {
      "label": "柱体圆角",
      "type": "el-input-number",
      "default": 0,
      span: 12
    },
    "chartConfig.settings.barGap": {
      "label": "不同系列柱体间距",
      "type": "el-input-number",
      "default": 0,
      span: 12
    },

  }
}
