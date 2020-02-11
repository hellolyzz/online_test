
<template>
  <!--  教师管理 -->
  <div class="teaMng_box">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">人员管理</el-breadcrumb-item>
      <el-breadcrumb-item>教师管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-button type="primary" @click="addTeaDialog = true">添加教师</el-button>
      <!-- 教师信息展示区域 -->
      <el-table :data="tableData" border style="width: 100%" show-index>
        <!-- <el-table-column type="index" label="#"></el-table-column> -->
        <el-table-column prop="id" label="工号" width="75"></el-table-column>
        <el-table-column prop="name" label="姓名" width="100"></el-table-column>
        <el-table-column prop="gender" label="性别" width="55">
          <template slot-scope="scope">
            <el-tag type="primary" v-if="scope.row.gender === 0">女</el-tag>
            <el-tag type="primary" v-if="scope.row.gender === 1">男</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="institute" label="学院" width="110"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="tel" label="电话" width="115"></el-table-column>
        <el-table-column prop="role" label="角色" width="70">
          <template slot-scope="scope">
            <el-tag type="primary" v-if="scope.row.role === 1">教师</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="mini" @click="OpenEditTeaForm(scope)">编辑</el-button>
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
     <!-- 新增教师对话框 -->
    <el-dialog title="新增教师" :visible.sync="addTeaDialog" width="50%" @close="closeAddTeaFormDialog">
      <el-form :model="addTeaForm" :rules="addTeaFormRules" ref="addTeaFormRef" label-width="100px">
        <el-form-item prop="id" label="学号" size="mini">
          <el-input v-model="addTeaForm.id"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="姓名" size="mini">
          <el-input v-model="addTeaForm.name"></el-input>
        </el-form-item>
        <el-form-item prop="gender" label="性别" size="mini">
          <!-- <el-input v-model="addTeaForm.gender"></el-input> -->
          <el-select v-model="addTeaForm.gender" placeholder="请选择">
            <el-option
              v-for="item in genderOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="institute" label="所属学院" size="mini">
          <!-- <el-input v-model="addTeaForm.institute"></el-input> -->
          <el-select v-model="addTeaForm.institute" placeholder="请选择">
            <el-option
              v-for="item in instOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>       
        <el-form-item prop="tel" label="电话" size="mini">
          <el-input v-model="addTeaForm.tel"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱" size="mini">
          <el-input v-model="addTeaForm.email"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeAddTeaFormDialog">取 消</el-button>
        <el-button type="primary" @click="addTea">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑教师对话框 -->
    <el-dialog title="编辑教师" :visible.sync="editTeaDialog" width="50%" @close="closeEditTeaForm">
      <el-form
        :model="editTeaForm"
        :rules="editTeaFormRules"
        ref="editTeaFormRef"
        label-width="100px"
      >
        <el-form-item prop="id" label="工号" size="mini">
          <el-tag type="primary">{{editTeaForm.id}}</el-tag>
        </el-form-item>
        <el-form-item prop="name" label="姓名" size="mini">
          <el-input v-model="editTeaForm.name"></el-input>
        </el-form-item>
        <el-form-item prop="gender" label="性别" size="mini">
          <el-tag type="primary" v-if="editTeaForm.gender === 0">女</el-tag>
          <el-tag type="primary" v-if="editTeaForm.gender === 1">男</el-tag>
        </el-form-item>
        <el-form-item prop="institute" label="所属学院" size="mini">
          <el-input v-model="editTeaForm.institute"></el-input>
        </el-form-item>
        <el-form-item prop="tel" label="电话" size="mini">
          <el-input v-model="editTeaForm.tel"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱" size="mini">
          <el-input v-model="editTeaForm.email"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editTeaDialog = false">取 消</el-button>
        <el-button type="primary" @click="postEditTeaForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      total: 0,
      queryInfo: {
        pagesize: 10,
        pagenum: 1
      },
      addTeaDialog: false, 
      editTeaDialog: false,
      addTeaForm: {},
      editTeaForm: {},
      // 增加教师验证规则
      addTeaFormRules: {
        id: [
          { required: true, message: "请输入工号", trigger: "blur" },
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
         gender: [
           { required: true, message: "请选择性别", trigger: ["blur", "change"] },
        ],
        institute: [
           { required: true, message: "请选择所在学院", trigger: ["blur", "change"] },
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
      // 修改学教师信息验证规则
      editTeaFormRules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
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
      // 增加教师对话框的性别选项
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
      // table数据源
      tableData: []
    };
  },
  created() {
    this.getTeaInfo();
  },
  methods: {
    // 获取教师信息
    async getTeaInfo() {
        console.log(this.queryInfo)
        const { data: res } = await this.$http.get(
          'http://127.0.0.1:3000/teamng/teaInfo',
          {
            params: this.queryInfo
          }
        );
        console.log(res);
        if (res.meta.status !== 200) {
          this.$message.error("获取教师信息失败");
        }
        console.log(res);
        this.tableData = res.data.data;
        this.total = res.data.total;
        this.queryInfo.pagesize = res.data.pagesize;
        this.queryInfo.pagenum = res.data.pagenum;
      
    },
    // 每页展示的条数发生变化
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getTeaInfo();
    },
    // 监听页码pagenum发生了变化
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getTeaInfo();
    },
    // 关闭新增dialog
    closeAddTeaFormDialog(){
      this.$refs.addTeaFormRef.resetFields();
      this.addTeaDialog = false;
    },
    // 增加教师
    addTea(){
      this.$refs.addTeaFormRef.validate(async valid => {
        if(!valid) return 
        const { data: res } = await this.$http.post('http://127.0.0.1:3000/teamng/addTea', this.addTeaForm)
        console.log(res)
        if (res.meta.status === 401) {
          this.$message.error("您所添加的工号已经存在，请仔细核对之后再添加！");
          this.addTeaDialog = false;
        } else if (res.meta.status === 400) {
          this.$message.error("网络开小差了！");
          this.addTeaDialog = false;
        } else {
          this.$message.success("添加教师成功");
          this.addTeaDialog = false;
          this.getTeaInfo();
        }
      })
    },
     // 打开编辑教师信息对话框
    async OpenEditTeaForm(scope) {
      console.log(scope.row.id);
      var id = scope.row.id;
      const { data: res } = await this.$http.get(
        "http://127.0.0.1:3000/teamng/getSingleInfo/" + id
      );
      console.log(res);
      this.editTeaForm = res.data;
      this.editTeaDialog = true;
    },
    // 关闭编辑框
    closeEditTeaForm(){
      his.$refs.editTeaFormRef.resetFields();
      this.editTeaDialog = false;
    },
    // 修改教师信息
    async postEditTeaForm(){
       const { data: res } = await this.$http.put(
        "http://127.0.0.1:3000/teamng/editTea",
        {
          params: this.editTeaForm
        }
      );
      console.log(res);
      if (res.meta.status !== 200) {
        this.$message.error("修改教师信息失败");
      }
      this.$message.success("修改教师信息成功");
      this.editTeaDialog = false;
      this.getTeaInfo();
    },
     // 删除教师信息
    deleteInfo(scope) {
      this.$confirm(
        "您确定要删除该教师吗？此操作一旦执行无法撤回，请谨慎操作！",
        "确认信息",
        {
          distinguishCancelAndClose: true,
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        }
      )
        .then(async () => {
          var id = scope.row.id;
          const { data: res } = await this.$http.delete(
            "http://127.0.0.1:3000/teamng/deleteInfo/" + id
          );
          console.log(res);
          if(res.meta.status !== 200){
            this.$message.error("删除教师信息失败");
          }
          this.$message.success('删除教师信息成功')
          this.getTeaInfo()
        })
        .catch(action => {
          this.$message({
            type: "info",
            message:
              action === "cancel" ? "放弃删除" : ''
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
</style>