<template>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
  />
    <h1>Hello App!</h1>
    <router-link class="nav-link" to="/home">
        Content
    </router-link>
    <router-link class="nav-link" to="/about">
        About
    </router-link>
    <!-- <HomeComp ref="getMsg"></HomeComp>
    <button @click="printMsg">输出</button> -->
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view #default="{route,Component}" style="margin-left:400px">
        <transition  
            :enter-active-class="`animate__animated ${route.meta.transition_enter}`" 
            :leave-active-class="`animate__animated ${route.meta.transition_leave}`"
            mode="out-in"
            ease-in-out 
            >
            <component :is="Component"></component>
        </transition>
    </router-view>
</template>

<script>
import { defineComponent,ref } from 'vue'
import MarkdedComp from '@/components/MarkedComp.vue'
import HomeComp from '@/components/HomeComp.vue'
export default defineComponent({
  setup() {
    const getMsg = ref();

    const printMsg = () => {
      console.log('getMsg')
      getMsg.value.getMsg('Hello')
    }

    return {
      value: '',
      printMsg,
      getMsg
    }
  },
  components:{
    MarkdedComp,
    HomeComp,
    
  }
})
</script>

<style>
.animate__animated{
    animation-duration: 1s;
    animation-fill-mode: both;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
