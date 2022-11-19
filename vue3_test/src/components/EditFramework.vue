<template>
    <div>
        <a-layout>
            <a-layout-content>
                <a-space :size="small" direction="horizontal" align="start">
                    <a-col>
                        <div
                            style="border: 1px solid #ccc;text-align:left;height:800px;min-width:1000px;max-width:1100px">
                            <v-md-editor v-model="text" height="800px"></v-md-editor>
                        </div>
                    </a-col>
                    <a-col style="background-color:#fff;" flex="fix">
                        <a-card style="width: 300px;border-radius: 20px;" hoverable>
                            <a-form :model="{ formState }" name="nest-messages" @finish="onFinish">
                                <a-form-item name="date-time-picker" label="日期" :rules="[{ required: true, message: '请选择时间!' }]">
                                    <a-date-picker v-model:value="formState.createTime" show-time
                                        format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss" />
                                </a-form-item>
                                <a-form-item name="title" label="文章标题" :rules="[{ required: true, message: '请填写标题!' }]">
                                    <a-input v-model:value="formState.title" />
                                </a-form-item>
                                <a-form-item name="description" label="文章描述" :rules="[{ required: true,message: '请填写文章描述!' }]">
                                    <a-input v-model:value="formState.description" />
                                </a-form-item>
                                <a-form-item name="articleImg" label="文章图片">
                                    <a-input v-model:value="formState.avatar" placeholder="空则使用默认图片" />
                                </a-form-item>
                                <a-form-item name="categorys" label="栏目选择">
                                    <a-select showSearch v-model:value="categoryOptions" mode="single"
                                        style="width: 100%" placeholder="请选择栏目" :options="categorys"
                                        @change="handleChange">
                                    </a-select>
                                </a-form-item>
                                <a-form-item name="keywords" label="关键词">
                                    <a-select showSearch v-model:value="keywordOptions" mode="multiple"
                                        style="width: 100%" placeholder="请选择关键词" :options="keywords"
                                        @change="handleChange">
                                    </a-select>
                                </a-form-item>
                                <a-form-item>
                                    <a-button shape="round" type="primary" html-type="submit">提交</a-button>
                                </a-form-item>
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
import NotificationComponent from './tools/NotificationComponent.vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useRoute } from 'vue-router'
import { onBeforeUnmount } from 'vue'
export default defineComponent({
    name: 'EditFramework',
    setup() {
        const router = useRouter()
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
        const formState = ref({
            id: undefined,
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

        const config = {
            rules: [{
                type: 'string',
                required: true,
                message: 'Please select time!',
            }],
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


        onMounted(() => {
            //撰写文章的分类以及关键词加载
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
        })

        // var ws
        const onFinish = values => {
            router.push('/')
            // ws = new WebSocket(
            //     `ws://localhost:8081/demo/websocket`
            // );
            console.log('Success:', values);
            var params = new URLSearchParams();
            params.append('op', 'getArticleById');
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
        };

        const onFinishFailed = errorInfo => {
            console.log('Failed:', errorInfo);
        };

        // 组件销毁时，也及时销毁编辑器
        onBeforeUnmount(() => {
        })

        return {
            text,
            config,
            formState,
            categorys,
            keywords,
            getContent,
            keywordOptions,
            categoryOptions,
            openNotification,
            mode: 'default', // 或 'simple'
            onFinish,
            onFinishFailed,
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