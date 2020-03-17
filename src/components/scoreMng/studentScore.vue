<template>
  <div class="studentScore_box">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">成绩管理</el-breadcrumb-item>
      <el-breadcrumb-item>按学生查询成绩</el-breadcrumb-item>
      <el-breadcrumb-item>当前学生学号</el-breadcrumb-item>
      <el-breadcrumb-item>{{ studentId }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 学生成绩展示区域 -->
      <el-table :data="tableData" border style="width: 100%" show-index>
        <!-- <el-table-column type="index" label="#"></el-table-column> -->
        <el-table-column prop="studentId" label="学号" ></el-table-column>
        <el-table-column prop="testCode" label="考试编号" ></el-table-column>
        <el-table-column prop="subject" label="考试科目" ></el-table-column>
        <el-table-column prop="score" label="成绩">
          <template slot-scope="scope">
            <el-tag type="primary"> {{ scope.row.score }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="answerTime" label="答题时间" ></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      studentId: 0,
      tableData: []
    };
  },
  created() {
    this.getStudentScore();
  },
  methods: {
    async getStudentScore() {
      this.studentId = this.$route.query.id;
      const { data: res } = await this.$http.get(
        "http://localhost:3000/scoreMng/getScoreById/" + this.studentId
      );
      console.log(res);
      if(res.meta.status !== 200) return this.$message.error(res.meta.message)
      this.tableData = res.data
    }
  }
};
</script>

<style lang="less" scoped>
</style>