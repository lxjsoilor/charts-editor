<template>
  <div class="mobile-preview">
    <div class="mobile-box">
      <div class="mobile">
        <echarts  v-for="(item, index) in store.chartsJson" :key="index" :options="store.chartsJson[index]" v-model="store.chartsJson[index]"/>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from './echarts';
export default {
  components: { echarts },
  inject: ['store']
}
</script>

<style lang="scss">
.mobile-preview {
  height: calc(100% - 115px) !important;
  transform: translateY(60px);
  background-color: #fff;
  margin: auto;
  overflow: hidden;
  .mobile-box {
    margin: 10px auto;
    border: 1px solid #aaa;
    border-radius: 20px;
    padding: 30px 20px 50px;
    height: 667px;
    width: 375px;
    background-color: rgb(255, 255, 255);
    .mobile {
      border: 1px solid #cccccc;
      height: 100%;
      overflow: scroll;
    }
  }
}
</style>
