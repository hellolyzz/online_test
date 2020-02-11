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
          <el-button type="primary" plain @click="getMultiQ" :autofocus="true" >选择题</el-button>
          <el-button type="primary" plain @click="getJudgeQ">判断题</el-button>
          <el-button type="primary" plain @click="getFillQ">填空题</el-button>
        </el-button-group>
        <el-button type="primary" @click="addQues">添加题目</el-button>
         <!-- <el-radio-group v-model="radio">
          <el-radio-button label="选择题" @click="getMultiQ"></el-radio-button>
          <el-radio-button label="判断题" @change="getJudgeQ"></el-radio-button>
          <el-radio-button label="填空题"></el-radio-button>
        </el-radio-group> -->
      </div>
      
      <!-- 选择题题目展示 -->
      <el-table :data="multiTableData" border style="width: 100%" v-if="type === 1">
        <el-table-column fixed prop="questionId" label="题号" width="70"></el-table-column>
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
            <el-button @click="handleClick(scope.row)" type="primary" size="mini">编辑</el-button>
            <el-button type="danger" size="mini">删除</el-button>
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
        <el-table-column fixed prop="questionId" label="题号" width="70"></el-table-column>
        <el-table-column prop="question" label="题目" width="300"></el-table-column>
        <el-table-column prop="answer" label="正确答案" width="60">
          <template slot-scope="scope">
            <el-tag type="primary">{{ scope.row.answer }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="score" label="分数" width="50"></el-table-column>
        <el-table-column prop="analysis" label="解析"></el-table-column>
        <el-table-column prop="section" label="所属章节"  width="120"></el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="primary" size="mini">编辑</el-button>
            <el-button type="danger" size="mini">删除</el-button>
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
        <el-table-column fixed prop="questionId" label="题号" width="70"></el-table-column>
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
            <el-button @click="handleClick(scope.row)" type="primary" size="mini">编辑</el-button>
            <el-button type="danger" size="mini">删除</el-button>
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
      <!-- <el-dialog
        title="添加题目"
        :visible.sync="addDialog"
        width="30%"
        :before-close="handleClose">
        <el-form ref="addFormRef" :model="addForm" :rules="addFormRules" label-width="80px">
          <el-form-item label="活动名称">
            <el-input v-model="addForm.name"></el-input>
          </el-form-item>
          <el-form-item label="活动区域">
            <el-select v-model="addForm.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false">取 消</el-button>
          <el-button type="primary" @click="addDialog = false">确 定</el-button>
        </span>
      </el-dialog> -->
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: '',
      addDialog: false,
      courseName: '',
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
      totalF: 0
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
      const { data: res } = await this.$http.get('http://127.0.0.1:3000/ques/multichoice/' + paperId,{
        params: this.queryInfo
      })
      console.log(res)
      if(res.meta.status !== 200){
        this.$message.error('获取选择题失败')
      }
      this.multiTableData = res.data.data;
      this.total = res.data.total
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
      const { data: res } = await this.$http.get('http://127.0.0.1:3000/ques/judgeques/' + paperId,{
        params: this.queryInfoJ
      })
      console.log(res)
      if(res.meta.status !== 200){
        this.$message.error('获取判断题失败')
      }
      this.judgeTableData = res.data.data;
      this.totalJ = res.data.total
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
      const { data: res } = await this.$http.get('http://127.0.0.1:3000/ques/fillques/' + paperId,{
        params: this.queryInfoF
      })
      console.log(res)
      if(res.meta.status !== 200){
        this.$message.error('获取填空题失败')
      }
      this.fillTableData = res.data.data;
      this.totalF = res.data.total
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
    addQues(){
      var paperId = this.$route.query.paperId;
      this.courseName = this.$route.query.courseName
      // console.log('123')
      this.$router.push({
        path: '/addQuesBank',
        query: {
          paperId: paperId,
          courseName: this.courseName
        }
      })
      // this.addDialog = true;
    }
   
  }
};
</script>

<style lang="less" scoped>
.el-button {
  margin-bottom: 15px;
}
.btn{
  display: flex;
  justify-content: space-between;
}
</style>