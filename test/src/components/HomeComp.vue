<template>
    <div style="width:400px;height:400px;background-color:lightpink">
        <h1>Home</h1>
    </div>
</template>
<script>
import {defineComponent} from 'vue'
export default defineComponent({
  name: 'HomeComp',
  setup() {
    const getMsg = (type) => {
      alert('getMsg'+type)
    }

    return {
      getMsg
    }
  }
})
</script>
<style lang="">
    
</style>