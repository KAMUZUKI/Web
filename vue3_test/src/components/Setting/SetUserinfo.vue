<template>
    <div class="wrap_box">
        <h1>个人设置</h1>
    </div>
</template>
  
<style scoped>
.flink {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
}

.wrap_box {
    min-height: 80vh;
    min-width: 1000px;
}
</style>
<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
    setup() {
        const flinkList = ref([
            {
                id: 1,
                name: '张三',
                url: 'https://www.baidu.com',
                img: '1437487442',
                description: '百度一下，你就知道',
                status: 1,
            },
            {
                id: 2,
                name: '李四',
                url: 'https://cn.vuejs.org/',
                img: '2725291836',
                description: '百度一下，你就知道',
                status: 1,
            },
            {
                id: 3,
                name: '王五',
                url: 'https://cn.vuejs.org/',
                img: '1196530268',
                description: '百度一下，你就知道',
                status: 1,
            },
            {
                id: 4,
                name: '赵六',
                url: 'https://cn.vuejs.org/',
                img: '3603685701',
                description: '百度一下，你就知道',
                status: 1,
            }
        ])
        return {
            flinkList
        };
    },
});
</script>