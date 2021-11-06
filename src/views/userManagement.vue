<!--
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2021-11-06 03:29:38
 * @LastEditors: kongwf
 * @LastEditTime: 2021-11-06 16:28:25
-->
<template>
  <div class="userManager">
    <div class="userManager-top">
      <el-input placeholder="请输入查询内容"></el-input>
      <el-button type="success" round size="mini" style="margin-left:20px"
        >查询</el-button
      >
      <el-button type="success" round size="mini" @click="getAllUser"
        >重置</el-button
      >
    </div>
    <div class="userManager-table">
      <el-table :data="tableData" border width="500">
        <el-table-column type="index" label="排序" width="100">
        </el-table-column>
        <el-table-column prop="userName" label="账户名称"> </el-table-column>
        <el-table-column prop="userPassword" label="账号密码">
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              @click="handleClick(scope.row, 'update')"
              type="text"
              size="small"
              >编辑</el-button
            >
            <el-button
              v-if="scope.row.userName != 'admin'"
              @click="handleClick(scope.row, 'delete')"
              type="text"
              size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <userDialog @refresh="getAllUser" ref="userDialog"></userDialog>
  </div>
</template>

<script>
import { deleteUserByName, selectUserAll } from "../api/login";
const userDialog = () => import("./components/userDialog.vue");
export default {
  data() {
    return {
      userName: "String",
      tableData: [],
    };
  },
  mounted() {
    this.getAllUser();
  },
  components: {
    userDialog,
  },
  methods: {
    getAllUser() {
      selectUserAll().then((res) => {
        this.tableData = res.data.data;
      });
    },
    handleClick(item, type) {
      if (type == "update") {
        console.log("item", item);
        this.$refs.userDialog.dataItem = item;
        this.$refs.userDialog.showDialog();
      } else {
        this.$confirm("确认关闭？")
          .then((_) => {
            deleteUserByName(item.userName).then((res) => {
              if (res.data.code == 0) {
                this.$message({
                  message: "删除成功",
                  type: "success",
                });
                this.getAllUser();
              } else {
                this.$message.error("删除失败");
              }
            });
            done();
          })
          .catch((_) => {});
      }
    },
  },
};
</script>

<style lang="less" scoped>
.userManager {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &-top {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  &-table {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 40%;
  }
}
</style>
