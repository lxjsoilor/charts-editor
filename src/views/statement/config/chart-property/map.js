import legend from './props/legend'
import tooltip from './props/tooltip'
export default [
  {
    name: "基础",
    props: {
      "parameter.mapSettings": {
        label: "地图区域设置",
        type: "mapAscader",
        default: [],
        span: 24,
      },
      "chartConfig.geo.label.normal.show": {
        label: "显示区域名称",
        type: "el-switch",
        default: false,
      },
      "chartConfig.geo.roam": {
        label: "开启地图缩放",
        type: "el-switch",
        default: false,
      },
      "chartConfig.visualMap.inverse": {
        label: "颜色反转",
        type: "el-switch",
        default: false,
      },
    }
  },
  legend, tooltip
]
