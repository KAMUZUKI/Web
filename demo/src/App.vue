<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <HelloWorld msg="Welcome to Your Vue.js App"/>
  <mavon-editor v-model="value"/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import MavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
export default {
  name: 'App',
  components: {
    HelloWorld,
    MavonEditor,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
