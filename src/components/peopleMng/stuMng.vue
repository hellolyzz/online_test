<template>
  <!-- 学生管理 -->
  <div class="stuMng_box">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">人员管理</el-breadcrumb-item>
      <el-breadcrumb-item>学生管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-button type="primary" @click="addStuDialog = true">添加学生</el-button>
      <!-- 学生信息展示区域 -->
      <el-table :data="tableData" border style="width: 100%" show-index>
        <!-- <el-table-column type="index" label="#"></el-table-column> -->
        <el-table-column prop="id" label="学号" width="75"></el-table-column>
        <el-table-column prop="name" label="姓名" width="100"></el-table-column>
        <el-table-column prop="gender" label="性别" width="55">
          <template slot-scope="scope">
            <el-tag type="primary" v-if="scope.row.gender === 0">女</el-tag>
            <el-tag type="primary" v-if="scope.row.gender === 1">男</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="institute" label="学院" width="110"></el-table-column>
        <el-table-column prop="grade" label="年级" width="65"></el-table-column>
        <el-table-column prop="major" label="专业"></el-table-column>
        <el-table-column prop="class" label="班级" width="50"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="tel" label="电话" width="115"></el-table-column>
        <el-table-column prop="role" label="角色" width="70">
          <template slot-scope="scope">
            <el-tag type="primary" v-if="scope.row.role === 2">学生</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="mini" @click="OpenEditStuForm(scope)">编辑</el-button>
            <el-button size="mini" type="danger" @click="deleteInfo(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[3, 5, 10]"
        :page-size="queryInfo.pagesise"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 新增学生对话框 -->
    <el-dialog title="新增学生" :visible.sync="addStuDialog" width="50%" @close="closeAddStuFormDialog">
      <el-form :model="addStuForm" :rules="addStuFormRules" ref="addStuFormRef" label-width="100px">
        <el-form-item prop="id" label="学号" size="mini">
          <el-input v-model="addStuForm.id"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="姓名" size="mini">
          <el-input v-model="addStuForm.name"></el-input>
        </el-form-item>
        <el-form-item prop="gender" label="性别" size="mini">
          <!-- <el-input v-model="addStuForm.gender"></el-input> -->
          <el-select v-model="addStuForm.gender" placeholder="请选择">
            <el-option
              v-for="item in genderOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="institute" label="所属学院" size="mini">
          <el-select v-model="addStuForm.institute" placeholder="请选择" @change="getinst($event)">
            <el-option
              v-for="item in instOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="major" label="专业" size="mini">
          <el-select v-model="addStuForm.major" placeholder="请选择">
            <el-option
              v-for="item in majorOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="grade" label="年级" size="mini">
          <el-select v-model="addStuForm.grade" placeholder="请选择">
            <el-option
              v-for="item in gradeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="class" label="班级" size="mini">
          <el-input v-model="addStuForm.class"></el-input>
        </el-form-item>
        <el-form-item prop="tel" label="电话" size="mini">
          <el-input v-model="addStuForm.tel"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱" size="mini">
          <el-input v-model="addStuForm.email"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeAddStuFormDialog">取 消</el-button>
        <el-button type="primary" @click="addStu">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑学生对话框 -->
    <el-dialog title="编辑学生" :visible.sync="editStuDialog" width="50%" @close="closeEditStuForm">
      <el-form
        :model="editStuForm"
        :rules="editStuFormRules"
        ref="editStuFormRef"
        label-width="100px"
      >
        <el-form-item prop="id" label="学号" size="mini">
          <el-tag type="primary">{{editStuForm.id}}</el-tag>
        </el-form-item>
        <el-form-item prop="name" label="姓名" size="mini">
          <el-input v-model="editStuForm.name"></el-input>
        </el-form-item>
        <el-form-item prop="gender" label="性别" size="mini">
          <el-tag type="primary" v-if="editStuForm.gender === 0">女</el-tag>
          <el-tag type="primary" v-if="editStuForm.gender === 1">男</el-tag>
        </el-form-item>
        <!-- <el-form-item prop="institute" label="所属学院" size="mini">
          <el-input v-model="editStuForm.institute"></el-input>
        </el-form-item>
        <el-form-item prop="major" label="专业" size="mini">
          <el-input v-model="editStuForm.major"></el-input>
        </el-form-item> -->
        <el-form-item prop="institute" label="所属学院" size="mini">
          <el-select v-model="editStuForm.institute" placeholder="请选择" @change="getinst($event)">
            <el-option
              v-for="item in instOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="major" label="专业" size="mini">
          <el-select v-model="editStuForm.major" placeholder="请选择">
            <el-option
              v-for="item in majorOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="grade" label="年级" size="mini">
          <!-- <el-input v-model="editStuForm.grade"></el-input> -->
          <el-select v-model="editStuForm.grade" placeholder="请选择">
            <el-option
              v-for="item in gradeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="class" label="班级" size="mini">
          <el-input v-model="editStuForm.class"></el-input>
        </el-form-item>
        <el-form-item prop="tel" label="电话" size="mini">
          <el-input v-model="editStuForm.tel"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱" size="mini">
          <el-input v-model="editStuForm.email"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editStuDialog = false">取 消</el-button>
        <el-button type="primary" @click="postEditStuForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
export default {
  data() {
    return {
      // 编辑学生
      editStuForm: {},
      // table获取到的总页数
      total: 0,
      // 查询条件
      queryInfo: {
        pagenum: 1,
        pagesize: 10
      },
      // 增加学生对话框的性别选项
      genderOptions: [
        {
          value: "0",
          label: "女"
        },
        {
          value: "1",
          label: "男"
        }
      ],
      // 学院select
      instOptions: [
        {
          label: "计算机学院",
          value: "计算机学院"
        },
        {
          label: "外国语学院",
          value: "外国语学院"
        },
        {
          label: "数学学院",
          value: "数学学院"
        }
      ],
      // 专业select
      majorOptions: [],
      // 专业select联动 数组
      majorSelect: [
        {
          pro: '计算机学院',label: '软件工程', value: '软件工程'
        },
        {
          pro: '计算机学院', label: '计算机科学与技术', value: '计算机科学与技术'
        },
        {
          pro: '计算机学院', label: '信息安全管理', value: '信息安全管理'
        },
        {
          pro: '外国语学院', label: '日语', value: '日语'
        },
        {
          pro: '外国语学院', label: '英语', value: '英语'
        },
        {
          pro: '外国语学院', label: '德语', value: '德语'
        },
        {
          pro: '数学学院', label: '数学教育', value: '数学教育'
        },
        {
          pro: '数学学院' , label: '金融数学', value: '金融数学'
        }
      ],
      // 年级select
      gradeOptions: [
        {
          label: "2016",
          value: "2016"
        },
        {
          label: "2017",
          value: "2017"
        },
        {
          label: "2018",
          value: "2018"
        },
        {
          label: "2019",
          value: "2019"
        },
        {
          label: "2020",
          value: "2020"
        }
      ],
      // 增加学生对话框
      addStuDialog: false,
      editStuDialog: false,
      // 增加学生
      addStuForm: {
        major: ''
      },
      // 增加学生验证规则
      addStuFormRules: {
        id: [
          { required: true, message: "请输入学号", trigger: "blur" },
          {
            min: 6,
            max: 6,
            message: "长度在 6 个字符",
            trigger: ["blur", "change"]
          }
        ],
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: ["blur", "change"]
          }
        ],
        grade: [
          {
            required: true,
            message: "请选择所在年级",
            trigger: ["blur", "change"]
          }
        ],
        gender: [
          { required: true, message: "请选择性别", trigger: ["blur", "change"] }
        ],
        institute: [
          {
            required: true,
            message: "请选择所在学院",
            trigger: ["blur", "change"]
          }
        ],
        major: [
          {
            required: true,
            message: "请选择所在专业",
            trigger: ["blur", "change"]
          }
        ],
        class: [
          { required: true, message: "请输入所在班级", trigger: "blur" },
          {
            // type: "number",
            message: "请输入正确的班级",
            trigger: ["blur", "change"],
            min: 1,
            max: 1
          }
        ],
        tel: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          {
            min: 11,
            max: 11,
            message: "长度在 11 个字符",
            trigger: ["blur", "change"]
          }
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ]
      },
      // 修改学生信息验证规则
      editStuFormRules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: ["blur", "change"]
          }
        ],
        class: [
          { required: true, message: "请输入所在班级", trigger: "blur" },
          {
            // type: "number",
            message: "请输入正确的班级",
            trigger: ["blur", "change"],
            min: 1,
            max: 1
          }
        ],
         institute: [
          {
            required: true,
            message: "请选择所在学院",
            trigger: ["blur", "change"]
          }
        ],
        major: [
          {
            required: true,
            message: "请选择所在专业",
            trigger: ["blur", "change"]
          }
        ],
        grade: [
          {
            required: true,
            message: "请选择所在年级",
            trigger: ["blur", "change"]
          }
        ],
        tel: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          {
            min: 11,
            max: 11,
            message: "长度在 11 个字符",
            trigger: ["blur", "change"]
          }
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ]
      },
      tableData: []
    };
  },
  created() {
    this.getStuInfo();
  },
  methods: {
    // 新增 编辑 学生 二级联动select
    getinst(prop){
      this.majorOptions = []
      this.addStuForm.major = null
      this.editStuForm.major = null
      var arr = []
      for(var val of this.majorSelect){
        if(prop === val.pro){
          // console.log(val)
          arr.push({
            label: val.label,
            value: val.value
            })
          console.log(arr)
        }
        this.majorOptions = arr
      }
    },
    async getStuInfo() {
      const { data: res } = await this.$http.get(
        "http://127.0.0.1:3000/stuBack/stuInfo",
        {
          params: this.queryInfo
        }
      );
      // console.log(res);
      if (res.meta.status !== 200) {
        this.$message.error("获取学生信息失败");
      }
      console.log(res);
      this.tableData = res.data.data;
      this.total = res.data.total;
      this.queryInfo.pagesize = res.data.pagesize;
      this.queryInfo.pagenum = res.data.pagenum;
      // this.$message.success("获取学生信息成功");
    },
    addStu() {
      // this.addStuDialog = true
      this.$refs.addStuFormRef.validate(async valid => {
        if (!valid) return;
        const { data: res } = await this.$http.post(
          "http://127.0.0.1:3000/stuBack/addStu",
          this.addStuForm
        );
        console.log(res);
        if (res.meta.status === 401) {
          this.$message.error("您所添加的学号已经存在，请仔细核对之后再添加！");
          this.addStuDialog = false;
        } else if (res.meta.status === 400) {
          this.$message.error("网络开小差了！");
          this.addStuDialog = false;
        } else {
          this.$message.success("添加学生成功");
          this.addStuDialog = false;
          this.getStuInfo();
        }
      });
    },
    // 取消增加学生对话框
    closeAddStuFormDialog() {
      this.$refs.addStuFormRef.resetFields();
      this.addStuDialog = false;
    },
    // 每页展示的条数发生变化
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getStuInfo();
    },
    // 监听页码pagenum发生了变化
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getStuInfo();
    },
    // 打开编辑学生信息对话框
    async OpenEditStuForm(scope) {
      console.log(scope.row.id);
      var id = scope.row.id;
      const { data: res } = await this.$http.get(
        "http://127.0.0.1:3000/stuBack/getSingleInfo/" + id
      );
      console.log(res);
      this.editStuForm = res.data;
      this.editStuDialog = true;
    },
    // 编辑学生信息，提交学生信息
    postEditStuForm() {
      this.$refs.editStuFormRef.validate(async valid => {
        if(!valid) return 
        const { data: res } = await this.$http.put(
          "http://127.0.0.1:3000/stuBack/editStu",
          {
            params: this.editStuForm
          }
        );
        console.log(res);
        if (res.meta.status !== 200) {
          this.$message.error("修改学生信息失败");
        }
        this.$message.success("修改学生信息成功");
        this.editStuDialog = false;
        this.getStuInfo();
      });
    },
    // 关闭学生对话框
    closeEditStuForm() {
      this.$refs.editStuFormRef.resetFields();
      this.editStuDialog = false;
    },
    // 删除学生信息
    deleteInfo(scope) {
      this.$confirm(
        "您确定要删除该学生吗？此操作一旦执行无法撤回，请谨慎操作！",
        "确认信息",
        {
          distinguishCancelAndClose: true,
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        }
      )
        .then(async () => {
          // this.$message({
          //   type: "info",
          //   message: "保存修改"
          // });
          var id = scope.row.id;
          const { data: res } = await this.$http.delete(
            "http://127.0.0.1:3000/stuBack/deleteInfo/" + id
          );
          console.log(res);
          if (res.meta.status !== 200) {
            this.$message.error("删除学生信息失败");
          }
          this.$message.success("删除学生信息成功");
          this.getStuInfo();
        })
        .catch(action => {
          this.$message({
            type: "info",
            message: action === "cancel" ? "放弃删除" : ""
          });
        });
    }
  }
};
</script>

<style lang="less" scoped>
.el-table {
  margin-top: 15px;
}
.el-card {
  margin-right: 0;
  margin-left: 0;
}
</style>