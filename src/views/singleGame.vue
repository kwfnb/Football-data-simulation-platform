<!--
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2021-10-05 03:58:15
 * @LastEditors: kongwf
 * @LastEditTime: 2021-11-06 04:23:51
-->
<template>
  <div class="home">
    <div class="from">
      <el-form
        :model="dataForm.homeTeam"
        label-width="100px"
        label-position="right"
        :rules="rules"
        ref="numberValidateForm"
      >
        <el-form-item>
          <el-cascader
            v-model="homeTeamOptionsValue"
            :options="teamOptions"
            :props="{ expandTrigger: 'hover' }"
            @change="homeTeamChange"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="主队名" prop="name">
          <el-input
            v-model="dataForm.homeTeam.name"
            placeholder="请输入主队名"
          ></el-input>
        </el-form-item>
        <el-form-item label="进攻值" prop="attackValue">
          <el-input
            v-model="dataForm.homeTeam.attackValue"
            placeholder="请输入主队进攻值"
          ></el-input>
        </el-form-item>
        <el-form-item label="防守值" prop="defenseValue">
          <el-input
            v-model="dataForm.homeTeam.defenseValue"
            placeholder="请输入主队防守值"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-form
        :model="dataForm.visitingTeam"
        label-width="100px"
        label-position="right"
        :rules="rules"
        ref="numberValidateForm"
      >
        <el-form-item>
          <el-cascader
            v-model="visitingTeamOptionsValue"
            :options="teamOptions"
            :props="{ expandTrigger: 'hover' }"
            @change="visitingTeamChange"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="客队名" prop="name">
          <el-input
            v-model="dataForm.visitingTeam.name"
            placeholder="请输入客队名"
          ></el-input>
        </el-form-item>
        <el-form-item label="进攻值" prop="attackValue">
          <el-input
            v-model="dataForm.visitingTeam.attackValue"
            placeholder="请输入客队进攻值"
          ></el-input>
        </el-form-item>
        <el-form-item label="防守值" prop="defenseValue">
          <el-input
            v-model="dataForm.visitingTeam.defenseValue"
            placeholder="请输入客队防守值"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>

    <el-button type="success" @click="submitForm()" round>开踢</el-button>
    <el-button @click="resetForm()" type="success" round plain>重置</el-button>
    <h3>比赛结果</h3>
    <SingleField ref="SingleField" />
  </div>
</template>

<script>
// @ is an alias to /src
import SingleField from "@/components/SingleField.vue";
import { getTeamOptions, getTeamValue } from "@/util";

export default {
  name: "Home",
  data() {
    return {
      homeTeamOptionsValue: "", //主队选中项
      visitingTeamOptionsValue: "", //客队选中项
      dataForm: {
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
      teamOptions: [], //球队列表
      rules: {
        name: [{ required: true, message: "请输入队名", trigger: "blur" }],
        attackValue: [
          { required: true, message: "请输入数值 提示:0-99", trigger: "blur" },
        ],
        defenseValue: [
          { required: true, message: "请输入数值 提示:0-99", trigger: "blur" },
        ],
      },
    };
  },
  components: {
    SingleField,
  },
  mounted() {
    this.teamOptions = getTeamOptions();
    console.log("this.teamOptions", this.teamOptions);
  },
  methods: {
    //提交
    submitForm() {
      console.log(this.dataForm);
      this.$refs["numberValidateForm"].validate((valid) => {
        if (valid) {
          this.$refs.SingleField.calculation(this.dataForm);
        } else {
          return false;
        }
      });
    },
    //重置
    resetForm() {
      this.dataForm = {
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
      };
      this.homeTeamOptionsValue = "";
      this.visitingTeamOptionsValue = "";
      this.$refs.SingleField.resetResult();
    },
    homeTeamChange(value) {
      if (value) {
        this.dataForm.homeTeam = getTeamValue(value);
      }
    },
    visitingTeamChange(value) {
      if (value) {
        this.dataForm.visitingTeam = getTeamValue(value);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.from {
  display: flex;
  justify-content: center;
}
</style>
