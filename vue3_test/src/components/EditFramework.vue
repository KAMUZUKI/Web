<template>
    <div>
        <a-layout>
            <a-layout-content>
                <a-space :size="small" direction="horizontal" align="start">
                    <a-col>
                        <div style="border: 1px solid #ccc;text-align:left;height:800px;min-width:1000px;max-width:1100px">
                            <v-md-editor v-model="text" height="800px"></v-md-editor>
                        </div>
                    </a-col>
                    <a-col style="background-color:#fff;" flex="fix">
                        <a-card style="width: 300px;border-radius: 20px;" hoverable>
                            <a-form ref="formRef" name="custom-validation" :model="formState" :rules="rules" v-bind="layout" 
                                @finish="handleFinish" 
                                @validate="handleValidate"
                                @finishFailed="handleFinishFailed"
                                :validate-messages="validateMessages"
                                >
                                <a-form-item name="date-time-picker" label="日期" v-bind="config"
                                    :rules="[{ required: true, message: 'Please select your favourite colors!', type: 'array' }]">
                                    <a-date-picker v-model:value="formState.createTime" show-time
                                        format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss" />
                                </a-form-item>
                                <a-form-item :name="['title']" label="文章标题">
                                    <a-input v-model:value="formState.title" placeholder="文章标题"
                                        :rules="[{ required: true }]" />
                                </a-form-item>
                                <a-form-item :name="['description']" label="文章描述">
                                    <a-input v-model:value="formState.description" :rules="[{ required: true }]" />
                                </a-form-item>
                                <a-form-item :name="['articleImg']" label="文章图片">
                                    <a-input v-model:value="formState.avatar" :rules="[{ required: true }]" />
                                </a-form-item>
                                <a-form-item :name="['categorys']" label="栏目选择">
                                    <a-select showSearch v-model:value="categoryOptions" mode="single"
                                        style="width: 100%" placeholder="请选择栏目" :options="categorys"
                                        @change="handleChange">
                                    </a-select>
                                </a-form-item>
                                <a-form-item :name="['keywords']" label="关键词">
                                    <a-select showSearch v-model:value="keywordOptions" mode="multiple"
                                        style="width: 100%" placeholder="请选择关键词" :options="keywords"
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
import { defineComponent, ref, onMounted } from 'vue';
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
        const categorys = ref([])
        const keywords = ref([])
        const tmpKeywords = ref([])
        const tmpCategorys = ref([])
        const keywordOptions = ref([])
        const categoryOptions = ref([])
        const text = ref()
        const formRef = ref()
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

        const validateMessages = {
            required: '${label} 是必要的!',
        };

        const judgeMode = () => {
            const editInfo = route.query.articleId ?? '0'
            if (editInfo !== '0') {
                //TODO:通过articleId获取文章详情  修改文章
                var params = new URLSearchParams();
                params.append('op', 'getArticleById');
                params.append('id', editInfo);
                axios.post('http://localhost:8081/demo/info.action', params)
                    .then(res => {
                        if (res.data.code == 1) {
                            formState.value = res.data.data
                            keywordOptions.value = res.data.data.label.split(',')
                            categoryOptions.value = JSON.parse(sessionStorage.getItem("categorys"))[res.data.data.categoryId]
                            text.value = formState.value.content
                            sessionStorage.setItem("articleDetail", JSON.stringify(formState.value));
                        } else {
                            console.log(res.data.msg)
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }

        // var ws
        onMounted(() => {
            //撰写文章
            formState.value = formState.value.content ?? ''
            tmpKeywords.value = JSON.parse(sessionStorage.getItem("keywords")) ?? []
            Object.entries(tmpKeywords.value).forEach(([key, value]) => {
                keywords.value.push({ index: key, value: value })
            })
            tmpCategorys.value = JSON.parse(sessionStorage.getItem("categorys")) ?? []
            Object.entries(tmpCategorys.value).forEach(([key, value]) => {
                categorys.value.push({ index: key, value: value })
            })
            judgeMode()
            // ws = new WebSocket(
            //     `ws://localhost:8081/demo/websocket`
            // );
        })

        const handleFinish = values => {
            console.log(values, formState);
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

        // 组件销毁时，也及时销毁编辑器
        onBeforeUnmount(() => {
        })

        return {
            text,
            formRef,
            formState,
            categorys,
            keywords,
            getContent,
            keywordOptions,
            categoryOptions,
            openNotification,
            validateMessages,
            mode: 'default', // 或 'simple'
            handleFinish,
            handleFinishFailed,
            resetForm,
            handleValidate,
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