export default {
  name: "图例设置（legend）",
  props:{
    "chartConfig.legend.show": {
      "label": "展示图例",
      "type": "el-switch",
      "default": true
    },
    "chartConfig.legend.type": {
      "label": "图例的类型",
      "type": "Select",
      "default": "",
      "props": {
        "options": [
          {
            "label": "固定",
            "value": "plain"
          },
          {
            "label": "滚动",
            "value": "scroll"
          }
        ]
      }
    },
    "chartConfig.legend.orient": {
      "label": "图例布局朝向",
      "type": "Select",
      "default": "horizontal",
      "props": {
        "options": [
          {
            "label": "水平",
            "value": "horizontal"
          },
          {
            "label": "垂直",
            "value": "vertical"
          }
        ]
      }
    },
    "chartConfig.legend.align": {
      "label": "图例对齐",
      "type": "Select",
      "default": "auto",
      "props": {
        "options": [
          {
            "label": "自动",
            "value": "auto"
          },
          {
            "label": "居左",
            "value": "left"
          },
          {
            "label": "居右",
            "value": "right"
          }
        ]
      }
    },
    "chartConfig.legend.inactiveColor": {
      "label": "图例关闭时的颜色",
      "type": "ColorPicker",
      "default": "#ccc"
    },
    "chartConfig.legend.textStyle.fontSize": {
      "label": "图例字号",
      "type": "el-input-number",
      "default": 12
    },
  }
}
