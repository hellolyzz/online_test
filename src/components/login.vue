<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/img/logo.jpg" alt />
      </div>
      <!-- 表单区域 -->
      <el-form ref="loginFormRef" :rules="loginFormRules" :model="loginForm" class="login_form" label-width="80px">
        <!-- <el-form-item prop="id">
          <el-input v-model="loginForm.id" prefix-icon="el-icon-user-solid"></el-input>
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input v-model="loginForm.pwd" prefix-icon="el-icon-lock" type="password"></el-input>
        </el-form-item> -->
        <el-form-item prop="id" label="用户名">
          <el-input v-model="loginForm.id" ></el-input>
        </el-form-item>
        <el-form-item prop="pwd" label="密码">
          <el-input v-model="loginForm.pwd" type="password"></el-input>
        </el-form-item>
        <el-form-item prop="role" label="身份">
          <el-select v-model="loginForm.role" >
            <el-option
              v-for="item in roleList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="login_btn">
          <el-button type="info" @click="loginFormReset">重置</el-button>
          <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="tips_box">
      <span>管理员账号：200001</span>
      <span>教师账号：201001</span>
      <span>学生账号：603131</span>
      <span>密码：123456</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roleList: [
        {
          label: "管理员",
          value: 0
        },
        {
          label: "教师",
          value: 1
        },
        {
          label: "学生",
          value: 2
        }
      ],
      loginForm: {
        id: "200001",
        pwd: "123456",
        role: ''
      },
      loginFormRules: {
        id: [
          { required: true, message: "请输入您的学号或工号", trigger: "blur" },
          { min: 5, max: 8, message: "长度在 5 到 8 个字符", trigger: "blur" }
        ],
        pwd: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 10, message: "长度在 6 到 10 个字符", trigger: "blur" }
        ],
        role: [
          { required: true, message: "请选择您的身份类型", trigger: ["blur", "change"] },
        ]
      }
    };
  },
  methods: {
    loginFormReset() {
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      // 预验证
      this.$refs.loginFormRef.validate(async valid => {
        // console.log(valid)
        if (!valid) return;
        // console.log(this.loginForm)
        const { data: res } = await this.$http.post(
          "http://127.0.0.1:3000/user",
          this.loginForm
        );
        console.log(res);
        if (res.meta.status !== 200) return this.$message.error("账号或密码或身份类型错误，登录失败！");
        this.$message.success("登录成功");
        // 1. 登陆成功之后将token保存到客户端 sessionStorage 中
        //  1.1 项目中除了登陆之外的其他API接口只有登录成功了才可以访问
        //  1.2 token只在当前网站打开期间生效，所以讲token 保存到sessionStorage 里面
        // 2. 通过编程式导航跳转到后台主页 地址/home
        // console.log(res)
        // 保存token
        this.$store.dispatch('saveName', res.data.name)
        window.sessionStorage.setItem("token", res.data.token);
        window.sessionStorage.setItem("id", res.data.id);
        window.sessionStorage.setItem("role", res.data.role);
        window.sessionStorage.setItem("name", res.data.name);
        window.sessionStorage.setItem("institute", res.data.institute);
        window.sessionStorage.setItem("major", res.data.major);
        window.sessionStorage.setItem("grade", res.data.grade);
        if (res.data.role === 2) {
          this.$router.push("/student");
        } else {
          this.$router.push("/home");
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.login_container {
  height: 100%;
  background-color: rgb(230, 227, 227);
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  // border: 1px solid black;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 20px #eee;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
}
.login_btn {
  display: flex;
  justify-content: center;
}
.tips_box {
  border-radius: 10px;
  font-size: 13px;
  padding: 20px ;
  display: flex;
  position: fixed;
  bottom: 27%;
  right: 20%;
  flex-direction: column;
  // color: #606266;
  background-color: #fff;
  // border-left: 4px solid #409eff;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)
}
</style>
