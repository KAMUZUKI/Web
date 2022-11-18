<template>
    <div class="container">
        <h1>添加分类</h1>
        <div class="catepory_box">
            <template v-for="item in categoryList" :key="item.id">
                <a-popconfirm title="操作" ok-text="删除" cancel-text="取消" @confirm="confirm" @cancel="cancel">
                    <a-card hoverable style="width: 300px;margin-top:20px">
                        <a-card-meta :title=item.name :description=item.description>
                        </a-card-meta>
                    </a-card>
                </a-popconfirm>
            </template>
            <a-card hoverable style="width: 300px;height:97px;margin-top:20px" @click="visible = true">
                <a-card-meta title="添加分类"/>
              </a-card>
            <a-modal v-model:visible="visible" title="添加分类" ok-text="Create" cancel-text="Cancel" @ok="onOk">
                <a-form ref="formRef" :model="formState" layout="vertical" name="form_in_modal">
                    <a-form-item name="title" label="分类名" :rules="[{ required: true, message: '请输入分类名' }]">
                        <a-input v-model:value="formState.title" />
                    </a-form-item>
                    <a-form-item name="description" label="描述">
                        <a-textarea v-model:value="formState.description"/>
                    </a-form-item>
                </a-form>
            </a-modal>
        </div>
    </div>
</template>
<script>
import { defineComponent, reactive, ref } from 'vue';
import { message } from 'ant-design-vue';
import axios from 'axios';
import {userStore} from vuex;
export default defineComponent({
    setup() {
        const formRef = ref();
        const visible = ref(false);
        const store=userStore();
        const formState = reactive({
            title: '',
            description: '',
        });

        const categoryList = ref([
            {
                id: 1,
                name: 'JAVA',
                description: 'JAVA学习',
            },
            {
                id: 2,
                name: 'C++',
                description: 'C++学习',
            },
            {
                id: 3,
                name: 'C#',
                description: 'C#学习',
            }, {
                id: 4,
                name: 'GO',
                description: 'GO学习',
            }, {
                id: 5,
                name: 'JavaScript',
                description: 'JavaScript学习',
            },{
                id: 6,
                name: 'TypeScript',
                description: 'TypeScript学习',
            },
        ]);

        const onOk = () => {
            formRef.value.validateFields().then(values => {
                visible.value = false;
                categoryList.value.push({
                    id: categoryList.value.length + 1,
                    name: values.title,
                    description: values.description,
                });
                //TODO:添加分类
                var params = new URLSearchParams();
                params.append('op', 'addCategory');
                params.append('name', values.title);
                params.append('description', values.description);
                axios.post(store.state.path+'/info.action', params)
                .then(res => {
                    if (res.data.code == 1) {
                        message.success('添加成功');
                        categoryList.value.push(JSON.parse(res.data.data))
                        formRef.value.resetFields();
                    } else {
                        message.error('添加失败');
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            }).catch(info => {
                message.error('添加失败');
                console.log('Validate Failed:', info);
            });
        };

        return {
            formState,
            formRef,
            visible,
            onOk,
            categoryList
        };
    },
});
</script>

<style>
.collection-create-form_last-form-item {
    margin-bottom: 0;
}
.catepory_box{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
}
.container {
    min-height: 80vh;
    max-width: 1000px;
}
</style>