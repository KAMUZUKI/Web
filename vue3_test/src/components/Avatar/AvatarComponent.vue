<template>
    <!-- <div style="background: #ececec; padding: 0px"> -->

    <a-card size="small" style="width: 300px;" hoverable="true">
        <div style="background: #ececec;">

            <a-avatar shape="circle" :size="48" :src="userInfo.url">
                <template #icon>
                    <UserOutlined />
                </template>
            </a-avatar>
            <span>{{ userInfo.username }}</span>
            <a-button @click="logout()">退出</a-button><br>

            <a-tag color="#55acee">
                <template #icon>
                    <twitter-outlined />
                </template>
                Twitter
            </a-tag>
            <a-tag color="#cd201f">
                <template #icon>
                    <youtube-outlined />
                </template>
                Youtube
            </a-tag>
            <a-tag color="#3b5999">
                <template #icon>
                    <facebook-outlined />
                </template>
                Facebook
            </a-tag>
        </div>
    </a-card>

    <!-- </div> -->
</template>

<script>
import { UserOutlined } from '@ant-design/icons-vue';
import { defineComponent, reactive } from 'vue';
import { TwitterOutlined, YoutubeOutlined, FacebookOutlined } from '@ant-design/icons-vue';
import { useStore } from 'vuex' // 引入useStore 方法
export default defineComponent({
    name: 'AvatarComponent',
    components: {
        UserOutlined,
        TwitterOutlined,
        YoutubeOutlined,
        FacebookOutlined,
    },
    setup(props) {

        const store = useStore()

        const userInfo = reactive({
            username: store.state.user.username,
            url: store.state.user.head,
            Motto: '即使再小的帆也能远航',
        })

        const logout = ()=>{
            sessionStorage.removeItem('user')
            sessionStorage.removeItem('articleDetail')
            props.showAvatar()
            props.openNotificationWithIcon('success', '成功', '恭喜退出成功')
        }

        return {
            userInfo,
            logout
        };
    },
    props: {
        showAvatar: {
            type: Function,
            required: true,
        },
        openNotificationWithIcon: {
            type: Function,
            required: true,
        },
    },
});
</script>