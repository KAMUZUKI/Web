<template>
    <a-row class="a-row" type="flex">
        <a-col :flex="2">2 / 5</a-col>
        <a-col :flex="3">3 / 5</a-col>
    </a-row>
    <a-row class="a-row" type="flex">
        <a-col style="background-color:#fff" flex="270px"><LoginForm></LoginForm></a-col>
        <a-col flex="auto">auto</a-col>
    </a-row>
    <a-row class="a-row" type="flex">
        <a-col flex="1 1 200px">1 1 200px</a-col>
        <a-col flex="0 1 300px">0 1 300px</a-col>
    </a-row>
</template>

<script>
import LoginForm from './LoginForm.vue';
export default {
    name: 'LayoutFramework',
    components:{
        LoginForm
    }
}
</script>

<style>
    .a-row{
        background-color: #3eabfc;
        margin-top:20px;
    }
</style>