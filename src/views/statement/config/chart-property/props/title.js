export default {
  name: "标题组件",
  props: {
    "chartConfig.title.show": {
      "label": "是否显示标题组件",
      "type": "el-switch",
      "default": "true"
    },
    "chartConfig.title.text": {
      "label": "主标题文本",
      "type": "el-input",
      "default": ""
    },
    "chartConfig.title.link": {
      "label": "文本超链接",
      "type": "el-input",
      "default": ""
    },
    "chartConfig.title.target": {
      "label": "指定窗口打开",
      "type": "Select",
      "default": "blank",
      "props": {
        "options": [
          {
            "label": "当前窗口打开",
            "value": "self"
          },
          {
            "label": "新窗口打开",
            "value": "blank"
          }
        ]
      }
    },
    "chartConfig.title.textStyle.color": {
      "label": "主标题文字的颜色",
      "type": "ColorPicker",
      "default": "#333"
    },
    "chartConfig.title.textStyle.fontStyle": {
      "label": "字体风格",
      "type": "Select",
      "props": {
        options: [{
          label: 'normal',
          value: 'normal',
        }, {
          label: 'italic',
          value: 'italic',
        }, {
          label: 'oblique',
          value: 'oblique',
        }]
      },
      "default": "normal"
    },
    "chartConfig.title.textStyle.fontWeight": {
      "label": "字体粗细",
      "type": "el-input",
      "default": "bolder"
    },
    "chartConfig.title.textStyle.fontFamily": {
      "label": "字体",
      "type": "Select",
      props: {
        options: [{
          label: 'sans-serif',
          value: 'sans-serif'
        }, {
          label: 'serif',
          value: 'serif'
        }, {
          label: 'monospace',
          value: 'monospace'
        }, {
          label: 'Arial',
          value: 'Arial'
        }, {
          label: 'Courier New',
          value: 'Courier New'
        }, {
          label: 'Microsoft YaHei',
          value: 'Microsoft YaHei'
        }]
      },
      "default": "sans-serif"
    },
    "chartConfig.title.textStyle.fontSize": {
      "label": "字体大小",
      "type": "el-input-number",
      "default": "18"
    },
    "chartConfig.title.textStyle.lineHeight": {
      "label": "行高",
      "type": "el-input-number",
      "default": ""
    },
    "chartConfig.title.textStyle.width": {
      "label": "文本宽度",
      "type": "el-input-number",
      "default": ""
    },
    "chartConfig.title.textStyle.height": {
      "label": "文本高度",
      "type": "el-input-number",
      "default": ""
    },
    "chartConfig.title.textStyle.textBorderColor": {
      "label": "描边颜色",
      "type": "ColorPicker",
      "default": ""
    },
    "chartConfig.title.textStyle.textBorderWidth": {
      "label": "描边宽度",
      "type": "el-input-number",
      "default": ""
    },
    "chartConfig.title.textStyle.textShadowColor": {
      "label": "阴影颜色",
      "type": "ColorPicker",
      "default": "transparent"
    },
    "chartConfig.title.textStyle.textShadowBlur": {
      "label": "阴影长度",
      "type": "el-input-number",
      "default": ""
    },
    "chartConfig.title.textStyle.textShadowOffsetX": {
      "label": "阴影 X 偏移",
      "type": "el-input-number",
      "default": ""
    },
    "chartConfig.title.textStyle.textShadowOffsetY": {
      "label": "阴影 Y 偏移",
      "type": "el-input-number",
      "default": ""
    },
    "chartConfig.title.textStyle.overflow": {
      "label": "文字超出宽度",
      "type": "Select",
      props: {
        options: [{
          label: '无',
          value: 'none'
        }, {
          label: '截断',
          value: 'truncate'
        }, {
          label: '换行',
          value: 'break'
        }, {
          label: '强制换行',
          value: 'breakAll'
        }]
      },
      "default": "none"
    },
    "chartConfig.title.textStyle.ellipsis": {
      "label": "超出显示文本",
      "type": "el-input",
      "default": "..."
    },
    "chartConfig.title.textStyle.lineOverflow": {
      "label": "文本超出高度",
      "type": "Select",
      props: {
        options: [{
          label: '无',
          value: 'none'
        }, {
          label: '截断',
          value: 'truncate'
        }]
      },
      "default": "none"
    },
    "chartConfig.title.subtext": {
      "label": "副标题文本",
      "type": "el-input",
      "default": ""
    },
    "chartConfig.title.sublink": {
      "label": "副标题超链接",
      "type": "el-input",
      "default": ""
    },
    "chartConfig.title.subtarget": {
      "label": "指定窗口打开副标题",
      "type": "Select",
      "default": "blank",
      "props": {
        "options": [
          {
            "label": "当前窗口打开",
            "value": "self"
          },
          {
            "label": "新窗口打开",
            "value": "blank"
          }
        ]
      }
    },
    "chartConfig.title.subtextStyle.color": {
      "label": "副标题文字颜色",
      "type": "ColorPicker",
      "default": "#aaa"
    },
    "chartConfig.title.subtextStyle.fontStyle": {
      "label": "副标题字体风格",
      "type": "Select",
      "props": {
        options: [{
          label: 'normal',
          value: 'normal',
        }, {
          label: 'italic',
          value: 'italic',
        }, {
          label: 'oblique',
          value: 'oblique',
        }]
      },
      "default": "normal"
    },
    "chartConfig.title.subtextStyle.fontWeight": {
      "label": "副标题文字粗细",
      "type": "el-input",
      "default": "normal"
    },
    "chartConfig.title.subtextStyle.fontFamily": {
      "label": "副标题字体",
      "type": "el-input",
      "default": "sans-serif"
    },
    "chartConfig.title.subtextStyle.fontSize": {
      "label": "副标题字体大小",
      "type": "el-input-number",
      "default": "12"
    },
    "chartConfig.title.subtextStyle.align": {
      "label": "文字水平对齐方式",
      "type": "Select",
      props: {
        options: [{
          label: 'left',
          value: 'left'
        }, {
          label: 'center',
          value: 'center'
        }, {
          label: 'right',
          value: 'right'
        }]
      },
      "default": ""
    },
    "chartConfig.title.subtextStyle.verticalAlign": {
      "label": "文字垂直对齐方式，默认自动\n\n可选：\n\n'top'\n'middle'\n'bottom'\n\nrich 中如果没有设置 verticalAlign，则会取父层级的 verticalAlign例如：\n\n{\n    verticalAlign: bottom,\n    rich: {\n        a: {\n            // 没有设置 `verticalAlign`，则 `verticalAlign` 为 bottom\n        }\n    }\n}\n",
      "type": "Select",
      props: {
        options: [{
          label: 'top',
          value: 'top'
        }, {
          label: 'middle',
          value: 'middle'
        }, {
          label: 'bottom',
          value: 'bottom'
        }]
      },
      "default": ""
    },
    "chartConfig.title.subtextStyle.lineHeight": {
      "label": "副标题行高",
      "type": "el-input-number",
      "default": ""
    },
    "chartConfig.title.subtextStyle.width": {
      "label": "文本显示宽度",
      "type": "el-input-number",
      "default": ""
    },
    "chartConfig.title.subtextStyle.height": {
      "label": "文本显示高度",
      "type": "el-input-number",
      "default": ""
    },
    "chartConfig.title.subtextStyle.textBorderColor": {
      "label": "描边颜色",
      "type": "ColorPicker",
      "default": ""
    },
    "chartConfig.title.subtextStyle.textBorderWidth": {
      "label": "描边宽度",
      "type": "el-input-number",
      "default": ""
    },
    "chartConfig.title.subtextStyle.textShadowColor": {
      "label": "阴影颜色",
      "type": "ColorPicker",
      "default": "transparent"
    },
    "chartConfig.title.subtextStyle.textShadowBlur": {
      "label": "阴影长度",
      "type": "el-input-number",
      "default": ""
    },
    "chartConfig.title.subtextStyle.textShadowOffsetX": {
      "label": "阴影 X 偏移",
      "type": "el-input-number",
      "default": ""
    },
    "chartConfig.title.subtextStyle.textShadowOffsetY": {
      "label": "阴影 Y 偏移",
      "type": "el-input-number",
      "default": ""
    },
    "chartConfig.title.subtextStyle.overflow": {
      "label": "副标题文字超出宽度",
      "type": "Select",
      props: {
        options: [{
          label: '无',
          value: 'none'
        }, {
          label: '截断',
          value: 'truncate'
        }, {
          label: '换行',
          value: 'break'
        }, {
          label: '强制换行',
          value: 'breakAll'
        }]
      },
      "default": "none"
    },
    "chartConfig.title.subtextStyle.ellipsis": {
      "label": "副标题超出显示文本",
      "type": "el-input",
      "default": "..."
    },
    "chartConfig.title.subtextStyle.lineOverflow": {
      "label": "副标题文本超出高度",
      "type": "Select",
      props: {
        options: [{
          label: '无',
          value: 'none'
        }, {
          label: '截断',
          value: 'truncate'
        }]
      },
      "default": "none"
    },
    "chartConfig.title.textAlign": {
      "label": "水平对齐",
      "type": "Select",
      props: {
        options: [{
          label: 'auto',
          value: 'auto'
        }, {
          label: 'left',
          value: 'left'
        }, {
          label: 'right',
          value: 'right'
        }, {
          label: 'center',
          value: 'center'
        }]
      },
      "default": "auto"
    },
    "chartConfig.title.textVerticalAlign": {
      "label": "垂直对齐",
      "type": "Select",
      props: {
        options: [{
          label: 'auto',
          value: 'auto'
        }, {
          label: 'top',
          value: 'top'
        }, {
          label: 'bottom',
          value: 'bottom'
        }, {
          label: 'middle',
          value: 'middle'
        }]
      },
      "default": "auto"
    },
    "chartConfig.title.left": {
      "label": "左距离",
      "type": "el-input",
      "default": "auto"
    },
    "chartConfig.title.top": {
      "label": "上距离",
      "type": "el-input",
      "default": "auto"
    },
    "chartConfig.title.right": {
      "label": "右距离",
      "type": "el-input",
      "default": "auto"
    },
    "chartConfig.title.bottom": {
      "label": "下距离",
      "type": "el-input",
      "default": "auto"
    },
    "chartConfig.title.backgroundColor": {
      "label": "标题背景色",
      "type": "ColorPicker",
      "default": "transparent"
    },
    "chartConfig.title.borderColor": {
      "label": "标题的边框颜色",
      "type": "ColorPicker",
      "default": "#ccc"
    },
    "chartConfig.title.borderWidth": {
      "label": "标题的边框线宽",
      "type": "el-input-number",
      "default": ""
    },
    "chartConfig.title.borderRadius": {
      "label": "圆角半径",
      "type": "el-input-number",
      "default": ""
    },
    "chartConfig.title.shadowBlur": {
      "label": "图形阴影",
      "type": "el-input-number",
      "default": ""
    },
    "chartConfig.title.shadowColor": {
      "label": "阴影颜色",
      "type": "ColorPicker",
      "default": ""
    },
    "chartConfig.title.shadowOffsetX": {
      "label": "阴影水平方向",
      "type": "el-input-number",
      "default": ""
    },
    "chartConfig.title.shadowOffsetY": {
      "label": "阴影垂直方向",
      "type": "el-input-number",
      "default": ""
    }
  }
}
