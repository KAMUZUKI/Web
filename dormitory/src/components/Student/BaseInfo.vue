<template>
    <div class="container">
        <a-button style="float:left;margin-left: 20px;margin-top: 20px;" type="primary" @click="showDrawer">添加学生</a-button>
        <a-table :columns="columns" :data-source="dataSource" bordered>
            <template #bodyCell="{ column, text, record }">
                <template v-if="['address', 'phone'].includes(column.dataIndex)">
                    <div>
                        <a-input v-if="editableData[record.sno]"
                            v-model:value="editableData[record.sno][column.dataIndex]" style="margin: -5px 0" />
                        <template v-else>
                            {{ text }}
                        </template>
                    </div>
                </template>
                <template v-else-if="column.dataIndex === 'modify'">
                    <div class="editable-row-operations">
                        <span v-if="editableData[record.sno]">
                            <a-typography-link @click="save(record)">保存</a-typography-link>
                            <a-popconfirm title="确认取消?" @confirm="cancel(record.sno)">
                                <a>取消</a>
                            </a-popconfirm>
                        </span>
                        <span v-else>
                            <a @click="edit(record.sno)">编辑</a>
                        </span>
                    </div>
                </template>
                <template v-else-if="column.dataIndex === 'delete'">
                    <div class="editable-row-operations">
                        <span>
                            <a-popconfirm title="确认删除?" ok-text="删除" cancel-text="取消" @confirm="deleteById(record.sno)">
                                <a>删除</a>
                            </a-popconfirm>
                        </span>
                    </div>
                </template>
            </template>
        </a-table>
        <a-drawer title="添加学生" :width="500" :visible="visible" :body-style="{ paddingBottom: '80px' }"
            :footer-style="{ textAlign: 'right' }" @close="onClose">
            <a-form ref="formRef" name="custom-validation" :model="formState" :rules="rules" v-bind="layout"
                @finish="handleFinish" @validate="handleValidate" @finishFailed="handleFinishFailed"
                :validate-messages="validateMessages">
                <h2 style="text-align:center;">添加学生</h2>
                <a-form-item label="用户名" name="name" required>
                    <a-input v-model:value="formState.name" :rules="[{ required: true }]">
                        <template #prefix>
                            <UserOutlined class="site-form-item-icon" />
                        </template>
                    </a-input>
                </a-form-item>
                <a-form-item :name="['img']" label="邮箱" :rules="[{ required: true }, { type: 'email' }]">
                    <a-input v-model:value="formState.img" />
                </a-form-item>
                <a-form-item :name="['url']" label="网址" :rules="[{ required: true }]">
                    <a-input v-model:value="formState.url" />
                </a-form-item>
                <a-form-item :name="['description']" label="简介" :rules="[{ required: true }]">
                    <a-textarea v-model:value="formState.description" />
                </a-form-item>
                <a-form-item :name="['status']" label="是否启用">
                    <a-switch v-model:checked="formState.status" />
                </a-form-item>
                <a-form-item :wrapper-col="{ span: 16, offset: 6 }">
                    <a-button type="primary" html-type="submit">添加</a-button>
                    <a-button style="margin-left: 10px" @click="onClose">退出</a-button>
                </a-form-item>
            </a-form>
            <notification-component ref="openNotification"></notification-component>
        </a-drawer>
    </div>
</template>
<script>
import { cloneDeep } from 'lodash-es';
import { defineComponent, reactive, ref, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import axios from 'axios'
import { useStore } from 'vuex';
export default defineComponent({
    name: 'UserManager',
    setup() {
        const store = useStore();
        const formRef = ref()
        const columns = [{
            title: '学号',
            width: 10,
            dataIndex: 'sno',
        }, {
            title: '名字',
            width: 25,
            dataIndex: 'sname',
        }, {
            title: '年龄',
            dataIndex: 'age',
            width: 10,
        }, {
            title: '学院',
            dataIndex: 'academy',
            width: 10,
        }, {
            title: '班级',
            dataIndex: 'classname',
            width: 20,
        }, {
            title: '住址',
            dataIndex: 'address',
            width: 50,
        }, {
            title: '电话',
            dataIndex: 'phone',
            width: 30,
        }, {
            title: '操作',
            dataIndex: 'modify',
            width: 15,
        }, {
            title: '操作',
            dataIndex: 'delete',
            width: 15,
        }];

        const formState = ref({
            name: '',
            img: '',
            url: '',
            description: '',
            status: true,
        })

        const validateMessages = {
            required: '${label} 是必要的!',
            types: {
                email: '${label} 是无效的邮箱!',
                number: '${label} 是无效的数字!',
            }
        };

        const dataSource = ref([]);
        const listDataTmp = ref([]);

        const initDataSource = () => {
            //TODO:获取数据
            var params = new URLSearchParams()
            params.append('op', 'getAllStudent')
            axios.post(store.state.path + '/info.action', params)
                .then(res => {
                    if (res.data.code == 1) {
                        listDataTmp.value = res.data.data
                        for (const [key, item] of Object.entries(listDataTmp.value)) {
                            console.log(key)
                            dataSource.value.push(item);
                        }
                        message.success('获取学生信息成功')
                    } else {
                        message.success('获取学生信息失败')
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        const editableData = reactive({});

        const edit = key => {
            editableData[key] = cloneDeep(dataSource.value.filter(item => key === item.sno)[0]);
        }

        const save = user => {
            // Object.assign(dataSource.value.filter(item => user.id === item.id)[0], editableData[user.id]);
            // delete editableData[user.id];
            // //TODO:通过userid修改后台用户数据
            // setTimeout(() => {
            //     var params = new URLSearchParams();
            //     params.append('op', 'alterUser');
            //     params.append('userId', user.id);
            //     params.append('status', user.status);
            //     params.append('type', user.type);
            //     axios.post(store.state.path + '/user.action', params)
            //         .then(res => {
            //             if (res.data.code == 1) {
            //                 delete editableData[user.id];
            //                 message.success('修改用户ID' + user.id + '成功');
            //             } else {
            //                 message.error('修改用户ID' + user.id + '失败');
            //             }
            //         })
            //         .catch(function (error) {
            //             console.log(error);
            //         });
            // }, 500);
            console.log(user)
        }

        const cancel = key => {
            delete editableData[key];
        }

        const deleteById = sno => {
            //TODO:通过userid删除后台用户数据
            var params = new URLSearchParams();
            params.append('op', 'deleteStudentBySno');
            params.append('sno', sno);
            axios.post(store.state.path + '/info.action', params)
                .then(res => {
                    if (res.data.code == 1) {
                        dataSource.value = dataSource.value.filter(item => sno !== item.sno);
                        message.success(res.data.msg);
                    } else {
                        message.error(res.data.msg);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        const handleFinish = values => {
            var params = new URLSearchParams();
            params.append('op', 'addFlink');
            params.append('name', values.name);
            params.append('url', values.url);
            params.append('img', values.img);
            params.append('description', values.description);
            params.append('status', values.status == true ? 1 : 0);
            axios.post(store.state.path + '/info.action', params)
                .then(res => {
                    if (res.data.code == 1) {
                        formState.value = {
                            name: values.name,
                            url: values.url,
                            img: values.img,
                            description: values.description,
                            status: values.status ? 1 : 0,
                        }
                        formState.value = {
                            name: '',
                            url: '',
                            img: '',
                            description: '',
                            status: true,
                        }
                        message.success(res.data.msg);
                        onClose()
                    } else {
                        onClose()
                        message.error(res.data.msg);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        };

        const handleFinishFailed = errors => {
            console.log(errors);
        };

        const resetForm = () => {
            formRef.value.resetFields();
        };

        const handleValidate = (...args) => {
            console.log(args);
        };


        const layout = {
            labelCol: {
                span: 6,
            },
            wrapperCol: {
                span: 16,
            },
        };

        //DRAWER BEGIN
        const visible = ref(false);

        const showDrawer = () => {
            visible.value = true;
        };

        const onClose = () => {
            visible.value = false;
        };


        onMounted(() => {
            initDataSource()
        })

        return {
            dataSource,
            columns,
            editingKey: '',
            editableData,
            edit,
            save,
            cancel,
            deleteById,

            layout,
            visible,
            formState,
            validateMessages,
            confirm,
            onClose,
            resetForm,
            showDrawer,
            handleFinish,
            handleValidate,
            handleFinishFailed,
        };
    },
});
</script>
<style scoped>
.editable-row-operations a {
    margin-right: 8px;
}

.container {
    min-width: 1000px;
}
</style>