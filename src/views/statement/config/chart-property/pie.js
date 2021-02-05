import legend from './props/legend'
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
    }
  },
  legend
]
