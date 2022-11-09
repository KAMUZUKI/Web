<template>
    <a-card title="每日一言" style="width: 300px;border-radius: 20px;background-color:lightblue" hoverable>
        <div id="hitokoto">
            <span style="font-size:20px;weight:bold">{{AWord.data}}</span>
        </div>
    </a-card>
</template>

<script>

import { defineComponent,reactive } from 'vue'
// import axios from 'axios'

const AWord = reactive({
    data:''
});

const getAWord = ()=>{
    // console.log('getAWord')
    // axios.get('https://api.uixsj.cn/hitokoto/get').then(res=>{
    //     AWord.data = res.data
    //     console.log(res.data)
    // })
}



export default defineComponent({
    name: 'AWordComponent',
    setup(){
        return{
            AWord
        }
    },
    mounted(){
        getAWord()
    }
})
</script>
