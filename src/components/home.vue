<template>
  <div class="home_box">
    <!-- 头部区域 -->
    <el-container class="home_container">
      <el-header>
        <div>
          <img src="../assets/img/logo.jpg" />
          <span>在线测试平台管理后台</span>
        </div>
        <div>
          <div class="welcomeText">欢迎你,{{ userName }}</div>
          <el-button type="primary" @click="setting" size="mini">设置</el-button> 
          <el-button type="info" @click="logout" size="mini">退出</el-button>
          <!-- <el-dropdown >
            <el-button type="primary">设置</el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>修改个人信息</el-dropdown-item>
              <el-dropdown-item @click="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown> -->
        </div>
      </el-header>

      <!-- 页面主体区域 -->
      <el-container>
        <!-- 菜单区域 -->
        <el-aside :width="isCollapse ? '64px' : '200px'">
          <div class="toggle-button" @click="toggleCollapse">|||</div>
          <el-menu
            text-color="#fff"
            background-color="#4c6c96"
            active-text-color="#124280"
            :default-active="activePath"
            router
            unique-opened
            :collapse="isCollapse"
            :collapse-transition="false"
          >
            <!-- 一级菜单 给每个菜单需要动态添加一个字符串（不相同） 来使其不一起开关-->
            <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
              <template slot="title">
                <i :class="iconsObj[item.id]"></i>
                <span>{{ item.menuName }}</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item
                :index=" '/' + subItem.path"
                v-for="subItem in item.children"
                :key="subItem.id"
                :default-active="activePath"
              >
                <!-- @click="saveNavState('/' + subItem.path)" -->
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>{{ subItem.menuName }}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- 右边主体内容区域 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: '',
      isCollapse: false,
      activePath: "",
      iconsObj: {
        "100": "el-icon-date",
        "200": "el-icon-notebook-2",
        "300": "el-icon-view",
        "400": "el-icon-user"
      },
      menuList: [
        {
          menuName: "考试管理",
          id: 100,
          children: [
            {
              menuName: "功能介绍",
              id: 101,
              path: "introduceTest"
            },
            {
              menuName: "考试查询",
              id: 102,
              path: "searchTest"
            },
            {
              menuName: "添加考试",
              id: 103,
              path: "addTest"
            }
          ]
        },
        {
          menuName: "题库管理",
          id: 200,
          children: [
            {
              menuName: "功能介绍",
              id: 201,
              path: "introduceQues"
            },
            {
              menuName: "所有题库",
              id: 202,
              path: "allTestInfo"
            },
            // {
            //   menuName: "增加题库",
            //   id: 203,
            //   path: "addQuesBank"
            // }
          ]
        },
        {
          menuName: "成绩查询",
          id: 300,
          children: [
            {
              menuName: "成绩查询",
              id: 301,
              path: "queryScore"
            },
            {
              menuName: "学生成绩查询",
              id: 302,
              path: "queryScoreById"
            }
          ]
        },
        {
          menuName: "人员管理",
          id: 400,
          children: [
            {
              menuName: "学生管理",
              id: 401,
              path: "stuMng"
            },
            {
              menuName: "教师管理",
              id: 402,
              path: "teaMng"
            }
          ]
        }
      ]
    };
  },
  created() {
    this.getInfo()
    // this.activePath = window.sessionStorage.getItem("activePath");
  },
  methods: {
    getInfo(){
      this.userName = window.sessionStorage.getItem("name")
      console.log(this.userName)
    },
    setting() {
      this.$router.push("/setting");
    },
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    saveNavState(activePath) {
      // 保存导航链接激活状态
      window.sessionStorage.setItem("activePath", activePath);
      // 点击其他二级菜单时候赋值
      this.activePath = activePath;
    }
  }
};
</script>

<style lang="less" scoped>
.home_box {
  height: 100%;
}
.home_container {
  height: 100%;
}
.el-header {
  background-color: #4c6c96;
  font-size: 20px;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
}
.el-aside {
  background-color: #4c6c96;
  .el-menu {
    border-right: 0;
    background-color: #4c6c96;
    // background-color: #ffd04b;
  }
}
.toggle-button {
  display: flex;
  color: #fff;
  justify-content: center;
  align-items: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
.el-main {
  background-color: #eaedf1;
}
.welcomeText{
  font-size: 15px;
  margin-right: 20px;
}
</style>