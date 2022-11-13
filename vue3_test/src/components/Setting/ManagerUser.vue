<template>
    <div class="container">
        <!-- <a-list item-layout="horizontal" :data-source="data">
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
        </a-list> -->
        <a-table pagination="" :columns="columns" :data-source="data" :scroll="{ x: 1000, y: 300 }">
            <template #bodyCell="{ column }">
                <template v-if="column.key === 'modify'">
                    <a>修改</a>
                </template>
                <template v-if="column.key === 'delete'">
                    <a>删除</a>
                </template>
            </template>
        </a-table>
    </div>

</template>

<style scoped>
.container {
    max-width: 1100px;
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
            account: '10001',
            phone: '123456677',
            email: '1437487442@qq.com',
            createTime: '2021-05-01 12:00:00',
            status: 1,
            type: 1
        },
        {
            id: 2,
            name: '李四',
            account: '10002',
            phone: '123456677',
            email: '1437487442@qq.com',
            createTime: '2021-05-01 12:00:00',
            status: 1,
            type: 1
        },
        {
            id: 3,
            name: '王五',
            account: '10003',
            phone: '123456677',
            email: '1437487442@qq.com',
            createTime: '2021-05-01 12:00:00',
            status: 1,
            type: 1
        },
        {
            id: 4,
            name: '赵六',
            account: '10004',
            phone: '123456677',
            email: '1437487442@qq.com',
            createTime: '2021-05-01 12:00:00',
            status: 1,
            type: 1
        }, {
            id: 5,
            name: '田七',
            account: '10005',
            phone: '123456677',
            email: '1437487442@qq.com',
            createTime: '2021-05-01 12:00:00',
            status: 1,
            type: 1
        }]);

        const columns = [{
            title: 'Id',
            width: 15,
            dataIndex: 'id',
            fixed: 'left',
        }, {
            title: 'Name',
            width: 25,
            dataIndex: 'name',
            fixed: 'left',
        }, {
            title: 'Account',
            dataIndex: 'account',
            width: 35,
        }, {
            title: 'Phone',
            dataIndex: 'phone',
            width: 40,
        }, {
            title: 'Email',
            dataIndex: 'email',
            width: 60,
        }, {
            title: 'CreateTime',
            dataIndex: 'createTime',
            width: 50,
        }, {
            title: 'Status',
            dataIndex: 'status',
            width: 25,
        }, {
            title: '用户类型',
            dataIndex: 'type',
            width: 30,
        }, {
            title: 'Action',
            key: 'modify',
            fixed: 'right',
            width: 25,
        }, {
            title: 'Action',
            key: 'delete',
            fixed: 'right',
            width: 25,
        }];

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
            columns,
            deleteByUserId
        };
    },
});
</script>