<template>
  <div class="stuScore_box">
    <!-- 查看成绩 -->
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/myTest' }">考试系统</el-breadcrumb-item>
      <el-breadcrumb-item>查看成绩</el-breadcrumb-item>
    </el-breadcrumb>-->
    <div class="title">
      <p class="name">{{ courseName }}</p>
      <p class="description">(总分：100分,限时：{{ totalTime }}分钟)</p>
      <p class="description">学生：{{ name }}</p>
    </div>
    <div class="wrapper">
      <div class="show">
        <div class="showtip">本次考试成绩</div>
        <div class="number" :class="{'border': isTransition}">
          <span>{{score}}</span>
          <span>分数</span>
        </div>
      </div>
      <ul class="time">
        <li class="start">
          <span>开始时间</span>
          <span>{{startTime}}</span>
        </li>
        <li class="end">
          <span>结束时间</span>
          <span>{{endTime}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isTransition: false,
      score: 0,
      startTime: "",
      endTime: "",
      name: "",
      courseName: "",
      totalTime: ""
    };
  },
  created() {
    this.initPage();
    this.transiton();
  },
  methods: {
    transiton() {
      //一秒后过渡
      setTimeout(() => {
        this.isTransition = true;
        // this.imgShow = true
      }, 1000);
    },
    initPage() {
      this.name = window.sessionStorage.getItem("name");
      this.courseName = this.$route.query.courseName;
      this.totalTime = this.$route.query.totalTime;
      this.score = this.$route.query.score;
      this.startTime = this.$route.query.startTime;
      this.endTime = this.$route.query.endTime;
    }
  }
};
</script>

<style lang="less" scoped>
.stuScore_box {
  width: 75%;
  margin: 0 auto;
  .title {
    margin: 20px 0px 20px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .name {
      font-size: 26px;
      margin: 0;
      color: inherit;
      font-weight: 500;
    }
    .description {
      margin: 0;
      font-size: 14px;
      color: #888;
    }
  }
  .wrapper {
    padding: 40px;
    background-color: #fff;
    .time {
      padding: 0px 70px;
      li {
        display: flex;
        justify-content: space-around;
        padding: 10px;
        margin: 20px 0px;
      }
      li:nth-child(1) {
        background-color: #fcf8e3;
      }
      li:nth-child(2) {
        background-color: #e9f5e9;
      }
    }
    .showtip {
      border-bottom: 1px solid #cccccc;
      color: #333;
      padding: 10px 0;
    }
    .border {
      border: 6px solid #ffd04b !important;
      transition: all 2s ease;
      width: 160px !important;
      height: 160px !important;
      transform: rotate(360deg) !important;
      opacity: 1 !important;
    }
    .number {
      opacity: 0;
      border: 6px solid #fff;
      transform: rotate(0deg);
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin: 0 auto;
      width: 160px;
      height: 160px;
      border-radius: 50%;
      margin-top: 80px;
      margin-bottom: 20px;
      transition: all 1s ease;
      color: #333;
      span:nth-child(1) {
        font-size: 36px;
        font-weight: 600;
      }
      span:nth-child(2) {
        font-size: 14px;
      }
    }
  }
}
</style>