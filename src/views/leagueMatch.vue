<!--
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2021-10-05 03:58:15
 * @LastEditors: kongwf
 * @LastEditTime: 2021-11-06 04:49:59
-->
<template>
  <div class="style_home">
    <div class="leagueMatch">
      <div class="centerMatch">
        <div class="leftMatch">
          <el-form
            ><span style="margin-bottom:10px;margin-right:10px"
              >联赛列表选择:</span
            >
            <el-select
              v-model="leagueOptionsValue"
              placeholder="请选择"
              @change="leagueChange"
            >
              <el-option
                v-for="item in leagueOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form>
          <div class="btnStyle">
            <el-button type="success" @click="onSubmit" size="mini" round
              >进行</el-button
            >
            <el-button type="success" @click="putExcel" size="mini" round
              >导出</el-button
            >
          </div>
        </div>
        <el-table
          :data="tableData"
          height="350"
          :default-sort="{ prop: 'integral', order: 'descending' }"
        >
          <el-table-column fixed type="index" :index="indexMethod" label="名次">
          </el-table-column>
          <el-table-column fixed prop="teamName" label="球队名称" width="80">
          </el-table-column>
          <el-table-column prop="count" label="比赛场次" width="80">
          </el-table-column>
          <el-table-column prop="win" label="胜局" width="80">
          </el-table-column>
          <el-table-column prop="draw" label="平局" width="80">
          </el-table-column>
          <el-table-column prop="loss" label="负局" width="80">
          </el-table-column>
          <el-table-column prop="goalConcede" label="进球/失球" width="80">
          </el-table-column>
          <el-table-column prop="integral" label="积分" width="80" sortable>
          </el-table-column>
        </el-table>
      </div>
      <div class="rightMatch">
        <el-switch
          style="margin-bottom:30px"
          v-model="switchValue"
          @change="switchChange"
          active-text="积分趋势图"
          inactive-text="进球/失球分布图"
          active-color="#13ce66"
          inactive-color="#66dd44"
        >
        </el-switch>
        <linew ref="linew" v-show="switchValue"></linew>
        <bar ref="bar" v-show="!switchValue"></bar>
      </div>
    </div>
    <LeagueRealization
      ref="LeagueRealization"
      @getLeagueTable="getLeagueTable"
    ></LeagueRealization>
  </div>
</template>

<script>
import excelUtil from "@/util/dealwithExcelUtil.js";
import { getLeagueValue, getLeagueOptions } from "@/util";
import LeagueRealization from "../components/LeagueRealization.vue";
const linew = () => import("../components/echarts/line.vue");
const bar = () => import("../components/echarts/bar.vue");
export default {
  data() {
    return {
      switchValue: true,
      tableData: [],
      leagueOptions: [],
      leagueOptionsValue: "",
      teamList: [],
      lineTable: {
        legend: [],
        series: [],
      },
      barTable: {
        legend: [],
        series: [],
      },
    };
  },
  components: {
    LeagueRealization,
    linew,
    bar,
  },
  created() {
    console.log(getLeagueOptions());
    this.$set(this, "leagueOptions", getLeagueOptions());
    /*             this.leagueOptions = getLeagueOptions(); */
  },
  methods: {
    indexMethod(index) {
      return index + 1;
    },
    homeTeamChange(value) {
      if (value) {
        this.dataForm.homeTeam = getTeamValue(value);
      }
    },
    leagueChange() {
      this.tableData = [];
      this.teamList = getLeagueValue(this.leagueOptionsValue).teamList;
      for (let i = 0; i < this.teamList.length; i++) {
        this.tableData.push({
          teamName: this.teamList[i].name,
          count: 0,
          win: 0,
          draw: 0,
          loss: 0,
          goalConcede: "0/0",
          integral: 0,
        });
      }
    },
    onSubmit() {
      this.leagueChange();
      console.log("this.tableData", this.tableData);
      console.log("this.teamList", this.teamList);
      if (this.tableData.length < 1) {
        return;
      }
      this.$refs.LeagueRealization.teamList = JSON.parse(
        JSON.stringify(this.teamList)
      );
      this.$refs.LeagueRealization.leagueTable = JSON.parse(
        JSON.stringify(this.tableData)
      );
      this.$refs.LeagueRealization.leagueStart();
    },
    getLeagueTable(dataTable, lineTable) {
      this.tableData = dataTable;
      console.log("lineTable", lineTable);
      //折线图绘制
      this.lineTable = {
        legend: [],
        series: [],
      };
      for (let i = 0; i < this.tableData.length; i++) {
        this.lineTable.legend.push(lineTable[0][i].teamName);
        this.lineTable.series.push({
          name: lineTable[0][i].teamName,
          type: "line",
          data: [],
        });
        for (let j = 0; j < lineTable.length; j++) {
          console.log();
          this.lineTable.series[i].data.push(lineTable[j][i].integral);
        }
      }
      console.log("this.lineTable", this.lineTable);
      this.$refs.linew.opData = this.lineTable;
      this.$refs.linew.title = "积分趋势图";
      this.$refs.linew.grid = {
        left: "3%",
        right: "4%",
        bottom: "12%",
        containLabel: true,
      };
      //柱状图绘制
      console.log(this.tableData);
      this.barTable = {
        legend: ["进球数", "失球数"],
        series: [
          {
            type: "bar",
            name: "进球数",
            data: [],
            color: "#ff5555",
          },
          {
            type: "bar",
            name: "失球数",
            data: [],
          },
        ],
        xAxis: [],
      };
      let list = {
        goalList: [],
        concedeList: [],
        name: [],
      };
      for (let i = 0; i < this.tableData.length; i++) {
        this.barTable.series[0].data.push(
          this.tableData[i].goalConcede.split("/")[0]
        );
        this.barTable.series[1].data.push(
          this.tableData[i].goalConcede.split("/")[1]
        );
        this.barTable.legend.push(this.tableData[i].teamName);
        this.barTable.xAxis.push(this.tableData[i].teamName);
      }
      console.log("this.barTable", this.barTable);
      this.$refs.bar.opData = this.barTable;
      this.$refs.bar.title = "进球/失球分布图";
      this.$refs.bar.grid = {
        left: "3%",
        right: "4%",
        bottom: "12%",
        containLabel: true,
      };
    },
    putExcel() {
      console.log(this.tableData);
      const header = [
        {
          key: "teamName",
          title: "球队名称",
        },
        {
          key: "count",
          title: "比赛场次",
        },
        {
          key: "win",
          title: "胜局",
        },
        {
          key: "draw",
          title: "平局",
        },
        {
          key: "loss",
          title: "负局",
        },
        {
          key: "goalConcede",
          title: "进球/失球",
        },
        {
          key: "integral",
          title: "积分",
        },
      ];
      let putList = [];
      this.tableData.map((value, index) => {
        putList.push(value);
      });
      //导出
      excelUtil.exportExcel(header, putList, "联赛积分榜.xlsx");
    },
    switchChange() {
      console.log("switchValue", this.switchValue);
    },
  },
};
</script>

<style lang="less" scoped>
.leagueMatch {
  display: flex;
  justify-content: center;

  .leftMatch {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .centerMatch {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    padding: 0px 40px;
  }

  .rightMatch {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}

.btnStyle {
  padding: 10px;
}
</style>
<style lang="less">
.leagueMatch {
}
</style>
