<!--学生考试首页-->
<template>
  <div id="student">
    <el-row class="padding-50">
      <el-col :span="24">
        <ul class="list">
          <li class="logo">
            <i class="el-icon-document"></i>
            <span>OnlineTest</span>
          </li>
          <li>
            <el-button @click="exam()">我的试卷</el-button>
          </li>
          <li>
            <el-button @click="practice()">我的练习</el-button>
          </li>
          <li>
            <el-button>查询分数</el-button>
          </li>
          <li class="right">
            <span class="welcome_user">欢迎你，{{ this.$store.state.name }}</span>
          </li>
          <li>
            <el-button @click="setting">设置</el-button>
          </li>
          <li>
            <el-button type="info" @click="logout">退出</el-button>
          </li>
        </ul>
      </el-col>
    </el-row>
    <!-- 主体区域 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    <!-- <v-footer></v-footer> -->
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      // name: "",
      // flag: false
    };
  },
  computed: mapState({
    name: state => state.name
  }),
  created() {
    this.userInfo();
  },
  methods: {
    add(){
      // this.$store.commit('add'); //mutation 中的方法
      this.$store.dispatch('addFun')
    },
    reduce(){
      // this.$store.commit('reduce');
      var n = 10;
      this.$store.dispatch('reduceFun',n)
    },
    // computed:mapState(["isPractice"])
    userInfo() {
      // this.name = window.sessionStorage.getItem("name");
    },
    // 退出
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    setting(){
      console.log('45')
    }
  }
};
</script>

<style lang="less" scoped>
.right .icon {
  margin-right: 6px;
}
#student .padding-50 {
  margin: 0 auto;
  padding: 0 50px;
  box-shadow: 0 0 10px 4px rgba(1, 149, 255, 0.1);
  background-color: #fff;
}
.list a {
  text-decoration: none;
  color: #334046;
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
  cursor: pointer;
}
#student .list li:hover {
  background-color: #0195ff;
  transition: all 2s ease;
}
#student .list li:hover a {
  color: #fff;
}
#student .list .right {
  margin-left: auto;
  position: relative;
}
#student .list li.right :hover a {
  color: #000;
}
#student .list .logo {
  display: flex;
  font-weight: bold;
  color: #2f6c9f;
}
#student .list .logo i {
  font-size: 50px;
}
.right .msg {
  text-align: center;
  position: absolute;
  top: 60px;
  left: 0px;
  display: flex;
  flex-direction: column;
  border-radius: 2px;
  border-bottom: 3px solid #0195ff;
  background-color: #fff;
}
.right .msg p {
  height: 40px;
  line-height: 40px;
  width: 105px;
}
.right .msg p:hover {
  background-color: #0195ff;
}
.welcome_user {
  font-size: 15px;
}
.right {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.el-main {
  background-color: #eaedf1;
}
</style>
