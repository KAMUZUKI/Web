<template>
    <div class="container">
        <a-list item-layout="horizontal" :data-source="data">
            <template #renderItem="{ item }">
                <a-list-item>
                    <a-list-item-meta
                        description="Ant Design, a design language for background applications, is refined by Ant UED Team">
                        <template #title>
                            <a>{{ item.name }}</a>
                        </template>
                        <template #avatar>
                            <a-avatar style="margin-left:30px;width:45px;height:45px"
                                :src="'http://q1.qlogo.cn/g?b=qq&nk=' + item.img + '&s=100'" />
                        </template>
                    </a-list-item-meta>
                    <a-button class="button" type="primary" @click="details(item.id)">详情</a-button>
                    <a-popconfirm title="Are you sure delete this task?" ok-text="Yes" cancel-text="No"
                        @confirm="confirm" @cancel="cancel">
                        <a-button class="button" type="primary" danger @click="deleteByUserId(item.id)">删除</a-button>
                    </a-popconfirm>
                </a-list-item>
            </template>
        </a-list>
    </div>
</template>

<style scoped>
.container {
    min-width: 1000px;
}

.button {
    margin-right: 20px;
}
</style>
<script>
import { defineComponent, ref } from 'vue';
import { message } from 'ant-design-vue';
export default defineComponent({
    setup() {
        const data = ref([{
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
        }]);

        const confirm = e => {
            console.log(e);
            message.success('Click on Yes');
        };
        const cancel = e => {
            console.log(e);
            message.error('Click on No');
        };

        const deleteByUserId = (userId) => {
            //TODO: 通过用户id删除用户
            console.log(userId)
        }

        return {
            data,
            confirm,
            cancel,
            deleteByUserId
        };
    },
});
</script>