<!--考生答题界面-->
<template>
  <div id="answer">
    <!--顶部信息栏-->
    <div class="top">
      <ul class="item">
        <li>
          <i class="el-icon-s-fold" ref="toggle" @click="slider_flag = !slider_flag"></i>
        </li>
        <li>{{paperInfo.courseName}}考试</li>
        <li>姓名：{{userInfo.name}}</li>
        <li>学号: {{userInfo.id}}</li>
      </ul>
    </div>
    <div class="flexarea">
      <!--左边题目编号区-->
      <transition name="slider-fade">
        <div class="left" v-if="slider_flag">
          <ul class="l-top">
            <li>
              <a href="javascript:;"></a>
              <span>当前</span>
            </li>
            <li>
              <a href="javascript:;"></a>
              <span>未答</span>
            </li>
            <li>
              <a href="javascript:;"></a>
              <span>已答</span>
            </li>
            <li>
              <a href="javascript:;"></a>
              <span>标记</span>
            </li>
          </ul>
          <div class="l-bottom">
            <!-- 选择题 -->
            <div class="item">
              <p>选择题部分</p>
              <ul>
                <li v-for="(item1, index1) in paperPart[0]" :key="index1">
                  <a
                    href="javascript:;"
                    @click="multi(index1)"
                    :class="{'border': index == index1 && currentType == 1,'bg': bg_flag && paperPart[0][index1].isClick == true}"
                  >
                    <span :class="{'mark': paperPart[0][index1].isMark == true}"></span>
                    {{index1+1}}
                  </a>
                </li>
              </ul>
            </div>

            <!-- 判断题 -->
            <div class="item">
              <p>判断题部分</p>
              <ul>
                <li v-for="(item2, index2) in paperPart[1]" :key="index2">
                  <a
                    href="javascript:;"
                    @click="judge(index2)"
                    :class="{'border': index == index2 && currentType == 2,'bg': bg_flag && paperPart[1][index2].isClick == true}"
                  >
                    <span :class="{'mark': paperPart[1][index2].isMark == true}"></span>
                    <!-- {{topicCount[0]+topicCount[1]+index2+1}} -->
                    {{ 20 + index2 + 1 }}
                  </a>
                </li>
              </ul>
            </div>

            <!-- 填空题 -->
            <div class="item">
              <p>填空题部分</p>
              <ul>
                <li v-for="(item3, index3) in paperPart[2]" :key="index3">
                  <a
                    href="javascript:;"
                    @click="fill(index3)"
                    :class="{'border': index == index3 && currentType == 3,'bg': paperPart[2][index3] == true}"
                  >
                    <span :class="{'mark': paperPart[1][index3].isMark == true}"></span>
                    <!-- {{topicCount[0]+index3+1}} -->
                    {{ 30 + index3 + 1 }}
                  </a>
                </li>
              </ul>
            </div>
            <div class="final" @click="commit()">结束考试</div>
          </div>
        </div>
      </transition>
      <!--右边选择答题区-->
      <transition name="slider-fade">
        <div class="right">
          <div class="title">
            <p>{{title}}</p>
            <i class="iconfont icon-right auto-right"></i>
            <span>
              全卷共40题
              <i class="iconfont icon-time"></i>倒计时：
              <b>{{time}}</b>分钟
            </span>
          </div>
          <div class="content">
            <p class="topic">
              <span class="number">{{number}}</span>
              {{showQuestion}}
            </p>
            <!-- 选择题 -->
            <div v-if="currentType == 1">
              <el-radio-group v-model="multiRadio[index]" @change="getChangeLabel">
                <el-radio :label="1">A：{{showAnswer.optionA}}</el-radio>
                <el-radio :label="2">B：{{showAnswer.optionB}}</el-radio>
                <el-radio :label="3">C：{{showAnswer.optionC}}</el-radio>
                <el-radio :label="4">D：{{showAnswer.optionD}}</el-radio>
              </el-radio-group>
              <div class="analysis" v-if="isPractice">
                <ul>
                  <li>
                    <el-tag type="success">正确姿势：</el-tag>
                    <span class="right">{{reduceAnswer.rightAnswer}}</span>
                  </li>
                  <li>
                    <el-tag>题目解析：</el-tag>
                  </li>
                  <li>{{reduceAnswer.analysis == null ? '暂无解析': reduceAnswer.analysis}}</li>
                </ul>
              </div>
            </div>

            <!-- 判断题 -->
            <div class="judge" v-if="currentType == 2">
              <el-radio-group
                v-model="judgeAnswer[index]"
                @change="getJudgeLabel"
                v-if="currentType == 2"
              >
                <el-radio :label="1">正确</el-radio>
                <el-radio :label="2">错误</el-radio>
              </el-radio-group>
              <div class="analysis" v-if="isPractice">
                <ul>
                  <li>
                    <el-tag type="success">正确姿势：</el-tag>
                    <span class="right">{{paperPart[2][index].answer}}</span>
                  </li>
                  <li>
                    <el-tag>题目解析：</el-tag>
                  </li>
                  <li>{{paperPart[2][index].analysis == null ? '暂无解析': paperPart[2][index].analysis}}</li>
                </ul>
              </div>
            </div>

            <!-- 填空题 -->
            <div class="fill" v-if="currentType == 3">
              <div v-for="(item,currentIndex) in part" :key="currentIndex">
                <el-input
                  placeholder="请填在此处"
                  v-model="fillAnswer[index][currentIndex]"
                  clearable
                  @blur="fillBG"
                ></el-input>
              </div>
              <div class="analysis" v-if="isPractice">
                <ul>
                  <li>
                    <el-tag type="success">正确姿势：</el-tag>
                    <span class="right">{{paperPart[2][index].answer}}</span>
                  </li>
                  <li>
                    <el-tag>题目解析：</el-tag>
                  </li>
                  <li>{{paperPart[2][index].analysis == null ? '暂无解析': paperPart[2][index].analysis}}</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="operation">
            <ul class="end">
              <li @click="previous()">
                <i class="iconfont icon-previous"></i>
                <span>上一题</span>
              </li>
              <li @click="mark()">
                <i class="iconfont icon-mark-o"></i>
                <span>标记</span>
              </li>
              <li @click="next()">
                <span>下一题</span>
                <i class="iconfont icon-next"></i>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 试卷编号
      testCode: 0,
      // 试卷信息
      paperInfo: {},
      // 用户信息
      userInfo: {
        name: null,
        id: null
      },
      // 是否隐藏左侧选项区域
      slider_flag: true,
      //试卷信息
      paperPart: {},
      // 当前显示题目信息
      showQuestion: [],
      // 题号
      number: 1,
      // 全局index，当前所在题目对应的题号
      index: 0,
      //  选择题是否点击标识符
      isFillClick: false,
      // 当前题型类型  1--选择题  2--判断题  3--填空题
      currentType: 1,
      // 判断是否是在练习的情况下
      isPractice: false,
      // 保存考生所有选择题的 选中的选项
      multiRadio: [],
      // 保存选择题作答编号 以题号作为索引 值为 每个题选中的选项 1 2 3 4
      multiAnswer: [],
      // 保存所有判断题答案
      judgeAnswer: [],
      //二维数组保存所有填空题答案
      fillAnswer: [[]],

      startTime: null, //考试开始时间
      endTime: null, //考试结束时间
      time: null, //考试持续时间
      reduceAnswer: [], //vue官方不支持3层以上数据嵌套,如嵌套则会数据渲染出现问题,此变量直接接收3层嵌套时的数据。
      answerScore: 0, //答题总分数
      bg_flag: false, //已答标识符,已答改变背景色

      flag: false, //个人信息显示隐藏标识符
      title: "请选择正确的选项",
      topicCount: [], //每种类型题目的总数
      score: [], //每种类型分数的总数
      examData: {
        //考试信息
        // source: null,
        // totalScore: null,
      },

      showAnswer: {}, //当前题目对应的答案选项
      part: null, //填空题的空格数量
      rightAnswer: ""
    };
  },
  created() {
    this.getUserInfo();
    this.getPaperInfo();
    this.getPaperDetail();
    this.showTime();
  },
  methods: {
    // 获取用户信息
    getUserInfo() {
      this.userInfo.name = window.sessionStorage.getItem("name");
      this.userInfo.id = window.sessionStorage.getItem("id");
    },
    // 日期格式化
    getTime(date) {
      let year = date.getFullYear();
      let month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      let hours =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      let minutes =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      let seconds =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      // 拼接
      return (
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds
      );
    },
    // 获取当前试卷信息
    async getPaperInfo() {
      console.log(this.userInfo.id)
      let date = new Date();
      this.startTime = this.getTime(date);
      this.testCode = this.$route.query.testCode;
      console.log(this.testCode);
      // const { data: res } = await this.$http.get('http://localhost:3000/')
      const { data: res } = await this.$http.get(
        "http://localhost:3000/stuFront/getPaperInfo/" ,{
          params: {
            id: this.userInfo.id,
            testCode: this.testCode
          }
        });
      console.log(res);
      if (res.meta.status !== 200) return this.$message.error(res.meta.message);
      this.paperInfo = res.data;
      this.time = this.paperInfo.totalTime
    },
    // 获取试卷全部 试题 信息 并初始化首页信息
    async getPaperDetail() {
      this.testCode = this.$route.query.testCode;
      console.log(this.testCode);
      const { data: res } = await this.$http.get(
        "http://localhost:3000/stuFront/getQuesByPaperCode/" + this.testCode
      );
      console.log(res);
      // res.data 是一个二维数组[[选择题{},{},{}],[判断题{,{}}],[填空题{},{}]]
      if (res.meta.status !== 200) return this.$message.error(res.meta.message);
      this.paperPart = { ...res.data }; //对象
      var ArrPart = Object.keys(this.paperPart);
      // console.log(this.paperPart)
      // console.log(ArrPart)
      // 生成二维数组 father 存放填空题答案
      var father = [];
      for (var i = 0; i < 10; i++) {
        var child = [null, null, null, null];
        father.push(child);
      }
      this.fillAnswer = father;
      var dataInit = this.paperPart[0];
      console.log(dataInit);
      this.number = 1;
      this.showQuestion = dataInit[0].question;
      this.showAnswer = dataInit[0];
    },
    // 选择题
    multi(item) {
      this.index = item;
      this.isFillClick = true;
      this.currentType = 1;
      var len = this.paperPart[0].length;
      // console.log(len); // 20
      if (this.index < len) {
        if (this.index <= 0) {
          this.index = 0;
        }
        console.log(`总长度${len}`);
        console.log(`当前index:${this.index}`);
        this.title = "请选择正确的选项";
        let Data = this.paperPart[0];
        // console.log(Data)
        this.showQuestion = Data[this.index].question; //获取题目信息
        this.showAnswer = Data[this.index];
        this.number = this.index + 1;
      } else if (this.index >= len) {
        this.index = 0;
        this.judge(this.index);
      }
    },
    // 判断题
    judge(item) {
      this.index = item;
      let len = this.paperPart[1].length;
      this.currentType = 2;
      if (this.index < len) {
        if (this.index < 0) {
          this.index = this.paperPart[1].length - 1;
          this.change(this.index);
        } else {
          console.log(`总长度${len}`);
          console.log(`当前index:${this.index}`);
          this.title = "请作出正确判断";
          let Data = this.paperPart[1];
          console.log(Data);
          this.showQuestion = Data[this.index].question; //获取题目信息
          this.number = 20 + this.index + 1;
        }
      } else if (this.index >= len) {
        this.index = 0;
        this.fill(this.index);
      }
      // console.log(item);
    },
    // 填空题
    fill(item) {
      this.index = item;
      let len = this.paperPart[2].length;
      this.currentType = 3;
      if (this.index < len) {
        if (this.index < 0) {
          this.index = this.paperPart[1].length - 1;
          this.judge(this.index);
        } else {
          console.log(`总长度${len}`);
          console.log(`当前index:${this.index}`);
          this.title = "请在横线处填写答案";
          let Data = this.paperPart[2];
          console.log(Data);
          this.showQuestion = Data[this.index].question; //获取题目信息
          let part = this.showQuestion.split("()").length - 1; //根据题目中括号的数量确定填空横线数量
          this.part = part;
          this.number = 30 + this.index + 1;
        }
      } else if (index >= len) {
        this.index = 0;
        this.multi(this.index);
      }
      // console.log(item);
    },
    // 填空题已答题目 如果已答该题目,设置第四个元素为true为标识符
    fillBG() {
      if (this.fillAnswer[this.index][0] != null) {
        this.fillAnswer[this.index][3] = true;
      }
    },
    // 选中 选择题 答案
    getChangeLabel(val) {
      //当前选择的序号 1 2 3 4
      console.log(val);
      this.multiRadio[this.index] = val;
      // 如果选择了某个选项
      if (val) {
        let data = this.paperPart[0];
        this.bg_flag = true;
        data[this.index]["isClick"] = true;
      }
      // 保存学生答题选项 用索引值作为下标 给每个下表对应的题号 赋值
      this.multiAnswer[this.index] = val;
      // console.log(this.multiAnswer);
    },
    // 选中 判断题 答案
    getJudgeLabel(val) {
      this.judgeAnswer[this.index] = val;
      if (val) {
        let data = this.paperPart[1];
        this.bg_flag = true;
        data[this.index]["isClick"] = true;
      }
      // console.log("判断题");
    },
    // 上一题
    previous() {
      this.index--;
      switch (this.currentType) {
        case 1:
          this.multi(this.index);
          break;
        case 2:
          this.judge(this.index);
          break;
        case 3:
          this.fill(this.index);
          break;
      }
    },
    // 下一题
    next() {
      this.index++;
      switch (this.currentType) {
        case 1:
          this.multi(this.index);
          break;
        case 2:
          this.judge(this.index);
          break;
        case 3:
          this.fill(this.index);
          break;
      }
    },
    // 标记功能
    mark() {
      switch (this.currentType) {
        case 1:
          this.paperPart[0][this.index]["isMark"] = true; // 选择题标记
          break;
        case 2:
          this.paperPart[1][this.index]["isMark"] = true; // 判断题标记
          break;
        case 3:
          this.paperPart[2][this.index]["isMark"] = true; // 填空题标记
      }
    },
    // 答案提交 并计算分数
    commit() {
      // 计算选择题总分
      let multiAnswer = this.multiAnswer;
      let finalScore = 0;
      multiAnswer.forEach((item, index) => {
        //循环每道选择题根据选项计算分数
        let option = null;
        if (item != null) {
          switch (
            item //选项1,2,3,4 转换为 "A","B","C","D"
          ) {
            case 1:
              option = "A";
              break;
            case 2:
              option = "B";
              break;
            case 3:
              option = "C";
              break;
            case 4:
              option = "D";
          }
          if (option == this.paperPart[0][index].answer) {
            // 当前选项与正确答案对比
            finalScore += this.paperPart[0][index].score; // 计算总分数
          }
          console.log(option, this.paperPart[0][index].answer);
        }
        // console.log(multiAnswer)
      });
      // 计算 判断题 总分
      let newJudgeAnswer = this.judgeAnswer;
      newJudgeAnswer.forEach((item, index) => {
        let option = null;
        switch (item) {
          case 1:
            option = "T";
            break;
          case 2:
            option = "F";
        }
        if (option == this.paperPart[1][index].answer) {
          // 当前选项与正确答案对比
          finalScore += this.paperPart[1][index].score; // 计算总分数
        }
      });
      // 计算填空题总分
      // console.log(`this.fillAnswer${this.fillAnswer}`)
      // console.log(this.paperPart[0][this.index])
      let fillAnswer = this.fillAnswer;
      fillAnswer.forEach((item, index) => {
        //此处index和 this.index数据不一致，注意
        item.forEach(inner => {
          if (this.paperPart[2][index].answer.includes(inner)) {
            //判断填空答案是否与数据库一致
            console.log("正确");
            finalScore += this.paperPart[2][this.index].score;
          }
        });
      });
      console.log(`目前总分${finalScore}`);
      if (this.time != 0) {
        this.$confirm("考试结束时间未到,是否提前交卷", "友情提示", {
          confirmButtonText: "立即交卷",
          cancelButtonText: "再检查一下",
          type: "warning"
        })
          .then(async () => {
            console.log("交卷");
            let date = new Date();
            this.endTime = this.getTime(date);
            let answerDate = this.endTime.substr(0, 10);
            //提交成绩信息
            const { data: res } = await this.$http.post(
              "http://localhost:3000/stuFront/postScore",
              {
                params: {
                  testCode: this.testCode,
                  subject: this.paperInfo.courseName,
                  studentId: this.userInfo.id,
                  score: finalScore,
                  answerTime: answerDate
                }
              }
            );
            console.log(res);
            if (res.meta.status !== 200)
              return this.$message.error(res.meta.message);
            this.$message.success(res.meta.message);
            this.$router.push({
              path: "/stuScore",
              query: {
                score: finalScore,
                startTime: this.startTime,
                endTime: this.endTime,
                courseName: this.paperInfo.courseName,
                totalTime: this.paperInfo.totalTime
              }
            });
          })
          .catch(() => {
            console.log("继续答题");
          });
      }
    },
    // 倒计时
    showTime() { 
      setInterval(() => {
        this.time -= 1
        if(this.time == 10) {
          this.$message({
            showClose: true,
            type: 'error',
            message: '考生注意,考试时间还剩10分钟！！！'
          })
          if(this.time == 0) {
            console.log("考试时间已到,强制交卷。")
          }
        }
      },1000 * 60)
    }

  }
};
</script>

<style lang="less" scoped>
ul li {
  list-style: none;
}
.iconfont.icon-time {
  color: #2776df;
  margin: 0px 6px 0px 20px;
}
.analysis {
  margin-top: 20px;
  .right {
    color: #2776df;
    font-size: 18px;
    border: 1px solid #2776df;
    padding: 0px 6px;
    border-radius: 4px;
    margin-left: 20px;
  }
  ul li:nth-child(2) {
    margin: 20px 0px;
  }
  ul li:nth-child(3) {
    padding: 10px;
    background-color: #d3c6c9;
    border-radius: 4px;
  }
}
.analysis span:nth-child(1) {
  font-size: 18px;
}
.mark {
  position: absolute;
  width: 4px;
  height: 4px;
  content: "";
  background-color: red;
  border-radius: 50%;
  top: 0px;
  left: 22px;
}
.border {
  position: relative;
  border: 1px solid #ff90aa !important;
}
.bg {
  background-color: #5188b8 !important;
}
.fill .el-input {
  display: inline-flex;
  width: 150px;
  margin-left: 20px;
  .el-input__inner {
    border: 1px solid transparent;
    border-bottom: 1px solid #eee;
    padding-left: 20px;
  }
}
// slider过渡效果 
.slider-fade-enter-active {
  transition: all 0.3s ease;
}
.slider-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slider-fade-enter,
.slider-fade-leave-to {
  transform: translateX(-100px);
  opacity: 0;
}


// 下方答题区域
.flexarea {
  display: flex;
  .right {
    flex: 1;
  }
}

// 左边选项区域
.left {
  width: 260px;
  height: 100%;
  margin: 10px 10px 0px 10px;
  // 左边 上面 4 ge选项部分
  .l-top {
    display: flex;
    justify-content: space-around;
    padding: 16px 0px;
    border: 1px solid #eee;
    border-radius: 4px;
    margin: 0px 0px 10px 0px;
    background-color: #fff;
    li {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      a {
        display: inline-block;
        padding: 10px;
        border-radius: 50%;
        background-color: #fff;
        border: 1px solid #ff90aa;
      }
    }
    li:nth-child(2) a {
      border: 1px solid #eee;
    }
    li:nth-child(3) a {
      background-color: #5188b8;
      border: none;
    }
    li:nth-child(4) a {
      position: relative;
      border: 1px solid #eee;
    }
    // 利用伪元素给 标记 标识写上一个小圆点
    li:nth-child(4) a::before {
      width: 4px;
      height: 4px;
      content: " ";
      position: absolute;
      background-color: red;
      border-radius: 50%;
      top: 0px;
      left: 16px;
    }
  }
  // 左边 下面 选项部分
  .l-bottom {
    border-radius: 4px;
    background-color: #fff;
    .item {
      display: flex;
      flex-direction: column;
      // 选择题部分
      p {
        margin-bottom: 15px;
        margin-top: 10px;
        color: #000;
        margin-left: 10px;
        letter-spacing: 2px;
      }
      // 选项部分
      ul {
        padding: 0;
        width: 100%;
        margin-top: -8px;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        li {
          width: 15%;
          margin-left: 5px;
          margin-bottom: 10px;
        }
        li a {
          position: relative;
          justify-content: center;
          display: inline-flex;
          align-items: center;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background-color: #fff;
          border: 1px solid #eee;
          color: #000;
          text-decoration: none;
          font-size: 16px;
        }
      }
    }
    // 结束考试
    .final {
      cursor: pointer;
      display: inline-block;
      text-align: center;
      background-color: rgb(39, 118, 223);
      width: 240px;
      margin: 10px 0px 20px 10px;
      border-radius: 4px;
      height: 30px;
      line-height: 30px;
      color: #fff;
      margin-top: 22px;
    }
  }
}

// 右边区域
.right {
  .title {
    border-radius: 4px;
    margin-right: 10px;
    padding-right: 30px;
    display: flex;
    margin-top: 10px;
    background-color: #fff;
    height: 50px;
    line-height: 50px;
    p {
      display: flex;
      align-items: center;
      margin-left: 20px;
    }
    .auto-right {
      margin-left: auto;
      color: #2776df;
      margin-right: 10px;
    }
  }
  .content {
    padding: 0px 20px;
    border-radius: 4px;
    background-color: #fff;
    margin: 0px 10px 0 0;
    height: 470px;
    .topic {
      padding: 30px 0px 20px 0;
      margin: 10px 0;
      .number {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: 20px;
        height: 20px;
        background-color: #5f8eb5;
        border-radius: 4px;
        margin-right: 4px;
      }
    }
    .el-radio-group {
      display: flex;
      flex-direction: column;
      label {
        color: #000;
        margin: 5px 0px;
      }
    }
  }
  .operation {
    background-color: #fff;
    border-radius: 4px;
    padding: 10px 0px;
    margin: 10px 10px 0 0;
    .end {
      display: flex;
      justify-content: center;
      align-items: center;
      color: rgb(39, 118, 223);
      li {
        cursor: pointer;
        margin: 0 100px;
      }
      li:nth-child(2) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: rgb(39, 118, 223);
        border-radius: 50%;
        width: 50px;
        height: 50px;
        color: #fff;
      }
    }
  }
}

#answer {
  background-color: #eee;
  .item {
    color: #fff;
    display: flex;
    padding: 20px;
    font-size: 20px;
    margin: 0;
  }
  .top {
    background-color: #5f8eb5;
    .item li:nth-child(1) {
      margin-right: 10px;
    }
    .item li:nth-child(3) {
      position: relative;
      margin-left: auto;
      font-size: 14px;
    }
    .item li:nth-child(4) {
      // position: relative;
      margin-left: 20px;
      // vertical-align: center;
      font-size: 14px;
      // height: 26px;
      // line-height: 26xp;
    }

  }
  .left .item {
    padding: 0px;
    font-size: 16px;
  }
}

// #answer .top #answer {
//   padding-bottom: 30px;
// }
.icon20 {
  font-size: 20px;
  font-weight: bold;
}
.item .msg {
  padding: 10px 15px;
  border-radius: 4px;
  top: 47px;
  right: -30px;
  color: #6c757d;
  position: absolute;
  border: 1px solid rgba(0, 0, 0, 0.15);
  background-color: #fff;
  p {
    font-size: 16px;
    width: 200px;
    text-align: left;
  }
}
</style>