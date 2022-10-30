<template>
    <div style="background: #ececec; padding: 5px">
        <a-card size="small" style="width: 270px">
            <template #extra><a href="#">more</a></template>
            <a-avatar shape="circle" :size="64" :src="userInfo.url">
                <template #icon>
                    <UserOutlined />
                </template>
            </a-avatar><br>
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
            <a-tag color="#55acee">
                <template #icon>
                    <linkedin-outlined />
                </template>
                LinkedIn
            </a-tag><br>
            <a-button style="margin-top: 10px" @click="showAvatar();openNotificationWithIcon('success','成功','恭喜退出成功')">退出</a-button>
        </a-card>
    </div>
</template>
<script>
import { UserOutlined } from '@ant-design/icons-vue';
import { defineComponent, reactive } from 'vue';
import { TwitterOutlined, YoutubeOutlined, FacebookOutlined, LinkedinOutlined } from '@ant-design/icons-vue';
export default defineComponent({
    name: 'AvatarComponent',
    components: {
        UserOutlined,
        TwitterOutlined,
        YoutubeOutlined,
        FacebookOutlined,
        LinkedinOutlined,
    },
    setup() {
        const userInfo = reactive({
            url: 'https://joeschmoe.io/api/v1/random',
            Motto: '',
        });

        return {
            userInfo
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