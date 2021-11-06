<!--
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2021-11-06 13:47:28
 * @LastEditors: kongwf
 * @LastEditTime: 2021-11-06 16:20:00
-->
<template>
  <dataFromDialog
    :dataList="putList"
    @getFromData="getFromData"
    ref="fromdialog"
    title="修改账户"
  ></dataFromDialog>
</template>

<script>
import { updateUser } from "../../api/login";
const dataFromDialog = () => import("../../components/dataFromDialog.vue");
export default {
  name: "userDialog",
  data() {
    return {
      dataItem: {},
      putList: [
        {
          type: "input",
          value: "",
          label: "账户名",
          name: "username",
        },
        {
          type: "input",
          value: "",
          label: "账户密码",
          name: "userpassword",
        },
      ],
    };
  },
  components: {
    dataFromDialog,
  },
  mounted() {},
  methods: {
    showDialog() {
      this.putList[0].value = this.dataItem.userName;
      this.putList[1].value = this.dataItem.userPassword;
      this.$refs.fromdialog.showDialog();
    },
    getFromData(data) {
      let from = {
        userName: data[0].value,
        userPassword: data[1].value,
      };
      updateUser(from)
        .then((res) => {
          this.$message({
            message: "修改成功",
            type: "success",
          });
          this.$emit("refresh");
        })
        .catch((e) => {
          this.$message.error("修改删除失败");
        });
    },
  },
};
</script>

<style lang="less" scoped></style>
