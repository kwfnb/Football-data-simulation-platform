<!--
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2021-11-03 15:20:49
 * @LastEditors: kongwf
 * @LastEditTime: 2021-11-04 15:32:19
-->
<template>
    <div class="line" id="line" style="width:200px,height:200px">

    </div>
</template>

<script>
    import * as echarts from 'echarts';
    export default {
        name: "linew",
        data() {
            return {
                title:"",
                grid:{
                        left: '3%',
                        right: '4%',
                        bottom: '12%',
                        containLabel: true
                    },
                opData: "",
                timer: {},
                myChart: null,
                initData: []
            }
        },
        watch: {
            opData: {
                handler: function (newValue, oldValue) {
                    this.$nextTick(() => {
                        this.setChartOption();
                    })
                },
                deep: true
            }
        },
        mounted() {
            console.log(111);
            this.$nextTick(() => {
                this.setChartOption();
            })
        },
        methods: {
            setChartOption() {
                // 基于准备好的dom，初始化echarts实例
                if (this.myChart == null) {
                    this.myChart = echarts.init(document.getElementById('line'));
                }

                // 绘制图表
                let series = this.opData === "" ? this.initData : this.opData.series
                console.log("series", series);
                this.myChart.setOption({
                    title: {
                        text: this.title
                    },
                    tooltip: {
                        trigger: 'axis',
                        formatter: function (params) {
                            let newParams = [];
                            let tooltipString = [];
                            newParams = [...params];
                            newParams.sort((a, b) => {
                                return b.value - a.value
                            });
                            newParams.forEach((p) => {
                                const cont = p.marker + ' ' + p.seriesName + ': ' + p.value +
                                    '<br/>';
                                tooltipString.push(cont);
                            });
                            return tooltipString.join('');
                        },
                        textStyle: {
                            align: 'left'
                        }
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    legend: {
                        data: this.opData === "" ? ['球队1', '球队2', '球队3', '球队4', '球队5', '球队6', '球队7', '球队8'] :
                            this.opData.legend,
                        bottom: 0
                    },
                    grid: this.grid,
                    xAxis: {
                        boundaryGap: false,
                        type: 'category',
                        data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: series
                });
            }
        }

    }
</script>

<style lang="less" scoped>
    .line {
        width: 400px;
        height: 400px;
    }
</style>