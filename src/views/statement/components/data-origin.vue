<template>
  <div class="data-origin">
    <el-form label-position="top" ref="form" label-width="auto" size="mini" :model="dataOriginForm">
      <el-form-item label="数据源：">
        <el-select style="width: 100%;" v-model="dataOriginForm.name" placeholder="请选择数据源">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="输入关键字进行过滤" v-model="filterText">
        </el-input>
      </el-form-item>
      <el-form-item label="字段：">
        <div class="tree-box">
          <el-tree class="filter-tree" :data="treeData" default-expand-all ref="tree" :filter-node-method="filterNode">
            <template #default="{ node, data }">
              <div draggable @dragstart="e => nativeOnDragstart(e, data)" class="tree-item">
                <i class="fa icon" :class="iconMap[data.type]" aria-hidden="true"></i>
                {{data.label}}
              </div>
            </template>
          </el-tree>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
const iconMap = {
  'field': 'fa-text-width',
  'date': 'fa-calendar',
  'value': 'fa-language'
}
export default {
  data() {
    return {
      filterText: '',
      iconMap,
      dataOriginForm: {},
      options: [{
        value: '选项1',
        label: '黄金糕'
      }],
      treeData: []
    }
  },
  inject: ['store'],
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  mounted() {
    this.getTreeData()
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    nativeOnDragstart(e, data) {
      e.dataTransfer.setData('transfer', JSON.stringify(data));
    },
    getTreeData() {
      let series = ((this.store.fieldSettings || {}).series || []).map(item => {
        return {
          type: 'field',
          label: item.n,
          id: item.n
        }
      })
      let number = ((this.store.fieldSettings || {}).number || []).map(item => {
        return {
          type: 'value',
          label: item.n,
          id: item.n
        }
      })
      this.treeData = this.treeData.concat(series);
      this.treeData = this.treeData.concat([{
        type: 'date',
        label: '日期',
        id: '日期',
        children: [{
          type: 'date',
          label: '年',
          id: '年',
        }, {
          type: 'date',
          label: '月',
          id: '月',
        }, {
          type: 'date',
          label: '日',
          id: '日',
        }]
      }])
      this.treeData = this.treeData.concat(number);
    }
  }
}
</script>

<style lang="scss">
.data-origin {
  .el-tree-node__content:hover {
    background-color: #dbebdc;
    .tree-item {
      color: #23c132;
    }
  }
  .tree-box {
  }
  .tree-item {
    width: 100%;
    .icon {
      color: #4690ff;
      font-size: 12px;
      padding-right: 4px;
    }
  }
}
</style>
