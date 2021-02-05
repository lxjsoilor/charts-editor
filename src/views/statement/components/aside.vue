<template>
  <div class="hc-aside">
    <div v-if="!!store.selectCharts.i" class="aside-box" :class="{open: store.showPanel}">
      <div v-show="!store.showPanel" @click="handlerMouseenter" class="close-icon">
        <i class="fa fa-bars"></i>
      </div>
      <div v-if="store.showPanel" class="aside-contain">
        <el-tabs :stretch="true" v-model="store.asideActiveTab">
          <el-tab-pane label="数据" name="tabData">
            <data-origin />
          </el-tab-pane>
          <el-tab-pane label="基础" name="tabBase">
            <hc-base :propsConfig="propsConfig.base" />
          </el-tab-pane>
          <el-tab-pane label="高级" name="tabAdvanced">
            <hc-base :propsConfig="propsConfig[currentType]" />
          </el-tab-pane>
          <el-tab-pane label="交互" name="tabInteraction">
            <interaction />
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import hcBase from './base.vue';
import dataOrigin from './data-origin.vue';
import propsConfig from '../config/chart-property/index'
import interaction from './interaction';
export default {
  components: {
    hcBase,
    dataOrigin,
    interaction
  },
  inject: ['store'],
  data() {
    return {
      propsConfig,
      isFixed: false,
    }
  },
  computed: {
    currentType() {
      return this.store.selectCharts.parameter.type || 'line'
    }
  },
  methods: {
    handlerMouseenter() {
      this.store.showPanel = true;
    },
    handlerMouseleave() {
      !!this.isFixed || (this.store.showPanel = false);
    }
  }
}
</script>

<style lang="scss">
.aside-box {
  position: fixed;
  height: 100%;
  background-color: #ffffff;
  padding-top: 70px;
  z-index: 5;
  width: 40px;
  border-right: 1px solid #cccccc;
  transition: 0.2s all;
  overflow: hidden;
  .header {
    padding-bottom: 10px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #cccccc;
    .pin-btn {
      cursor: pointer;
      &.fixed .fa {
        color: red;
      }
    }
  }
  .aside-contain {
    padding: 0 10px;
    width: 300px;
  }
  &.open {
    width: 300px;
  }
  .close-icon {
    width: 40px;
    text-align: center;
    cursor: pointer;
  }
  .el-tabs__content {
    height: calc(100vh - 130px);
    overflow-y: scroll;
  }
}
</style>
