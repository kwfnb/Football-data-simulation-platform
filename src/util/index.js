/*
 * @Descripttion: 通用函数
 * @Author: kongwf
 * @Date: 2021-10-06 01:08:21
 * @LastEditors: kongwf
 * @LastEditTime: 2021-11-06 16:48:36
 */
import store from "../store";
import {selectUserByName,addUser} from "../api/login"

export const VUE_BASE_URL = "http://192.168.1.101:10010";
 //概率转换函数
export function probability(key){
      if (key <= -5) {
        return 12;
      } else if (key <= -3) {
        return 16;
      } else if (key <= -1) {
        return 20;
      } else if (key === 0) {
        return 24;
      } else if (key <= 2) {
        return 28;
      } else if (key <= 4) {
        return 32;
      } else {
        return 36;
      }
    };

//球队选择列表
export function getTeamOptions(){
    let teamOptions = []
     for (let i = 0; i < store.state.leagueMatch.length; i++) {
      teamOptions.push({
        label: store.state.leagueMatch[i].name,
        value: i,
        children: [],
      });
      for (let j = 0; j < store.state.leagueMatch[i].teamList.length; j++) {
        teamOptions[i].children.push({
          label: store.state.leagueMatch[i].teamList[j].name,
          value: j,
        });
      }
    }
    return teamOptions;
    };

//联赛选择列表
export function getLeagueOptions(){
    let leagueOptions = []
    console.log("store.state.leagueMatch",store.state.leagueMatch);
     for (let i = 0; i < store.state.leagueMatch.length; i++) {
      leagueOptions.push({
        label: store.state.leagueMatch[i].name,
        value: i,
      });
    }
    return leagueOptions;
    };

//球队信息获取
export function getTeamValue(key){
  return store.state.leagueMatch[key[0]].teamList[key[1]]
}

//联赛信息获取
export function getLeagueValue(key){
  return store.state.leagueMatch[key]
}

//添加用户
export function addLoginUser(data){
    selectUserByName({userName: data.userName}).then(res=>{
        if(res.data.code===1){
            addUser(JSON.stringify(data)).then((res) => {
              alert("注册成功");
            });
        }else{
            alert("账号已存在");
        }
    })
    
}