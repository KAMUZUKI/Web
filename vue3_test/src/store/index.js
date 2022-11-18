import { createStore } from 'vuex'

const store = createStore({
  state () {
    return {
      count: 0,
      msg:'Hello Vuex',
      isCertified:false,
      type:Number,
      path:'http://localhost:8081/demo',
      wspath:'ws://localhost:8081/demo'
    }
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})

export default store