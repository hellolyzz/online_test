
<template>
  <div class="app-container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">考试系统</el-breadcrumb-item>
      <el-breadcrumb-item>人员管理</el-breadcrumb-item>
      <el-breadcrumb-item>学生管理</el-breadcrumb-item>
      <el-breadcrumb-item>批量添加学生</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div class="tips">
        学生信息表头应该为：
        <el-tooltip class="item" effect="dark" content="学号" placement="top" visible-arrow="false">
          <el-button size="mini">id</el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="姓名" placement="top">
          <el-button size="mini">name</el-button>
        </el-tooltip>
          <el-tooltip class="item" effect="dark" content="性别(0女/1男)" placement="top">
          <el-button size="mini">gender</el-button>
        </el-tooltip>
          <el-tooltip class="item" effect="dark" content="学院" placement="top">
          <el-button size="mini">institute</el-button>
        </el-tooltip>
          <el-tooltip class="item" effect="dark" content="年级" placement="top">
          <el-button size="mini">grade</el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="专业" placement="top">
          <el-button size="mini">major</el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="所在班级" placement="top">
          <el-button size="mini">class</el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="电话" placement="top">
          <el-button size="mini">tel</el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="邮箱" placement="top">
          <el-button size="mini">email</el-button>
        </el-tooltip>
      </div>
      <!-- // excel文件选择框 -->
      <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
      <!-- // excel文件预览框 -->
      <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
        <el-table-column v-for="item of tableHeader" :prop="item" :label="item" :key="item" />
      </el-table>
    </el-card>
  </div>
</template>
 
<script>
import UploadExcelComponent from "./index.vue";
export default {
  name: "UploadExcel",
  components: { UploadExcelComponent },
  data() {
    return {
      tableData: [],
      tableHeader: [],
      paperId: 0,
      resultForm: {}
    };
  },
  created() {
    // this.paperId = this.$route.query.paperId;
  },
  methods: {
    // 文件读取前执行
    beforeUpload(file) {
      // 取文件大小，限制文件大小超过1mb
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (isLt1M) {
        return true;
      }
      this.$message({
        message: "上传的Excel文件不能大于1mb.",
        type: "warning"
      });
      return false;
    },
    // 文件读取后执行
    handleSuccess({ results, header }) {
      // 数据
      this.tableData = results;
      // 表头
      this.tableHeader = header;
      console.log(this.tableData)
      console.log(this.tableHeader)
      // 判断表格的第一项是否为d
      if (this.tableHeader[0] !== "id") {
        this.$message.error("表格第一列不为id即题号，请更改！");
      }
      // for (var i = 0; i < results.length; i++) {
      //   // 每次循环前，初始化表单对象
      //   this.resultForm.questionId = results[i].questionId;
      //   this.resultForm.subject = results[i].subject;
      //   this.resultForm.question = results[i].question;
      //   this.resultForm.optionA = results[i].optionA;
      //   this.resultForm.optionB = results[i].optionB;
      //   this.resultForm.optionC = results[i].optionC;
      //   this.resultForm.optionD = results[i].optionD;
      //   this.resultForm.answer = results[i].answer;
      //   this.resultForm.analysis = results[i].analysis;
      //   this.resultForm.section = results[i].section;
      //   this.resultForm.level = results[i].level;
      //   // 将每项的数据放到表单对象里后执行添加方法
      //   this.addMultiQ(this.resultForm);
      //   // 设置一个半分比变量，用来记录当前的添加进度
      //   // var percentage = ((i + 1) / results.length) * 100;
      //   // console.log(percentage)
      // }
      this.add(0, results.length);
    },
    // 添加数据
    add(i, length) {
      var form = {};
      form.id = this.tableData[i].id;
      form.name = this.tableData[i].name;
      form.class = this.tableData[i].class;
      form.gender = this.tableData[i].gender;
      form.institute = this.tableData[i].institute;
      form.grade = this.tableData[i].grade;
      form.major = this.tableData[i].major;
      form.tel = this.tableData[i].tel;
      form.email = this.tableData[i].email;
      // 将每项的数据放到表单对象里后执行添加方法
      this.addStu(form);
      if (++i < length) {
        this.add(i, length);
      }
    },
    // 添加单个学生
    async addStu(form) {
      const { data: res } = await this.$http.post(
        "http://127.0.0.1:3000/stuBack/addStu",
        form
      );
      console.log(res);
      if (res.meta.status === 401) {
        this.$message.error(res.meta.message);
      } else if (res.meta.status === 400) {
        this.$message.error("网络开小差了！");
      } else {
        this.$message.success("添加学生成功");
      }
    }
  }
};

// ruleForm是存储表单的对象数组，它包含date、number、name、age、sex。
// errorNote是存储检验时不合法的数据的错误报告，这样在循环添加结束后，用户可以通过查看错误报告来看哪些数据填错了，然后单独手动添加。
// resultForm()是一个重置ruleForm表单对象的方法，将其内的元素重新初始化。
</script>

<style lang="less" scoped>
.tips{
  margin: 10px 20px 20px;
  // border:1px solid balck;
}
</style>