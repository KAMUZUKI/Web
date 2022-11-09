<template>
    <a-list v-if="comments.length" :data-source="comments"
        :header="`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`" item-layout="horizontal">
        <template #renderItem="{ item }">
            <a-list-item>
                <a-comment style="margin-left:30px" :author="item.createBy" :avatar="item.avatar" :content="item.content"
                    :datetime="item.createTime" />
            </a-list-item>
        </template>
    </a-list>
    <a-comment>
        <template #avatar>
            <a-avatar src="userDetial.head" alt="Han Solo" />
        </template>
        <template #content>
            <a-form-item>
                <a-textarea v-model:value="value" :rows="4" />
            </a-form-item>
            <a-form-item>
                <a-button html-type="submit" :loading="submitting" type="primary" @click="handleSubmit">
                    Add Comment
                </a-button>
            </a-form-item>
        </template>
    </a-comment>
</template>
<script>
import { defineComponent, ref, onMounted } from 'vue';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
// import axios from 'axios';
import { useStore } from 'vuex' // 引入useStore 方法
dayjs.extend(relativeTime);
export default defineComponent({
    name: "CommentComponent",
    setup(props) {
        const store = useStore()
        const detail = ref();
        const user = ref();

        if (typeof (store.state.user) == "undefined") {
            user.value = JSON.parse(sessionStorage.getItem("user"))
        } else {
            user.value = store.state.user;
        }
        
        const userDetial = user.value

        const CommentData = [
            {
                id: 1,
                articleid: 1,
                content: '11111写的不错',
                createBy: 'zhangsan',
                createTime: '2015-07-23 15:23:05',
                avatar: 'http://q1.qlogo.cn/g?b=qq&nk=1437487442&s=100',
            },
            {
                id: 2,
                articleid: 2,
                content: '11111不敢苟同。。。',
                createBy: 'lisi',
                createTime: '2018-09-14 15:23:41',
                avatar: 'http://q1.qlogo.cn/g?b=qq&nk=2725291836&s=100',
            },
            {
                id: 3,
                articleid: 1,
                content: '22222不敢苟同。。。',
                createBy: 'zhangsan',
                createTime: '2018-09-14 15:23:41',
                avatar: 'http://q1.qlogo.cn/g?b=qq&nk=1196530268&s=100',
            },
            {
                id: 4,
                articleid: 2,
                content: '22222写的不错',
                createBy: 'lisi',
                createTime: '2015-07-23 15:23:05',
                avatar: 'http://q1.qlogo.cn/g?b=qq&nk=3603685701&s=100',
            }
        ]

        const comments = ref([])

        const submitting = ref(false);
        const value = ref('');
        
        const initComment = () => {
            CommentData.forEach(item => {
                if (item.articleid == props.articleId) {
                    comments.value.push(item)
                }
            })
        }

        const handleSubmit = () => {
            if (!value.value) {
                return;
            }
            console.log(dayjs().format("YYYY-MM-DD HH:mm:ss"))
            submitting.value = true;

            setTimeout(() => {
                submitting.value = false;
                comments.value.push({
                    articleid: props.articleId,
                    createBy: 'Han Solo',
                    avatar: 'https://joeschmoe.io/api/v1/random',
                    content: value.value,
                    createTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
                })
                value.value = '';
            }, 1000);

            // var params = new URLSearchParams();
            // params.append('op', 'login');
            // params.append('username', );
            // params.append('password', );
            // //TODO: Login
            // axios.post('http://kamuzuki.top:8080/bbs/user.action', params)
            //     .then(res => {
            //         if (res.data.status == 'success') {
            //             store.state.isLogin = true
            //             store.state.openNotificationWithIcon('success', 'Login', 'Login success')
            //         } else {
            //             store.state.openNotificationWithIcon('error', 'Login', 'Login failed')
            //         }
            //     })
            //     .catch(function (error) {
            //         console.log(error);
            //     });
        }

        onMounted(() => {
            initComment()
        })
        return {
            comments,
            submitting,
            value,
            detail,
            userDetial,
            handleSubmit,
        }
    },
    props: {
        articleId: {
            type: Number,
            default: 1
        }
    }
});
</script>