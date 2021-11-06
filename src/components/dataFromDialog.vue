<!--
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2021-11-06 13:50:17
 * @LastEditors: kongwf
 * @LastEditTime: 2021-11-06 16:36:52
-->
<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :before-close="handleClose"
    ref="dialogValue"
    width="width"
    :title="title"
    :close-on-click-modal="false"
  >
    <el-form ref="form" label-width="80px">
      <el-form-item
        v-for="(item, index) in dataTable"
        :key="index"
        :label="item.label"
        :prop="item.name"
      >
        <el-input v-if="item.type === 'input'" v-model="item.value"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="onSubmit" size="mini">确定</el-button>
        <el-button type="success" @click="handleClose" size="mini" plain
          >取消</el-button
        >
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: "dataFromDialog",
  props: {
    dataList: Array,
    title: {
      type: String,
      default: "",
    },
    width: {
      type: String,
      default: "40%",
    },
  },
  data() {
    return {
      dialogVisible: false,
      dataTable: [
        /* {
          type: "input",
          value: "123",
          label: "111",
          name: "username",
        }, */
      ],
    };
  },
  watch: {
    /* dataList: {
      handler() {
        this.getDataTable();
      },
      immediate: true,
    }, */
  },
  mounted() {},
  methods: {
    showDialog() {
      this.getDataTable();
      this.dialogVisible = true;
    },
    getDataTable() {
      this.dataTable = this.dataList;
    },
    handleClose() {
      this.$confirm("确认关闭？")
        .then((_) => {
          this.closeDialog();
          done();
        })
        .catch((_) => {});
    },
    onSubmit() {
      this.$emit("getFromData", this.dataTable);
      this.closeDialog();
    },
    closeDialog() {
      this.dataTable = [];
      this.dialogVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
