<template>
  <div class="editor-main" :style="{'padding-left': mainPaddingLeft}">
    <dimensionality v-if="store.showPanel"/>
    <filtrate v-if="store.showPanel"/>
    <div class="editor-canvas" :style="{'padding-left': store.showPanel ? '180px' : '0px'}">
      <el-card shadow="never" class="title" @dblclick.native="handlerDbClick" :body-style="{'padding-top': '12px','padding-bottom': '12px'}">
        <span v-if="!isEditing">{{title}}</span>
        <input @blur="handlerChange" v-else type="text" v-model="title">
      </el-card>
      <grid-layout />
      <div class="empty-tip" v-if="store.chartsJson.length <= 0">
        请选择图表
      </div>
    </div>
  </div>
</template>

<script>
import gridLayout from './grid-layout';
import dimensionality from './dimensionality';
import filtrate from './filtrate';
export default {
  components: { gridLayout, dimensionality, filtrate },
  data() {
    return {
      title: '测试报表测试报表测试报表测试报fsd',
      isEditing: false
    }
  },
  computed: {
    mainPaddingLeft() {
      this.store.resizeEvent()
      if (this.store.showPanel) {
        return '300px'
      } else if (this.store.selectCharts.i) {
        return '40px'
      } else {
        return '0px'
      }
    }
  },
  inject: ['store'],
  methods: {
    handlerDbClick() {
      this.isEditing = !this.isEditing;
    },
    handlerChange() {
      this.isEditing = !this.isEditing;
    }
  }
}
</script>

<style lang="scss">
.editor-main {
  position: relative;
  margin-top: 58px;
  height: 100%;
  padding-left: 40px;
  background: #eee;
  transition: 0.3s all;
  .editor-canvas {
    width: 100%;
    height: 93%;
    overflow: scroll;
    position: relative;
    padding-left: 180px;
    .title {
      max-width: 800px;
      min-width: 500px;
      position: absolute;
      top: 10px;
      left: 50%;
      right: 50%;
      transform: translateX(-50%);
      text-align: center;
      input {
        border: none;
        width: 100%;
        text-align: center;
      }
      cursor: pointer;
    }
    .canvas {
    }
  }
  .empty-tip {
    font-size: 30px;
    color: #aaa;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }
}
</style>
