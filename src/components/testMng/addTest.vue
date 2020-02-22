<template>
  <div class="addTest_box">
    <!-- 增加考试 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">考试管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加考试</el-breadcrumb-item>
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
          <!-- <el-input v-model="addForm.testDate"></el-input> -->
          <el-date-picker
            v-model="addForm.testDate"
            type="daterange"
            :picker-options="pickerOptions"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00', '23:59:59']"
          ></el-date-picker>
        </el-form-item>
        <el-form-item prop="totalTime" label="考试时长(min)">
          <!-- <el-input v-model="addForm.totalTime"></el-input> -->
          <el-select v-model="addForm.totalTime">
            <el-option
              v-for="item in totalTime"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="term" label="考试学期">
          <!-- <el-input v-model="addForm.testCode"></el-input> -->
          <el-select v-model="addForm.term">
            <el-option
              v-for="item in term"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="institute" label="考试学院">
          <el-input v-model="addForm.institute"></el-input>
        </el-form-item>
        <el-form-item prop="major" label="专业">
          <el-input v-model="addForm.major"></el-input>
        </el-form-item>
        <el-form-item prop="grade" label="年级">
          <el-input v-model="addForm.grade"></el-input>
        </el-form-item>
        <el-form-item prop="type" label="考试类型">
          <el-select v-model="addForm.type">
            <el-option
              v-for="item in type"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="tips" label="考试提示">
          <el-input v-model="addForm.tips"></el-input>
        </el-form-item>
        <el-form-item>
      <span style="color:red; font-size:12px;">*创建考试之后不可修改，请仔细确定各项信息之后再添加</span>
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
    // 自定义验证规则
    // var checkTestCode = (rule, value, callback) => {
    //     if (!value) {
    //       return callback(new Error('考试编号不能为空'));
    //     }
    //     setTimeout(() => {
    //       if (!Number.isInteger(value)) {
    //         callback(new Error('请输入数字值'));
    //       } else {
    //         if (value.length() > 5) {
    //           callback(new Error('考试编号不能超过5位数'));
    //         } else {
    //           callback();
    //         }
    //       }
    //     }, 1000);
    //   };
    return {
      // 设置禁用过期时间
      pickerOptions: {
        disabledDate: time => {
          return time > this.getTime() || time < new Date();
        }
      },
      addForm: {},
      addFormRules: {
        testCode: [
          {
            required: true,
            message: "请输入考试编号",
            trigger: ["blur", "change"]
          },
          {
            // type: "number",
            min: 6,
            max: 6,
            message: "考试编号必须为数字，且长度在 6 个字符",
            trigger: ["blur", "change"]
          }
          // { validator: checkTestCode, trigger: ["blur", "change"] }
        ],
        description: [
          {
            required: true,
            message: "请输入考试描述",
            trigger: ["blur", "change"]
          }
        ],
        courseName: [
          {
            required: true,
            message: "请输入考试描述",
            trigger: ["blur", "change"]
          }
        ],
        paperId: [
          {
            required: true,
            message: "请输入试卷编号",
            trigger: ["blur", "change"]
          },
          // {
          //   // type: "number",
          //   message: "试卷编号必须为数字",
          //   trigger: ["blur", "change"]
          // }
          {
            min: 4,
            max: 4,
            message: "试卷编号必须为数字，且长度在 4 个字符",
            trigger: ["blur", "change"]
          }
        ],
        testDate: [
          {
            required: true,
            message: "请选择考试时间",
            trigger: ["blur", "change"]
          }
        ],
        totalTime: [
          {
            required: true,
            message: "请选择考试时长",
            trigger: ["blur", "change"]
          }
        ],
        term: [
          {
            required: true,
            message: "请选择考试所在学期",
            trigger: ["blur", "change"]
          }
        ],
        institute: [
          {
            required: true,
            message: "请输入考试专业",
            trigger: ["blur", "change"]
          }
        ],
        major: [
          {
            required: true,
            message: "请选择考试专业",
            trigger: ["blur", "change"]
          }
        ],
        grade: [
          {
            required: true,
            message: "请选择测试年级",
            trigger: ["blur", "change"]
          }
        ],
        type: [
          {
            required: true,
            message: "请选择考试类型",
            trigger: ["blur", "change"]
          }
        ],
        tips: [
          {
            required: true,
            message: "请输入考试提示，若无则输入“无”",
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
    getTime(value) {
      let secondTime = parseInt(value); // 秒
      let minuteTime = 0; // 分
      let hourTime = 0; // 小时
      if (secondTime > 60) {
        //如果秒数大于60，将秒数转换成整数
        //获取分钟，除以60取整数，得到整数分钟
        minuteTime = parseInt(secondTime / 60);
        //获取秒数，秒数取佘，得到整数秒数
        secondTime = parseInt(secondTime % 60);
        //如果分钟大于60，将分钟转换成小时
        if (minuteTime > 60) {
          //获取小时，获取分钟除以60，得到整数小时
          hourTime = parseInt(minuteTime / 60);
          //获取小时后取佘的分，获取分钟除以60取佘的分
          minuteTime = parseInt(minuteTime % 60);
        }
      }
      let result = "" + parseInt(secondTime) + "秒";

      if (minuteTime > 0) {
        result = "" + parseInt(minuteTime) + "分" + result;
      }
      if (hourTime > 0) {
        result = "" + parseInt(hourTime) + "小时" + result;
      }
      return result;
    },
    reset() {
      this.$refs.addFormRef.resetFields();
    },
    addTest() {
      console.log(this.addForm);
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return;
        const { data: res } = await this.$http.post(
          "http://localhost:3000/paperMng",
          {
            params: this.addForm,
            // testDate: this.addForm.testDate[0],
            // testDate2: this.addForm.testDate[1]
          }
        );
        console.log(res);
        if(res.meta.status !== 200) return this.$message.error(res.meta.message)
        this.$message.success(res.meta.message)
        this.$refs.addFormRef.resetFields();
      });
    }
  }
};
</script>

<style lang="less" scoped>
</style>