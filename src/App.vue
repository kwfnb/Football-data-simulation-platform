<!--
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2021-10-05 03:58:15
 * @LastEditors: kongwf
 * @LastEditTime: 2021-11-06 16:06:30
-->
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import store from "./store";
import { get } from "./util/axios.js";
import { selectTeamLeague } from "./api/league";
export default {
  created() {
    selectTeamLeague().then((response) => {
      store.commit("setLeagueMatch", response.data.data);
    });
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
