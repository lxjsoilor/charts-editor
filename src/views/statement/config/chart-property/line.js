import xAxis from './props/xAxis'
import yAxis from './props/yAxis'
import legend from './props/legend'
import tooltip from './props/tooltip'
import marginSetting from './props/margin-setting'
import symbol from './props/symbol'
import barSertting from './props/bar-sertting'

export default [
  {
    name: "基础",
    props: {
      "chartConfig.settings.step": {
        label: "阶梯线图",
        type: "Select",
        default: false,
        span: 24,
        "props": {
          "options": [
            {
              "label": "关闭",
              "value": false
            },
            {
              "label": "开启",
              "value": true
            },
            {
              "label": "开启-当前点拐弯",
              "value": 'start'
            },
            {
              "label": "开启-中间点拐弯",
              "value": 'middle'
            },
            {
              "label": "开启-下个点拐弯",
              "value": 'end'
            }
          ]
        }
      },
      "chartConfig.settings.label.show": {
        label: "是否展示标签",
        type: "el-switch",
        default: true,
        span: 24
      },
      "chartConfig.settings.label.fontSize": {
        label: "标签大小",
        type: "el-input-number",
        default: true,
        span: 24
      },
      "chartConfig.settings.sampling": {
        label: "数据点合并",
        type: "Select",
        default: '',
        span: 24,
        "props": {
          "options": [
            {
              "label": "关闭",
              "value": ''
            },
            {
              "label": "平均值",
              "value": "average"
            },
            {
              "label": "最大值",
              "value": 'max'
            },
            {
              "label": "最小值",
              "value": 'min'
            },
            {
              "label": "总和",
              "value": 'sum'
            }
          ]
        }
      },
      "chartConfig.settings.connectNulls": {
        label: "连接空数据让线条连续",
        type: "el-switch",
        default: true,
        span: 24
      },
      "chartConfig.settings.areaStyle": {
        label: "设置为面积图",
        type: "el-switch",
        default: false,
        span: 24
      },
    }
  },
  xAxis, yAxis, legend, tooltip, marginSetting, symbol, barSertting
]
