<template>
  <!-- 我的试卷页面 -->
  <div class="myTest_box">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/myTest' }">考试系统</el-breadcrumb-item>
      <el-breadcrumb-item>试卷列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="wrapper">
      <!-- 搜索区域 -->
      <!-- <div class="search"> -->
        <!-- <div class="search_box">
          <div class="icon">
            <el-input type="text" placeholder="请输入试卷名称" v-model="key" />
          </div>
          <div>
            <el-button type="primary" icon="el-icon-search" @click="search">搜索试卷</el-button>
          </div>
        </div>-->
      <!-- </div> -->
      <!-- 试卷 -->
      <ul class="paper">
        <!-- <li class="item" v-for="(item,index) in testInfo" :key="index">
          <h4 @click="topaperInfo(item.testCode)">{{item.courseName}}</h4>
          <p class="name">{{item.description}}</p>
          <div class="info">
            <i class="iconfont el-icon-date"></i>
            <span>考试日期:{{item.testDate.substr(0,10)}}</span>
            <i class="iconfont el-icon-time"></i>
            <span>限时:{{ item.totalTime }}分钟</span>
            <i class="iconfont el-icon-star-off"></i>
            <span>满分:{{ item.totalScore }}分</span>
          </div>
        </li>-->
        <li class="paperItem" v-for="(item,index) in testInfo" :key="index">
          <div class="info">
            <h3 @click="topaperInfo(item.testCode)">
              {{item.courseName}}
              <span>{{item.description}}</span>
            </h3>
            <div class="small_tips">
              <i class="iconfont el-icon-date"></i>
              <span>考试日期:{{item.testDate.substr(0,10)}}</span>
              <i class="iconfont el-icon-time"></i>
              <span>限时:{{ item.totalTime }}分钟</span>
              <i class="iconfont el-icon-star-off"></i>
              <span>满分:{{ item.totalScore }}分</span>
            </div>
          </div>
          <div class="icon">
            <i class="el-icon-arrow-right"></i>
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
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      testInfo: [],
      // loading: false,
      key: null, //搜索关键字
      // allExam: null, //所有考试信息
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
      console.log(res);
      if (res.meta.status == 200) return this.$message.error(res.meta.message);
      this.testInfo = res.data.data;
      this.total = res.data.total;
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getTestInfo();
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getTestInfo();
    },
    // 查找试卷
    search() {
      console.log("45");
    },
    //
    topaperInfo(testCode) {
      console.log(testCode);
      this.$router.push({
        path: "/paperInfo",
        query: {
          testCode: testCode
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.paper {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap; //换行显示
  padding: 0;
  margin-left: 100px;
  .paperItem:hover {
    box-shadow: 0 0 4px 2px #333;
    transform: scale(1.03);
  }
  .paperItem {
    padding: 10px;
    margin: 30px;
    border-radius: 40px;
    border: 1px solid #eee;
    width: 600px;
    height: 160px;
    display: flex;
  justify-content: space-around;
    box-shadow: 0 0 4px 2px rgba(217, 222, 234, 0.3);
    transition: all 0.6s ease;
    .info {
      padding: 25px 0;
    // display: flex;
    // align-items: center;
    // justify-content: center;
      // border: 1px solid red;
      h3 {
        cursor: pointer;
        span{
          font-size: 13px;
          color: #88949b;
        }
      }
      .small_tips {
        font-size: 14px;
        color: #88949b;
        span {
          margin-right: 15px;
        }
      }
    }
    .icon {
      // border: 1px solid yellow;
      display: flex;
      align-items: center;
    }
  }
}

.myTest_box {
  width: 75%;
  margin: 0 auto;
  .title {
    margin: 20px;
  }
  .wrapper {
    background-color: #fff;
  }
}

.wrapper {
  padding: 30px;
  .search {
    // border-bottom: 1px solid #eee;
    padding: 0 0 15px;
    // border: 1px solid black;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .search_box {
      margin-right: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .icon {
        margin-right: 10px;
      }
    }
  }
  // .paper {
  //   // border: 1px solid black;
  //   padding: 0;
  //   display: flex;
  //   justify-content: space-around;
  //   flex-wrap: wrap; //换行显示
  //   // * {
  //   //   margin: 20px 0;
  //   // }
  //   .item {
  //     border: 1px solid #eee;
  //     width: 380px;
  //     border-radius: 4px;
  //     padding: 20px 30px;
  //     box-shadow: 0 0 4px 2px rgba(217, 222, 234, 0.3);
  //     transition: all 0.6s ease;
  //     h4 {
  //       cursor: pointer;
  //     }
  //     .info,
  //     .name {
  //       font-size: 14px;
  //       color: #88949b;
  //       span {
  //         margin-right: 14px;
  //       }
  //     }
  //   }
  //   .item:hover {
  //     box-shadow: 0 0 4px 2px #333;
  //     // transform: scale(1.03);
  //   }
  // }
  .pagination {
    padding: 0;
    display: flex;
    justify-content: center;
    .el-pagination {
      margin: 20px 0;
    }
  }
}

ul li {
  list-style-type: none;
}

.el-breadcrumb {
  font-size: 15px;
}
</style>
