<template>
  <div class="editor-container">
    <hc-header />
    <hc-aside />
    <hc-main />
    <chart-preview v-if="store.showChartPreview" />
    <chart-preview-single v-if="store.selectCharts.i && store.showChartPreviewSingle"/>
  </div>
</template>

<script>
import hcHeader from './components/header'
import hcMain from './components/main'
import hcAside from './components/aside'
import chartPreview from './components/chart-preview'
import chartPreviewSingle from './components/chart-preview-single'
import store from './event-store/state.js'
export default {
  name: 'Statement',
  components: {
    hcHeader,
    hcMain,
    hcAside,
    chartPreview,
    chartPreviewSingle
  },
  provide() {
    return { store }
  },
  data() {
    return {
      store
    }
  },
  computed: {

  },
  watch: {

  },
  methods: {

  }
}
</script>

<style lang="scss">
.editor-container {
  position: relative;
  height: 100%;
  overflow: hidden;
  .container {
    height: 100%;
  }
}
</style>
