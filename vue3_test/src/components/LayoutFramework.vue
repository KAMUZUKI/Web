<template>
    <a-layout>
        <a-layout-header style="background-color:#d9d9d9;padding:0 0">
            <AvatarComponent></AvatarComponent>
        </a-layout-header>
        <a-layout>
            <a-layout-sider theme="light" style="width:200px">
                <a-row class="a-row" style="background-color:#fff" type="flex">
                    <DrawerComponent></DrawerComponent>
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
import DrawerComponent from './DrawerComponent.vue';
import ContentComponent from './ContentComponent.vue';
import AvatarComponent from './tools/AvatarComponent.vue';
export default {
    name: 'LayoutFramework',
    components: {
        DrawerComponent,
        ContentComponent,
        AvatarComponent
    },
}
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