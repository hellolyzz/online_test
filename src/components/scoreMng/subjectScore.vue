<template>
  <div class="subjectScore_box">
    <!-- 根据学科查看学生成绩 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>成绩管理</el-breadcrumb-item>
      <el-breadcrumb-item>成绩查询</el-breadcrumb-item>
      <el-breadcrumb-item>当前学科</el-breadcrumb-item>
      <el-breadcrumb-item class="subjcet">{{ subject }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div class="showword">
        点击查看本课程学生分数饼状图
        <el-button type="primary" size="mini" @click="showEchart">查看</el-button>
      </div>
      <div class="content">
        <el-table :data="tableData" style="width: 50%" stripe border class="elTable">
          <el-table-column label="学号" prop="id"></el-table-column>
          <el-table-column label="姓名" prop="name"></el-table-column>
          <el-table-column label="分数" prop="score"></el-table-column>
        </el-table>
        <div id="eChart"></div>
      </div>
    </el-card>
  </div>
</template>

<script>
var echarts = require("echarts");
export default {
  data() {
    return {
      testCode: 0,
      subject: "",
      tableData: [],
      scoreList: [],
      echartData: [],
      // 存放成绩的数组
      scoreData: []
    };
  },
  created() {
    this.getScore();
  },
  methods: {
    async getScore() {
      this.testCode = this.$route.query.testCode;
      const { data: res } = await this.$http.get(
        "http://localhost:3000/scoreMng/getAllScore/" + this.testCode
      );
      console.log(res);
      if (res.meta.status === 401) {
        this.$message.error(res.meta.message);
      } else if (res.meta.status === 402) {
        this.$message.error(res.meta.message);
      } else if (res.meta.status === 403) {
        this.$message.error(res.meta.message);
      } else {
        this.subject = res.data.score[0].subject;
        this.tableData = res.data.info;
        this.scoreList = res.data.score;
        this.scoreList.map(item => {
          this.tableData.map(item2 => {
            if (item.studentId === item2.id) {
              Object.assign(item2, { score: item.score });
            }
          });
        });
      }
    },
    // 获取图表的时候
    showEchart() {
      // this.getScoreArr()
      this.scoreList.map(item => {
        this.scoreData.push(item.score);
      });
      var countA = 0,
        countB = 0,
        countC = 0,
        countD = 0,
        countE = 0;
      for (var i = 0; i < this.scoreData.length; i++) {
        var val = this.scoreData[i];
        if (val < 60) {
          countE++;
        } else if (val >= 60 && val < 70) {
          countD++;
        } else if (val >= 70 && val < 80) {
          countC++;
        } else if (val >= 80 && val < 90) {
          countB++;
        } else if (val >= 90) {
          countA++;
        }
      }
      // this.echartData 为饼状图数据源
      this.scoreList.map(item => {
        this.echartData.push(item.score);
      });
      // console.log(this.echartData)
      var myChart = echarts.init(document.getElementById("eChart"));
      var option = {
        title: {
          text: this.subject,
          subtext: "所有同学成绩饼状图",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a}： {b} <br/> {c} 人 ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: 10,
          data: ["90分及以上", "80-89分", "70-79分", "60-69分", "60分以下"]
        },
        series: [
          {
            name: "分数段",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: countA, name: "90分及以上" },
              { value: countB, name: "80-89分" },
              { value: countC, name: "70-79分" },
              { value: countD, name: "60-69分" },
              { value: countE, name: "60分以下" }
            ]
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  }
};
</script>

<style lang="less" scoped>
.subjcet {
  color: #333;
}
.showword {
  font-size: 15px;
  color: #333;
  margin: 0 0 10px;
}
.content {
  display: flex;
  justify-content: flex-start;
  .elTable {
    height: 100%;
  }
  #eChart {
    width: 48%;
    height: 450px;
    // border: 1px solid black;
    margin-left: 20px;
  }
}
</style>