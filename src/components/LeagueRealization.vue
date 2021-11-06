<!--
 * @Descripttion: 联赛赛程模拟组件
 * @Author: kongwf
 * @Date: 2021-10-06 06:09:05
 * @LastEditors: kongwf
 * @LastEditTime: 2021-11-04 16:15:59
-->
<template>
  <div class="LeagueRealization">
    <h1>联赛赛程</h1>
    <ul class="ulStyle">
      <li v-for="item in roundsList" :key="item" class="liStyle">
        <h3>第{{ item + 1 }}轮</h3>
        <SingleField ref="SingleField" @getResult="getResult" />
      </li>
    </ul>
  </div>
</template>

<script>
import SingleField from "@/components/SingleField.vue";
export default {
  name: "LeagueRealization",
  data() {
    return {
      leagueTable: [],
      teamList: [],
      roundsList: [],
      resultLeagueTable:[],
      resultList: [
        {
          list: [
            {
              homeTeamName: "主队",
              visitingTeamName: "客队",
              homeTeamGoals: "N",
              visitingTeamGoals: "N",
            },
          ],
        },
      ],
      saiGuo: "",
      homeGaol: "",
      visitingGaol: "",
      Rounds: 14,
    };
  },
  components: {
    SingleField,
  },
  created() {
    for (let i = 0; i < this.Rounds; i++) {
      this.roundsList.push(i);
    }
  },
  methods: {
    leagueStart() {
        this.resultLeagueTable=[];
      this.roundsList = [];
      this.Rounds = (this.teamList.length - 1) * 2;
      for (let i = 0; i < this.Rounds; i++) {
        this.roundsList.push(i);
      }
      console.log("leagueTable", this.leagueTable);
      let copyList = JSON.parse(JSON.stringify(this.teamList));
      for (let j = 0; j < this.Rounds; j++)
        this.$refs.SingleField[j].resetResult();
      const teamLength = this.teamList.length;
      for (let j = 0; j < this.Rounds; j++) {
        if (j == 0) {
        } else if (j < this.Rounds / 2) {
          let temp1 = this.teamList[teamLength - 1];
          this.teamList.pop();
          this.teamList.splice(1, 0, temp1);
        } else if (j == this.Rounds / 2) {
          let temp2 = this.teamList[teamLength - 1];
          this.teamList.pop();
          this.teamList.splice(1, 0, temp2);
          this.teamList.reverse();
        } else {
          let temp3 = this.teamList[0];
          this.teamList.splice(0, 1);
          this.teamList.splice(teamLength - 2, 0, temp3);
        }
        this.singleWheel(this.teamList, j);
      }
      this.teamList = JSON.parse(JSON.stringify(copyList));
      this.$emit("getLeagueTable",this.leagueTable,this.resultLeagueTable)
    },
    //单轮模拟
    singleWheel(list, index) {
      const count = list.length / 2;
      for (let i = 0; i < count; i++) {
        let tempList = {
          homeTeam: {
            name: list[i].name,
            attackValue: list[i].attackValue,
            defenseValue: list[i].defenseValue,
          },
          visitingTeam: {
            name: list[list.length - i - 1].name,
            attackValue: list[list.length - i - 1].attackValue,
            defenseValue: list[list.length - i - 1].defenseValue,
          },
        };
        this.$refs.SingleField[index].calculation(tempList);
        this.setIntegral(
          this.saiGuo,
          tempList.homeTeam.name,
          tempList.visitingTeam.name,
          this.homeGaol,
          this.visitingGaol
        );
      }
      this.resultLeagueTable.push(
        JSON.parse(JSON.stringify(this.leagueTable))
      )
    },
    getResult(e, h, v) {
      this.saiGuo = e;
      this.homeGaol = h;
      this.visitingGaol = v;
    },
    setIntegral(e, homeName, visitingName, h, v) {
      this.leagueTable.forEach((value, index) => {
        if (value.teamName == homeName) {
          value.goalConcede = value.goalConcede.split("/");
          value.goalConcede[0] = JSON.parse(value.goalConcede[0]) + h;
          value.goalConcede[1] = JSON.parse(value.goalConcede[1]) + v;
          value.goalConcede = value.goalConcede.join("/");
          value.count++;
          switch (e) {
            case 0:
              value.win++;
              value.integral += 3;
              break;
            case 1:
              value.loss++;
              break;
            case 2:
              value.draw++;
              value.integral += 1;
              break;
          }
        }
        if (value.teamName == visitingName) {
          value.goalConcede = value.goalConcede.split("/");
          value.goalConcede[0] = JSON.parse(value.goalConcede[0]) + v;
          value.goalConcede[1] = JSON.parse(value.goalConcede[1]) + h;
          value.goalConcede = value.goalConcede.join("/");
          value.count++;
          switch (e) {
            case 0:
              value.loss++;
              break;
            case 1:
              value.win++;
              value.integral += 3;
              break;
            case 2:
              value.draw++;
              value.integral += 1;
              break;
          }
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.ulStyle {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  .liStyle {
    margin: 0px 40px;
}
}
</style>
