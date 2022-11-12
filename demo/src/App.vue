<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <HelloWorld msg="Welcome to Your Vue.js App"/>
  <EmojiComp></EmojiComp>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import 'mavon-editor/dist/css/index.css'
import EmojiComp from './components/EmojiComp.vue'
export default {
  name: 'App',
  components: {
    HelloWorld,
    EmojiComp
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
