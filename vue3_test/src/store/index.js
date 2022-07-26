import { createStore } from 'vuex'

const store = createStore({
  state () {
    return {
      count: 0,
      msg:'Hello Vuex',
      isCertified:false,
    }
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})

export default store