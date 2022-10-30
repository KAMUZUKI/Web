<template>
    <div style="background: #ececec; padding: 0px">
        
        <a-card size="small" style="width: 100%;">
            <span style="display: inline-block;width: 100px;font-size:xx-large;float: left">DIZCARD</span>
            <div style="background: #ececec;float: right">
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
            <a-avatar shape="circle" :size="48" :src="userInfo.url">
                <template #icon>
                    <UserOutlined />
                </template>
            </a-avatar>
            <span>{{userInfo.username}}</span>
            <a-button style="margin-top: 10px" @click="showAvatar();openNotificationWithIcon('success','成功','恭喜退出成功')">退出</a-button>
            </div>
        </a-card>
    </div>
</template>
<script>
import { UserOutlined } from '@ant-design/icons-vue';
import { defineComponent, reactive } from 'vue';
import { TwitterOutlined, YoutubeOutlined, FacebookOutlined} from '@ant-design/icons-vue';
export default defineComponent({
    name: 'AvatarComponent',
    components: {
        UserOutlined,
        TwitterOutlined,
        YoutubeOutlined,
        FacebookOutlined,
    },
    setup() {
        const userInfo = reactive({
            username:'zhangsan',
            url: 'https://i1.hdslb.com/bfs/face/73b4a9c72551cd57b06b29d55215b3c9897a0dca.jpg@96w_96h_1c_1s.webp',
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