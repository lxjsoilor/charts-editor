<template>
    <div>
        <div ref="echart" class="chart"></div>
    </div>
</template>

<script>
import * as userAPi from '../../../api/user'
import echarts from 'echarts'
require('echarts/lib/chart/bar')

export default {
    data(){
        return {
            chart: null
        }
    },

    mounted(){
        this.chart = echarts.init(this.$refs.echart)
        this.initViewsChart()
    },

    methods: {
        //初始化用户访问量统计
        initViewsChart(){
            userAPi.getViews({
                theme_id: this.$store.state.admin.themeInfo.id
            }).then(res => {
                var xAxis = [], data = []
                res.data.map(item => {
                    xAxis.push(item.date)
                    data.push(item.count)
                })
                this.chart.setOption({
                    title: {
                        text: '用户访问量统计',
                        left: 'center'
                    },
                    tooltip: {},
                    xAxis: {
                        data: xAxis
                    },
                    yAxis: {},
                    series: [{
                        name: '访问量',
                        type: 'line',
                        smooth: true,
                        data
                    }]
                })
            })
        }
    }


}
</script>

<style lang="scss">
.chart{
    width: 80%;
    height: 400px;
    margin: 30px auto;
}
</style>