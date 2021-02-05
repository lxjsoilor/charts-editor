<template>
  <div class="filtrate">
    <div class="filtrate-card">
      <div class="card-label">
        筛选
      </div>
      <div class="card-content" @dragover.prevent="e => nativeOnDragover(e)" @dragenter="e => nativeOnDragenter(e)" @dragleave="e => nativeOnDragleave(e)" @drop.prevent="e => nativeOnDragend(e)">
        <div class="card-remind" v-if="filtration.length <= 0">
          <div>拖拽字段到这里进行筛选</div>
        </div>
        <div class="card-remind-list" v-if="filtration.length > 0">
          <div v-for="(item, index) in filtration" :key="index" class="card-remind-item" @click="filtrationShow = true">
            <div class="title">
              <i class="fa fa-circle-o" :style="{color: item.type === 'value' ? '#67c23a' : '#409eff'}" aria-hidden="true"></i>
              {{item.name}}
            </div>
            <div class="setting">
              <i class="el-icon-setting"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="filtrate-card">
      <div class="card-label">
        颜色
      </div>
      <div class="card-content" @dragover.prevent="e => nativeOnDragover(e)" @dragenter="e => nativeOnDragenter(e)" @dragleave="e => nativeOnDragleave(e)" @drop.prevent="e => nativeOnDragend(e)">
        <!-- <div class="card-remind">
          拖拽字段到这里配置颜色
        </div> -->
        <div class="card-remind-list">
          <div class="card-remind-item">
            <div class="title">
              城市
            </div>
            <div class="setting">
              <i class="el-icon-setting"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <filtration-dialog v-model="filtrationShow" />
  </div>
</template>

<script>
import filtrationDialog from './filtration-dialog'
import { addClass, removeClass } from '../utils/index.js'

export default {
  components: {
    filtrationDialog
  },
  data() {
    return {
      filtrationShow: false,
      filtration: []
    }
  },
  inject: ['store'],
  methods: {
    init() {
      this.filtration = (this.store.selectCharts.chartConfig || {}).filtration || {};
    },
    nativeOnDragend(e, data) {
      let transfer = e.dataTransfer.getData('transfer');
      const { type, label } = JSON.parse(transfer || '{}');
      if (!type) return;
      this.filtration.push({name: label, type: type})
      removeClass(e.target, 'hover');
    },
    handlerDraggleEnd(e, type) {
      if (e.newIndex === e.oldIndex) {
        this[type].splice(e.newIndex, 1);
      }
    },
    nativeOnDragover(e) {
      e.preventDefault();
    },
    nativeOnDragenter(e, data) {
      addClass(e.target, 'hover');
    },
    nativeOnDragleave(e, data) {
      removeClass(e.target, 'hover');
    },
  }
}
</script>

<style lang="scss">
.filtrate {
  position: absolute;
  background-color: #fff;
  z-index: 100;
  width: 176px;
  flex-shrink: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #e6e6e6;
  .filtrate-card {
    flex: 6 1 0%;
    position: relative;
    display: flex;
    flex-direction: column;
    z-index: 1;
    &::after {
      position: absolute;
      content: "";
      height: 1px;
      right: 0;
      left: 16px;
      bottom: 0;
      background-color: #e6e6e6;
    }
    .card-label {
      margin-top: 8px;
      height: 40px;
      line-height: 40px;
      color: #666666;
      padding: 0 16px;
    }
    .card-content {
      flex: 1;
      flex-shrink: 0;
      overflow: auto;
      &.hover {
        background-color: #eff6ef;
      }
      .card-remind {
        padding: 16px 42px;
        text-align: center;
        color: rgba(10, 18, 32, 0.46);
      }
      .card-remind-list {
        overflow: auto;
        .card-remind-item {
          padding: 0 16px;
          height: 32px;
          line-height: 32px;
          color: #999999;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          &:hover {
            background: #f6f6f6;
            .setting {
              opacity: 1;
            }
          }
          .title {
            margin-right: 8px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            font-size: 12px;
          }
          .setting {
            float: right;
            opacity: 0;
            color: #cccccc;
          }
        }
      }
    }
  }
}
</style>
