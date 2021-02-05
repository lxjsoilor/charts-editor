import Vue from 'vue'
import chartsJson from '../components/test'
import { cloneDeep } from 'lodash';
import { getColums } from '../components/data-origin-test'
import { getUuid } from '../utils'
const { rows, columns, fieldSettings } = getColums()
const Events = new Event('resize');
import echarts from '../components/echarts.vue'
Vue.component('echarts', echarts)
window.chartsJson = chartsJson
const store = new Vue({
  data: {
    // 图表配置
    chartsJson,
    previousChartsJson: {},
    // 当前选中的图表
    selectCharts: {},
    // 面板展示状态
    showPanel: false,
    chartData: {
      columns,
      rows
    },
    // 全屏预览
    showChartPreview: false,
    showChartPreviewSingle: false,
    // 操作历史
    operatingHistory: {
      history: [],
      currentLength: -1
    },
    asideActiveTab: 'tabData',
    fieldSettings: fieldSettings
  },
  computed: {
    canBack() {
      return this.operatingHistory.currentLength !== 1
    },
    canForward() {
      return this.operatingHistory.currentLength !== this.operatingHistory.history.length
    },
    canCopy() {
      return !!this.selectCharts.i
    },
    canSave() {
      return false
    }
  },
  methods: {
    initState() {
      this.previousChartsJson = cloneDeep(this.chartsJson);
      this.operatingHistory.history.push(
        cloneDeep(this.previousChartsJson)
      );
      this.operatingHistory.currentLength = 1;
    },
    initKeyEvents() {
      const handler = (e) => {
        if ((navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
          console.log(e.keyCode)
          switch (e.keyCode) {
            case 83:
              // 保存
              break;
            case 67:
              // 复制

              break;
            case 67:
              // 复制

              break;
            default:
              break;
          }
          e.preventDefault();
        }
      }
      document.addEventListener('keydown', handler);
      this.$on('hook:beforeDestroy', () => {
        console.log('hook:beforeDestroy')
        document.removeEventListener('keydown', handler);
      })
    },
    setState(key, value) {
      this[key] = value;
    },
    getState(key) {
      return this[key];
    },
    delSelectCharts(i) {
      this.chartsJson.splice(i, 1);
    },
    setSelectCharts(item) {
      if (this.selectCharts.i === item.i) {
        // this.showPanel = false;
        // this.selectCharts = {}
        this.selectCharts = item
      } else {
        this.selectCharts = item
      }
    },
    resizeEvent() {
      window.dispatchEvent(Events);
    },
    addItem(item) {
      item = item || cloneDeep(this.selectCharts);
      if (!item) return;
      this.chartsJson.push({
        ...cloneDeep(item),
        x: 0,
        y: 0,
        i: getUuid(),
      })
      setTimeout(() => this.resizeEvent())
    },
    // 操作历史相关方法
    // 增加操作历史
    addHistroy(json) {
      if (this.operatingHistory.currentLength !== this.operatingHistory.history.length) {
        this.operatingHistory.history.splice(this.operatingHistory.currentLength, 1)
      }
      this.operatingHistory.history.push(
        cloneDeep(this.chartsJson)
      );
      this.previousChartsJson = cloneDeep(this.chartsJson);
      this.operatingHistory.currentLength = this.operatingHistory.history.length;
      window.test = this.operatingHistory;

    },
    // 后退
    retreatHistory() {
      if (this.operatingHistory.currentLength === 1) return;
      this.operatingHistory.currentLength--;
      this.chartsJson = cloneDeep(
        this.operatingHistory.history[
        this.operatingHistory.currentLength - 1
        ]
      );
    },
    // 前进
    repeatHistory() {
      if (this.operatingHistory.currentLength === this.operatingHistory.history.length) return;
      this.operatingHistory.currentLength++;
      this.chartsJson = cloneDeep(
        this.operatingHistory.history[
        this.operatingHistory.currentLength - 1
        ]
      )
    }
  },
  created() {
    this.initState();
    this.initKeyEvents();
  }
})
export default store
