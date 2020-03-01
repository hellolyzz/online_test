<template>
  <div class="paperInfo_box">
    <!-- 试卷详情 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/myTest' }">考试系统</el-breadcrumb-item>
      <el-breadcrumb-item>我的试卷</el-breadcrumb-item>
      <el-breadcrumb-item>试卷详情</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 内容区域 -->
    <div class="wrapper">
      <!-- 试卷信息 -->
      <div class="paperInfo">
        <div class="title_box">
          <div class="title">{{ paperInfo.courseName }}</div>
          <div class="info">
            <span>{{ paperInfo.description }}</span>
            <span>{{ paperInfo.institute }}</span>
            <span>{{ paperInfo.type === 1 ? "开卷考试" : "闭卷考试" }}</span>
          </div>
        </div>
        <div class="score_box">
          <div class="total">
            <span class="word">总分</span>
            <span class="number">{{ paperInfo.totalScore }}</span>
          </div>
          <div class="btn">
            <el-button @click="startAnswer">开始答题</el-button>
          </div>
        </div>
      </div>
      <!-- 分界线 -->
      <div class="line"></div>
      <!-- 试题分数分布 -->
      <div class="scoreDistribute">
        <span>试题分数分布</span>
        <ul>
          <li>选择题(共 20 题 共计 60 分)</li>
          <li>判断题(共 10 题 共计 20 分)</li>
          <li>填空题(共 10 题 共计 20 分)</li>
        </ul>
      </div>
      <div class="line"></div>
      <!-- 考生须知 -->
      <div class="tipsInfo">
        <span>考生须知</span>
        <div class="specialTips">特别注意：{{ paperInfo.tips }}</div>
        <div class="tips">
          一、参加闭卷考试，考生入场除携带必要的文具外，不准携带与考试有关的书籍、资料、笔记本、纸条和自备草稿纸；不准携带各种通讯工具（如巡呼机、移动电话等）和具有收录、储存、记忆功能的电子工具。已携带入场的应交监考人员保存。
          参加开卷考试，考生除携带必要的文具外，可携带与该考试科目有关的书籍、资料等进入考场，但不准携带各种通讯工具（如巡呼机、移动电话等）。
        </div>
        <div class="tips">二、考生不得询问试题题意，若发现试题字迹模糊或试题有误，可举手向监考人员询问，不得擅自询问其他考生。</div>
        <div
          class="tips"
        >三、考场内考生必须服从监考人员的监督管理，自觉维护考场秩序。不准交头接耳，左顾右盼，传递物品，打手势，做暗号；不准偷看、抄袭他人答卷或允许他人抄袭自己的试卷；不准冒名或换卷；严禁夹带以及其他违纪、舞弊行为。</div>
        <div class="tips">四、考试结束时间一到，考生立即停止答卷，并按监考人员要求退离考场。严禁将试卷、答题卡和考场统一发放的草稿纸带出考场。</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      testCode: 0,
      paperInfo: {}
    };
  },
  created() {
    this.getParperInfo();
  },
  methods: {
    async getParperInfo() {
      this.testCode = this.$route.query.testCode;
      console.log(this.testCode);
      const { data: res } = await this.$http.get(
        "http://localhost:3000/stuFront/getPaperInfo/" + this.testCode
      );
      console.log(res);
      if (res.meta.status !== 200) return this.$message.error(res.meta.message);
      this.paperInfo = res.data;
    },
    // 开始答题
    startAnswer(){
      this.testCode = this.$route.query.testCode;
      this.$router.push({
        path: '/answering',
        query: {
          testCode: this.testCode
        }
      })
    }
  }
};
</script>

<style lang="less" scoped>
ul li {
  list-style: none;
  margin-left: 20px;
  font-size: 16px;
  color: #88949b;
  font-weight: 700;
  margin-top: 5px;
}
.paperInfo_box {
  width: 75%;
  margin: 0 auto;
  .wrapper {
    background-color: #fff;
    padding: 30px;
    .paperInfo {
      // border: 1px solid black;
      display: flex;
      justify-content: space-between;
      .title_box {
        .title {
          font-size: 22px;
          font-weight: 700;
          color: #333;
        }
        .info {
          margin-top: 35px;
          color: #999;
          font-size: 14px;
          //  display: flex;
          // flex-direction: column-reverse;
          span {
            border: 1px solid #999;
            border-radius: 5px;
            padding: 5px;
            margin-right: 10px;
          }
        }
      }
      .score_box {
        .total {
          // border: 1px solid green;
          .word {
            // margin: 10px;
            padding: 4px 10px;
            color: #fff;
            background-color: #88949b;
            font-size: 22px;
            border: 1px dashed #88949b;
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;
          }
          .number {
            // margin: 10px;
            padding: 4px 10px;
            background-color: #fff;
            color: #ccc;
            font-weight: 500;
            font-size: 22px;
            border: 1px dashed #88949b;
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
          }
        }
        .btn {
          margin-top: 20px;
          display: flex;
          justify-content: flex-end;
        }
      }
    }
    .line {
      color: #999;
      margin: 30px 0;
      border-bottom: 1px solid #eee;
    }
    .scoreDistribute,
    .tipsInfo {
      // border: 1px solid red;
      span {
        font-weight: 600;
        color: #333;
      }
    }
    .tipsInfo {
      .specialTips {
        font-size: 15px;
        margin: 10px 0 5px;
        text-indent: 32px;
        color: red;
      }
      .tips {
        font-size: 14px;
        text-indent: 32px;
        line-height: 20px;
      }
    }
  }
}
</style>