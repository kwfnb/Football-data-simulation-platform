<!--
 * @Descripttion: 当场模拟组件
 * @Author: kongwf
 * @Date: 2021-10-05 03:58:15
 * @LastEditors: kongwf
 * @LastEditTime: 2021-11-06 04:22:24
-->
<template>
  <div class="singleFieid">
    <ul class="ulStyle">
      <li v-for="(item, index) in resultList" :key="index" class="liStyle">
        <span style="color:#55cc55">{{ item.homeTeamName }}</span>
        {{ item.homeTeamGoals }}:{{ item.visitingTeamGoals }}
        <span style="color:#55cc55">{{ item.visitingTeamName }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { probability } from "../util";
export default {
  name: "SingleField",
  data() {
    return {
      dataList: {
        homeTeam: {
          name: "",
          attackValue: "",
          defenseValue: "",
        },
        visitingTeam: {
          name: "",
          attackValue: "",
          defenseValue: "",
        },
      },
      result: {
        homeTeamName: "",
        visitingTeamName: "",
        homeTeamGoals: 0,
        visitingTeamGoals: 0,
      },
      resultList: [
        {
          homeTeamName: "主队",
          visitingTeamName: "客队",
          homeTeamGoals: "N",
          visitingTeamGoals: "N",
        },
      ],
    };
  },
  mounted() {},
  methods: {
    //算法
    calculation(dataList) {
      const NUMTIME = 7;
      let attV =
        dataList.homeTeam.attackValue - dataList.visitingTeam.defenseValue;
      let defV =
        dataList.visitingTeam.attackValue - dataList.homeTeam.defenseValue;
      this.resetForm();
      this.result.homeTeamName = dataList.homeTeam.name;
      this.result.visitingTeamName = dataList.visitingTeam.name;
      for (let i = 0; i < NUMTIME; i++) {
        this.statistics(attV, defV);
      }
      //判定胜负0为主胜，1为客胜，2为平局
      if (this.result.homeTeamGoals > this.result.visitingTeamGoals) {
        this.$emit(
          "getResult",
          0,
          this.result.homeTeamGoals,
          this.result.visitingTeamGoals
        );
      } else if (this.result.homeTeamGoals < this.result.visitingTeamGoals) {
        this.$emit(
          "getResult",
          1,
          this.result.homeTeamGoals,
          this.result.visitingTeamGoals
        );
      } else {
        this.$emit(
          "getResult",
          2,
          this.result.homeTeamGoals,
          this.result.visitingTeamGoals
        );
      }
      this.resultList.push(this.result);
    },
    //统计
    statistics(attV, defV) {
      let [att, def] = [
        Math.round(Math.random() * 99),
        Math.round(Math.random() * 99),
      ];
      if (att < probability(attV)) {
        this.result.homeTeamGoals++;
      }
      if (def < probability(defV)) {
        this.result.visitingTeamGoals++;
      }
    },
    resetForm() {
      this.result = {
        homeTeamName: "",
        visitingTeamName: "",
        homeTeamGoals: 0,
        visitingTeamGoals: 0,
      };
    },
    resetResult() {
      this.resultList = [];
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.singleFieid {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 24px;
  margin-top: 15px;
  .ulStyle {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    .liStyle {
      list-style-type: none;
      span {
        font-weight: bold;
      }
    }
  }
}
</style>
