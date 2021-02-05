<template>
  <div class="chart-classify-card">
    <div class="chart-list" v-for="(item, index) in classify">
      <div class="chart-tit">
        {{item.name}}
      </div>
      <div class="chart-item" v-for="(chart, chartI) in item.children" @click="handlerClick(chart)">
        <div class="chart-img">
          <img :src="require('@/assets/img/' + chart.name + '.jpg')" alt="">
        </div>
        <div class="chart-name">
          {{chart.name}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    classify: {},
  },
  inject: ['store'],
  methods: {
    handlerClick({ data }) {
      this.store.addItem({
        w: 10,
        h: 10,
        ...data
      })
    }
  }

}
</script>

<style lang="scss">
.chart-classify-card {
  .chart-list {
    .chart-tit {
      width: calc(100% - 32px);
      text-align: left;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      font-weight: 500;
      color: #23b7e5;
      margin: 0 16px 10px;
      border-bottom: 1px solid #eee;
    }
    .chart-item {
      display: inline-block;
      width: 79px;
      white-space: nowrap;
      overflow: hidden;
      cursor: pointer;
      .chart-img {
        height: 44px;
        width: 55px;
        margin: 8px 12px 0;
        border-radius: 2px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .chart-name {
        line-height: 16px;
        font-size: 12px;
        margin-bottom: 4px;
        color: #333;
        text-align: center;
      }
    }
  }
}
</style>
