<template>
    <a-card style="width: 300px;height: 200px;border-radius: 20px;background-color:lightblue" hoverable>
        <a-carousel autoplay style="margin-top:-10px">
            <div v-for="item in imgList" :key="item.id">
                <img width="270" :src="item.imgSrc">
                <span>{{item.info}}</span>
            </div>
        </a-carousel>
    </a-card>
</template>
  
<style>
/* For demo */
.ant-carousel :deep(.slick-slide) {
    text-align: center;
    height: 160px;
    line-height: 160px;
    background: #364d79;
    overflow: hidden;
}

.ant-carousel :deep(.slick-slide h3) {
    color: #fff;
}

.ant-carousel div {
    height:150px;
    background-color: aqua;
}
</style>

<script>
import { defineComponent,reactive } from 'vue'

const imgList =reactive([
    {
        id:1,
        imgSrc: require('../../static/image/lunbo1.jpg'),
        info:'article11111'
    },
    {
        id:2,
        imgSrc: require('../../static/image/lunbo2.jpg'),
        info:'article22222'
    },
    {
        id:3,
        imgSrc: require('../../static/image/lunbo3.jpg'),
        info:'article33333'
    }
])

const getImage = ()=>{
    //axios
    imgList.forEach(item=>{
        item.imgSrc = require('../../static/image/lunbo1.jpg')
    })
}

export default defineComponent({
    name: 'CarouselComponent',
    setup() {
        return {
            imgList,
        }
    },
    mounted() {
        getImage()
    }
})
</script>
