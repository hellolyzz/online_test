<template>
  <!-- 题库展示 -->
  <div class="quesBank_box">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/allTestInfo' }">所有题库</el-breadcrumb-item>
      <el-breadcrumb-item>当前所选试卷题库</el-breadcrumb-item>
      <el-breadcrumb-item>{{ courseName }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div class="btn">
        <el-button-group>
          <el-button type="primary" plain @click="getMultiQ" :autofocus="true">选择题</el-button>
          <el-button type="primary" plain @click="getJudgeQ">判断题</el-button>
          <el-button type="primary" plain @click="getFillQ">填空题</el-button>
        </el-button-group>
        <el-button type="primary" @click="addQues">添加题目</el-button>
        <!-- <el-radio-group v-model="radio">
          <el-radio-button label="选择题" @click="getMultiQ"></el-radio-button>
          <el-radio-button label="判断题" @change="getJudgeQ"></el-radio-button>
          <el-radio-button label="填空题"></el-radio-button>
        </el-radio-group>-->
      </div>

      <!-- 选择题题目展示 -->
      <el-table :data="multiTableData" border style="width: 100%" v-if="type === 1">
        <el-table-column fixed prop="questionId" label="题号" width="80"></el-table-column>
        <el-table-column prop="question" label="题目" width="300"></el-table-column>
        <el-table-column prop="optionA" label="选项A" width="120"></el-table-column>
        <el-table-column prop="optionB" label="选项B" width="120"></el-table-column>
        <el-table-column prop="optionC" label="选项C" width="120"></el-table-column>
        <el-table-column prop="optionD" label="选项D" width="120"></el-table-column>
        <el-table-column prop="answer" label="正确答案" width="60">
          <template slot-scope="scope">
            <el-tag type="primary">{{ scope.row.answer }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="score" label="分数" width="50"></el-table-column>
        <el-table-column prop="analysis" label="解析" width="120"></el-table-column>
        <el-table-column prop="section" label="所属章节" width="100"></el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click="handleMulti(scope.row)" type="primary" size="mini">编辑</el-button>
            <el-button type="danger" size="mini" @click="deleteMulti(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 选择题分页 -->
      <el-pagination
        v-if="type === 1"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[10, 15, 20]"
        :page-size="queryInfo.pagesise"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
      <!-- 判断题题目展示 -->
      <el-table :data="judgeTableData" border style="width: 100%" v-if="type === 2">
        <el-table-column fixed prop="questionId" label="题号" width="80"></el-table-column>
        <el-table-column prop="question" label="题目" width="300"></el-table-column>
        <el-table-column prop="answer" label="正确答案" width="60">
          <template slot-scope="scope">
            <el-tag type="primary">{{ scope.row.answer }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="score" label="分数" width="50"></el-table-column>
        <el-table-column prop="analysis" label="解析"></el-table-column>
        <el-table-column prop="section" label="所属章节" width="120"></el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click="handleJudge(scope.row)" type="primary" size="mini">编辑</el-button>
            <el-button type="danger" size="mini" @click="deleteJudge(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 判断题分页 -->
      <el-pagination
        v-if="type === 2"
        @size-change="handleSizeChangeJ"
        @current-change="handleCurrentChangeJ"
        :current-page="queryInfoJ.pagenum"
        :page-sizes="[10, 15, 20]"
        :page-size="queryInfoJ.pagesise"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalJ"
      ></el-pagination>
      <!-- 填空题题目展示 -->
      <el-table :data="fillTableData" border style="width: 100%" v-if="type === 3">
        <el-table-column fixed prop="questionId" label="题号" width="80"></el-table-column>
        <el-table-column prop="question" label="题目" width="300"></el-table-column>
        <el-table-column prop="answer" label="正确答案" width="250">
          <template slot-scope="scope">
            <el-tag type="primary">{{ scope.row.answer }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="score" label="分数" width="50"></el-table-column>
        <el-table-column prop="analysis" label="解析" width="120"></el-table-column>
        <el-table-column prop="section" label="所属章节" width="100"></el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click="handleFill(scope.row)" type="primary" size="mini">编辑</el-button>
            <el-button type="danger" size="mini" @click="deleteFill(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 填空题分页 -->
      <el-pagination
        v-if="type === 3"
        @size-change="handleSizeChangeF"
        @current-change="handleCurrentChangeF"
        :current-page="queryInfoF.pagenum"
        :page-sizes="[10, 15, 20]"
        :page-size="queryInfoF.pagesise"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalF"
      ></el-pagination>
      <!-- 编辑题目 -->
      <el-dialog title="编辑题目" :visible.sync="editDialog" width="50%">
        <el-form ref="editFormRef" :model="editForm" :rules="editFormRules" label-width="80px">
          <el-form-item label="题号">
            <!-- <el-input v-model="editForm.questionId"></el-input> -->
            <el-tag type="primary">{{ editForm.questionId }}</el-tag>
          </el-form-item>
          <el-form-item label="试题学科">
            <!-- <el-input v-model="editForm.subject"></el-input> -->
            <el-tag type="primary">{{ editForm.subject }}</el-tag>
          </el-form-item>
          <el-form-item prop="question" label="题目">
            <el-input v-model="editForm.question"></el-input>
          </el-form-item>
          <el-form-item prop="optionA" label="选项A" v-if="editForm.optionA">
            <el-input v-model="editForm.optionA"></el-input>
          </el-form-item>
          <el-form-item prop="optionB" label="选项B" v-if="editForm.optionA">
            <el-input v-model="editForm.optionB"></el-input>
          </el-form-item>
          <el-form-item prop="optionC" label="选项C" v-if="editForm.optionA">
            <el-input v-model="editForm.optionC"></el-input>
          </el-form-item>
          <el-form-item prop="optionD" label="选项D" v-if="editForm.optionA">
            <el-input v-model="editForm.optionD"></el-input>
          </el-form-item>
          <el-form-item prop="answer" label="答案">
            <el-input v-model="editForm.answer"></el-input>
          </el-form-item>
          <el-form-item prop="level" label="难易等级">
            <el-select v-model="editForm.level">
              <el-option
                v-for="item in levelOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="analysis" label="解析">
            <el-input v-model="editForm.analysis"></el-input>
          </el-form-item>
          <el-form-item prop="section" label="章节">
            <el-input v-model="editForm.section"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialog = false">取 消</el-button>
          <el-button type="primary" @click="handleEdit()">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: "",
      addDialog: false,
      courseName: "",
      // 试题类型
      type: 1,
      activeBtn: "multiQ",
      multiTableData: [],
      judgeTableData: [],
      fillTableData: [],
      queryInfo: {
        pagesize: 10,
        pagenum: 1
      },
      queryInfoJ: {
        pagesize: 10,
        pagenum: 1
      },
      queryInfoF: {
        pagesize: 10,
        pagenum: 1
      },
      total: 0,
      totalJ: 0,
      totalF: 0,
      // 编辑题目
      editForm: {},
      // editFormRules: {},
      editDialog: false,
      levelOption: [
        {
          label: "简单",
          value: 1
        },
        {
          label: "一般",
          value: 2
        },
        {
          label: "较难",
          value: 3
        }
      ],
      editFormRules: {
        subject: [
          {
            required: true,
            message: "请输入试题学科",
            trigger: ["blur", "change"]
          }
        ],
        questionId: [
          {
            required: true,
            message: "请输入题号",
            trigger: ["blur", "change"]
          },
          {
            min: 1,
            max: 4,
            trigger: ["blur", "change"],
            message: "长度在 1 到 4 个字符"
          }
        ],
        section: [
          {
            required: true,
            message: "请输入所属章节",
            trigger: ["blur", "change"]
          }
        ],
        question: [
          { required: true, message: "请输入题目", trigger: ["blur", "change"] }
        ],
        optionA: [
          {
            required: true,
            message: "请输入选项A的内容",
            trigger: ["blur", "change"]
          }
        ],
        optionB: [
          {
            required: true,
            message: "请输入选项B的内容",
            trigger: ["blur", "change"]
          }
        ],
        optionC: [
          {
            required: true,
            message: "请输入选项C的内容",
            trigger: ["blur", "change"]
          }
        ],
        optionD: [
          {
            required: true,
            message: "请输入选项D的内容",
            trigger: ["blur", "change"]
          }
        ],
        answer: [
          {
            required: true,
            message: "请输入正确答案的选项",
            trigger: ["blur", "change"]
          }
        ],
        analysis: [
          {
            required: true,
            message: "请输入解析，若无则填写“无”",
            trigger: ["blur", "change"]
          }
        ],
        level: [
          {
            required: true,
            message: "请选择难易程度",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  created() {
    this.getMultiQ();
  },
  methods: {
    // 选择题
    async getMultiQ() {
      this.type = 1;
      var paperId = this.$route.query.paperId;
      this.courseName = this.$route.query.courseName;
      console.log(this.courseName);
      const { data: res } = await this.$http.get(
        "http://127.0.0.1:3000/ques/multichoice/" + paperId,
        {
          params: this.queryInfo
        }
      );
      console.log(res);
      if (res.meta.status !== 200) {
        this.$message.error("获取选择题失败");
      }
      this.multiTableData = res.data.data;
      this.total = res.data.total;
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getMultiQ();
    },
    // 当前页码发生变化
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getMultiQ();
    },
    // 判断题
    async getJudgeQ() {
      this.type = 2;
      var paperId = this.$route.query.paperId;
      this.courseName = this.$route.query.courseName;
      // console.log(paperId);
      const { data: res } = await this.$http.get(
        "http://127.0.0.1:3000/ques/judgeques/" + paperId,
        {
          params: this.queryInfoJ
        }
      );
      console.log(res);
      if (res.meta.status !== 200) {
        this.$message.error("获取判断题失败");
      }
      this.judgeTableData = res.data.data;
      this.totalJ = res.data.total;
    },
    handleSizeChangeJ(newSize) {
      this.queryInfoJ.pagesize = newSize;
      this.getJudgeQ();
    },
    // 当前页码发生变化
    handleCurrentChangeJ(newPage) {
      this.queryInfoJ.pagenum = newPage;
      this.getJudgeQ();
    },
    // 填空题
    async getFillQ() {
      // console.log("12");
      this.type = 3;
      var paperId = this.$route.query.paperId;
      this.courseName = this.$route.query.courseName;
      // console.log(paperId);
      const { data: res } = await this.$http.get(
        "http://127.0.0.1:3000/ques/fillques/" + paperId,
        {
          params: this.queryInfoF
        }
      );
      console.log(res);
      if (res.meta.status !== 200) {
        this.$message.error("获取填空题失败");
      }
      this.fillTableData = res.data.data;
      this.totalF = res.data.total;
    },
    handleSizeChangeF(newSize) {
      this.queryInfoF.pagesize = newSize;
      this.getFillQ();
    },
    // 当前页码发生变化
    handleCurrentChangeF(newPage) {
      this.queryInfoF.pagenum = newPage;
      this.getFillQ();
    },
    // 添加题目
    addQues() {
      var paperId = this.$route.query.paperId;
      this.courseName = this.$route.query.courseName;
      // console.log('123')
      this.$router.push({
        path: "/addQuesBank",
        query: {
          paperId: paperId,
          courseName: this.courseName
        }
      });
      // this.addDialog = true;
    },
    // 编辑选择题
    async handleMulti(item) {
      this.editDialog = true;
      var id = item.questionId;
      const { data: res } = await this.$http.get(
        "http://localhost:3000/ques/findMultiById/" + id
      );
      // console.log(res)
      this.editForm = res.data;
    },
    // 编辑判断题
    async handleJudge(item) {
      this.editDialog = true;
      var id = item.questionId;
      const { data: res } = await this.$http.get(
        "http://localhost:3000/ques/findJudgeById/" + id
      );
      // console.log(res)
      this.editForm = res.data;
    },
    // 编辑填空题
    async handleFill(item) {
      this.editDialog = true;
      var id = item.questionId;
      const { data: res } = await this.$http.get(
        "http://localhost:3000/ques/findFillById/" + id
      );
      // console.log(res)
      this.editForm = res.data;
    },
    // 保存修改信息
    handleEdit() {
      // console.log(this.type);
      console.log(this.editForm.questionId);
      var questionId = this.editForm.questionId;
      // this.type 展示当前是在保存选择题1/判断题2/填空题3
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return;
        if (this.type === 1) {
          const { data: res } = await this.$http.post(
            "http://localhost:3000/ques/editMulti/" + questionId,
            this.editForm
          );
          console.log(res);
          if (res.meta.status !== 200)
            return this.$message.error(res.meta.message);
          this.$message.success(res.meta.message);
          this.editDialog = false;
          this.getMultiQ();
        } else if (this.type === 2) {
          const { data: res } = await this.$http.post(
            "http://localhost:3000/ques/editJudge/" + questionId,
            this.editForm
          );
          console.log(res);
          if (res.meta.status !== 200)
            return this.$message.error(res.meta.message);
          this.$message.success(res.meta.message);
          this.editDialog = false;
          this.getJudgeQ();
        } else {
          const { data: res } = await this.$http.post(
            "http://localhost:3000/ques/editFill/" + questionId,
            this.editForm
          );
          console.log(res);
          if (res.meta.status !== 200)
            return this.$message.error(res.meta.message);
          this.$message.success(res.meta.message);
          this.editDialog = false;
          this.getFillQ();
        }
      });
    },
    // 删除选择题
    deleteMulti(item) {
      console.log(item.questionId);
      var questionId = item.questionId;
      this.$confirm("此操作将永久删除该题目, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const { data: res } = await this.$http.delete(
            "http://localhost:3000/ques/deleteMulti/" + questionId
          );
          console.log(res);
          if (res.meta.status !== 200)
            return this.$message.error(res.meta.message);
          this.$message.success(res.meta.message);
          this.getMultiQ();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 删除判断题
    deleteJudge(item) {
      console.log(item.questionId);
      var questionId = item.questionId;
      this.$confirm("此操作将永久删除该题目, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const { data: res } = await this.$http.delete(
            "http://localhost:3000/ques/deleteJudge/" + questionId
          );
          console.log(res);
          if (res.meta.status !== 200)
            return this.$message.error(res.meta.message);
          this.$message.success(res.meta.message);
          this.getJudgeQ();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 删除填空题
    deleteFill(item) {
      console.log(item.questionId);
      var questionId = item.questionId;
      this.$confirm("此操作将永久删除该题目, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const { data: res } = await this.$http.delete(
            "http://localhost:3000/ques/deleteFill/" + questionId
          );
          console.log(res);
          if (res.meta.status !== 200)
            return this.$message.error(res.meta.message);
          this.$message.success(res.meta.message);
          this.getFillQ();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style lang="less" scoped>
.el-button {
  margin-bottom: 15px;
}
.btn {
  display: flex;
  justify-content: space-between;
}
</style>