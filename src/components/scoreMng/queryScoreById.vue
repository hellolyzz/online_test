<template>
  <div class="queryScoreById_box">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">成绩查询</el-breadcrumb-item>
      <el-breadcrumb-item>按学生查询成绩</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 学生信息展示区域 -->
      <el-table :data="tableData" border style="width: 100%" show-index>
        <!-- <el-table-column type="index" label="#"></el-table-column> -->
        <el-table-column prop="id" label="学号" width="75"></el-table-column>
        <el-table-column prop="name" label="姓名" width="100"></el-table-column>
        <el-table-column prop="gender" label="性别" width="55">
          <template slot-scope="scope">
            <el-tag type="primary" v-if="scope.row.gender === 0">女</el-tag>
            <el-tag type="primary" v-if="scope.row.gender === 1">男</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="institute" label="学院" width="110"></el-table-column>
        <el-table-column prop="grade" label="年级" width="65"></el-table-column>
        <el-table-column prop="major" label="专业"></el-table-column>
        <el-table-column prop="class" label="班级" width="50"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="tel" label="电话" width="115"></el-table-column>
        <el-table-column prop="role" label="角色" width="70">
          <template slot-scope="scope">
            <el-tag type="primary" v-if="scope.row.role === 2">学生</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="mini" @click="queryScoreById(scope)">查看成绩</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[3, 5, 10]"
        :page-size="queryInfo.pagesise"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data(){
    return {
      tableData: [],
      queryInfo: {
        pagenum: 1,
        pagesize: 10,
      },
      total: 0

    }
  },
  created() {
    this.getStuInfo();
  },
  methods: {
    async getStuInfo() {
      const { data: res } = await this.$http.get(
        "http://127.0.0.1:3000/stuBack/stuInfo",
        {
          params: this.queryInfo
        }
      );
      // console.log(res);
      if (res.meta.status !== 200) {
        this.$message.error("获取学生信息失败");
      }
      console.log(res);
      this.tableData = res.data.data;
      this.total = res.data.total;
      this.queryInfo.pagesize = res.data.pagesize;
      this.queryInfo.pagenum = res.data.pagenum;
      // this.$message.success("获取学生信息成功");
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getStuInfo();
    },
    // 监听页码pagenum发生了变化
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getStuInfo();
    },
    // 查看成绩byid
     queryScoreById(scope){
      // console.log(scope.row.id)
      var id = scope.row.id;
      this.$router.push({
        path: '/studentScore',
        query:{
          id: id
        }
      })
      
    } 
  }
}
</script>

<style lang="less" scoped>

</style>