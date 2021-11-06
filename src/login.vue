<!--
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2021-10-06 03:41:38
 * @LastEditors: kongwf
 * @LastEditTime: 2021-11-06 16:40:57
-->
<template>
  <div class="login">
    <el-form
      :model="dataForm"
      label-width="80px"
      label-position="right"
      ref="loginForm"
      :rules="rules"
    >
      <el-form-item>
        <h1>架空足球数据平台</h1>
      </el-form-item>
      <el-form-item label="账号" prop="userName">
        <el-input
          v-model="dataForm.userName"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="dataForm.password"
          placeholder="请输入密码"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="submitForm(1)">登录</el-button>
        <el-button type="" @click="submitForm(0)">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addLoginUser } from "./util";
import { selectUserByName } from "./api/login";
export default {
  data() {
    return {
      dataForm: {
        userName: "",
        password: "",
      },
      rules: {
        userName: [
          {
            required: true,
            message: "请输入账号",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(type) {
      let then = this;
      this.$refs["loginForm"].validate((valid) => {
        if (valid) {
          if (type) {
            selectUserByName({ userName: this.dataForm.userName })
              .then((res) => {
                if (res.data.code === 1) {
                  alert("账号不存在");
                  return false;
                } else if (res.data.code === 0) {
                  if (res.data.data.userPassword == this.dataForm.password) {
                    localStorage.setItem("isLogin", true);
                    localStorage.setItem("username", this.dataForm.userName);
                    then.$router.push({ path: "/" });
                    return true;
                  } else {
                    alert("密码错误");
                    return false;
                  }
                }
              })
              .catch((e) => {});
          } else {
            let data = {
              userId: "16",
              userName: this.dataForm.userName,
              userPassword: this.dataForm.password,
            };
            addLoginUser(data);
          }
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 200px;
}
</style>
