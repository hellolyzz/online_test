import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  // vuex中的数据源，我们需要保存的数据就保存在这里，可以在页面通过 this.$store.state 来获取我们定义的数据；
  state: {
    name: ''
  },
  // getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算，这里我们可以通过定义vuex的Getter来获取，
  // Getters 可以用于监听、state中的值的变化，返回计算后的结果,类似于vue中computed计算属性
  getters: {
    getStateCount(state){
      return state.name
    }
  },
  mutations: { //修改数据
    saveName(state,name){
      state.name = name
    },
    modifyName(state, name){ //name为参数
      return state.name = name;
    }
  },
  // 类似vue中methods
  actions: {
    modifyNameFun(context, name){//接受一个与store实例具有相同方法的属性的context对象
      context.commit('modifyName', name)
    }
  }
})

export default store
