export default {
  name: '地图',
  icon: 'fa fa-map-o',
  classify: [{
    name: '平面地图',
    children: [{
      img: 'https://sugar.bce.baidu.com/static/sugar/static/img/tool-items/map/map-layer/map-layer_64d11a7.png',
      name: '中国地图',
      data: {
        chartConfig: {
          "tooltip": {},
          "geo": {
            "label": {
              "normal": {
                "show": true
              }
            },
            "itemStyle": {
              "normal": {},
              "emphasis": {}
            }
          },
          "series": [
            {
              "name": "启动次数",
              "type": "map",
              "geoIndex": 0,
              "data": [
                {
                  "name": "广东省",
                  "value": 599
                }
              ]
            }
          ]
        },
        parameter: {
          downConfig: {},
          type: "map",
          mapSettings: [
            "china"
          ],
        },
        custom: {
        }
      }
    }, {
      img: 'https://sugar.bce.baidu.com/static/sugar/static/img/tool-items/map/bmap/map_f501ba2.png',
      name: '区域地图',
      data: {
        chartConfig: {
          "tooltip": {},
          "geo": {
            "map": "130100",
            "label": {
              "normal": {
                "show": true
              }
            },
            "itemStyle": {
              "normal": {},
              "emphasis": {}
            }
          },
          "series": [
            {
              "name": "启动次数",
              "type": "map",
              "geoIndex": 0,
              "data": [
                {
                  "name": "广东省",
                  "value": 599
                }
              ]
            }
          ]
        },
        parameter: {
          downConfig: {},
          type: "map",
          mapSettings: [
            "china",
            "130000",
            "130100"
          ],
        },
        custom: {
        }
      }
    }]
  }]
}
