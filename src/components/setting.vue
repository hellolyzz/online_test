<template>
  <div class="setting_box">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>设置</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form
        style="width:600px;"
        :model="settingForm"
        :rules="settingRules"
        ref="settingFormRef"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="当前ID" prop="id">
          <el-tag type="primary">{{ settingForm.id }}</el-tag>
        </el-form-item>
        <el-form-item label="当前角色" prop="role" >
          <el-tag type="primary" v-if="settingForm.role === 0 ">管理员</el-tag>
          <el-tag type="primary" v-if="settingForm.role === 1 ">教师</el-tag>
          <el-tag type="primary" v-if="settingForm.role === 2 ">学生</el-tag>
        </el-form-item>
        <el-form-item label="用户名称" prop="name" >
          <el-input v-model="settingForm.name" :disabled="editFlag"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱" prop="email">
          <el-input v-model="settingForm.email" :disabled="editFlag"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" prop="tel">
          <el-input v-model="settingForm.tel" :disabled="editFlag"></el-input>
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="edit">修改</el-button>
          <el-button type="primary" @click="updateInfo" v-if="editFlag == false">确定</el-button>
          <!-- <el-button type="primary" @click="resetForm" v-if="editFlag == false">清空</el-button> -->
        </el-form-item>
        <center style="font-size:10px;">请联系管理员修改密码</center>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editFlag: true,
      settingForm: {
        id: "",
        role: "",
        name: "",
        email: "",
        tel: ""
      },
      settingRules: {}
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    // 获取用户信息
    async getInfo() {
      var id = window.sessionStorage.getItem('id')
      console.log(id)
      const { data: res } = await this.$http.get(
        'http://127.0.0.1:3000/user/' + id
      );
      console.log(res);
      if (res.meta.status !== 200) {
        this.$message.error("获取信息失败！");
      }
      this.settingForm = res.data;

    },
    edit(){
      this.editFlag = !this.editFlag;
    },
    // resetForm(){
    //   this.$refs.settingFormRef.resetFields()
    // }
    async updateInfo(params){
      var id = window.sessionStorage.getItem('id')
      console.log(id)
      const { data: res } = await this.$http.put('http://127.0.0.1:3000/user/' + id, this.settingForm)
      console.log(res)
      if(res.meta.status !== 200){
        this.$message.error("保存信息失败")
        console.log('保存失败')
      }
      this.$message.success('保存信息成功')
        console.log('保存成功')
      this.editFlag = !this.editFlag;
      this.getInfo();
    }
  }
};
</script>

<style lang="less" scoped>
</style>