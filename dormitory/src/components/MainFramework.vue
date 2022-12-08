<template>
    <LayoutFramework v-if="isLogin.value"></LayoutFramework>
    <LoginForm v-if="!isLogin.value">{{!isLogin.value}}</LoginForm>
    
</template>

<script>
import {defineComponent,ref } from 'vue';
import LayoutFramework from '@/components/LayoutFramework.vue';
import LoginForm from '@/components/LoginForm.vue';
import { useStore } from 'vuex' // 引入useStore 方法
export default defineComponent({
    name: "MainFramework",
    setup() {
        const store = useStore();
        const isLogin = ref(store.state.isLogin)
        return {
            isLogin
        }
    },
    components: {
        LoginForm,
        LayoutFramework
    }
})
</script>