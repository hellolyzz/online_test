<!--学生考试首页-->
<template>
  <div class="student_box">
    <!-- 学生考试区域 -->
    <el-container class="con">
      <!-- 头部区域 -->
      <el-header>
        <div class="left_con">
          <div class="logo">
            <img src="../../assets/img/logo.jpg" alt />
          </div>
          <div class="welcome">在线考试系统</div>
        </div>
        <div class="center_con">
          <div class="nav_1">我的考试</div>
          <div class="nav_2">我的练习</div>
          <div class="nav_3">成绩查询</div>
        </div>
        <div class="right_con">
          <span class="welcome_user">欢迎你，{{ name }}</span>
          <div class="nav_4">
            <el-button type="primary" size="mini">设置</el-button>
          </div>
          <div class="nav_5">
            <el-button type="info" size="mini" @click="logout">退出</el-button>
          </div>
        </div>
      </el-header>
      <!-- 主体区域 -->
      <el-main>
        <router-view></router-view>
      </el-main>
      <!-- 底部区域 -->
      <!-- <el-footer></el-footer> -->
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: ''
    };
  },
  created() {
    this.userInfo()
  },
  methods: {
    userInfo(){
      this.name = window.sessionStorage.getItem('name')
    },
    // 退出
    logout(){
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  }
};
</script>

<style lang="less" scoped>
.con {
  height: 100%;
  width: 100%;
}
.el-header {
  background-color: #4c6c96;
  color: white;
  font-size: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .left_con {
    // border: 1px solid black;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logo {
      width: 60px;
      height: 60px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .welcome {
      margin-left: 15px;
    }
  }
  .center_con {
    // border: 1px solid black;
    display: flex;
    justify-content: space-between;
    align-items: center;
     div {
      margin-right: 35px;
      cursor: pointer;
    }
  }
  .right_con {
    // border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    div {
      margin-right: 35px;
      cursor: pointer;
    }
    .welcome_user{
      margin-right: 35px;
      font-size: 15px;
      
    }
  }
}
.el-main {
  background-color: #eaedf1;
}
</style>
