<template>
  <div class="searchTest_box">
    <!-- 查看所有考试 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">考试管理</el-breadcrumb-item>
      <el-breadcrumb-item>考试查询</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form :inline="true" :model="searchForm">
        <!-- <el-form-item prop="institute" label="所属学院">
          <el-select v-model="searchForm.institute" placeholder="请选择">
            <el-option
              v-for="item in instOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年级">
          <el-select v-model="searchForm.grade" placeholder="请选择年级">
            <el-option
              v-for="item in gradeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="考试编号">
          <el-input v-model="searchForm.testCode" placeholder="请输入考试编号查询"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getAllInfo">获取所有试卷</el-button>
        </el-form-item>
        
      </el-form>
      <ul class="paperInfo">
        <li class="item" v-for="item in testInfo" :key="item.testCode">
          <h4>
            {{item.courseName }}
            <span class="name">考试编号：{{item.testCode}}</span>
          </h4>
          <p class="name">{{item.description}}</p>
          <div class="info">
            <span>
              <i class="iconfont el-icon-reading"></i>
              试卷编号：{{item.paperId}}
            </span>
            <span>
              <i class="iconfont el-icon-date"></i>
              考试开始日期：{{item.testDate}}
            </span>
            <span>
              <i class="iconfont el-icon-date"></i>
              考试结束日期：{{item.testDate2}}
            </span>
            <span>
              <i class="iconfont el-icon-time"></i>
              限时：{{ item.totalTime }}分钟
            </span>
            <span>
              <i class="iconfont el-icon-star-off"></i>
              满分：{{ item.totalScore }}分
            </span>
            <span>考试形式：{{item.type === 1 ? "开卷考试" : "闭卷考试"}}</span>
          </div>
        </li>
        <li v-if="showInfo === true">暂无该查询试卷信息，请核对后重试</li>
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
      role: 0,
      institute: '',
      // 学院select
      instOptions: [
        {
          label: "计算机学院",
          value: "计算机学院"
        },
        {
          label: "外国语学院",
          value: "外国语学院"
        },
        {
          label: "数学学院",
          value: "数学学院"
        }
      ],
      // 年级select
      gradeOptions: [
        {
          label: "2016",
          value: "2016"
        },
        {
          label: "2017",
          value: "2017"
        },
        {
          label: "2018",
          value: "2018"
        },
        {
          label: "2019",
          value: "2019"
        },
        {
          label: "2020",
          value: "2020"
        }
      ],
      showInfo: false,
      testInfo: [],
      total: 0,
      queryInfo: {
        pagesize: 4,
        pagenum: 1
      },
      searchForm: {}
    };
  },
  created() {
    // TestInfo
    this.getTestInfo();
  },
  methods: {
    async getTestInfo() {
       this.role = window.sessionStorage.getItem("role");
      this.institute = window.sessionStorage.getItem("institute");
      const { data: res } = await this.$http.get(
        "http://127.0.0.1:3000/ques/TestInfo/" + this.institute,
        {
          params: this.queryInfo
        }
      );
      console.log(res);
      if (res.meta.status !== 200) return this.$message.error(res.meta.message);
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
    // 根据考试编号查询考试信息
    async onSubmit() {
      console.log(this.searchForm)
      var testCode = this.searchForm.testCode;
      console.log(testCode);
      // if(testCode){
      const { data: res } = await this.$http.get(
        "http://localhost:3000/paperMng/getTestInfoById/" + testCode,
        {
          params: this.queryInfo
        }
      );
      console.log(res);
      if (res.meta.status !== 200) return this.$message.error(res.meta.message);
      this.testInfo = res.data.data;
      this.total = res.data.total;
      // }
      // this.getTestInfo();
      if (res.data.data.length === 0) {
        // console.log('empty array')
        this.showInfo = true;
      }
    },
    getAllInfo() {
      this.getTestInfo();
      this.searchForm.testCode = "";
      this.showInfo = false;
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
}
.paperInfo .item:hover {
  box-shadow: 0 0 4px 2px #333;
  transform: scale(1.03);
}
.paperInfo .item {
  width: 380px;
  border-radius: 40px;
  padding: 20px 30px;
  margin: 20px 0;
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
    display: flex;
    flex-direction: column;
    font-size: 14px;
    color: #88949b;
    span {
      margin: 2px 0;
    }
  }
}
</style>
