/*
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2021-10-05 03:58:15
 * @LastEditors: kongwf
 * @LastEditTime: 2021-11-06 03:28:41
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //联赛球队信息列表
    leagueMatch:[],
    //球员信息列表
    playerMatch:[],
    //登录列表
    loginUser:[
      {userName:"admin",password:"123456"}
    ],
    //菜单列表
    menuList:[
      {
        label:"单场模拟",
        name:"/singleGame"
      },
      {
        label:"联赛模拟",
        name:"/leagueMatch"
      },
      {
        label:"杯赛模拟",
        name:"/cupMatch"
      },
      {
        label:"联赛管理",
        name:"/leagueManagement"
      },
      {
        label:"球队管理",
        name:"/teamManagement"
      },
      {
        label:"球员管理",
        name:"/playerManagement"
      },
      {
        label:"账号管理",
        name:"/userManagement"
      },
    ]
  },
  mutations: {
    setLeagueMatch(state,data){
        console.log("data",data);
        state.leagueMatch = [];
        for(let i = 0;i < data.length;i++){
            state.leagueMatch.push({
            name:data[i].leagueMatchName,
            teamList:[]
        });
        for(let j = 0;j < data[i].teamList.length;j++){
            state.leagueMatch[i].teamList.push({
                name:data[i].teamList[j].teamName,
                attackValue:data[i].teamList[j].attackValue,
                defenseValue:data[i].teamList[j].defenseValue,
            })
        }
        }
    }
  },
  actions: {
  },
  modules: {
  }
})
