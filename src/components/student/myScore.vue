<template>
  <div class="myScore_box">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/myTest' }">考试系统</el-breadcrumb-item>
      <el-breadcrumb-item>我的成绩</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="wrapper">
      <!-- <div class="title">
        <span>考试日期</span>
        <span>课程名称</span>
        <span>考试分数</span>
        <span>是否及格</span>
      </div>
      <div class="showScore" v-for="item in scoreList" :key="item.scoreId">
        <div>{{ item.answerTime }}</div>
        <div>
          <el-tag type="primary">{{ item.subject }}</el-tag>
        </div>
        <div>
          <el-tag type="primary">{{ item.score }}</el-tag>
        </div>
        <div>
          <el-tag type="danger" v-if="item.score < 60">不及格</el-tag>
          <el-tag type="success" v-else>及格</el-tag>
        </div>
      </div>-->
      <el-table
        :data="scoreList"
        style="width: 100%"
        :default-sort="{prop: 'answerTime', order: 'descending'}"
      >
        <el-table-column prop="answerTime" label="考试日期" sortable width="300px"></el-table-column>
        <el-table-column prop="subject" label="考试科目" width="250px">
          <template slot-scope="scope">
            <el-tag type="primary">{{  scope.row.subject }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="score" label="分数" width="250px">
          <template slot-scope="scope">
            <el-tag type="warning">{{  scope.row.score }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="score" label="是否及格">
          <template slot-scope="scope">
            <el-tag type="danger" v-if="scope.row.score < 60">不及格</el-tag>
            <el-tag type="success" v-else>及格</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      scoreList: []
    };
  },
  created() {
    this.InitPage();
  },
  methods: {
    // 初始化页面
    async InitPage() {
      this.id = window.sessionStorage.getItem("id");
      // console.log(this.id)
      const { data: res } = await this.$http.get(
        "http://localhost:3000/stuFront/getScore/" + this.id
      );
      console.log(res);
      if (res.meta.status !== 200) return this.$message.error(res.message);
      this.scoreList = res.data;
    }
  }
};
</script>

<style lang="less" scoped>
.myScore_box {
  width: 75%;
  margin: 0 auto;
  .wrapper {
    background-color: #fff;
    padding: 30px;
    padding: 30px;
    .title {
      // border: 1px solid black;
      display: flex;
      justify-content: space-around;
      align-items: center;
      border-bottom: 1px solid #eee;
      padding: 0 0 15px;
      font-weight: 600;
      color: #909399;
    }
    .showScore {
      color: #606266;
      padding: 15px 0;
      border-bottom: 1px solid #eee;
      //  border: 1px solid black;
      display: flex;
      justify-content: space-around;
      align-items: center;
      div {
        display: flex;
        justify-content: center;
      }
    }
  }
}

.el-breadcrumb {
  font-size: 15px;
}
</style>