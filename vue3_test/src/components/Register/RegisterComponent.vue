<template>
    <a-form 
        ref="formRef" 
        name="custom-validation" 
        :model="formState" 
        :rules="rules" 
        v-bind="layout"
        @finish="handleFinish" 
        @validate="handleValidate" 
        @finishFailed="handleFinishFailed"
        :validate-messages="validateMessages"
    >
        <h2 style="text-align:center;">注册</h2>
        <a-form-item label="Username" name="username" >
            <a-input v-model:value="formState.username" :rules="[{ required: true }]">
                <template #prefix>
                    <UserOutlined class="site-form-item-icon" />
                </template>
            </a-input>
        </a-form-item>
        <a-form-item has-feedback label="Password" name="pass">
            <a-input v-model:value="formState.pass" type="password" autocomplete="off" />
        </a-form-item>
        <a-form-item has-feedback label="Confirm" name="checkPass">
            <a-input v-model:value="formState.checkPass" type="password" autocomplete="off" />
        </a-form-item>
        <a-form-item :name="['email']" label="Email" :rules="[{ required: true },{ type: 'email' }]">
            <a-input v-model:value="formState.email" />
        </a-form-item>
        <a-form-item label="gender" required>
            <a-select v-model:value="formState.gender" placeholder="please select your gender">
                <a-select-option value="1">男</a-select-option>
                <a-select-option value="0">女</a-select-option>
            </a-select>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 16, offset: 6 }">
            <a-button type="primary" html-type="submit" @click="register">注册</a-button>
            <a-button style="margin-left: 10px" @click="onClose">退出</a-button>
        </a-form-item>
    </a-form>
</template>
<style>

</style>
<script>
import { defineComponent, reactive, ref } from 'vue';
import { notification } from 'ant-design-vue';
export default defineComponent({
    name: 'RegisterComponent',
    setup() {
        const formRef = ref();

        const formState = reactive({
            username: '',
            pass: '',
            checkPass: '',
            email:'',
            gender: '1',
            status:0,
            usernamePass:0, 
            password1Pass:0,
            password2Pass:0,
            emailPass:0,
        });

        const validateMessages = {
            required: '${label} is required!',
            types: {
                email: '${label} is not a valid email!',
                number: '${label} is not a valid number!',
            }
        };

        let validatePass = async (_rule, value) => {
            if (value === '') {
                return Promise.reject('Please input the password');
            } else {
                if (formState.checkPass !== '') {
                    formRef.value.validateFields('checkPass');
                }
                return Promise.resolve();
            }
        };

        let validatePass2 = async (_rule, value) => {
            if (value === '') {
                return Promise.reject('Please input the password again');
            } else if (value !== formState.pass) {
                return Promise.reject("Two inputs don't match!");
            } else {
                return Promise.resolve();
            }
        };

        const rules = {
            pass: [{
                required: true,
                validator: validatePass,
                trigger: 'change',
            }],
            checkPass: [{
                validator: validatePass2,
                trigger: 'change',
            }],

        };

        const layout = {
            labelCol: {
                span: 6,
            },
            wrapperCol: {
                span: 16,
            },
        };

        const register = () => {
            openNotificationWithIcon('success', '注册成功', '恭喜你注册成功');
            openNotificationWithIcon('error', '注册失败', '注册失败');
        };

        const handleFinish = values => {
            console.log(values, formState);
        };

        const handleFinishFailed = errors => {
            console.log(errors);
        };

        const resetForm = () => {
            formRef.value.resetFields();
        };

        const handleValidate = (...args) => {
            console.log(args);
        };

        const openNotificationWithIcon = (type, title, message) => {
            notification[type]({
                message: title,
                description: message,
            });
        };

        return {
            rules,
            layout,
            formRef,
            formState,
            validateMessages,
            register,
            resetForm,
            handleFinish,
            handleValidate,
            handleFinishFailed,
            openNotificationWithIcon,
            labelCol: { span: 4 },
            wrapperCol: { span: 14 }
        };
    },
    props: {
        onClose: {
            type: Function,
            required: false,
        },
    },
});
</script>