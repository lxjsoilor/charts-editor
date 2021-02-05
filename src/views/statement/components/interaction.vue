<template>
  <el-collapse class="interaction-box" v-model="activeNames" @change="handleChange">
    <el-collapse-item title="下钻" name="1">
      <div>
        <el-form v-if="forceUpdateShow">
          <el-form-item label="开启自由下钻">
            <el-switch @click.native="handleSwitch('infinite')" :value="downConfig.infinite"/>
          </el-form-item>
          <el-form-item v-if="downConfig.infinite" label="下钻后展示的图表类型">
            <el-select v-model="downConfig.infiniteType" @change="handlerInfiniteTypeChange" style="width: 100%;" size="mini" placeholder="请选择">
              <el-option
                v-for="item in chartTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开启层级关系下钻">
            <el-switch @click.native="handleSwitch('hierarchy')" :value="downConfig.hierarchy"/>
          </el-form-item>
          <el-form-item label="默认展示方式">
            <el-select style="width: 100%;" size="mini" v-model="downConfig.displayType" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-collapse-item>
    <el-collapse-item title="联动" name="2">
      <div>
        <el-form>
          <el-form-item label="开启图表联动">
            <el-switch @click.native="handleSwitch('linkage')" :value="downConfig.linkage"/>
          </el-form-item>
        </el-form>
      </div>
    </el-collapse-item>
    <el-collapse-item title="图表放大" name="3">
      <div>
         <el-form>
          <el-form-item label="开启图表最大化展示">
            <el-switch />
          </el-form-item>
        </el-form>
      </div>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import chartType from '../config/chart-type/index.js';
import { set, get } from 'lodash'
const keyMap = ['infinite', 'hierarchy', 'linkage'];
let chartTypeMap = {}
const chartTypeList = chartType.reduce((res, item) => {
  let list = [];
  item.classify.forEach(classify => {
    classify.children.forEach(chart => {
      chartTypeMap[chart.name] = chart.data
      list.push({
        label: chart.name,
        value: chart.name,
        data: chart.data
      })
    })
  })
  return res.concat(list)
}, [])
export default {
  data() {
    return {
      forceUpdateShow: true,
      chartTypeList,
      activeNames: ['1'],
      options: [{
        value: '1',
        label: '弹框展示'
      }, {
        value: '2',
        label: '弹框全屏展示'
      }, {
        value: '3',
        label: '原图表区域展示'
      }],
      value: '1'
    };
  },
  inject: ['store'],
  computed: {
    downConfig() {
      return this.store.selectCharts.parameter.downConfig || {}
    }
  },
  methods: {
    handlerInfiniteTypeChange(type) {
      this.store.selectCharts.parameter.downConfig.children = chartTypeMap[type]
    },
    handleSwitch(key) {
      this.$set(
        this.store.selectCharts.parameter.downConfig,
        key,
        !this.store.selectCharts.parameter.downConfig[key]
      )
      keyMap.forEach(item => {
        if(item === key) return;
        set(
          this.store.selectCharts.parameter.downConfig,
          item,
          false
        )
      })
    },
    handleChange(val) {
    }
  },
  mounted() {
  }
}
</script>

<style lang="scss">
.interaction-box {
  .el-form-item {
    margin-bottom: 0px;
  }
}
</style>

