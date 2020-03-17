import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/login.vue'
import home from '../components/home.vue'
import welcome from '../components/welcome.vue'
import introduceTest from '../components/testMng/introduceTest.vue'
import setting from '../components/setting.vue'
import stuMng from '../components/peopleMng/stuMng.vue'
import teaMng from '../components/peopleMng/teaMng.vue'
import allTestInfo from '../components/questionBankMng/allTestInfo.vue'
import quesBank from '../components/questionBankMng/quesBank.vue'
import addQuesBank from '../components/questionBankMng/addQuesBank.vue'
import student from '../components/student/student.vue'
import addTest from '../components/testMng/addTest'
import searchTest from '../components/testMng/searchTest'
import introduceQues from '../components/questionBankMng/introduceQues'
import myTest from '../components/student/myTest'
import stuSetting from '../components/student/stuSetting'
import paperInfo from '../components/student/paperInfo.vue'
import answering from '../components/student/answering.vue'
import stuScore from '../components/student/stuScore.vue'
import myScore from '../components/student/myScore.vue'
import noPaper from '../components/student/noPaper.vue'
import queryScore from '../components/scoreMng/queryScore.vue'
import subjectScore from '../components/scoreMng/subjectScore.vue'
import queryScoreById from '../components/scoreMng/queryScoreById.vue'
import studentScore from '../components/scoreMng/studentScore.vue'
import uploadExcel from '../components/uploadExcel/uploadExcel.vue'


Vue.use(VueRouter)

const routes = [
  // 登录界面
  {
    path: '/login',
    component: login
  },
  // 学生界面
  {
    path: '/student',
    component: student,
    redirect: '/myTest',
    children: [
      {
        path: '/myTest',
        component: myTest
      },
      {
        path: '/stuSetting',
        component: stuSetting
      },
      {
        path: '/paperInfo',
        component: paperInfo
      },
      {
        path: '/stuScore',
        component: stuScore
      },
      {
        path: '/myScore',
        component: myScore
      },
      {
        path: '/noPaper',
        component: noPaper
      }
    ]
  },
  // 答题界面
  {
    path: '/answering',
    component: answering
  },
  // 管理后台
  {
    path: '/home',
    component: home,
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        component: welcome
      },
      {
        path: '/introduceTest',
        component: introduceTest
      },
      {
        path: '/setting',
        component: setting
      },
      {
        path: '/stuMng',
        component: stuMng
      },{
        path: '/teaMng',
        component: teaMng
      },
      {
        path: '/allTestInfo',
        component: allTestInfo
      },
      {
        path: '/quesBank',
        component: quesBank
      },
      {
        path: '/addQuesBank',
        component: addQuesBank
      },{
        path: '/addTest',
        component: addTest
      },
      {
        path: '/searchTest',
        component: searchTest
      },
      {
        path: '/introduceQues',
        component: introduceQues
      },
      {
        path: '/queryScore',
        component: queryScore
      },
      {
        path: '/subjectScore',
        component: subjectScore
      },{
        path: '/queryScoreById',
        component: queryScoreById
      },
      {
        path: '/studentScore',
        component: studentScore
      },{
        path: '/uploadExcel',
        component: uploadExcel
      }
    ]
  }


  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]


const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, form, next) => {
  // to将要访问的路径
  // from 代表从哪个路径跳转过去
  // next 放行函数 使用方法
  // 1. next()
  // 2. next('/login) 强制跳转
  if (to.path === '/login') {
    return next()
  }
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) {
    return next('/login')
  }
  next()
})



export default router
