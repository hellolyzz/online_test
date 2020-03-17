<template>
  <!-- 增加题库 -->
  <div class="addQuesBank_box">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">题库管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/allTestInfo' }">所有题库</el-breadcrumb-item>
      <el-breadcrumb-item>{{ courseName}}</el-breadcrumb-item>
      <el-breadcrumb-item>增加题库</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-tabs v-model="activeName">
        <el-tab-pane name="first">
          <span slot="label">当前试卷概况</span>
          <ul>
            <li>试卷名称：{{ courseName }}</li>
            <li>试卷编号：{{ paperId }}</li>
            <li>选择题：{{ totalM }}个（建议在20个以内）</li>
            <li>判断题：{{ totalJ }}个（建议在10个以内）</li>
            <li>填空题：{{ totalF }}个（建议在10个以内）</li>
            <li>*增加题目之后刷新页面再查看当前试卷的数量。</li>
          </ul>
        </el-tab-pane>
        <el-tab-pane name="second">
          <span slot="label">添加选择题（3分/个）</span>
          <el-form
            :model="multiForm"
            :rules="multiFormRules"
            ref="multiFormRef"
            label-width="150px"
            style="width: 80%;"
          >
            <el-form-item prop="subject" label="试题学科">
              <el-input v-model="multiForm.subject"></el-input>
            </el-form-item>
            <el-form-item prop="questionId" label="题号">
              <el-input v-model="multiForm.questionId"></el-input>
            </el-form-item>
            <el-form-item prop="section" label="所属章节">
              <el-input v-model="multiForm.section"></el-input>
            </el-form-item>
            <el-form-item prop="question" label="题目">
              <el-input v-model="multiForm.question"></el-input>
            </el-form-item>
            <el-form-item prop="optionA" label="选项A">
              <el-input v-model="multiForm.optionA"></el-input>
            </el-form-item>
            <el-form-item prop="optionB" label="选项B">
              <el-input v-model="multiForm.optionB"></el-input>
            </el-form-item>
            <el-form-item prop="optionC" label="选项C">
              <el-input v-model="multiForm.optionC"></el-input>
            </el-form-item>
            <el-form-item prop="optionD" label="选项D">
              <el-input v-model="multiForm.optionD"></el-input>
            </el-form-item>
            <el-form-item prop="answer" label="正确选项">
              <!-- <el-input v-model="multiForm.answer"></el-input> -->
              <el-select v-model="multiForm.answer">
                <el-option
                  v-for="item in multiOption"
                  :key="item.value"
                  :label="item.value"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="level" label="难易等级">
              <!-- <el-input v-model="multiForm.level"></el-input> -->
              <el-select v-model="multiForm.level">
                <el-option
                  v-for="item in levelOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="analysis" label="解析">
              <el-input v-model="multiForm.analysis"></el-input>
            </el-form-item>
          </el-form>
          <span class="footer">
            <el-button @click="multiFormReset">清 空</el-button>
            <el-button type="primary" @click="addMultiQ">确 定</el-button>
            <el-button type="primary" @click="toBulkImportMulti">批量导入选择题</el-button>
          </span>
        </el-tab-pane>
        <el-tab-pane name="third">
          <span slot="label">添加判断题（2分/个）</span>
          <el-form
            :model="judgeForm"
            :rules="judgeFormRules"
            ref="judgeFormRef"
            label-width="150px"
            style="width: 80%;"
          >
            <el-form-item prop="subject" label="试题学科">
              <el-input v-model="judgeForm.subject"></el-input>
            </el-form-item>
            <el-form-item prop="questionId" label="题号">
              <el-input v-model="judgeForm.questionId"></el-input>
            </el-form-item>
            <el-form-item prop="section" label="所属章节">
              <el-input v-model="judgeForm.section"></el-input>
            </el-form-item>
            <el-form-item prop="question" label="题目">
              <el-input v-model="judgeForm.question"></el-input>
            </el-form-item>
            <el-form-item prop="answer" label="答案">
              <!-- <el-input v-model="judgeForm.answer"></el-input> -->
              <el-select v-model="judgeForm.answer">
                <el-option
                  v-for="item in judgeOption"
                  :key="item.value"
                  :label="item.value"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="level" label="难易等级">
              <!-- <el-input v-model="judgeForm.level"></el-input> -->
              <el-select v-model="judgeForm.level">
                <el-option
                  v-for="item in levelOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="analysis" label="分析">
              <el-input v-model="judgeForm.analysis"></el-input>
            </el-form-item>
          </el-form>
          <span class="footer">
            <el-button @click="judgeFormReset">清 空</el-button>
            <el-button type="primary" @click="addJudgeQ">确 定</el-button>
          </span>
        </el-tab-pane>
        <el-tab-pane name="fourth">
          <span slot="label">添加填空题（2分/个）</span>
          <el-form
            :model="fillForm"
            :rules="fillFormRules"
            ref="fillFormRef"
            label-width="150px"
            style="width: 80%;"
          >
            <el-form-item prop="subject" label="试题学科">
              <el-input v-model="fillForm.subject"></el-input>
            </el-form-item>
            <el-form-item prop="questionId" label="题号">
              <el-input v-model="fillForm.questionId"></el-input>
            </el-form-item>
            <el-form-item prop="section" label="所属章节">
              <el-input v-model="fillForm.section"></el-input>
            </el-form-item>
            <el-form-item prop="question" label="题目">
              <el-input v-model="fillForm.question"></el-input>
            </el-form-item>
            <el-form-item prop="answer" label="答案">
              <el-input v-model="fillForm.answer"></el-input>
            </el-form-item>
            <el-form-item prop="level" label="难易等级">
              <!-- <el-input v-model="fillForm.level"></el-input> -->
              <el-select v-model="fillForm.level">
                <el-option
                  v-for="item in levelOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="analysis" label="分析">
              <el-input v-model="fillForm.analysis"></el-input>
            </el-form-item>
          </el-form>
          <span class="footer">
            <el-button @click="fillFormReset">清 空</el-button>
            <el-button type="primary" @click="addFillQ">确 定</el-button>
          </span>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      totalF: 0,
      totalM: 0,
      totalJ: 0,
      multiOption: [
        {
          label: "A",
          value: "A"
        },
        {
          label: "B",
          value: "B"
        },
        {
          label: "C",
          value: "C"
        },
        {
          label: "D",
          value: "D"
        }
      ],
      judgeOption: [
        {
          label: "T",
          value: "T"
        },
        {
          label: "F",
          value: "F"
        }
      ],
      activeName: "first",
      multiForm: {},
      judgeForm: {},
      fillForm: {},
      // multiFormRules: {},
      multiFormRules: {
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
            message:
              "请输入题号，建议以试卷编号开头编写题号，防止重复。试卷编号：1003。试题编号：100301",
            trigger: ["blur", "change"]
          },
          {
            min: 6,
            max: 6,
            trigger: ["blur", "change"],
            message: "长度在 6 个字符"
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
            message: "请选择正确答案",
            trigger: ["blur", "change"]
          }
        ],
        level: [
          {
            required: true,
            message: "请选择难易程度",
            trigger: ["blur", "change"]
          }
        ],
        analysis: [
          {
            required: true,
            message: "请输入题目解析，若无则输入“无”",
            trigger: ["blur", "change"]
          }
        ]
      },
      judgeFormRules: {
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
            message:
              "请输入题号，建议以试卷编号开头编写题号，防止重复。试卷编号：1003。试题编号：100301",
            trigger: ["blur", "change"]
          },
          {
            min: 6,
            max: 6,
            trigger: ["blur", "change"],
            message: "长度在 6 个字符"
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
        answer: [
          {
            required: true,
            message: "请选择正确答案的选项",
            trigger: ["blur", "change"]
          }
        ],
        level: [
          {
            required: true,
            message: "请选择难易程度",
            trigger: ["blur", "change"]
          }
        ],
        analysis: [
          {
            required: true,
            message: "请输入题目解析，若无则输入“无”",
            trigger: ["blur", "change"]
          }
        ]
      },
      fillFormRules: {
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
            message:
              "请输入题号，建议以试卷编号开头编写题号，防止重复。试卷编号：1003。试题编号：100301",
            trigger: ["blur", "change"]
          },
          {
            min: 6,
            max: 6,
            trigger: ["blur", "change"],
            message: "长度在 6 个字符"
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
        answer: [
          {
            required: true,
            message: "请输入正确答案",
            trigger: ["blur", "change"]
          }
        ],
        level: [
          {
            required: true,
            message: "请选择难易程度",
            trigger: ["blur", "change"]
          }
        ],
        analysis: [
          {
            required: true,
            message: "请输入题目解析，若无则输入“无”",
            trigger: ["blur", "change"]
          }
        ]
      },
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
      paperId: "",
      courseName: ""
    };
  },
  created() {
    this.getInfo();
    this.getNumberQ();
  },
  methods: {
    getInfo() {
      this.paperId = this.$route.query.paperId;
      this.courseName = this.$route.query.courseName;
      console.log(this.paperId, this.courseName);
    },
    async getNumberQ() {
      const { data: res } = await this.$http.get(
        "http://localhost:3000/ques/getNumberQ/" + this.paperId
      );
      if (res.meta.status !== 200) this.$message.error("获取当前题库数量失败");
      console.log(res);
      this.totalM = res.data.totalM;
      this.totalJ = res.data.totalJ;
      this.totalF = res.data.totalF;
    },
    multiFormReset() {
      this.$refs.multiFormRef.resetFields();
      // console.log('reset')
    },
    judgeFormReset() {
      this.$refs.judgeFormRef.resetFields();
    },
    fillFormReset() {
      this.$refs.fillFormRef.resetFields();
    },
    addMultiQ() {
      // console.log("multi");
      this.$refs.multiFormRef.validate(async valid => {
        if (!valid) return;
        const { data: res } = await this.$http.post(
          "http://localhost:3000/ques/addMulti",
          {
            params: this.multiForm,
            paperId: this.paperId
          }
        );
        console.log(res);
        if (res.meta.status === 401)
          return this.$message.error(res.meta.message);
        if (res.meta.status === 402)
          return this.$message.error(res.meta.message);
        if (res.meta.status === 403)
          return this.$message.error(res.meta.message);
        this.$message.success("增加选择题成功");
        this.$refs.multiFormRef.resetFields();
        this.getNumberQ();
      });
    },
    addJudgeQ() {
      // console.log("judge");
      this.$refs.judgeFormRef.validate(async valid => {
        if (!valid) return;
        const { data: res } = await this.$http.post(
          "http://localhost:3000/ques/addJudge",
          {
            params: this.judgeForm,
            paperId: this.paperId
          }
        );
        console.log(res);
        if (res.meta.status === 401)
          return this.$message.error(res.meta.message);
        if (res.meta.status === 402)
          return this.$message.error(res.meta.message);
        if (res.meta.status === 403)
          return this.$message.error(res.meta.message);
        this.$message.success("增加判断题成功");
        this.$refs.judgeFormRef.resetFields();
        this.getNumberQ();
      });
    },
    addFillQ() {
      // console.log("fill");
      this.$refs.fillFormRef.validate(async valid => {
        if (!valid) return;
        const { data: res } = await this.$http.post(
          "http://localhost:3000/ques/addFill",
          {
            params: this.fillForm,
            paperId: this.paperId
          }
        );
        console.log(res);
        if (res.meta.status === 401)
          return this.$message.error(res.meta.message);
        if (res.meta.status === 402)
          return this.$message.error(res.meta.message);
        if (res.meta.status === 403)
          return this.$message.error(res.meta.message);
        this.$message.success("增加填空题成功");
        this.$refs.fillFormRef.resetFields();
        this.getNumberQ();
      });
    },
    // 跳转到批量导入页面
    toBulkImportMulti(){
      this.$router.push({
        path: '/uploadExcel',
        query: {
          paperId: this.paperId
        }
      })
    }
  }
};
</script>

<style lang="less" scoped>
li {
  list-style: none;
}
.footer {
  display: flex;
  justify-content: center;
}
</style>
