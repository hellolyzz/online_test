<template>
  <div class="introduceQues_box">
    <!-- 题库功能介绍 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">题库管理</el-breadcrumb-item>
      <el-breadcrumb-item>功能介绍</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="content">题库功能介绍。根据每张试卷查看该试卷对应的题库。并可以对该题库进行相应的增删改查操作。</div>
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
  margin-left: 40px;
  width: 600px;
  background-color: rgb(236, 248, 255);
  padding: 16px 32px;
  border-radius: 4px;
  // border-left: 5px solid rgb(80, 191, 255);
  border-left: 5px solid #4c6c96;
  margin: 20px 0px;
}
</style>