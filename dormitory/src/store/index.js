import { createStore } from 'vuex'

const store = createStore({
  state () {
    return {
      msg:'Hello Vuex',
      isLogin: false,
      isCertified:false,
      path:'http://localhost:8081/Dormitory',
      wspath:'http://localhost:8081/Dormitory',      
      // path:'http://175.178.212.207:8080/demo',
      // wspath:'ws://175.178.212.207:8080/demo',
      // path:'http://localhost:8081/demo',
      // wspath:'ws://localhost:8081/demo',
      keywords:[],
    }
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})

export default store