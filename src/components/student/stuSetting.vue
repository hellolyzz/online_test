<template>
  <div class="stuSetting_box">
    <!-- 学生信息设置 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/myTest' }">考试系统</el-breadcrumb-item>
      <el-breadcrumb-item>设置</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="con">
      <el-form :model="settingForm" :rules="settingFromRules" ref="settingFromRef" label-width="80px" style="width: 60%;">
        <el-form-item label="学号">
          <!-- <el-input v-model="settingForm.id"></el-input> -->
          <el-tag>{{settingForm.id}}</el-tag>
        </el-form-item>
        <el-form-item label="姓名">
          <!-- <el-input v-model="settingForm.name"></el-input> -->
          <el-tag>{{settingForm.name}}</el-tag>
        </el-form-item>
        <el-form-item label="性别">
          <!-- <el-input v-model="settingForm.gender"></el-input> -->
          <el-tag>{{settingForm.gender === 0 ? "女" : "男"}}</el-tag>
        </el-form-item>
        <el-form-item label="所属学院">
          <el-tag>{{settingForm.grade}}</el-tag> <i class="el-icon-arrow-right"></i>
          <el-tag>{{settingForm.institute}}</el-tag> <i class="el-icon-arrow-right"></i>
          <el-tag>{{settingForm.major}}</el-tag> <i class="el-icon-arrow-right"></i>
          <el-tag>{{settingForm.class}} 班</el-tag> 
        </el-form-item>
        <el-form-item label="电话" prop="tel">
          <el-input v-model="settingForm.tel"  :disabled="editFlag"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="settingForm.email"  :disabled="editFlag"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input v-model="settingForm.pwd" type="password" v-if="editFlag == true" :disabled="editFlag"></el-input>
          <el-input v-model="settingForm.pwd" v-if="editFlag == false"></el-input>
          <!-- <el-tag>{{settingForm.gender === 0 ? "女" : "男"}}</el-tag> -->
        </el-form-item>
        <!-- <el-form-item label="密码" prop="pwd2" v-if="editFlag == false"> -->
        <!-- </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="editInfo" v-if="editFlag == true">修改</el-button>
          <el-button type="primary" @click="postInfo" v-if="editFlag == false">提交</el-button>
        </el-form-item>
        <el-form-item>
          <span class="tips">
            * 您当前身份为学生，仅支持修改电话、邮箱和密码，若需要修改其他信息请联系老师。
            * 修改密码之后请牢记，且下次登录时需要使用新密码。
          </span>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editFlag: true,
      settingForm: {},
      cruId: 0,
      settingFromRules: {
        tel: [
          {
            required: true, message: '请输入邮箱', trigger: ['blur','change']
          },
          {
            min:11, max: 11, message:'请输入正确的手机号', trigger: ['blur', 'change']
          }
        ],
        email: [
          {
            required: true, message: '请输入邮箱', trigger: ['blur','change']
          },
          {
            type: 'email', message:'请输入正确的邮箱格式', trigger: ['blur', 'change']
          }
        ],
        pwd: [
          {
            required: true, message: '请输入密码', trigger: ['blur', 'change']
          },
          {
            min: 6, max: 16, message:'密码的长度在6个字符到16个字符', trigger: ['blur', 'change']
          }
        ]
      }
    };
  },
  created(){
    this.getInfo()
  },
  methods:{
    async getInfo(){
      this.cruId = window.sessionStorage.getItem('id')
      // console.log(this.cruId)
      const { data: res } = await this.$http.get('http://localhost:3000/stuFront/getInfoById/' + this.cruId);
      // console.log(res)
      if(res.meta.status !== 200) return this.$message.error(res.meta.message)
      this.$message.success(res.meta.message)
      this.settingForm = res.data
    },
    // 修改信息
    editInfo(){
      this.editFlag = !this.editFlag
    },
    // 提交信息
    postInfo(){
      this.$refs.settingFromRef.validate(async valid => {
        if(!valid) return
        const {data: res } = await this.$http.put('http://localhost:3000/stuFront/editStu',{
            params: this.settingForm
          })
        console.log(res)
      if(res.meta.status !== 200) return this.$message.error(res.meta.message)
      this.$message.success(res.meta.message)
        this.editFlag = !this.editFlag
      })
    }
  }
};
</script>

<style lang="less" scoped>
.stuSetting_box {
  width: 75%;
  margin: 0 auto;
  .con {
    background-color: #fff;
    padding: 20px 20px 20px 0;
    display: flex;
    justify-content: center;
  }
}
.tips{
  font-size: 13px;
  color: red;
}
</style>