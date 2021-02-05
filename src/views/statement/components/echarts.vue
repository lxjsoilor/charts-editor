<template>
  <div class="e-charts-box">
    <v-chart @click="handlerChartClick" ref="v-chart" :autoresize="true" :init-options="{renderer: 'canvas'}" :options="currentOptions.chartConfig | filterConfig" />
    <infinite-edit :static="static" v-if="infiniteValue" v-model="infiniteValue" :parameter="currentOptions.parameter"/>
  </div>
</template>

<script>
import ECharts from 'vue-echarts'
import testJson from '../test-api/test.js'
import { merge } from 'lodash'
import infiniteEdit from './infinite-edit'
const keyMap = ['infinite', 'hierarchy', 'linkage']

export default {
  name: 'echarts',
  props: {
    options: {},
    value: {},
    static: {
      type: Boolean,
      default: false
    }
  },
  components: {
    'v-chart': ECharts,
    infiniteEdit
  },
  filters: {
    filterConfig(config) {
      if (Object.prototype.toString.call(config.settings) === '[object Object]') {
        if (config.series) {
          config.series.forEach((item, i) => merge(item, config.settings))
        }
      }
      return config
    }
  },
  watch: {
    value(val) {
      this.currentOptions = val
    },
    currentOptions: {
      deep: true,
      handler: function (val) {
        this.$emit('input', val)
      }
    },
    'value.parameter': {
      deep: true,
      handler: function (newV) {
        this.updateMapData()
        this.updateChartsData()
      }
    }
  },
  methods: {
    handlerChartClick(e) {
      setTimeout(() => {
        keyMap.forEach(item => {
          if (
            this.currentOptions.parameter.downConfig[item] === true
          ) {
            this[`${item}CallBack`](e)
          }
        })
      }, 0)
    },
    dynamicRegisterMap(name, map) {
      ECharts.registerMap(name, require(`@/assets/mapdata/gen-json/${map}.json`))
    },
    updateMapData() {
      if (this.currentOptions.parameter.type === 'map') {
        const mapSettings = this.currentOptions.parameter.mapSettings || [];
        let map;
        if (mapSettings.length >= 1) {
          map = mapSettings[mapSettings.length - 1]
        } else {
          map = 'china'
        }
        this.dynamicRegisterMap(map, map);
        this.currentOptions.chartConfig.geo.map = map
      }
    },
    updateChartsData() {
      // this.currentOptions.chartConfig = {
      //   ...this.options.chartConfig,
      //   xAxis: testJson.xAxis,
      //   series: testJson.series
      // };
    },

    hierarchyCallBack(e) {
      console.log('hierarchy')
      console.log('层级下钻')
      this.infiniteValue = true;
    },
    infiniteCallBack(e) {
      if(!!this.currentOptions.parameter.downConfig.infiniteType) {
        this.infiniteValue = true;
      } else {
        this.$message({
          message: '请选择下钻的图表类型',
          type: 'error'
        })
      }
    },
    linkageCallBacke() {
      console.log('linkage')
      console.log('链接')
    }
  },
  mounted() {
    this.updateMapData()
  },
  data() {
    return {
      currentOptions: this.options,
      infiniteValue: false
    }
  }
}
</script>
<style>
.e-charts-box {
  width: 100%;
  height: 100%;
}
.echarts {
  width: 100%;
  height: calc(100% - 38px);
}
</style>
