<script>
import { defineComponent,createVNode } from 'vue';
import { notification } from 'ant-design-vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { Modal } from 'ant-design-vue';
export default defineComponent({
    setup() {
        //消息通知
        const openNotificationWithIcon = (type, status, message) => {
            notification[type]({
                message: status,
                description: message,
            });
        };

        //确认弹窗
        const showPromiseConfirm = (title,message)=> {
            Modal.confirm({
                title: title,
                icon: createVNode(ExclamationCircleOutlined),
                content: createVNode('div', {
                    style: 'color:red;',
                }, message),
                onOk() {
                    console.log('OK');
                },
                onCancel() {
                    console.log('Cancel');
                },
                class: 'test',
            });
        }
        return { 
            openNotificationWithIcon,
            showPromiseConfirm
        }
    }

})
</script>

<style>

</style>