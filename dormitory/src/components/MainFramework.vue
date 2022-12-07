<template>
    <LayoutFramework v-if="isLogin"></LayoutFramework>
    <LoginForm v-if="!isLogin"></LoginForm>
</template>

<script>
import {defineComponent } from 'vue';
import LayoutFramework from '@/components/LayoutFramework.vue';
import LoginForm from '@/components/LoginForm.vue';
export default defineComponent({
    name: "BaseInfo",
    setup() {
        const isLogin = false;
        return {
            isLogin
        }
    },
    component: {
        LoginForm,
        LayoutFramework
    }
})
</script>