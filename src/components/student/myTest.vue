// 我的试卷页面
<template>
  <div id="myExam">
    <!-- <div class="title">我的试卷</div> -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/myTest' }">考试系统</el-breadcrumb-item>
      <el-breadcrumb-item>我的试卷</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="wrapper">
      <ul class="top">
        <li class="order">试卷列表</li>
        <li class="search-li">
          <div class="icon">
            <input type="text" placeholder="请输入试卷名称" class="search" v-model="key" />
            <i class="el-icon-search"></i>
          </div>
        </li>
        <li>
          <el-button type="primary" @click="search">搜索试卷</el-button>
        </li>
      </ul>
      <ul class="paper">
        <li class="item" v-for="(item,index) in testInfo" :key="index">
          <h4 >{{item.courseName}}</h4>
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
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[4, 8, 12]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // name: 'myExam'
  data() {
    return {
      testInfo: [],
      // loading: false,
      key: null, //搜索关键字
      // allExam: null, //所有考试信息
      // pagination: {
      //   //分页后的考试信息
      //   current: 1, //当前页
      //   total: null, //记录条数
      //   size: 6 //每页条数
      // }
      total: 0,
      queryInfo: {
        pagesize: 4,
        pagenum: 1
      },
      params: {}
    };
  },
  created() {
    this.getTestInfo();
    // this.loading = true
  },
  methods: {
    //获取当前所有考试信息
    async getTestInfo() {
      this.params.institute = window.sessionStorage.getItem("institute");
      this.params.major = window.sessionStorage.getItem("major");
      this.params.grade = window.sessionStorage.getItem("grade");
      // console.log(this.params)
      //  根据 institute/major/grade 获取对应试卷
      const { data: res } = await this.$http.post(
        "http://localhost:3000/stuFront/getTestInfo",
        {
          params: {
            queryInfo: this.queryInfo,
            params: this.params
          }
        }
      );
      // console.log(res)
      if(res.meta.status == 200) return this.$message.error(res.meta.message)
      this.testInfo = res.data.data
      this.total = res.data.total
    },
    handleSizeChange(newSize){
      this.queryInfo.pagesize = newSize;
      this.getTestInfo()
    },
    handleCurrentChange(newPage){
      this.queryInfo.pagenum = newPage;
      this.getTestInfo()
    },
    // 查找试卷
    search(){
      console.log('45')
    }
    
  }
};
</script>

<style lang="less" scoped>
ul li {
  list-style-type: none;
}
.el-breadcrumb {
  font-size: 15px;
}
.pagination {
  padding: 20px 0px 30px 0px;
  .el-pagination {
    display: flex;
    justify-content: center;
  }
}
.paper {
  h4 {
    cursor: pointer;
  }
}
.paper .item a {
  color: #000;
}
.wrapper .top .order {
  cursor: pointer;
}
.wrapper .top .order:hover {
  color: #0195ff;
  border-bottom: 2px solid #0195ff;
}
.wrapper .top .order:visited {
  color: #0195ff;
  border-bottom: 2px solid #0195ff;
}
.item .info i {
  margin-right: 5px;
  color: #0195ff;
}
.item .info span {
  margin-right: 14px;
}
.paper .item {
  width: 380px;
  border-radius: 4px;
  padding: 20px 30px;
  border: 1px solid #eee;
  box-shadow: 0 0 4px 2px rgba(217, 222, 234, 0.3);
  transition: all 0.6s ease;
}
.paper .item:hover {
  box-shadow: 0 0 4px 2px rgba(140, 193, 248, 0.45);
  transform: scale(1.03);
}
.paper .item .info {
  font-size: 14px;
  color: #88949b;
}
.paper .item .name {
  font-size: 14px;
  color: #88949b;
}
.paper * {
  margin: 20px 0;
}
.wrapper .paper {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.top .el-icon-search {
  position: absolute;
  right: 10px;
  top: 10px;
}
.top .icon {
  position: relative;
}
.wrapper .top {
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
}
#myExam .search-li {
  margin-left: auto;
}
.top .search-li {
  margin-left: auto;
}
.top li {
  display: flex;
  align-items: center;
}
.top .search {
  margin-left: auto;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #eee;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
}
.top .search:hover {
  color: #0195ff;
  border-color: #0195ff;
}
.wrapper .top {
  display: flex;
}
.wrapper .top li {
  margin: 20px;
}
#myExam {
  width: 980px;
  margin: 0 auto;
}
#myExam .title {
  margin: 20px;
}
#myExam .wrapper {
  background-color: #fff;
}
</style>
