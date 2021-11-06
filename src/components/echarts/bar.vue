<!--
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2021-11-04 14:49:45
 * @LastEditors: kongwf
 * @LastEditTime: 2021-11-04 16:17:20
-->
<template>
  <div class="bar" id="bar"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      title: "",
      grid: {
        left: "3%",
        right: "4%",
        bottom: "12%",
        containLabel: true,
      },
      opData: "",
      timer: {},
      myChart: null,
      initData: [],
    };
  },
  watch: {
    opData: {
      handler: function(newValue, oldValue) {
        this.$nextTick(() => {
          this.setChartOption();
        });
      },
      deep: true,
    },
  },
  mounted() {
    console.log(111);
    this.$nextTick(() => {
      this.setChartOption();
    });
  },
  methods: {
    setChartOption() {
      // 基于准备好的dom，初始化echarts实例
      if (this.myChart == null) {
        this.myChart = echarts.init(document.getElementById("bar"));
      }

      // 绘制图表
      let series = this.opData === "" ? this.initData : this.opData.series;
      let xAxis =
        this.opData === ""
          ? [
              "球队1",
              "球队2",
              "球队3",
              "球队4",
              "球队5",
              "球队6",
              "球队7",
              "球队8",
            ]
          : this.opData.xAxis;
      let legend =
        this.opData === ""
          ? [
              "球队1",
              "球队2",
              "球队3",
              "球队4",
              "球队5",
              "球队6",
              "球队7",
              "球队8",
            ]
          : this.opData.legend;
      console.log("series", series);
      this.myChart.setOption({
        title: {
          text: this.title,
        },
        tooltip: {},
        legend: {
          data: legend,
          bottom: 0,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        grid: this.grid,
        xAxis: {
          data: xAxis,
        },
        yAxis: {},
        series: series,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.bar {
  width: 400px;
  height: 400px;
}
</style>
