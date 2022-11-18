<template>
    <div>
        <a-layout>
            <a-layout-content>
                <a-space :size="small" direction="horizontal" align="start">
                    <a-col>
                        <div
                            style="border: 1px solid #ccc;text-align:left;height:800px;min-width:1000px;max-width:1100px">
                            <!-- <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef"
                                :defaultConfig="toolbarConfig" :mode="mode" />
                            <Editor style="height: 500px; overflow-y: hidden;" v-model="valueHtml"
                                :defaultConfig="editorConfig" :mode="mode" @onCreated="handleCreated" /> -->
                            <v-md-editor v-model="text" height="800px"></v-md-editor>
                        </div>
                    </a-col>
                    <a-col style="background-color:#fff;" flex="fix">
                        <a-card style="width: 300px;border-radius: 20px;" hoverable>
                            <a-form :layout="vertical" :labelAlign="left" :model="formState" v-bind="layout"
                                name="nest-messages" :validate-messages="validateMessages" @finish="onFinish">
                                <a-form-item name="date-time-picker" label="日期" v-bind="config">
                                    <a-date-picker v-model:value="formState['createTime']" show-time
                                        format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss" />
                                </a-form-item>
                                <a-form-item label="文章标题" name="title">
                                    <a-input v-model:value="formState['title']" placeholder="文章标题" />
                                </a-form-item>
                                <a-form-item :name="description" label="文章描述">
                                    <a-input v-model:value="formState['description']" />
                                </a-form-item>
                                <a-form-item :name="articleImg" label="文章图片">
                                    <a-input v-model:value="formState['avatar']" />
                                </a-form-item>
                                <a-form-item :name="categorys" label="栏目选择">
                                    <a-select showSearch v-model:categoryOptions="categoryOptions" mode="multiple"
                                        style="width: 100%" placeholder="请选择栏目" :options="categorys"
                                        @change="handleChange">
                                    </a-select>
                                </a-form-item>
                                <a-form-item :name="keywords" label="关键词">
                                    <a-select showSearch v-model:keywordOptions="keywordOptions" mode="multiple"
                                        style="width: 100%" placeholder="请选择关键词" :options="keywords" selected="默认选项"
                                        @change="handleChange">
                                    </a-select>
                                </a-form-item>
                                <a-button @click="onFinish" type="primary" shape="round" :size="size">
                                    <template #icon>
                                        <DownloadOutlined />
                                    </template>
                                    提交
                                </a-button>
                            </a-form>
                        </a-card>
                    </a-col>
                </a-space>
            </a-layout-content>
        </a-layout>
        <NotificationComponent ref="openNotification" />
    </div>
</template>

<script>
import { defineComponent, ref, toRef, onMounted } from 'vue';
// import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import NotificationComponent from './tools/NotificationComponent.vue';
// import { Modal } from 'ant-design-vue';
// import { useRouter } from 'vue-router';
import axios from 'axios';
import { useRoute } from 'vue-router'
import { onBeforeUnmount } from 'vue'
export default defineComponent({
    name: 'EditFramework',
    setup() {
        // const router = useRouter()
        const route = useRoute()
        const openNotification = ref()
        const getContent = ref()
        const catagoryOptions = ref([])
        const keywordOptions = ref([])
        const text = ref()
        const formState = ref({
            id: Number,
            author: '',
            title: '',
            avatar: '',
            description: '',
            content: '',
            keywords: [],
            categorys: [],
            createTime: '',
            colCnt: [],
        });

        const judgeMode = () => {
            const editInfo = route.query.articleId ?? '0'
            if (editInfo !== '0') {
                //TODO:通过articleId获取文章详情
                var params = new URLSearchParams();
                params.append('op', 'getArticleById');
                params.append('id', editInfo);
                //TODO: Login
                axios.post('http://localhost:8081/demo/info.action', params)
                    .then(res => {
                        console.log(res)
                        if (res.data.code == 1) {
                            formState.value = res.data.data
                            text.value = formState.value.content
                            sessionStorage.setItem("articleDetail", JSON.stringify(formState.value));
                        } else {
                            console.log(res.data.msg)
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                catagoryOptions.value = toRef(formState.value.categorys)
                keywordOptions.value = toRef(formState.value.keywords)
            }
        }
        var ws
        onMounted(() => {
            setTimeout(() => {
                formState.value = formState.value.content ?? ''
            }, 500)
            judgeMode()
            ws = new WebSocket(
                `ws://localhost:8081/demo/websocket`
            );
        })

        // const showPromiseConfirm = (title, message) => {
        //     Modal.confirm({
        //         title: title,
        //         icon: createVNode(ExclamationCircleOutlined),
        //         content: createVNode('div', {
        //             style: 'color:red;',
        //         }, message),
        //         onOk() {
        //             console.log('OK');
        //         },
        //         onCancel() {
        //             console.log('Cancel');
        //         },
        //         class: 'test',
        //     });
        // }

        const categorys = ref([
            { label: 'JAVA技术', value: 'JAVA技术' },
            { label: '.NET技术', value: '.NET技术' },
            { label: '数据库技术', value: '数据库技术' },
            { label: 'GO', value: 'GO' },
            { label: 'PYTHON', value: 'PYTHON' },
            { label: 'C#', value: 'C#' },
            { label: 'JavaScript', value: 'JavaScript' },
            { label: 'TypeScript', value: 'TypeScript' },
        ]);

        const keywords = ref([
            { value: 'Spring' },
            { value: 'SpringBoot' },
            { value: 'SpringCloud' },
            { value: 'SpringMVC' },
            { value: 'SpringSecurity' },
            { value: 'SpringData' },
            { value: 'SpringBatch' },
            { value: 'SpringJPA' },
            { value: 'SpringDataJPA' },
            { value: 'SpringDataMongoDB' },
            { value: 'SpringDataRedis' },
        ])

        const handleChange = value => {
            console.log(`selected ${value}`);
        };



        const onFinish = () => {
            //2. ws.send()给服务器发送信息
            // id: formState.value.id,
            // author: formState.value.author,
            // title: formState.value.title,
            // avatar: formState.value.avatar,
            // description: formState.value.description,
            // content: text.value,
            // keywords: formState.value.keywords,
            // categorys: formState.value.categorys,
            // createTime: formState.value.createTime,
            let submitCode = JSON.stringify({
                id: 1,
                author: 'zhangsan',
                title: `zhangsan part`,
                avatar: 'https://joeschmoe.io/api/v1/random',
                description: 'GO JAVA',
                content: '# 111111Marked in the browser  Marked in the browser  Marked in the browser\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.',
                keywords: ['GO', 'JAVA'],
                category: ['GO', 'PYTHON', 'JAVA'],
                createTime: '2015-07-23 15:23:05',
                colCnt: [0, 0, 0],
            });
            ws.send(submitCode);
            //TODO:提交文章
            // let params = new URLSearchParams();
            // params.append("id", formState.value.id);
            // params.append("author", formState.value.author);
            // params.append("title", formState.value.title);
            // params.append("avatar", formState.value.avatar);
            // params.append("description", formState.value.description);
            // params.append("content", formState.value.content);
            // params.append("keywords", formState.value.keywords);
            // params.append("categorys", formState.value.categorys);
            // params.append("createTime", formState.value.createTime);
            // axios.post("article.action", params).then(result => {
            //     let json = result.data;
            //     if (json.code == 1) {
            //         openNotification.value.openNotificationWithIcon('成功', '表单提交', '提交成功')
            //     } else {
            //         openNotification.value.openNotificationWithIcon('失败', '表单提交', '提交失败')
            //     }
            // })
        };

        // 组件销毁时，也及时销毁编辑器
        onBeforeUnmount(() => {
        })

        return {
            formState,
            categorys,
            keywords,
            getContent,
            openNotification,
            catagoryOptions,
            keywordOptions,
            mode: 'default', // 或 'simple'
            onFinish,
            handleChange,
            text
        };
    },
    components: {
        NotificationComponent,
    },
    props: {
        openNotificationWithIcon: {
            type: Function,
            required: true,
        },
    },
})

</script>