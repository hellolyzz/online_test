<template>
  <!-- 所有考试信息 -->
  <div class="allTestInfo_box">
    <!-- 获取所有考试信息 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">题库管理</el-breadcrumb-item>
      <el-breadcrumb-item>所有题库</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <ul class="paperInfo">
        <li class="item" v-for="item in testInfo" :key="item.testCode">
          <h4 @click="toQuesBank(item.paperId, item.courseName)">{{item.courseName }}</h4>
          <p class="name">{{item.description}}</p>
          <div class="info">
            <i class="iconfont el-icon-date"></i>
            <span>考试日期:{{item.testDate.substr(0,10)}}</span>
            <i class="iconfont el-icon-time"></i>
            <span>限时:{{ item.totalTime }}分钟</span>
            <i class="iconfont el-icon-star-off"></i>
            <span>满分:{{ item.totalScore }}分</span>
          </div>
        </li>
      </ul>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[4, 6, 8]"
        :page-size="queryInfo.pagesise"
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
      testInfo: [],
      total: 0,
      queryInfo: {
        pagesize: 4,
        pagenum: 1
      }
    };
  },
  created() {
    // TestInfo
    this.getTestInfo();
  },
  methods: {
    async getTestInfo() {
      const { data: res } = await this.$http.get(
        "http://127.0.0.1:3000/ques/TestInfo",
        {
          params: this.queryInfo
        }
      );
      console.log(res);
      this.testInfo = res.data.data;
      this.total = res.data.total;
    },
    // 每页显示数量发生变化
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getTestInfo();
    },
    // 当前页码发生变化
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getTestInfo();
    },
    // 查看试卷题库
    toQuesBank(paperId, courseName) {
      // console.log(paperId, courseName)
      this.$router.push({
        path: '/quesBank',
        query: {
          paperId: paperId,
          courseName: courseName
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
ul li {
  list-style-type: none;
}
.paperInfo {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  h4 {
    cursor: pointer;
  }
}
.paperInfo .item:hover {
  box-shadow: 0 0 4px 2px #333;
  transform: scale(1.03);
}
.paperInfo .item {
  width: 380px;
  border-radius: 40px;
  padding: 20px 30px;
  border: 1px solid #eee;
  box-shadow: 0 0 4px 2px rgba(217, 222, 234, 0.3);
  transition: all 0.6s ease;
  a {
    color: #000;
  }
  .name {
    font-size: 14px;
    color: #88949b;
  }
  .info {
    font-size: 14px;
    color: #88949b;
    span {
      margin-right: 15px;
    }
  }
}
.paperInfo * {
  margin: 20px 0;
}
</style>