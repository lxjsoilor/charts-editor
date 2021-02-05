<template>
  <el-cascader v-model="currentValue" :options="options" change-on-select>
  </el-cascader>
</template>

<script>
const mapData = require('@/assets/mapdata/map-data.json')
export default {
  name: 'map-ascader',
  props: {
    value: {},
  },
  data() {
    return {
      currentValue: this.value || [],
      options: mapData
    }
  },
  watch: {
    value(val) {
      this.currentValue = val || []
    },
    currentValue(val) {
      this.$emit('input', val);
      this.$emit('change', val);
    }
  },
  methods: {
  },
}
</script>

<style>
</style>
