<template>
  <div class="introduceQues_box">
    <!-- 题库功能介绍 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">题库管理</el-breadcrumb-item>
      <el-breadcrumb-item>功能介绍</el-breadcrumb-item>
    </el-breadcrumb>
   <el-card>
      <div class="content">
        <el-steps :active="2" align-center>
          <el-step title="步骤 1" description="选择题库查看试题"></el-step>
          <el-step title="步骤 2" description="增删查改试题"></el-step>
        </el-steps>
      </div>
    </el-card>
    <!-- <div class="content">题库功能介绍。根据每张试卷查看该试卷对应的题库。并可以对该题库进行相应的增删改查操作。</div> -->
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