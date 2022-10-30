<template>
    <a-form ref="formRef" name="custom-validation" :model="formState" :rules="rules" v-bind="layout"
        @finish="handleFinish" @validate="handleValidate" @finishFailed="handleFinishFailed">
        <a-form-item label="Username" name="username" :rules="[{ required: true, message: 'Please input your username!' }]">
            <a-input v-model:value="formState.username">
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
        <a-form-item label="gender" required>
            <a-select v-model:value="formState.gender" placeholder="please select your gender">
                <a-select-option value="1">男</a-select-option>
                <a-select-option value="0">女</a-select-option>
            </a-select>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 16, offset: 6 }">
            <a-button type="primary" html-type="submit">注册</a-button>
            <a-button style="margin-left: 10px" @click="onClose">退出</a-button>
        </a-form-item>
    </a-form>
</template>
<style>
    a-form-item {
        color: rgba(0, 0, 0, 0.25);
    }
</style>
<script>
import { defineComponent, reactive, ref } from 'vue';
import { toRaw, computed } from 'vue';
import { toArray } from 'lodash-es';
import { Form } from 'ant-design-vue';
const useForm = Form.useForm;
export default defineComponent({
    name:'RegisterComponent',
    setup() {

      const { resetFields, validate, validateInfos, mergeValidateInfo } = useForm(modelRef, rulesRef);
      const onSubmit = () => {
        validate()
          .then(() => {
            console.log(toRaw(modelRef));
          })
          .catch(err => {
            console.log('error', err);
          });
      };
      const errorInfos = computed(() => {
        return mergeValidateInfo(toArray(validateInfos));
      });
      

        const formRef = ref();
        const formState = reactive({
            username: '',
            pass: '',
            checkPass: '',
            gender:'1',
        });

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

        const handleFinish = values => {
            console.log(values, formState);
        };

        const handleFinishFailed = errors => {
            console.log(errors);
        };

        const handleValidate = (...args) => {
            console.log(args);
        };

        return {
            formState,
            formRef,
            rules,
            layout,
            handleFinishFailed,
            handleFinish,
            handleValidate,
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
            validateInfos,
            resetFields,
            modelRef,
            onSubmit,
            errorInfos,
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