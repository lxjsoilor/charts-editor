export default {
  name: "提示设置（Tooltip）",
  props:{
    "chartConfig.tooltip.show": {
      "label": "展示提示框",
      "type": "el-switch",
      "default": true
    },
    "chartConfig.tooltip.trigger": {
      "label": "触发类型",
      "type": "Select",
      "default": "",
      "props": {
        "options": [
          {
            "label": "数据项图形触发",
            "value": "item"
          },
          {
            "label": "坐标轴触发",
            "value": "axis"
          },
          {
            "label": "不触发",
            "value": "none"
          }
        ]
      }
    },
    "chartConfig.tooltip.order": {
      "label": "数据排序",
      "type": "Select",
      "default": "seriesAsc",
      "props": {
        "options": [
          {
            "label": "根据系列升序排列",
            "value": "seriesAsc"
          },
          {
            "label": "根据系列降序排列",
            "value": "seriesDesc"
          },
          {
            "label": "根据数据值升序排列",
            "value": "valueAsc"
          },
          {
            "label": "根据数据值降序排列",
            "value": "valueDesc"
          }
        ]
      }
    },
    "chartConfig.tooltip.confine": {
      "label": "顶部限制在图表内",
      "type": "el-switch",
      "default": false
    },
    "chartConfig.tooltip.textStyle.fontSize": {
      "label": "字号",
      "type": "el-input-number",
      "default": "8"
    }
  }
}
