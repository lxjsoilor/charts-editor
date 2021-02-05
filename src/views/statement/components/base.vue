<script>
import test from './base-test.js'
import Select from './select'
import mapAscader from './map-cascader'
import ColorPicker from './color-picker'
import { set, cloneDeep, get } from 'lodash'
export default {
  props: {
    propsConfig: {}
  },
  data() {
    return {
      model: {},
    }
  },
  inject: ['store'],
  components: { Select, ColorPicker, mapAscader },
  watch: {
    'store.selectCharts': {
      handler: function () {
        this.model = this.getModel();
      }
    }
  },
  methods: {
    getModel() {
      let model = {};
      if (Object.prototype.toString.call(this.propsConfig) === '[object Array]') {
        this.propsConfig.forEach(item => {
          Object.keys(item.props).map(key => {
            const widget = cloneDeep(this.store.selectCharts);
            model[key] = get(widget, key);
          })
        });
      } else {
        Object.keys(this.propsConfig.props).map(key => {
          const widget = cloneDeep(this.store.selectCharts);
          model[key] = get(widget, key);
        })
      }
      return model
    },
    compChange(e, key) {
      let path = key;
      if (key.indexOf('.') === -1) path = key;
      const widget = cloneDeep(this.store.selectCharts);
      const currentKey = path.split(".")[0];
      set(widget, path, e);
      const value = widget[currentKey];
      this.$set(this.store.selectCharts, currentKey, value);
      this.store.addHistroy && this.store.addHistroy();
    },
    renderBase(propsConfig) {
      return (
        <el-form class="form-class" label-position="top" label-width="68px" size="mini">
          <el-row gutter={6}>
            {Object.keys(propsConfig.props).map(key => {
              const { label, type, span, float, ...props } = propsConfig.props[key];
              return (
                <el-col span={span || 24}>
                  <el-form-item class={ type === 'el-switch' ? 'float' : '' } label={label.slice(0, 8)}>
                    <type
                      style="width: 100%;height: 30px;"
                      v-model={this.model[key]}
                      {...props}
                      onChange={e => this.compChange(e, key)}
                    />
                  </el-form-item>
                </el-col>
              )
            })}
          </el-row>
        </el-form>
      )
    }
  },
  mounted() {
    this.model = this.getModel();
  },
  render() {
    if (Object.prototype.toString.call(this.propsConfig) === '[object Array]') {
      return (
        <div>
          {
            this.renderBase(this.propsConfig[0])
          }
          <el-collapse value="标题组件">
            {this.propsConfig.map((item, i) => {
              return (
                i === 0 ?
                null
                :
                <el-collapse-item title={item.name} name={item.name}>
                  {
                    this.renderBase(item)
                  }
                </el-collapse-item>
              )
            })}
          </el-collapse>
        </div>
      )
    } else {
      return (
        <div>
          {this.renderBase(this.propsConfig)}
        </div>
      )
    }
  }
}
</script>

<style>
.form-class .float .el-form-item__content {
  float: right;
}
.el-form-item__label {
  padding-bottom: 0px !important;
}
.el-form-item--mini.el-form-item {
  margin-bottom: 10px !important;
}
.el-form-item__label {
  font-weight: 500;
}
.el-col {
  max-height: 68px;
  overflow: hidden;
}
.el-collapse-item__arrow {
  position: absolute;
  left: 5px;
}
.el-collapse-item__header {
  padding-left: 20px;
  height: 36px;
  line-height: 36px;
  background: #ebecf0;
  position: relative;
}
.el-collapse-item__content {
  padding-bottom: 0;
}
.el-collapse-item__wrap {
  border-bottom: 0;
}
</style>
