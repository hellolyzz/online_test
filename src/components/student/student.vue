<!--学生考试首页-->
<template>
  <div id="student">
    <el-row class="nav">
      <el-col :span="24">
        <ul class="list">
          <li class="logo">
            <i class="el-icon-document"></i>
            <span>OnlineTest</span>
          </li>
          <li>
            <a href="javascript:;" @click="toTestList">试卷列表</a>
          </li>
          <!-- <li>
            <el-button @click="practice()">我的练习</el-button>
          </li>-->
          <li>
            <a href="javascript:;" @click="tomyScore">查询分数</a>
          </li>
          <li class="right">
            <span class="welcome_user">欢迎你，{{ name }}</span>
          </li>
          <li>
            <a href="javascript:;" @click="setting">设  置</a>
          </li>
          <li>
            <a href="javascript:;" @click="logout">退  出</a>
          </li>
        </ul>
      </el-col>
    </el-row>
    <!-- 主体区域 -->
    <el-main>
      <router-view></router-view>
    </el-main>
  </div>
</template>

<script>
// import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      name: ""
      // flag: false
    };
  },
  // computed: mapState({
  //   name: state => state.name
  // }),
  created() {
    this.userInfo();
  },
  methods: {
    add() {
      // this.$store.commit('add'); //mutation 中的方法
      this.$store.dispatch("addFun");
    },
    reduce() {
      // this.$store.commit('reduce');
      var n = 10;
      this.$store.dispatch("reduceFun", n);
    },
    // computed:mapState(["isPractice"])
    userInfo() {
      this.name = window.sessionStorage.getItem("name");
    },
    // 退出
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    setting() {
      // console.log('45')
      this.$router.push("/stuSetting");
    },
    toTestList() {
      this.$router.push("/myTest");
    },
    tomyScore() {
      this.$router.push("/myScore");
    }
  }
};
</script>

<style lang="less" scoped>
.right .icon {
  margin-right: 6px;
}
#student .nav {
  margin: 0 auto;
  padding: 0 50px;
  box-shadow: 0 0 4px rgba(1, 149, 255, 0.1);
  background-color: #333;
}
.list a {
  text-decoration: none;
  color: #fff;
  font-weight: 600;
}
ul{
  margin: 10px;
}
li {
  list-style: none;
  height: 60px;
  line-height: 60px;
}
#student .list {
  display: flex;
}
#student .list li {
  padding: 0 20px;
}
#student .list li:nth-child(2):hover,
#student .list li:nth-child(3):hover,
#student .list li:nth-child(5):hover,
#student .list li:nth-child(6):hover {
  background-color: #ffd04b;
  border-radius: 30px;
}
#student .list li:hover a {
  color: #333;
  font-weight: 600;
}
#student .list .right {
  margin-left: auto;
  position: relative;
  .welcome_user {
    font-size: 16px;
    color: #ffd04b;
  }
}
#student .list .logo {
  display: flex;
  font-weight: bold;
  color: #fff;
  i {
    font-size: 50px;
  }
}
.el-main {
  background-color: rgb(230, 227, 227);
}
</style>
