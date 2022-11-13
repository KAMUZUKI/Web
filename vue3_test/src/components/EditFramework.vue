<template>
    <a-layout>
        <a-layout-content>
            <a-space :size="small" direction="horizontal" align="start">
                <a-col>
                    <MavonEditor ref="getContent" :content="formState.content"></MavonEditor>
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
                                <a-select showSearch v-model:categoryOptions="categoryOptions" mode="multiple" style="width: 100%"
                                    placeholder="请选择栏目" :options="categorys" @change="handleChange"></a-select>
                            </a-form-item>
                            <a-form-item :name="keywords" label="关键词">
                                <a-select showSearch v-model:keywordOptions="keywordOptions" mode="multiple" style="width: 100%"
                                    placeholder="请选择关键词" :options="keywords" @change="handleChange"></a-select>
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
    <NotificationComponent ref="openNotification"/>
</template>

<script>
import { defineComponent, ref,toRef, onMounted, createVNode } from 'vue';
import MavonEditor from './MavonEditor/MavonEditor.vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import NotificationComponent from './tools/NotificationComponent.vue';
import { Modal } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router'
import { useStore } from 'vuex' // 引入useStore 方法

export default defineComponent({
    name: 'EditFramework',
    setup() {
        const store = useStore()
        const router = useRouter()
        const route = useRoute()
        const openNotification = ref()
        const getContent = ref()
        const catagoryOptions = ref([])
        const keywordOptions = ref([])
        const isEdit = store.state.isCertified
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
        
        const judgeMode = ()=>{
            const editInfo = route.query.articleId ?? '0'
            if (editInfo !== '0') {
                //TODO:通过articleId获取文章详情
                formState.value = {
                    id: 1,
                    author: 'zhangsan',
                    title: `zhangsan part`,
                    avatar: 'https://joeschmoe.io/api/v1/random',
                    description: 'GO JAVA',
                    content: '# 111111Marked in the browser  Marked in the browser  Marked in the browser\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.',
                    keywords: ['GO', 'JAVA'],
                    categorys: ['GO', 'PYTHON', 'JAVA'],
                    createTime: '2015-07-23 15:23:05',
                    colCnt: [234, 34, 43],
                }
                catagoryOptions.value = toRef(formState.value.categorys)
                keywordOptions.value = toRef(formState.value.keywords)
            }
        }

        onMounted(() => {
            if (isEdit == false) {
                showPromiseConfirm("无权限", "您还未登录，是否前往登录？")
                router.push('/')
                return
            }
            judgeMode()
        })

        const showPromiseConfirm = (title, message) => {
            Modal.confirm({
                title: title,
                icon: createVNode(ExclamationCircleOutlined),
                content: createVNode('div', {
                    style: 'color:red;',
                }, message),
                onOk() {
                    console.log('OK');
                },
                onCancel() {
                    console.log('Cancel');
                },
                class: 'test',
            });
        }

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

        const onFinish = values => {
            openNotification.value.openNotificationWithIcon('success','表单提交', '提交成功');
            formState.value.content = getContent.value.getContent
            console.log('Success:', values);
        };

        return {
            formState,
            categorys,
            keywords,
            getContent,
            openNotification,
            catagoryOptions,
            keywordOptions,
            onFinish,
            handleChange,
        };
    },
    components: {
        MavonEditor,
        NotificationComponent
    },
    props: {
        openNotificationWithIcon: {
            type: Function,
            required: true,
        },
    },
})

</script>