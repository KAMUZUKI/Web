<template>
    <div class="container">
        <a-button style="float:left;margin-left: 20px;margin-top: 20px;" type="primary"
            @click="showDrawer">添加学生</a-button>
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
        <a-drawer title="添加学生" :width="300" :visible="visible" :body-style="{ paddingBottom: '80px' }"
            :footer-style="{ textAlign: 'right' }" @close="onClose">
            <a-form :model="formState" name="nest-messages" @finish="onFinish" @onFinishFailed="onFinishFailed"
                :validate-messages="validateMessages">
                <a-form-item :name="['student', 'name']" label="名字" :rules="[{ required: true, message: '填写学生名字' }]">
                    <a-input v-model:value="formState.student.name" />
                </a-form-item>
                <a-form-item :name="['student', 'age']" label="年龄" :rules="[{ required: true, message: '填写年龄' }]">
                    <a-input v-model:value="formState.student.age" />
                </a-form-item>
                <a-form-item :name="['student', 'sex']" label="性别">
                    <a-input v-model:value="formState.student.sex" />
                </a-form-item>
                <a-form-item :name="['student', 'academy']" label="学院名称">
                    <a-select showSearch v-model:value="academyOptions" smode="single" style="width: 100%"
                        placeholder="请选择栏目" :options="academys">
                    </a-select>
                </a-form-item>
                <a-form-item :name="['student', 'class']" label="班级名称">
                    <a-input v-model:value="formState.student.class" />
                </a-form-item>
                <a-form-item :name="['student', 'address']" label="学院名称">
                    <a-input v-model:value="formState.student.address" />
                </a-form-item>
                <a-form-item :name="['student', 'phone']" label="学院名称">
                    <a-input v-model:value="formState.student.phone" />
                </a-form-item>
                <a-form-item>
                    <a-button shape="round" type="primary" html-type="submit">提交</a-button>
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

        const academyOptions = ref([])

        const formState = reactive({
            student: {
                name: '',
                age: '',
                sex: '',
                academy: '',
                class: '',
                address: '',
                phone: '',
            }
        });

        const validateMessages = {
            required: '${label} 是必要的!',
            types: {
                email: '${label} 是无效的邮箱!',
                number: '${label} 是无效的数字!',
            }
        };

        const dataSource = ref([]);
        const listDataTmp = ref([]);

        const getAcademys = () => {
            const data = ref([])
            const tmpData = ref([])
            var params = new URLSearchParams();
            params.append('op', 'getCategory');
            //TODO: 从后台获取分类
            axios.post(store.state.path + '/info.action', params)
                .then(res => {
                    if (res.data.code == 1) {
                        tmpData.value = res.data.data
                        for (var i = 0; i < tmpData.value.length; i++) {
                            data.value.push(tmpData.value[i].name)
                        }
                        sessionStorage.setItem('academys', JSON.stringify(data.value))
                    } else {
                        console.log(res.data.msg)
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }


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
                        message.error('获取学生信息失败')
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
            //TODO:通过sno删除后台用户数据
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

        const onFinish = (values) => {
            console.log(formState.user)
            if (formState.user.content == null || formState.user.content == undefined || formState.user.content == '') {
                message.error('文章内容不能为空');
                return
            }
            console.log(values)
            var params = new URLSearchParams();
            if (mode.value) {
                params.append('op', 'addArticle');
                params.append('author', JSON.parse(sessionStorage.getItem("user")).username);
                params.append('title', formState.user.title)
                params.append('content', formState.user.content)
                params.append('description', formState.user.description)
                params.append('categoryId', (JSON.parse(sessionStorage.getItem('categorys')).indexOf(categoryOptions.value)) + 1 ?? 1)
                params.append('label', keywordOptions.value ?? '')
                params.append('titleImgs', formState.user.titleImgs ?? JSON.parse(sessionStorage.getItem("user")).head)
                params.append('createTime', formState.user.createTime)
                axios.post(store.state.path + '/info.action', params)
                    .then(res => {
                        if (res.data.code == 1) {
                            formState.user.author = JSON.parse(sessionStorage.getItem("user")).username
                            formState.user.category = categoryOptions.value
                            formState.user.keywords = keywordOptions.value
                            let submitCode = JSON.stringify({
                                id: res.data.msg,
                                author: formState.user.author,
                                title: formState.user.title,
                                content: formState.user.content,
                                description: formState.user.description,
                                category: JSON.parse(sessionStorage.getItem('categorys')).indexOf(formState.user.category),
                                keywords: formState.user.keywords,
                                titleImgs: formState.user.titleImgs,
                                createTime: formState.user.createTime,
                                colCnt: [0, 0, 0],
                            })
                            // let submitCode = JSON.stringify({
                            //     id: 1,
                            //     author: 'zhangsan',
                            //     title: `zhangsan part`,
                            //     avatar: 'https://joeschmoe.io/api/v1/random',
                            //     description: 'GO JAVA',
                            //     content: '# 111111Marked in the browser  Marked in the browser  Marked in the browser\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.',
                            //     keywords: ['GO', 'JAVA'],
                            //     category: ['GO', 'PYTHON', 'JAVA'],
                            //     createTime: '2015-07-23 15:23:05',
                            //     colCnt: [0, 0, 0],
                            // });
                            ws.send(submitCode)
                            message.success('文章发布成功')
                            router.push('/')
                        } else {
                            message.error('文章发布失败')
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } else {
                params.append('op', 'alterArticle');
                params.append('id', route.query.articleId);
                params.append('author', JSON.parse(sessionStorage.getItem("user")).username);
                params.append('title', formState.user.title)
                params.append('content', formState.user.content)
                params.append('description', formState.user.description)
                params.append('categoryId', (JSON.parse(sessionStorage.getItem('categorys')).indexOf(categoryOptions.value)) + 1 ?? 1)
                params.append('label', keywordOptions.value ?? '')
                params.append('titleImgs', formState.user.titleImgs ?? JSON.parse(sessionStorage.getItem("user")).head)
                params.append('createTime', formState.user.createTime)
                axios.post(store.state.path + '/article.action', params)
                    .then(res => {
                        if (res.data.code == 1) {
                            message.success('文章修改成功')
                            router.push('/')
                        } else {
                            message.error('文章修改失败')
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        };

        const onFinishFailed = errorInfo => {
            console.log('Failed:', errorInfo);
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
            tmpAcademys.value = JSON.parse(sessionStorage.getItem("academys")) ?? []
            Object.entries(v.value).forEach(([key, value]) => {
                categorys.value.push({ index: key, value: value })
            })
            visible.value = true;
        };

        const onClose = () => {
            visible.value = false;
        };


        onMounted(() => {
            initDataSource()
            getAcademys()
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
            showDrawer,
            onFinish,
            onFinishFailed,
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