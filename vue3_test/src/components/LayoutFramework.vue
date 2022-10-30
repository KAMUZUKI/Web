<template>
    <a-row class="a-row" type="flex">
        <a-col :flex="2"><h1>DIZCARD</h1></a-col>
        <a-col :flex="3">3 / 5</a-col>
    </a-row>
    <a-row class="a-row" type="flex">
        <a-col style="background-color:#fff" flex="300px">
            <a-row class="a-row" style="background-color:#fff" type="flex">
                <DrawerComponent></DrawerComponent>
            </a-row>
            <a-row class="a-row" style="background-color:#fff" type="flex">
                <DrawerComponent></DrawerComponent>
            </a-row>
        </a-col>
        <a-col flex="">
            <ContentComponent></ContentComponent>
        </a-col>
    </a-row>
    <a-row class="a-row" type="flex">
        <a-col flex="1 1 200px">1 1 200px</a-col>
        <a-col flex="auto">copyright 2022 By MUZUKI</a-col>
        <a-col flex="0 1 300px">1 1 200px</a-col>
    </a-row>
</template>

<script>
import DrawerComponent from './DrawerComponent.vue';
import ContentComponent from './ContentComponent.vue';
export default {
    name: 'LayoutFramework',
    components:{
        DrawerComponent,
        ContentComponent
    }
}
</script>

<style>
    .a-row{
        background-color: #3eabfc;
        margin-top:20px;
    }
</style>