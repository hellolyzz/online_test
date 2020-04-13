<template>
  <div class="queryScore_box">
    <!-- 根据学科即考试科目查询成绩 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>成绩管理</el-breadcrumb-item>
      <el-breadcrumb-item>成绩查询</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div class="showword">
        点击查看可以查看该学科所有同学的成绩
      </div>
      <el-table :data="tableData" style="width: 45%" stripe border>
        <el-table-column label="考试编号" width="180" prop="testCode"></el-table-column>
        <el-table-column label="考试名称" width="180" prop="courseName"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleShow(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
       <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 8, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      role: 0,
      institute: '',
      total: 0,
      tableData: [],
      testCode: 0,
      queryInfo: {
        pagenum: 1,
        pagesize: 10,
      }
    };
  },
  created() {
    this.getSubject();
  },
  methods: {
    // 获取存在的学科
    async getSubject() {
      this.role = window.sessionStorage.getItem('role')
      this.institute = window.sessionStorage.getItem('institute')
      console.log(this.queryInfo)
      const { data: res } = await this.$http.get(
        "http://localhost:3000/scoreMng/" + this.institute, 
        {
          params: this.queryInfo
        }
      );
      console.log(res);
      if (res.meta.status !== 200) return this.$message.error(res.meta.message);
      this.tableData = res.data.data;
      this.total = res.data.total;
      this.queryInfo.pagesize = res.data.pagesize;
      this.queryInfo.pagenum = res.data.pagenum;
    },
    // 查看该学科的所有同学的成绩
    handleShow(val){
      // console.log(val)
      this.testCode = val.testCode
      // const { data: res } = await this.$http.get('http://localhost:3000/scoreMng/getAllScore/' + this.testCode)
      // console.log(res)
      this.$router.push({
        path: '/subjectScore',
        query: {
          testCode: this.testCode
        }
      })
    },
   // 每页展示的条数发生变化
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getSubject();
    },
    // 监听页码pagenum发生了变化
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getSubject();
    },
  }
};
</script>

<style lang="less" scoped>
.showword{
  font-size: 15px;
  color: #333;
  margin: 0 0 10px;
}
</style>