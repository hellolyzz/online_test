<template>
  <!-- 增加题库 -->
  <div class="addQuesBank_box">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">题库管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/allTestInfo' }">所有题库</el-breadcrumb-item>
      <el-breadcrumb-item >{{ courseName}}</el-breadcrumb-item>
      <el-breadcrumb-item>增加题库</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-tabs v-model="activeName">
        <el-tab-pane name="first">
          <span slot="label">添加选择题</span>
          <el-form
            :model="multiForm"
            :rules="multiFormRules"
            ref="multiFormRef"
            label-width="150px"
            style="width: 80%;"
          >
            <el-form-item props="subject" label="试题学科">
              <el-input v-model="multiForm.subject"></el-input>
            </el-form-item>
            <el-form-item props="questionId" label="题号">
              <el-input v-model="multiForm.questionId"></el-input>
            </el-form-item>
            <el-form-item props="section" label="所属章节">
              <el-input v-model="multiForm.section"></el-input>
            </el-form-item>
            <el-form-item props="question" label="题目">
              <el-input v-model="multiForm.question"></el-input>
            </el-form-item>
            <el-form-item props="optionA" label="选项A">
              <el-input v-model="multiForm.optionA"></el-input>
            </el-form-item>
            <el-form-item props="optionB" label="选项B">
              <el-input v-model="multiForm.optionB"></el-input>
            </el-form-item>
            <el-form-item props="optionC" label="选项C">
              <el-input v-model="multiForm.optionC"></el-input>
            </el-form-item>
            <el-form-item props="optionD" label="选项D">
              <el-input v-model="multiForm.optionD"></el-input>
            </el-form-item>
            <el-form-item props="answer" label="正确选项">
              <el-input v-model="multiForm.answer"></el-input>
            </el-form-item>
            <el-form-item props="analysis" label="解析">
              <el-input v-model="multiForm.analysis"></el-input>
            </el-form-item>
            <el-form-item props="score" label="分数">
              <el-input v-model="multiForm.score"></el-input>
            </el-form-item>
            <el-form-item props="level" label="难易等级">
              <!-- <el-input v-model="multiForm.level"></el-input> -->
              <el-select v-model="multiForm.level">
                <el-option
                  v-for="item in multiOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <span class="footer">
            <el-button @click="multiFormReset">清 空</el-button>
            <el-button type="primary" @click="addMultiQ">确 定</el-button>
          </span>
        </el-tab-pane>
        <el-tab-pane name="second">
          <span slot="label">添加判断题</span>
          <el-form
            :model="judgeForm"
            :rules="judgeFormRules"
            ref="judgeFormRef"
            label-width="150px"
            style="width: 80%;"
          >
            <el-form-item props="subject" label="试题学科">
              <el-input v-model="judgeForm.subject"></el-input>
            </el-form-item>
             <el-form-item props="questionId" label="题号">
              <el-input v-model="judgeForm.questionId"></el-input>
            </el-form-item>
            <el-form-item props="section" label="所属章节">
              <el-input v-model="judgeForm.section"></el-input>
            </el-form-item>
            <el-form-item props="question" label="题目">
              <el-input v-model="judgeForm.question"></el-input>
            </el-form-item>
             <el-form-item props="answer" label="答案（T/F）">
              <el-input v-model="judgeForm.answer"></el-input>
            </el-form-item>
            <el-form-item props="analysis" label="分析">
              <el-input v-model="judgeForm.analysis"></el-input>
            </el-form-item>
            <el-form-item props="score" label="分数">
              <el-input v-model="judgeForm.score"></el-input>
            </el-form-item>
            <el-form-item props="level" label="难易等级">
              <!-- <el-input v-model="judgeForm.level"></el-input> -->
              <el-select v-model="judgeForm.level">
                <el-option
                  v-for="item in multiOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <span class="footer">
            <el-button @click="judgeFormReset">清 空</el-button>
            <el-button type="primary" @click="addJudgeQ">确 定</el-button>
          </span>
        </el-tab-pane>
        <el-tab-pane name="third">
          <span slot="label">添加填空题</span>
          <el-form
            :model="fillForm"
            :rules="fillFormRules"
            ref="fillFormRef"
            label-width="150px"
            style="width: 80%;"
          >
            <el-form-item props="subject" label="试题学科">
              <el-input v-model="fillForm.subject"></el-input>
            </el-form-item>
             <el-form-item props="questionId" label="题号">
              <el-input v-model="fillForm.questionId"></el-input>
            </el-form-item>
            <el-form-item props="section" label="所属章节">
              <el-input v-model="fillForm.section"></el-input>
            </el-form-item>
            <el-form-item props="question" label="题目">
              <el-input v-model="fillForm.question"></el-input>
            </el-form-item>
             <el-form-item props="answer" label="答案">
              <el-input v-model="fillForm.answer"></el-input>
            </el-form-item>
            <el-form-item props="analysis" label="分析">
              <el-input v-model="fillForm.analysis"></el-input>
            </el-form-item>
            <el-form-item props="score" label="分数">
              <el-input v-model="fillForm.score"></el-input>
            </el-form-item>
            <el-form-item props="level" label="难易等级">
              <!-- <el-input v-model="fillForm.level"></el-input> -->
              <el-select v-model="fillForm.level">
                <el-option
                  v-for="item in multiOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
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
      activeName: "first",
      multiForm: {},
      judgeForm: {},
      fillForm: {},
      multiFormRules: {},
      judgeFormRules: {},
      fillFormRules: {},
      multiOption: [
        {
          label: "1",
          value: 1
        },
        {
          label: "2",
          value: 2
        },
        {
          label: "3",
          value: 3
        }
      ],
      paperId: '',
      courseName: ''
    };
  },
  created(){
    this.getInfo()
  },
  methods: {
    getInfo(){
      this.paperId = this.$route.query.paperId;
      this.courseName = this.$route.query.courseName;
      console.log(this.paperId,this.courseName)
    },
    multiFormReset(){
      this.$refs.multiFormRef.resetFields()
      // console.log('reset')
    },
    judgeFormReset(){
      this.$refs.judgeFormRef.resetFields()
    },
    fillFormReset(){
      this.$refs.fillFormRef.resetFields()
    },
    addMultiQ(){
      console.log('multi')
    },
    addJudgeQ(){
      console.log('judge')
    },
    addFillQ(){
      console.log('fill')
    }
  }
};
</script>

<style lang="less" scoped>
.footer{
  display: flex;
  justify-content: center;
}
</style>
