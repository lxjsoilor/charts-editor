<template>
  <grid-layout ref="grid-layout" :margin="margin" class="grid-layout" :layout.sync="store.chartsJson" :col-num="24" :row-height="rowHeight" :is-draggable="draggable" :is-resizable="resizable" :responsive="false" :vertical-compact="false" :prevent-collision="true" :use-css-transforms="true">
    <grid-item @resized="resizedEvent" :static="static" @moved="movedEvent" @click.native="handlerSelectItem(item)" class="hc-grid-item" :class="{selected: !static && item.i === store.selectCharts.i}" v-for="(item, index) in store.chartsJson" :key="index" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i" @resize="resizeEvent"
    :style="{
      ...styleFilter(((item.custom || {})['style'] || {}))
    }"
    >
      <div>
        <div class="toolbar" :class="{hide: !!static || item.i !== store.selectCharts.i}">
          <div class="toolbar-left" style="width: 100%;">
            <div class="toolbar-item" @click="store.delSelectCharts(index)">
              <i class="el-icon-delete"></i>
            </div>
            <div class="toolbar-item" @click="store.addItem(item)">
              <i class="fa fa-copy"></i>
            </div>
            <div class="toolbar-item" @click="store.showChartPreviewSingle = true">
              <i class="fa fa-expand"></i>
            </div>
            <div v-if="!(item.custom || {})['title-hide']" class="toolbar-item" style="width: 100%;" @click="handlerChangeTitleItem(item, index)"
              :style="{
                ...((item.custom || {})['title-style'] || {})
              }"
            >
              <span>{{(item.custom || {}).title}}</span>
              <el-tooltip v-if="(item.custom || {})['desc']" effect="light" :content="(item.custom || {})['desc']" placement="top">
                <i class="el-icon-question"></i>
              </el-tooltip>
            </div>
          </div>
          <div class="toolbar-right">
            <div class="toolbar-item toolbar-item-menu">
              <el-dropdown trigger="click">
                <i class="el-icon-menu"></i>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item icon="el-icon-download">导出数据为CSV</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-download">导出数据为Excel</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-search" @click.native="store.showChartPreviewSingle = true">放大图表</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-picture-outline" @click.native="handlerExportImage(item)">导出图片</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </div>
        <!-- <component
          v-bind="chartsFilter(item.chartConfig)"
          style="height: calc(100% - 36px);width: 100%;"

          :events="chartEvents"
          :height="(item.h * (rowHeight + 10) - 36)  + 'px'"
          :is="item.chartConfig.type"

          :data="store.chartData">
        </component> -->
        <echarts :static="static" :ref="'chart-ref-' + item.i" :options="store.chartsJson[index]" v-model="store.chartsJson[index]"/>
      </div>
    </grid-item>
  </grid-layout>

</template>

<script>
import { GridLayout, GridItem } from "vue-grid-layout"
import FileSaver from 'file-saver'
import { cloneDeep } from 'lodash'

export default {
  props: {
    static: {
      default: false
    }
  },
  components: {
    GridLayout,
    GridItem
  },
  inject: ['store'],
  data() {
    return {
      chartEvents: {
        click: (v) => {
          console.log(v)
        }
      },
      margin: [10, 10],
      rowHeight: 20,
      draggable: true,
      resizable: true,
    }
  },
  mounted() {
    this.sizeChange();
    this.resizeEvent();
    window.onresize = () => {
      this.sizeChange()
    }
  },
  destroyed() {
    window.onresize = null;
  },
  methods: {
    chartsFilter(chartConfig) {
      let tempChartConfig = cloneDeep(chartConfig);
      if(tempChartConfig.settings.dimension) {
        (tempChartConfig.settings.dimension = (tempChartConfig.settings.dimension || []).reduce((res, item) => {
          if(item.type === 'default') {
            return res.concat(item.name)
          }
          return res
        }, []))
        if(tempChartConfig.settings.dimension.length <= 0) tempChartConfig.settings.dimension = undefined;
      }
      if(tempChartConfig.settings.metrics) {
        (tempChartConfig.settings.metrics = (tempChartConfig.settings.metrics || []).reduce((res, item) => {
          if(item.type === 'default') {
            return res.concat(item.name)
          }
          return res
        }, []))
        if(tempChartConfig.settings.metrics.length <= 0) tempChartConfig.settings.metrics = undefined;
      }

      return tempChartConfig;
    },
    styleFilter(value) {
      if (!value) return '';
      let tempObj = {};
      Object.keys(value).forEach(key => {
        if(typeof value[key] === 'number') {
          tempObj[key] = value[key] + 'px'
        } else {
          tempObj[key] = value[key]
        }
      })
      return tempObj;
    },
    handlerExportImage({i}) {
      const chartDom = this.$refs[`chart-ref-${i}`][0]
                      .$el
                      .getElementsByTagName('canvas')[0];
      try {
        chartDom.toBlob(blob => FileSaver.saveAs(blob, 'chart.png'));
      } catch (e) {
        console.error('导出失败', e)
      }
    },
    movedEvent(i, newX, newY) {
      console.log('movedEvent');
      this.store.addHistroy();
    },
    resizedEvent() {
      console.log('resizedEvent');
      this.store.addHistroy();
    },
    handlerExpandItem(item, index) {

    },
    handlerChangeTitleItem(itme, index) {

    },
    handlerSelectItem(item) {
      if(this.static) return;
      this.store.setSelectCharts(item);
    },
    resizeEvent() {
      this.store.resizeEvent()
    },
    sizeChange() {
      // this.rowHeight = (this.$refs['grid-layout'].$el.offsetHeight - 10) / 12 - 10
      this.rowHeight = (this.$refs['grid-layout'].$el.offsetWidth - 10) / 24 - 10
    }
  },
}
</script>

<style lang="scss">
.grid-layout {
  // height: calc(100% - 115px) !important;
  height: 100%;
  transform: translateY(60px);
  overflow: scroll;
  padding-bottom: 10px;
  .toolbar {
    padding: 10px;
    display: flex;
    justify-content: space-between;
    &.hide {
      visibility: hidden;
    }
    .toolbar-item-menu {
      i {
        color: #000;
      }
    }
    .toolbar-item {
      padding: 0 4px;
      cursor: pointer;
      i {
        color: #0099ff;
      }
      .el-icon-delete {
        color: red;
      }
    }
    .toolbar-left {
      display: flex;
    }
    .toolbar-right {
      display: flex;
    }
  }
}
.hc-grid-item {
  overflow: hidden;
  &.selected {
    outline: 2px solid #0099ff;
  }
}
.vue-grid-item {
  &> div{
    height: 100%;
  }
}
.vue-grid-item.vue-grid-placeholder {
  background: #fff !important;
}

.vue-grid-item:not(.vue-grid-placeholder) {
  background: #fff;
}

.vue-grid-item .resizing {
  opacity: 0.9;
}

.vue-grid-item .static {
  background: #cce;
}

.vue-grid-item .text {
  font-size: 24px;
  text-align: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  height: 100%;
  width: 100%;
}

.vue-grid-item .no-drag {
  height: 100%;
  width: 100%;
}

.vue-grid-item .minMax {
  font-size: 12px;
}

.vue-grid-item .add {
  cursor: pointer;
}

.vue-draggable-handle {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 0;
  left: 0;
  background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><circle cx='5' cy='5' r='5' fill='#999999'/></svg>")
    no-repeat;
  background-position: bottom right;
  padding: 0 8px 8px 0;
  background-repeat: no-repeat;
  background-origin: content-box;
  box-sizing: border-box;
  cursor: pointer;
}
</style>
