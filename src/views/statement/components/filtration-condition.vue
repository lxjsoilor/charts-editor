<template>
  <div class="hc-multi-form">
    <div>
      <div class="hc-multi-item" v-for="(item, index) in list" :key="index">
        <div class="hc-multi-label">城市</div>
        <el-row :gutter="gutter" class="hc-multi-input">
          <el-col :span="12" class="hc-suffix">
            <el-select v-model="list[index]['label']" size="mini" placeholder="请选择条件">
              <el-option v-for="conditionItem in conditionOptions" :key="conditionItem.value" :label="conditionItem.label" :value="conditionItem.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="12" class="hc-suffix">
            <el-input size="mini" v-model="list[index]['value']" placeholder="请输入条件"></el-input>
          </el-col>
        </el-row>
        <div class="hc-multi-box">
          <button :disabled="index === 0 && list.length >= 10" class="hc-multi-button" type="button" :class="{'hc-disabled': (index !== 0)}" @click="handlerUpdate(index !== 0, index)">
            {{index == 0 ? "＋" : "－"}}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {},
    gutter: {
      type: Number,
      default: 5
    },
    keyMap: {
      type: Array,
      default() {
        return ['label', 'value']
      }
    }
  },
  watch: {
    value: {
      handler: function (val) {
        if (val && val.length && val.length > 0) {
          this.list = val || [{label: '', value: ''}];
        } else {
          this.list = [{label: '', value: ''}];
        }
      },
      immediate: true
    },
    /**
     * list = [{label: label, value: value}]
     *
     *
     */
    list: {
      handler(arr) {
        this.$emit('input', arr)
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
  },
  data() {
    return {
      list: this.value || [{label: '', value: ''}],
      conditionOptions: [{
        value: '集合',
        label: '集合'
      }, {
        value: '等于',
        label: '等于'
      }, {
        value: '不等于',
        label: '不等于'
      }, {
        value: '包含',
        label: '包含'
      }, {
        value: '不包含',
        label: '不包含'
      }, {
        value: '开头包含',
        label: '开头包含'
      }, {
        value: '结尾包含',
        label: '结尾包含'
      }]
    }
  },
  mounted() {
  },
  methods: {
    handlerUpdate(flag, index) {
      if (flag) {
        // 减去
        this.list.splice(index, 1)
      } else {
        // 加上
        let tempObj = {}
        this.keyMap.forEach(item => {
          tempObj[item] = ''
        });
        this.list.push(tempObj)
      }
    }
  }
}
</script>

<style lang="scss">
.hc-multi-button:disabled {
  background-color: #999 !important;
}
.hc-multi-form {
  padding-top: 20px;
  width: 100%;
  .el-col {
    height: auto;
  }
}
.hc-multi-form .hc-multi-item {
  display: flex;
  margin-bottom: 10px;
  .hc-multi-label {
    line-height: 28px;
    padding-right: 20px;
  }
}
.hc-multi-form .hc-multi-item .hc-multi-box {
  position: relative;
  width: 42px;
}
.hc-multi-form .hc-multi-item .hc-multi-input {
  flex: 1;
}
.hc-multi-form .hc-multi-item .hc-multi-input .hc-suffix {
  position: relative;
}
.hc-multi-form .hc-multi-item .hc-multi-input .hc-suffix ::after {
  display: inline-block;
  position: absolute;
}
.hc-multi-form .hc-multi-item .hc-multi-button {
  background: #3a8ee6;
  color: #fff;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  outline: none;
  border: none;
  margin-left: 12px;
  font-size: 14px;
  cursor: pointer;
  position: absolute;
  left: 0px;
  bottom: 0px;
  top: 0px;
  right: 0px;
  margin: auto;
  line-height: 16px;
}
.hc-multi-form .hc-multi-item .hc-multi-button.hc-disabled {
  background-color: #f56c6c;
}
.el-input-group__prepend .el-select--small .el-input--suffix {
  width: 85px;
}
</style>
