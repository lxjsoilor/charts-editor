<template>
  <el-dialog class="infinite-edit" title="提示" append-to-body :visible.sync="infiniteValue" width="1200px" :before-close="handleClose">
    <div class="infinite-box">
      <hc-aside v-if="!static"/>
      <div class="infinite-chart">
        <dimensionality v-if="!static" />
        <filtrate style="height: 70vh" v-if="!static" />
        <echarts :style="{
          paddingLeft: static ? '' : '175px'
        }" :options="parameter.downConfig.children" v-model="parameter.downConfig.children"/>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <!-- <el-button size="mini" @click="infiniteValue = false">取 消</el-button> -->
      <el-button size="mini" type="primary" @click="infiniteValue = false">返 回</el-button>
    </span>
  </el-dialog>
</template>

<script>
import hcAside from './infinite-aside';
import dimensionality from './dimensionality'
import filtrate from './filtrate'
import subStore from '../event-store/sub-state';
import { merge } from 'lodash'

export default {
  components: { hcAside, dimensionality, filtrate },
  name: 'echarts-edit',
  props: {
    value: {},
    parameter: {},
    static: {
      type: Boolean,
      default: false
    }
  },
  provide() {
    return { store: this.store, test: this.test }
  },
  watch: {
    value(val) {
      this.infiniteValue = val
    },
    infiniteValue(val) {
      this.$emit('input', val)
    }
  },
  data() {
    return {
      infiniteValue: this.value,
      store: subStore(this.parameter.downConfig.children),
      test: {}
    };
  },
  methods: {
    initConfig() {
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    }
  },
  mounted() {
    this.initConfig()
  }
};
</script>
<style lang="scss">
.infinite-edit {
  .el-dialog {
    margin-top: 5vh !important;
  }
  .el-dialog__header {
    padding: 10px;
    font-size: 14px;
  }
  .el-dialog__footer {
    padding: 10px;
  }
  .el-dialog__body {
    padding-bottom: 0px;
  }
  .infinite-box {
    height: 75vh;
    display: flex;
    .infinite-chart {
      overflow: hidden;
      position: relative;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
