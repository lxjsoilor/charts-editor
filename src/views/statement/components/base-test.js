export default {
  props: {
    'custom.title': {
      label: "图表名称",
      type: "el-input",
      span: 24
    },
    'legend-visible': {
      label: "展示图例",
      type: "el-switch"
    },
    'tooltip-visible': {
      label: "显示提示框",
      type: "el-switch"
    },
    "chartConfig.title.id": {
      "label": "组件 I",
      "type": "el-input",
      "default": ""
    },
    "chartConfig.title.show": {
      "label": "是否显示",
      "type": "el-switch",
      "default": "true"
    },
    "chartConfig.title.text": {
      "label": "主标题文",
      "type": "el-input",
      "default": ""
    },
    "chartConfig.title.link": {
      "label": "主标题文",
      "type": "el-input",
      "default": ""
    },
    "chartConfig.title.target": {
      "label": "指定窗口",
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
    "chartConfig.title.textStyle": {
      "label": "指定窗口",
      "type": "el-input",
      "default": "#333"
    },
    "chartConfig.title.textStyle.color": {
      "label": "主标题文",
      "type": "el-input",
      "default": "#333"
    },
    "chartConfig.title.textStyle.fontStyle": {
      "label": "主标题文",
      "type": "el-input",
      "default": "normal"
    },
    "chartConfig.title.textStyle.fontWeight": {
      "label": "主标题文",
      "type": "el-input",
      "default": "bolder"
    },
    "chartConfig.title.textStyle.fontFamily": {
      "label": "主标题文",
      "type": "el-input",
      "default": "sans-serif"
    },
    "chartConfig.title.textStyle.fontSize": {
      "label": "主标题文",
      "type": "el-input",
      "default": "18"
    },
    "chartConfig.title.textStyle.lineHeight": {
      "label": "行高。\n",
      "type": "el-input",
      "default": ""
    },
    "chartConfig.title.textStyle.width": {
      "label": "文本显示",
      "type": "el-input",
      "default": ""
    },
    "chartConfig.title.textStyle.height": {
      "label": "文本显示",
      "type": "el-input",
      "default": ""
    },
    "chartConfig.title.textStyle.textBorderColor": {
      "label": "文字本身",
      "type": "el-input",
      "default": ""
    },
    "chartConfig.title.textStyle.textBorderWidth": {
      "label": "文字本身",
      "type": "el-input",
      "default": ""
    },
    "chartConfig.title.textStyle.textShadowColor": {
      "label": "文字本身",
      "type": "el-input",
      "default": "transparent"
    },
    "chartConfig.title.textStyle.textShadowBlur": {
      "label": "文字本身",
      "type": "el-input",
      "default": ""
    },
    "chartConfig.title.textStyle.textShadowOffsetX": {
      "label": "文字本身",
      "type": "el-input",
      "default": ""
    },
    "chartConfig.title.textStyle.textShadowOffsetY": {
      "label": "文字本身",
      "type": "el-input",
      "default": ""
    },
    "chartConfig.title.textStyle.overflow": {
      "label": "文字超出",
      "type": "el-input",
      "default": "none"
    },
    "chartConfig.title.textStyle.ellipsis": {
      "label": "在ove",
      "type": "el-input",
      "default": "..."
    },
    "chartConfig.title.textStyle.lineOverflow": {
      "label": "文本超出",
      "type": "el-input",
      "default": "none"
    },
    "chartConfig.title.textStyle.rich": {
      "label": "在 ri",
      "type": "el-input",
      "default": ""
    },
    "chartConfig.title.subtext": {
      "label": "副标题文",
      "type": "el-input",
      "default": ""
    },
    "chartConfig.title.sublink": {
      "label": "副标题文",
      "type": "el-input",
      "default": ""
    },
    "chartConfig.title.subtarget": {
      "label": "指定窗口",
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
    "chartConfig.title.subtextStyle": {
      "label": "2反倒是",
      "type": "el-input",
      "default": "#aaa"
    },
    "chartConfig.title.subtextStyle.color": {
      "label": "副标题文",
      "type": "el-input",
      "default": "#aaa"
    },
    "chartConfig.title.subtextStyle.fontStyle": {
      "label": "副标题文",
      "type": "el-input",
      "default": "normal"
    },
    "chartConfig.title.subtextStyle.fontWeight": {
      "label": "副标题文",
      "type": "el-input",
      "default": "normal"
    },
    "chartConfig.title.subtextStyle.fontFamily": {
      "label": "副标题文",
      "type": "el-input",
      "default": "sans-serif"
    },
    "chartConfig.title.subtextStyle.fontSize": {
      "label": "副标题文",
      "type": "el-input",
      "default": "12"
    },
    "chartConfig.title.subtextStyle.align": {
      "label": "文字水平",
      "type": "el-input",
      "default": ""
    },
    "chartConfig.title.subtextStyle.verticalAlign": {
      "label": "文字垂直",
      "type": "el-input",
      "default": ""
    },
    "chartConfig.title.subtextStyle.lineHeight": {
      "label": "行高。\n",
      "type": "el-input",
      "default": ""
    },
    "chartConfig.title.subtextStyle.width": {
      "label": "文本显示",
      "type": "el-input",
      "default": ""
    },
    "chartConfig.title.subtextStyle.height": {
      "label": "文本显示",
      "type": "el-input",
      "default": ""
    },
    "chartConfig.title.subtextStyle.textBorderColor": {
      "label": "文字本身",
      "type": "el-input",
      "default": ""
    },
    "chartConfig.title.subtextStyle.textBorderWidth": {
      "label": "文字本身",
      "type": "el-input",
      "default": ""
    },
    "chartConfig.title.subtextStyle.textShadowColor": {
      "label": "文字本身",
      "type": "el-input",
      "default": "transparent"
    },
    "chartConfig.title.subtextStyle.textShadowBlur": {
      "label": "文字本身",
      "type": "el-input",
      "default": ""
    },
    "chartConfig.title.subtextStyle.textShadowOffsetX": {
      "label": "文字本身",
      "type": "el-input",
      "default": ""
    },
    "chartConfig.title.subtextStyle.textShadowOffsetY": {
      "label": "文字本身",
      "type": "el-input",
      "default": ""
    },
    "chartConfig.title.subtextStyle.overflow": {
      "label": "文字超出",
      "type": "el-input",
      "default": "none"
    },
    "chartConfig.title.subtextStyle.ellipsis": {
      "label": "在ove",
      "type": "el-input",
      "default": "..."
    },
    "chartConfig.title.subtextStyle.lineOverflow": {
      "label": "文本超出",
      "type": "el-input",
      "default": "none"
    },
    "chartConfig.title.subtextStyle.rich": {
      "label": "在 ri",
      "type": "el-input",
      "default": ""
    },
    "chartConfig.title.textAlign": {
      "label": "整体（包",
      "type": "el-input",
      "default": "auto"
    },
    "chartConfig.title.textVerticalAlign": {
      "label": "整体（包",
      "type": "el-input",
      "default": "auto"
    },
    "chartConfig.title.triggerEvent": {
      "label": "是否触发",
      "type": "el-switch",
      "default": ""
    },
    "chartConfig.title.padding": {
      "label": "标题内边",
      "type": "el-input",
      "default": "5"
    },
    "chartConfig.title.itemGap": {
      "label": "主副标题",
      "type": "el-input",
      "default": "10"
    },
    "chartConfig.title.zlevel": {
      "label": "所有图形",
      "type": "el-input",
      "default": ""
    },
    "chartConfig.title.z": {
      "label": "组件的所",
      "type": "el-input",
      "default": "2"
    },
    "chartConfig.title.left": {
      "label": "titl",
      "type": "el-input",
      "default": "auto"
    },
    "chartConfig.title.top": {
      "label": "titl",
      "type": "el-input",
      "default": "auto"
    },
    "chartConfig.title.right": {
      "label": "titl",
      "type": "el-input",
      "default": "auto"
    },
    "chartConfig.title.bottom": {
      "label": "titl",
      "type": "el-input",
      "default": "auto"
    },
    "chartConfig.title.backgroundColor": {
      "label": "标题背景",
      "type": "el-input",
      "default": "transparent"
    },
    "chartConfig.title.borderColor": {
      "label": "标题的边",
      "type": "el-input",
      "default": "#ccc"
    },
    "chartConfig.title.borderWidth": {
      "label": "标题的边",
      "type": "el-input",
      "default": ""
    },
    "chartConfig.title.borderRadius": {
      "label": "圆角半径",
      "type": "el-input",
      "default": ""
    },
    "chartConfig.title.shadowBlur": {
      "label": "图形阴影",
      "type": "el-input",
      "default": ""
    },
    "chartConfig.title.shadowColor": {
      "label": "阴影颜色",
      "type": "el-input",
      "default": ""
    },
    "chartConfig.title.shadowOffsetX": {
      "label": "阴影水平",
      "type": "el-input",
      "default": ""
    },
    "chartConfig.title.shadowOffsetY": {
      "label": "阴影垂直",
      "type": "el-input",
      "default": ""
    }
  }
}
