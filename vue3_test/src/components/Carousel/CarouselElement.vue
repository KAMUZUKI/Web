<template>
    <!-- <el-card class="Carouselcard" style="width: 300px" shadow="hover"> -->
    <el-carousel autoplay=false style="width: 300px;border-radius: 10px;" indicator-position="outside" height="230px">
        <el-carousel-item v-for="item in initCarousel" :key="item.id" :label="item.info">
            <img width="300" height="200" :src="item.imgSrc" @click="toArticle(item.id)">
            <span>{{ item.description }}</span>
        </el-carousel-item>
    </el-carousel>
    <!-- </el-card> -->
</template>

<script>
import { onMounted, reactive, ref } from 'vue'
import { ElCarousel, ElCarouselItem } from 'element-plus'
import { useRouter } from 'vue-router'
import axios from 'axios'
export default {
    name: 'CarouselElement',
    components: {
        // ElCard,
        ElCarousel,
        ElCarouselItem
    },
    setup() {
        const router = useRouter()

        const imgList = ref([
            {
                id: 1,
                imgSrc: require('../../static/image/lunbo1.jpg'),
                info: 'JAVA',
                description: 'Java是一种面向对象的编程语言，它具有跨平台性、简单性、面向对象、分布式、健壮性、安全性、体系结构中立、可移植性、解释性、高性能、多线程等特点。'
            },
            {
                id: 2,
                imgSrc: require('../../static/image/lunbo2.jpg'),
                info: 'C#',
                description: 'C#是微软公司推出的一种面向对象的编程语言，它是C++的一个简化版本，是.NET平台的主要开发语言。'
            },
            {
                id: 3,
                imgSrc: require('../../static/image/lunbo3.jpg'),
                info: 'GO',
                description: 'Go是一种开源的编程语言，它能够在多个操作系统平台上运行，包括Linux、Mac OS X和Windows。'
            }
        ])

        const listData = ref([]);
        const listDataTemp = ref([]);
        const initCarousel = reactive([])

        const getImage = () => {
            //TODO:获取阅读数最高的三篇文章
            var params = new URLSearchParams();
            params.append('op', 'getArticleTop');
            axios.post('http://localhost:8081/demo/info.action', params)
                .then(res => {
                    if (res.data.code == 1) {
                        listDataTemp.value = res.data.data
                        for (const [key, value] of Object.entries(listDataTemp.value)) {
                          console.log(key)
                          listData.value.push(value);
                        }
                        
                        listData.value.forEach((item,i = 0) => {
                            initCarousel.push({
                                id: item.id,
                                imgSrc: imgList.value[i].imgSrc,
                                info: item.label,
                                description: item.title
                            })
                            i++
                        })
                    } else {
                        console.log(res.data.msg)
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        //跳转到文章详情页
        const toArticle = (articleId) => {
            router.push({
                path: '/article/' + articleId,
                query: {
                    mode: 1
                }
            })
        }

        onMounted(() => {
            getImage()
        })

        return {
            initCarousel,
            listData,
            toArticle
        }
    }
}
</script>

<style scoped>
.el-carousel__item h3 {
    border-radius: 5px;
    display: flex;
    color: #475669;
    opacity: 0.75;
    margin: 0;
}

.el-card :deep() .el-card__body {
    padding: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>