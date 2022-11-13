<template>
    <button @click="openNotificationWithIcon('success', 'Success', 'Hello')">按钮</button>
</template>
<script>
import { notification } from 'ant-design-vue';
import { defineComponent} from 'vue';
export default defineComponent({
    name: 'NotificationComponent',
    setup() {
        const openNotificationWithIcon = (type, status, message) => {
            notification[type]({
                message: status,
                description: message,
            });
        };
        
        return {
            openNotificationWithIcon,
        };
    },
});
</script>