<template>
  <div class="noPaper_box">
    <!-- 没有试卷 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/myTest' }">考试系统</el-breadcrumb-item>
      <el-breadcrumb-item>我的试卷</el-breadcrumb-item>
      <el-breadcrumb-item>没有试卷</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="wrapper">
      <div class="showWord">
      没有试卷。你已经做过该试卷，不能够进行重复答题,请前往“我的成绩”查看该学科分数。
      </div>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="less" scoped>
.noPaper_box{
  height: 100%;
  width: 75%;
  margin: 0 auto;
  .wrapper{
    background-color: #fff;
    .showWord{
      height: 450px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>