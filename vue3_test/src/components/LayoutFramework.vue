<template>
    <a-layout>
        <a-layout-header style="background-color:#d9d9d9;padding:0 0;height:90px">
            <a-row>
                <a-col :span="15">
                    <span style="display: inline-block;width: 100px;font-size:xx-large;float: left">DIZCARD</span><br>
                    <BreadcrumbComponent style="float:left;margin-left:20px"></BreadcrumbComponent>
                </a-col>
                <a-col :span="9">
                    <AvatarComponent v-if="avatarVisible" :showAvatar="showAvatar"
                        :openNotificationWithIcon="openNotificationWithIcon" style="width:100%;float: right">
                    </AvatarComponent>
                </a-col>
            </a-row>
            <a-row>
            </a-row>
        </a-layout-header>
        <a-layout>
            <a-layout-sider theme="light" style="width:200px">
                <a-row class="a-row" style="background-color:#fff" type="flex">
                    <DrawerComponent :avatarVisible="avatarVisible" :showAvatar="showAvatar" :openNotificationWithIcon="openNotificationWithIcon"></DrawerComponent>
                </a-row>
                <a-row class="a-row" style="background-color:#fff" type="flex">
                    <MenuComponent></MenuComponent>
                </a-row>
            </a-layout-sider>
            <a-layout-content>
                <a-col style="background-color:#fff;float:left;" flex="fix">
                    <ContentComponent></ContentComponent>
                </a-col>
            </a-layout-content>
        </a-layout>
        <a-layout-footer>
            <a-col flex="1 1 200px">1 1 200px</a-col>
            <a-col flex="auto">copyright 2022 By MUZUKI</a-col>
            <a-col flex="0 1 300px">1 1 200px</a-col>
        </a-layout-footer>
    </a-layout>
</template>

<script>
import { defineComponent,ref} from 'vue';
import { notification } from 'ant-design-vue';
import DrawerComponent from './DrawerComponent.vue';
import ContentComponent from './ContentComponent.vue';
import BreadcrumbComponent from './tools/BreadcrumbComponent.vue';
import AvatarComponent from './tools/AvatarComponent.vue';
import MenuComponent from './tools/MenuComponent.vue';
export default defineComponent({
    name: 'LayoutFramework',
    setup() {
        const avatarVisible = ref(false);
        const showAvatar = () => {
            avatarVisible.value = !avatarVisible.value;
        };
        const openNotificationWithIcon = (type, status, message) => {
            notification[type]({
                message: status,
                description: message,
            });
        };
        return {
            avatarVisible,
            showAvatar,
            openNotificationWithIcon
        };
    },
    components: {
        DrawerComponent,
        ContentComponent,
        AvatarComponent,
        BreadcrumbComponent,
        MenuComponent
    },
})

</script>

<style>
.a-row {
    background-color: #d9d9d9;
    margin-top: 20px;
}


#components-layout-demo-basic .code-box-demo {
    text-align: center;
}

#components-layout-demo-basic .ant-layout-header,
#components-layout-demo-basic .ant-layout-footer {
    color: #fff;
    background: #7dbcea;
}

[data-theme='light'] #components-layout-demo-basic .ant-layout-header {
    background: #6aa0c7;
}

[data-theme='light'] #components-layout-demo-basic .ant-layout-footer {
    background: #6aa0c7;
}

#components-layout-demo-basic .ant-layout-footer {
    line-height: 1.5;
}

#components-layout-demo-basic .ant-layout-sider {
    color: #fff;
    line-height: 120px;
    background: #3ba0e9;
}

[data-theme='light'] #components-layout-demo-basic .ant-layout-sider {
    background: #3499ec;
}

#components-layout-demo-basic .ant-layout-content {
    min-height: 120px;
    color: #fff;
    line-height: 120px;
    background: rgba(16, 142, 233, 1);
}

[data-theme='light'] #components-layout-demo-basic .ant-layout-content {
    background: #107bcb;
}

#components-layout-demo-basic>.code-box-demo>.ant-layout+.ant-layout {
    margin-top: 48px;
}
</style>