<script>
export default {
  name: 'Select',
  props: {
    value: {},
    size: {
      type: String,
      defalut: 'mini',
    },
    disabled: Boolean,
    placeholder: {
      type: String,
      defalut: '请选择',
    },
    options: {
      type: Array,
      defalut: () => [],
    },
  },
  data() {
    return {
      selectValue: this.value || ''
    }
  },
  watch: {
    value(val) {
      this.selectValue = val
    }
  },
  methods: {
    selectChange(val) {
      this.$emit('input', val);
      this.$emit('change', val);
    }
  },
  render() {
    const { options, placeholder, selectChange } = this;
    return (
      <el-select v-model={this.selectValue} placeholder="请选择" onChange={(val) => selectChange(val)}>
        {options.map(item => {
          if (typeof item === 'string') return <el-option label={item} value={item}></el-option>;
          return <el-option label={item.label} value={item.value}></el-option>;
        })}
      </el-select>
    )
  }
}
</script>

<style>
</style>
