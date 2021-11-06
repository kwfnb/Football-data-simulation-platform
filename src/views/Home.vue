<!--
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2021-10-05 07:06:41
 * @LastEditors: kongwf
 * @LastEditTime: 2021-11-06 16:33:20
-->
<!--
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2021-10-05 07:06:41
 * @LastEditors: kongwf
 * @LastEditTime: 2021-11-04 17:38:31
-->
<template>
  <div id="app">
    <div class="header">
      <span class="headerTilite">足球数据模拟平台</span>
      <div class="headerRight">
        <span>{{ username }}</span
        ><el-link type="success" @click="outLogin()">登出</el-link>
      </div>
    </div>
    <div id="nav">
      <el-tabs v-model="activeName" @tab-click="tabHandleClick">
        <el-tab-pane
          v-for="(item, index) in menuList"
          :key="index"
          :label="item.label"
          :name="item.name"
        ></el-tab-pane>
      </el-tabs>
    </div>
    <router-view />
  </div>
</template>

<script>
import store from "../store";
export default {
  data() {
    return {
      menuList: [],
      activeName: "",
      username: "",
    };
  },
  mounted() {
    this.menuList = store.state.menuList;
    this.username = localStorage.getItem("username");
    let active = localStorage.getItem("routerAction");
    if (active) {
      this.activeName = active;
    } else {
      this.activeName = "/singleGame";
      localStorage.setItem("routerAction", this.activeName);
    }
  },
  methods: {
    tabHandleClick(tab, event) {
      if (localStorage.getItem("routerAction") != tab.name) {
        this.$router.push({ path: tab.name });
        localStorage.setItem("routerAction", tab.name);
      }
    },
    outLogin() {
      localStorage.clear();
      this.$router.push({
        path: "/login",
      });
    },
  },
};
</script>

<style lang="less" scoped>
#nav {
  display: flex;
  justify-content: center;
}
.header {
  width: 100%;
  height: 60px;
  margin-bottom: 15px;
  &Tilite {
    font-size: 36px;
    margin-left: 120px;
  }
  &Right {
    float: right;
    margin-right: 50px;
    margin-top: 10px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    span {
      margin-right: 10px;
    }
  }
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
