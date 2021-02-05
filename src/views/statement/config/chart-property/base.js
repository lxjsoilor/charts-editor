export default {
  props: {
    'custom.title': {
      label: "图表名称",
      type: "el-input"
    },
    'custom.desc': {
      label: "图表简介",
      type: "el-input"
    },
    'custom.title-style.text-align': {
      label: "图表对齐",
      type: "Select",
      "props": {
        "options": [
          {
            "label": "左",
            "value": "left"
          },
          {
            "label": "中",
            "value": "center"
          },
          {
            "label": "右边",
            "value": "right"
          }
        ]
      }
    },
    'custom.title-style.color': {
      label: "标题颜色",
      type: "ColorPicker"
    },
    'custom.title-link': {
      label: "标题链接",
      type: "el-input"
    },
    'custom.title-hide': {
      label: "标题隐藏",
      type: "el-switch"
    },
    'w': {
      label: "宽度",
      type: "el-input-number",
      props: {
        min: 1,
        max: 24
      }
    },
    'h': {
      label: "高度",
      type: "el-input-number",
      props: {
        min: 1,
        max: 100
      }
    },
    'custom.style.background-color': {
      label: "图表背景颜色",
      type: "ColorPicker"
    },
    'custom.style.border-radius': {
      label: "图表圆角",
      type: "el-input-number"
    },
    'custom.style.border-width': {
      label: "边框宽度",
      type: "el-input-number"
    },
    'custom.style.border-style': {
      label: "图表边框样式",
      type: "Select",
      props: {
        options: [{
          label: '实线',
          value: 'solid'
        }, {
          label: '点状',
          value: 'dotted'
        }, {
          label: '双线',
          value: 'double'
        }, {
          label: '虚线',
          value: 'dashed'
        }]
      }
    },
  }
}
