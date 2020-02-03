<template>
  <div class="stuMng_box">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">人员管理</el-breadcrumb-item>
      <el-breadcrumb-item>学生管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-table :data="tableData" border style="width: 100%" show-index>
        <!-- <el-table-column type="index" label="#"></el-table-column> -->
        <el-table-column prop="id" label="学号"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="gender" label="性别">
           <template slot-scope="scope">
            <el-tag type="primary" v-if="scope.row.gender === 0">女</el-tag>
            <el-tag type="primary" v-if="scope.row.gender === 1">男</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="institute" label="学院"></el-table-column>
        <el-table-column prop="grade" label="年级"></el-table-column>
        <el-table-column prop="major" label="专业"></el-table-column>
        <el-table-column prop="class" label="班级"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="tel" label="电话"></el-table-column>
        <el-table-column prop="role" label="角色">
          <template slot-scope="scope">
            <el-tag type="primary" v-if="scope.row.role === 2">学生</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="mini">编辑</el-button>
            <el-button size="mini" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>


<script>
export default {
  data() {
    return {
      tableData: {
        id: "",
        name: "",
        gender: "",
        institute: "",
        grade: "",
        major: "",
        class: "",
        email: "",
        tel: ""
      }
    };
  },
  created() {
    this.getStuInfo();
  },
  methods: {
    async getStuInfo() {
      const { data: res } = await this.$http.get(
        "http://127.0.0.1:3000/ppmng/stuInfo"
      );
      console.log(res);
      if (res.data.meta !== 200) {
        this.$message.error("获取学生信息失败");
      }
      this.tableData = res.data;
      this.$message.success("获取学生信息成功");
    }
  }
};
</script>

<style lang="less" scoped>
</style>