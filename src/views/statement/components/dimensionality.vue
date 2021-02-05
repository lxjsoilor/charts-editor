<template>
  <div class="dimensionality">
    <div class="axis"
      @dragover.prevent="e => nativeOnDragover(e)"
      @dragenter="e => nativeOnDragenter(e)"
      @dragleave="e => nativeOnDragleave(e)"
      @drop.prevent="e => nativeOnDragend(e)"
    >
      <div class="axis-prefix">
        <i class="fa fa-list" aria-hidden="true"></i>
        维度项
      </div>
      <div class="axis-section">
        <draggable animation="300" @end="e => handlerDraggleEnd(e, 'dimension')" style="display: inline-block;" :value="dimension">
          <div class="section-item" v-for="(item, index) in dimension" :key="index">
            <el-dropdown trigger="click">
              <el-button size="mini" type="primary">{{item.name}}<i class="el-icon-arrow-down el-icon--right"></i></el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>默认顺序</el-dropdown-item>
                <el-dropdown-item>升序</el-dropdown-item>
                <el-dropdown-item>降序</el-dropdown-item>
                <el-dropdown-item>自定义排序</el-dropdown-item>
                <el-dropdown-item>
                  <el-popover
                    placement="right"
                    trigger="hover">
                    <div class="sub-box">
                      <div class="sub-item">
                        实际数据
                      </div>
                      <div class="sub-item">
                        枚举数据
                      </div>
                    </div>
                    <div slot="reference">显示格式</div>
                  </el-popover>
                </el-dropdown-item>
                <el-dropdown-item>设置别名</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </draggable>
      </div>
    </div>
    <div class="axis"
      @dragover.prevent="e => nativeOnDragover(e)"
      @dragenter="e => nativeOnDragenter(e)"
      @dragleave="e => nativeOnDragleave(e)"
      @drop.prevent="e => nativeOnDragend(e)"
    >
      <div class="axis-prefix">
        <i class="fa fa-list" style="transform: rotate(90deg);" aria-hidden="true"></i>
        度量项
      </div>
      <div class="axis-section">
        <draggable animation="300" @end="e => handlerDraggleEnd(e, 'metrics')" style="display: inline-block;" :value="metrics">
          <div class="section-item" v-for="(item, index) in metrics" :key="index">
            <el-dropdown v-if="item.type === 'default'" trigger="click">
              <el-button size="mini" type="success">{{item.name}}<i class="el-icon-arrow-down el-icon--right"></i></el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>总和</el-dropdown-item>
                <el-dropdown-item>平均值</el-dropdown-item>
                <el-dropdown-item>最大值</el-dropdown-item>
                <el-dropdown-item>最小值</el-dropdown-item>
                <el-dropdown-item>计数</el-dropdown-item>
                <el-dropdown-item>去重计数</el-dropdown-item>
                <el-dropdown-item>
                  <el-popover
                    placement="right"
                    trigger="hover">
                    <div class="sub-box">
                      <div class="sub-item">
                        同比
                      </div>
                      <div class="sub-item">
                        环比
                      </div>
                      <div class="sub-item">
                        占比
                      </div>
                    </div>
                    <div slot="reference">高级计算</div>
                  </el-popover>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-popover
                    placement="right"
                    trigger="hover">
                    <div class="sub-box">
                      <div class="sub-item">
                        默认顺序
                      </div>
                      <div class="sub-item">
                        升序
                      </div>
                      <div class="sub-item">
                        降序
                      </div>
                    </div>
                    <div slot="reference">排序</div>
                  </el-popover>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-popover
                    placement="right"
                    trigger="hover">
                    <div class="sub-box">
                      <div class="sub-item">
                        数值
                      </div>
                      <div class="sub-item">
                        百分比
                      </div>
                    </div>
                    <div slot="reference">显示格式</div>
                  </el-popover>
                </el-dropdown-item>
                <el-dropdown-item>设置别名</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown v-else trigger="click">
              <el-button size="mini" type="warning">{{item.name}}<i class="el-icon-arrow-down el-icon--right"></i></el-button>
              <dropdown-box v-model="item.editing" :title="item.name" :fx="item.fx"/>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click="item.editing = true">编辑</el-dropdown-item>
                <el-dropdown-item>平均值</el-dropdown-item>
                <el-dropdown-item>最大值</el-dropdown-item>
                <el-dropdown-item>最小值</el-dropdown-item>
                <el-dropdown-item>计数</el-dropdown-item>
                <el-dropdown-item>去重计数</el-dropdown-item>
                <el-dropdown-item>
                  <el-popover
                    placement="right"
                    trigger="hover">
                    <div class="sub-box">
                      <div class="sub-item">
                        同比
                      </div>
                      <div class="sub-item">
                        环比
                      </div>
                      <div class="sub-item">
                        占比
                      </div>
                    </div>
                    <div slot="reference">高级计算</div>
                  </el-popover>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-popover
                    placement="right"
                    trigger="hover">
                    <div class="sub-box">
                      <div class="sub-item">
                        默认顺序
                      </div>
                      <div class="sub-item">
                        升序
                      </div>
                      <div class="sub-item">
                        降序
                      </div>
                    </div>
                    <div slot="reference">排序</div>
                  </el-popover>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-popover
                    placement="right"
                    trigger="hover">
                    <div class="sub-box">
                      <div class="sub-item">
                        数值
                      </div>
                      <div class="sub-item">
                        百分比
                      </div>
                    </div>
                    <div slot="reference">显示格式</div>
                  </el-popover>
                </el-dropdown-item>
                <el-dropdown-item>设置别名</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </draggable>
        <div class="section-item" v-if="false">

        </div>
        <div class="section-item">
          <el-button size="mini" @click="handlerAddComputer" type="default">添加计算</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { addClass, removeClass, hasAttrInObj } from '../utils/index.js'
import draggable from 'vuedraggable';
import dropdownBox from './dropdown-box';

export default {
  components: { draggable, dropdownBox },
  data() {
    return {
      dimension: [],
      metrics: []
    }
  },
  inject: ['store'],
  watch: {
    'store.selectCharts': {
      handler: function () {
        this.init()
      }
    }
  },
  methods: {
    init() {
      const { dimension, metrics } = ((this.store.selectCharts || {}).parameter || {});
      this.dimension = dimension || [];
      this.metrics = metrics || [];
    },
    handlerAddComputer() {
      if(hasAttrInObj(this.metrics, 'name', '计算值')) {
        this.metrics.push({
          editing: true,
          name: '计算值' + 1,
          fx: ''
        })
      } else {
        this.metrics.push({
          editing: true,
          name: '计算值',
          fx: ''
        })
      }

    },
    nativeOnDragend(e, data) {
      let transfer = e.dataTransfer.getData('transfer');
      const { type, label } = JSON.parse(transfer || '{}');
      removeClass(e.target, 'hover');
      if (!type) return;
      if(!this.store.selectCharts.parameter) {
        this.$set(this.store.selectCharts, 'parameter', {
          dimension: [],
          metrics: []
        })
      }
      if(
        !hasAttrInObj(
          this.store.selectCharts.parameter[type === 'field' ? 'dimension' : 'metrics'],
          'name',
          label
        )
      ) {
        this.store.selectCharts.parameter[type === 'field' ? 'dimension' : 'metrics'].push({
          name: label,
          type: 'default'
        });
      } else {
        this.$message.error('这个维度已经存在')
      }
      this.init()
    },
    handlerDraggleEnd(e, type) {
      if(e.newIndex === e.oldIndex) {
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
  },
  mounted() {
    this.init()
  }
}
</script>

<style lang="scss">
.dimensionality {
  position: relative;
  background-color: #fff;
  z-index: 1000;
  .axis {
    position: relative;
    min-height: 42px;
    padding: 0px 16px;
    line-height: 42px;
    width: 100%;
    display: flex;
    align-items: center;
    z-index: 1;
    color: #666666;
    &.hover {
      background-color: #eff6ef;
    }
    &::after {
      position: absolute;
      content: "";
      height: 1px;
      right: 0;
      left: 16px;
      bottom: 0;
      background-color: #e6e6e6;
    }
  }
  .axis-section {
    line-height: 30px;
    .section-item {
      display: inline-block;
      margin-left: 8px;
      .sub-box {
        background-color: #fff;
      }
      .el-button {
        font-size: 12px;
        border-radius: 20px;
        padding-top: 4px;
        padding-bottom: 4px;
      }
    }
  }
}
.sub-item {
  padding: 4px 8px;
  cursor: pointer;
  &:hover {
    background-color: #ecf5ff;
    color: #66b1ff;
  }
}
</style>
