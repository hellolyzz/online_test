<template>
  <div class="introduceTest_box">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">考试管理</el-breadcrumb-item>
      <el-breadcrumb-item>功能介绍</el-breadcrumb-item>
    </el-breadcrumb>
    <section class="description">
      <!-- <div class="title">
        介绍
      </div> -->
      <div class="content">
        教师发布试卷，学生可在自己主页看到可答题的试卷，并选择相应试卷进行答题。
        有考试安排表以后，才能给该次考试添加题目，考试对应的数据表是tb_testmanage。
        该表保存了此次考试，课程名称，考试时间，所属专业，学院等等信息。
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.description {
  margin-left: 40px;
  .title {
    font-size: 22px;
    font-weight: 400;
    color: rgb(31, 47, 61);
  }
  .content {
    width: 600px;
    background-color: rgb(236, 248, 255);
    padding: 16px 32px;
    border-radius: 4px;
    // border-left: 5px solid rgb(80, 191, 255);
    border-left: 5px solid #4c6c96;
    margin: 20px 0px;
  }
}
</style>

