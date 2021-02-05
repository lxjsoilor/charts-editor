<template>
  <div class="dropdown-box" v-if="show">
    <div class="dropdown-main">
      <div class="item">
        <div class="label">标题：</div>
        <el-input v-model="title" size="mini" />
      </div>
      <div class="item">
        <div class="label">Fx：</div>
        <el-input v-model="fx" size="mini" type="textarea" />
        <div class="buttons">
          <div @click="show = false">
            <i class="el-icon-check"></i>
          </div>
          <div @click="show = false">
            <i class="el-icon-close"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {},
    title: {},
    fx: {}
  },
  data() {
    return {
      show: this.value
    }
  },
  watch: {
    show(val) {
      this.$emit('input', val)
    },
    value(val) {
      this.show = val;
    }
  }
}
</script>

<style lang="scss">
.dropdown-box {
  position: absolute;
  background-color: #fff;
  left: 0px;
  right: 0px;
  top: 40px;
  width: 430px;
  margin: auto;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}
.dropdown-main {
  padding: 10px;
  .item {
    .label {
      width: 60px;
      text-align: right;
    }
    display: flex;
    justify-content: center;
    align-items: center;
    .buttons {
      width: 80px;
      display: flex;
      i {
        font-weight: bold;
        cursor: pointer;
      }
      color: #000000;
      justify-content: space-around;
    }
  }
}
</style>
