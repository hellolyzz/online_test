<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/img/logo.jpg" alt />
      </div>
      <!-- 表单区域 -->
      <el-form ref="form" :model="form" class="login_form">
        <el-form-item>
          <el-input v-model="form.name" prefix-icon="el-icon-user-solid"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.pwd" prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <el-form-item class="login_btn">
          <el-button type="info" @click="reset">重置</el-button>
          <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        pwd: ""
      }
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.login_container {
  height: 100%;
  background-color: #c3c8d6;
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
  padding: 0 20px;
  box-sizing: border-box;
}
.login_btn {
  display: flex;
  justify-content: center;
}
</style>
