<template>
    <a-layout>
        <a-layout-content>
            <a-space :size="small" direction="horizontal" align="start">
                <a-col>
                    <MavonEditor></MavonEditor>
                </a-col>
                <a-col style="background-color:#fff;" flex="fix">
                    <a-card style="width: 300px;border-radius: 20px;" hoverable>
                        <a-form :layout="vertical" :labelAlign="left" :model="formState" v-bind="layout" name="nest-messages"
                            :validate-messages="validateMessages" @finish="onFinish">
                            <a-form-item name="date-time-picker" label="日期" v-bind="config">
                                <a-date-picker v-model:value="formState['date-time-picker']" show-time
                                    format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss" />
                            </a-form-item>
                            <a-form-item label="文章标题" name="title">
                                <a-input v-model:value="formState.user.title" placeholder="" />
                            </a-form-item>
                            <a-form-item :name="['article', 'articleImg']" label="文章标题">
                                <a-input v-model:value="formState.user.ArticleImg" />
                            </a-form-item>
                            <a-form-item :name="['article', 'description']" label="文章描述">
                                <a-input v-model:value="formState.user.description" />
                            </a-form-item>
                            <a-form-item :name="['article', 'catagorys']" label="栏目选择">
                                <a-select
                                v-model:catagoryOptions="catagoryOptions"
                                mode="multiple"
                                style="width: 100%"
                                placeholder="请选择栏目"
                                :options="catagorys"
                                @change="handleChange"
                              ></a-select>
                            </a-form-item>
                            <a-form-item :name="['article', 'keywords']" label="关键词">
                                <a-select
                                v-model:keywordOptions="keywordOptions"
                                mode="multiple"
                                style="width: 100%"
                                placeholder="请选择关键词"
                                :options="keywords"
                                @change="handleChange"
                              ></a-select>
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
</template>

<script>
import { defineComponent, reactive,ref,onMounted,createVNode } from 'vue';
import MavonEditor from './MavonEditor/MavonEditor.vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { Modal } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex' // 引入useStore 方法
export default defineComponent({
    name: 'EditFramework',
    setup(props) {
        const store = useStore()
        const router = useRouter()
        const isEdit = store.state.isCertified

        onMounted(() => {
            if (isEdit==false) {
                showPromiseConfirm("无权限", "您还未登录，是否前往登录？")
                router.push('/')
                return
            }
        })

        const showPromiseConfirm = (title,message)=> {
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

        const formState = reactive({
            user: {
                name: '',
                age: undefined,
                email: '',
                website: '',
                introduction: '',
            },
        });

        const catagorys = ref([
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
            {value:'Spring'},
            {value:'SpringBoot'},
            {value:'SpringCloud'},
            {value:'SpringMVC'},
            {value:'SpringSecurity'},
            {value:'SpringData'},
            {value:'SpringBatch'},
            {value:'SpringJPA'},
            {value:'SpringDataJPA'},
            {value:'SpringDataMongoDB'},
            {value:'SpringDataRedis'},
        ])

        const handleChange = value => {
          console.log(`selected ${value}`);
        };

        const onFinish = values => {
            props.openNotificationWithIcon('success', '提交成功');
            console.log('Success:', values);
        };

        return {
            formState,
            onFinish,
            handleChange,
            catagorys,
            keywords,
            catagoryOptions:ref([]),
            keywordOptions:ref([]),
        };
    },
    components: {
        MavonEditor
    },
    props: {
      openNotificationWithIcon: {
        type: Function,
        required: true,
      },
    },
})

</script>