<template>
  <div class="addTest_box">
    <!-- 增加考试 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">考试管理</el-breadcrumb-item>
      <el-breadcrumb-item>增加考试</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form
        ref="addFormRef"
        :model="addForm"
        :rules="addFormRules"
        label-width="130px"
        style="width: 50%;"
      >
        <el-form-item prop="testCode" label="考试编号">
          <el-input v-model="addForm.testCode"></el-input>
        </el-form-item>
        <el-form-item prop="description" label="考试描述">
          <el-input v-model="addForm.description"></el-input>
        </el-form-item>
        <el-form-item prop="courseName" label="考试科目">
          <el-input v-model="addForm.courseName"></el-input>
        </el-form-item>
        <el-form-item prop="paperId" label="试卷编号">
          <el-input v-model="addForm.paperId"></el-input>
        </el-form-item>
        <el-form-item prop="testDate" label="考试日期">
          <el-input v-model="addForm.testDate"></el-input>
        </el-form-item>
        <el-form-item prop="totalTime" label="考试时长（分钟）">
          <!-- <el-input v-model="addForm.totalTime"></el-input> -->
          <el-select v-model="addForm.totalTime">
            <el-option v-for="item in totalTime" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="term" label="考试学期">
          <!-- <el-input v-model="addForm.testCode"></el-input> -->
          <el-select v-model="addForm.term">
            <el-option v-for="item in term" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="institute" label="考试学院">
          <el-input v-model="addForm.institute"></el-input>
        </el-form-item>
        <el-form-item prop="major" label="专业">
          <el-input v-model="addForm.institute"></el-input>
        </el-form-item>
        <el-form-item prop="grade" label="年级">
          <el-input v-model="addForm.grade"></el-input>
        </el-form-item>
        <el-form-item prop="type" label="考试类型">
          <el-select v-model="addForm.type">
            <el-option v-for="item in type" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="tips" label="考试提示">
          <el-input v-model="addForm.tips"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="reset">重置</el-button>
          <el-button type="primary" @click="addTest">立即创建考试</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addForm: {},
      addFormRules: {
        testCode: [
          {
            require: true,
            message: "请输入考试编号",
            trigger: ["blur", "change"]
          },
          {
            type: "number",
            message: "考试编号必须为数字",
            trigger: ["blur", "change"]
          }
        ],
        description: [
          {
            require: true,
            message: "请输入考试描述",
            trigger: ["blur", "change"]
          }
        ],
        courseName: [
          {
            require: true,
            message: "请输入考试描述",
            trigger: ["blur", "change"]
          }
        ],
        paperId: [
          {
            require: true,
            message: "请输入试卷编号",
            trigger: ["blur", "change"]
          },
          {
            type: "number",
            message: "试卷编号必须为数字",
            trigger: ["blur", "change"]
          }
        ],
        testDate: [
          {
            require: true,
            message: "请选择考试时间",
            trigger: ["blur", "change"]
          },
        ],
        totalTime: [
          {
            require: true,
            message: "请选择考试时长",
            trigger: ["blur", "change"]
          }
        ],
        term: [
          {
            require: true,
            message: "请选择考试所在学期",
            trigger: ["blur", "change"]
          }
        ],
        institute: [
          {
            require: true,
            message: "请输入考试专业",
            trigger: ["blur", "change"]
          }
        ],
        major: [
          {
            require: true,
            message: "请选择考试专业",
            trigger: ["blur", "change"]
          }
        ],
        grade: [
          {
            require: true,
            message: "请选择测试年级",
            trigger: ["blur", "change"]
          }
        ],
        type: [
          {
            require: true,
            message: "请选择考试类型",
            trigger: ["blur", "change"]
          }
        ],
        tips: [
          {
            require: true,
            message: "请输入考试提示",
            trigger: ["blur", "change"]
          }
        ]
      },
      totalTime: [
        {
          label: "45",
          value: 45
        },
        {
          label: "60",
          value: 60
        },
        {
          label: "90",
          value: 90
        }
      ],
      term: [
        {
          label: "1",
          value: 1
        },
        {
          label: "2",
          value: 2
        }
      ],
      type: [
        {
          label: "开卷",
          value: 1
        },
        {
          label: "闭卷",
          value: 2
        }
      ]
    };
  },
  methods: {
    reset() {
      this.$refs.addFormRef.resetFields();
    },
    addTest() {
      console.log("okk");
    }
  }
};
</script>

<style lang="less" scoped>
</style>