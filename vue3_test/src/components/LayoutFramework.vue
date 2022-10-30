<template>
    <a-row class="a-row" type="flex">
        <a-col :flex="2"><h1>DIZCARD</h1></a-col>
        <a-col :flex="3">3 / 5</a-col>
    </a-row>
    <a-row class="a-row" type="flex">
        <a-col style="background-color:#fff" flex="300px"><DrawerComponent></DrawerComponent></a-col>
        <a-col flex="auto"></a-col>
    </a-row>
    <a-row class="a-row" type="flex">
        <a-col flex="1 1 200px">1 1 200px</a-col>
        <a-col flex="0 1 300px">0 1 300px</a-col>
    </a-row>
</template>

<script>
import DrawerComponent from './DrawerComponent.vue';
export default {
    name: 'LayoutFramework',
    components:{
        DrawerComponent
    }
}
</script>

<style>
    .a-row{
        background-color: #3eabfc;
        margin-top:20px;
    }
</style>