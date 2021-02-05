export default {
  name: "坐标轴设置",
  props:{
    "chartConfig.grid.show": {
      "label": "展示网格",
      "type": "el-switch",
      "default": false
    },
    "chartConfig.grid.left": {
      "label": "左边距（像素）",
      "type": "el-input-number",
      "default": 60,
      "span": 12
    },
    "chartConfig.grid.top": {
      "label": "顶边距（像素）",
      "type": "el-input-number",
      "default": 60,
      "span": 12
    },
    "chartConfig.grid.right": {
      "label": "右边距（像素）",
      "type": "el-input-number",
      "default": 60,
      "span": 12
    },
    "chartConfig.grid.bottom": {
      "label": "右边距（像素）",
      "type": "el-input-number",
      "default": 60,
      "span": 12
    },
    "chartConfig.grid.backgroundColor": {
      "label": "网格背景色",
      "type": "ColorPicker",
      "default": 'transparent',
      "span": 12
    },
    "chartConfig.grid.borderColor": {
      "label": "网格边框色",
      "type": "ColorPicker",
      "default": '#ccc',
      "span": 12
    },
  }
}
