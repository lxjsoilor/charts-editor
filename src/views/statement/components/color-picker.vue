<script>
export default {
  props: {
    value: String,
    placeholder: String
  },
  data() {
    return {
      color: ''
    }
  },
  watch: {
    value(val) {
      if (val) this.color = val;
      else {
        this.color = undefined;
      }
    }
  },
  methods: {
    colorChange(e) {
      this.$emit('input', this.color);
      this.$emit('change', this.color);
    }
  },
  render() {
    return (
      <div class="v-color-picker">
        <el-color-picker
          v-model={this.color}
          color-format="hex"
          onChange={() => this.colorChange()}
        ></el-color-picker>
        <el-input v-model={this.color} onChange={() => this.colorChange()} placeholder={this.placeholder ? this.placeholder : '颜色值'} />
      </div>
    );
  }
}
</script>

<style lang="scss">
.v-color-picker {
  position: relative;
  margin-bottom: 10px;
  .el-color-picker {
    position: absolute;
    z-index: 1;
    top: 1px;
    .el-color-picker__trigger {
      border: 0;
    }
  }
  .el-input__inner {
    padding-left: 30px;
  }
}
</style>
