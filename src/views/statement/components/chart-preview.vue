<template>
  <div class="chart-preview">
    <div class="preview-close" @click="store.showChartPreview = false">
      <i class="el-icon-error"></i>
    </div>
    <div class="preview-header">
      <el-radio-group v-model="equipment">
        <el-radio-button label="pc">
          <i class="fa fa-laptop" style="font-size: 20px;" aria-hidden="true"></i>
        </el-radio-button>
        <el-radio-button label="mobile">
          <i class="fa fa-mobile" style="font-size: 20px;" aria-hidden="true"></i>
        </el-radio-button>
      </el-radio-group>
    </div>
    <gridLayout :static="true" v-if="equipment === 'pc'" />
    <mobile-preview v-else/>
  </div>
</template>

<script>
import gridLayout from './grid-layout'
import mobilePreview from './mobile-preview'
export default {
  data() {
    return {
      equipment: 'pc'
    }
  },
  components: { gridLayout, mobilePreview },
  inject: ['store'],
  methods: {
    initEvent() {
      const handler = ({ keyCode }) => {
        if (keyCode === 27) {
          this.store.showChartPreview = false;
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
.chart-preview {
  .el-radio-button__inner {
    width: 64px;
  }
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: #ccc;
  z-index: 10000;
  padding-top: 20px;
  .preview-header {
    background-color: #fff;
    height: 60px;
    width: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .preview-close {
    position: absolute;
    right: 0px;
    top: 0px;
    font-size: 40px;
    color: #5b5b5b;
    padding: 20px;
    z-index: 1000;
    cursor: pointer;
  }
}
</style>
