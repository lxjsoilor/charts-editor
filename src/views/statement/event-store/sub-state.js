import Vue from 'vue'
import { getColums } from '../components/data-origin-test'
const store = (selectCharts) => {
  return new Vue({
    data: {
      selectCharts,
      asideActiveTab: 'tabData',
      fieldSettings: {
        date: [],
        number: [],
        series: []
      }
    },
    computed: {
    },
    methods: {
      initState() {
        const { fieldSettings } = getColums();
        this.fieldSettings = fieldSettings;
      },
    },
    created() {
      this.initState();
    }
  })
}

export default store
