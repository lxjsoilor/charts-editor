<template>
  <div class="chart-preview-single">
    <div class="preview-close" @click="store.showChartPreviewSingle = false">
      <i class="el-icon-error"></i>
    </div>
    <!-- <component
        v-if="store.selectCharts.i"
        v-bind="store.selectCharts.chartConfig"
        style="height: 100%;width: 100%;"
        height="100%"
        width="100%"
        :is="store.selectCharts.chartConfig.type"
        :data="store.chartData">
      </component> -->
      <echarts :static="true" :options="store.selectCharts" v-model="store.selectCharts"/>
  </div>
</template>

<script>
import echarts from './echarts';
export default {
  components: { echarts },
  inject: ['store'],
  methods: {
    initEvent() {
      const handler = ({ keyCode }) => {
        if (keyCode === 27) {
          this.store.showChartPreviewSingle = false;
        }
      };
      document.addEventListener('keyup', handler);
      this.$on('hook:beforeDestroy', () => {
        document.removeEventListener('keyup', handler);
      })
    }
  },
  mounted() {
    this.initEvent()
  }
}
</script>

<style lang="scss">
.chart-preview-single {
  height: 100%;
  width: 100%;
  top: 0px;
  left: 0px;
  position: fixed;
  background-color: #fff;
  z-index: 1000;
  padding: 40px;
  .preview-close {
    position: absolute;
    right: 0px;
    top: 0px;
    font-size: 40px;
    color: #5b5b5b;
    padding: 20px;
    cursor: pointer;
  }
}
</style>
