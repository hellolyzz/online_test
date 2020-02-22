import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入全局样式
import './assets/css/global.css'
// 引入element-ui组件
import './plugins/element.js'
// 引入axios
import axios from 'axios'
// 请求超时
axios.defaults.timeout = 6000 
// 请求的根路径
axios.defaults.baseURl = 'http://127.0.0.1:3000'
// 通过http发起请求
Vue.prototype.$http = axios

// 拦截器
axios.interceptors.request.use(config => {
  // console.log(config)
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
