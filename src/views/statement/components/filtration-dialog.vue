<template>
  <el-dialog :append-to-body="true" title="筛选器-城市" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
    <div class="filtration-box">
      <el-tabs v-model="filtrationTabs">
        <el-tab-pane label="常规筛选" name="convention">
          <div class="tab-item">
            <div v-if="false">
              <div class="serach">
                <el-input placeholder="请输入筛选内容" prefix-icon="el-icon-search"></el-input>
              </div>
              <div class="checkbox">
                <el-checkbox-group>
                  <el-checkbox label="复选框 A"></el-checkbox>
                  <el-checkbox label="复选框 B"></el-checkbox>
                  <el-checkbox label="复选框 C"></el-checkbox>
                  <el-checkbox label="复选框 A"></el-checkbox>
                  <el-checkbox label="复选框 B"></el-checkbox>
                  <el-checkbox label="复选框 C"></el-checkbox>
                  <el-checkbox label="复选框 A"></el-checkbox>
                  <el-checkbox label="复选框 B"></el-checkbox>
                  <el-checkbox label="复选框 C"></el-checkbox>
                  <el-checkbox label="复选框 A"></el-checkbox>
                  <el-checkbox label="复选框 B"></el-checkbox>
                  <el-checkbox label="复选框 C"></el-checkbox>
                  <el-checkbox label="复选框 A"></el-checkbox>
                  <el-checkbox label="复选框 B"></el-checkbox>
                  <el-checkbox label="复选框 C"></el-checkbox>
                  <el-checkbox label="复选框 A"></el-checkbox>
                  <el-checkbox label="复选框 B"></el-checkbox>
                  <el-checkbox label="复选框 C"></el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
            <div v-else style="padding-top: 20px;">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-input-number size="mini" controls-position="right"></el-input-number>
                </el-col>
                <el-col :span="12">
                  <el-input-number size="mini" controls-position="right"></el-input-number>
                </el-col>
                <el-col :span="24" style="padding: 0 10px;">
                  <el-slider range :max="100"></el-slider>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="条件筛选" name="condition">
          <div class="tab-item">
            <filtration-condition />
          </div>
        </el-tab-pane>
        <el-tab-pane label="空值筛选" name="nullValue">
          <div class="tab-item">
            <el-radio-group class="radio">
              <el-radio label="非空值">非空值</el-radio>
              <el-radio label="空值">空值</el-radio>
            </el-radio-group>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import filtrationCondition from './filtration-condition'
export default {
  components: {
    filtrationCondition
  },
  props: {
    value: {},
  },
  watch: {
    value(val) {
      this.dialogVisible = val;
    },
    dialogVisible(val) {
      this.$emit('input', val)
    }
  },
  data() {
    return {
      filtrationTabs: 'convention',
      dialogVisible: this.value
    };
  },
  methods: {
    handleClose(done) {
      done();
    }
  }
}
</script>

<style lang="scss">
.el-dialog__body {
  padding-top: 0px;
}
.tab-item {
  height: calc(50vh - 30px);
  border: 1px solid #cccccc;
  padding: 0 10px;
  .radio {
    .el-radio {
      padding-top: 20px;
      display: block;
    }
  }
  .serach {
    height: 40px;
    padding-bottom: 10px;
    input {
      border: none;
      border-bottom: 1px solid #cccccc;
    }
  }
  .checkbox {
    height: 100%;
    overflow: scroll;
    padding-bottom: 40px;
  }
  .el-checkbox {
    display: block;
    padding: 10px 0px;
  }
}
.filtration-box {
  height: 50vh;
  .el-col {
    height: auto;
    .el-input-number {
      width: 100%;
    }
  }
}
</style>
