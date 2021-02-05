export default {
  name: "线条上数据标志点设置（symbol）",
  props: {
    "chartConfig.settings.showSymbol": {
      "label": "显示线条上标志",
      "type": "el-switch",
      "default": true
    },
    "chartConfig.settings.showAllSymbol": {
      "label": "是否显示所有标志",
      "type": "Select",
      "props": {
        "options": [
          {
            label: "智能适配",
            value: "auto"
          },
          {
            label: "显示所有",
            value: "true"
          },
          {
            label: "跟随坐标轴标签",
            value: "false"
          }
        ]
      },
      "default": 60,
      "span": 12
    },
    "chartConfig.settings.symbol": {
      "label": "标志类型",
      "type": "Select",
      "props": {
        "options": [
          {
            value: 'none',
            label: '无'
          },
          {
            value: 'emptyCircle',
            label: '空心圆'
          },
          {
            value: 'circle',
            label: '实心圆'
          },
          {
            value: 'rect',
            label: '实心方形'
          },
          {
            value: 'roundRect',
            label: '圆角方形'
          },
          {
            value: 'triangle',
            label: '三角形'
          },
          {
            value: 'diamond',
            label: '菱形'
          },
          {
            value: 'pin',
            label: 'pin'
          },
          {
            value: 'arrow',
            label: '箭头'
          }
        ]
      },
      span: 12,
      "default": 'emptyCircle'
    },
    "chartConfig.settings.symbolSize": {
      "label": "标志大小",
      "type": "el-input-number",
      "default": 4,
      span: 12
    },
    "chartConfig.settings.symbolSize": {
      "label": "标志大小",
      "type": "el-input-number",
      "default": 4
    },
  }
}
