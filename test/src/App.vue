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
    <button @click="printMsg">弹出信息</button>
    <NotificationComponent ref="childRef"></NotificationComponent>
</template>

<script>
import { defineComponent,ref } from 'vue'
import NotificationComponent from '@/components/tools/NotificationComponent.vue'
export default defineComponent({
  setup() {
    const childRef = ref()
    const printMsg = () => {
      console.log('getMsg')
      // getMsg.value.getMsg('Hello')
      childRef.value.openNotificationWithIcon('success', 'Success', 'Hello')
    }
    return {
      value: '',
      printMsg,
      childRef
    }
  },
  components:{
    NotificationComponent
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
