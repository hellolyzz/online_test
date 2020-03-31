<template>
  <div class="introduceTest_box">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">考试管理</el-breadcrumb-item>
      <el-breadcrumb-item>功能介绍</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div class="content">
        <el-steps :active="2" align-center>
          <el-step title="步骤 1" description="教师创建试卷"></el-step>
          <el-step title="步骤 2" description="为试卷添加试题（可修改试题）"></el-step>
          <el-step title="步骤 3" description="学生端看见未作答试题进行答题"></el-step>
          <el-step title="步骤 4" description="答题完毕上传成绩"></el-step>
        </el-steps>
      </div>
    </el-card>
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
.content {
  padding: 16px 10px;
  // border: 1px solid rgb(80, 191, 255);
}
</style>

