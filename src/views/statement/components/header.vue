<template>
  <div class="editor-header">
    <div class="logo">
      <img src="/static/img/logo.32704ae7.png" alt="">
      <span>虎彩 · 智策平台</span>
    </div>
    <div class="operate">
      <div class="operate-item" :class="{active: store.canBack}" @click="store.retreatHistory(false)">
        <i class="fa fa-undo"></i>
        <span>撤销</span>
      </div>
      <div class="operate-item" :class="{active: store.canForward}" @click="store.repeatHistory(false)">
        <i class="fa fa-repeat"></i>
        <span>重做</span>
      </div>
      <div class="operate-item" :class="{active: store.canCopy}" @click="store.addItem(false)">
        <i class="fa fa-copy"></i>
        <span>复制</span>
      </div>
    </div>
    <div class="operate buts-box">
      <!-- <div class="operate-item active">
        <i class="fa fa-area-chart"></i>
        <span>智能图表</span>
      </div> -->
      <!-- <div class="operate-item active">
        <i class="fa fa-bar-chart"></i>
        <span>图表</span>
      </div> -->
      <div v-for="(item, index) in configs" :key="index">
        <el-popover placement="bottom" width="400" trigger="hover">
          <chart-classify-card :classify="item.classify" />
          <div slot="reference" class="operate-item active">
            <i :class="item.icon"></i>
            <span>{{item.name}}</span>
          </div>
        </el-popover>
      </div>
      <!-- <div class="operate-item active">
        <i class="fa fa-pie-chart"></i>
        <span>高级图表</span>
      </div>
      <div class="operate-item active">
        <i class="fa fa-table"></i>
        <span>表格</span>
      </div>
      <div class="operate-item active">
        <i class="fa fa-copy"></i>
        <span>指标</span>
      </div>
      <div class="operate-item active">
        <i class="fa fa-map-o"></i>
        <span>地图</span>
      </div>
      <div class="operate-item active">
        <i class="fa fa-font"></i>
        <span>文字</span>
      </div>
      <div class="operate-item active">
        <i class="fa fa-play-circle"></i>
        <span>媒体</span>
      </div>
      <div class="operate-item active">
        <i class="fa fa-filter"></i>
        <span>过滤条件</span>
      </div> -->
    </div>
    <div class="operate right">
      <div class="operate-item active" @click="store.showChartPreview = true">
        <i class="fa fa-expand"></i>
        <span>预览</span>
      </div>
      <div class="operate-item" :class="{active: store.canSave}">
        <i class="fa fa-floppy-o"></i>
        <span>保存</span>
      </div>
      <div class="operate-item active">
        <i class="fa fa-times"></i>
        <span>退出</span>
      </div>
    </div>
  </div>
</template>

<script>
import configs from '../config/chart-type/index.js'
import chartClassifyCard from './chart-classify-card.vue'
export default {
  inject: ['store'],
  components: { chartClassifyCard },
  data() {
    return {
      configs
    }
  },
  methods: {
    init() {
      const handler = (e) => {
        console.log(e.keyCode)
        if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
          console.log(e)
          e.preventDefault();
          alert('saved');
        }
      }
      document.addEventListener('keydown', handler);
      this.$on('hook:beforeDestroy', () => {
        document.removeEventListener('keydown', handler);
      })
    }
  },
  mounted() {
    // this.init()
  }
}
</script>

<style lang="scss">
.editor-header {
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  height: 58px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.05), 0 1px 0 rgba(0, 0, 0, 0.05);
  background-color: #3a3f51;
  color: #a6a8b1;
  .logo {
    float: left;
    line-height: 58px;
    font-size: 22px;
    text-align: left;
    padding: 0 15px;
    color: #ffffff;
    img {
      height: 30px;
      border-radius: 3px;
      margin-top: -4px;
      vertical-align: middle;
    }
  }
  .operate {
    position: absolute;
    left: 230px;
    margin-right: 16px;
    z-index: 2;
    &.right {
      left: auto;
      right: 10px;
      z-index: 2;
    }
    &.buts-box {
      width: 100%;
      z-index: 1;
      left: 0px;
      right: 0px;
      top: 0px;
      bottom: 0px;
      margin: auto;
      text-align: center;
      display: flex;
      justify-content: center;
    }
    .operate-item {
      float: left;
      height: 58px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 5px;
      flex-direction: column;
      padding-top: 2px;
      cursor: no-drop;
      &.active {
        color: #ffffff;
        cursor: pointer;
        &:hover {
          background-color: #000;
        }
      }
      .fa {
        font-size: 18px;
        margin-bottom: 2px;
      }
    }
  }
  .btns-box {
    position: absolute;
    left: 60%;
    transform: translate(-50%, 0);
    white-space: nowrap;
    width: 100%;
    text-align: center;
    z-index: 21;
    margin-left: -100px;
  }
}
</style>
