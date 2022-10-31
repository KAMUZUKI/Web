<template>
  <div style="background: #ececec; padding: 5px;border-radius: 10px;">
    <a-form :model="formState" name="normal_login" class="login-form" @finish="onFinish" @finishFailed="onFinishFailed">
      <a-form-item label="用户" name="username"
        :rules="[{ required: true, message: 'Please input your username!' }]">
        <a-input v-model:value="formState.username" style="border-radius:10px">
          <template #prefix>
            <UserOutlined class="site-form-item-icon" />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item label="密码" name="password"
        :rules="[{ required: true, message: 'Please input your password!' }]">
        <a-input-password v-model:value="formState.password" style="border-radius:10px">
          <template #prefix>
            <LockOutlined class="site-form-item-icon" />
          </template>
        </a-input-password>
      </a-form-item>

      <a-form-item>
        <a-form-item name="remember" no-style>
          <a-checkbox v-model:checked="formState.remember">记住</a-checkbox>
        </a-form-item>
        <a class="login-form-forgot" href="">忘记密码</a>
      </a-form-item>

      <a-form-item>
        <a-button :disabled="disabled" style="border-radius:10px" type="primary" html-type="submit" class="login-form-button"
          @click="showAvatar();login()">
          Log in
        </a-button>
        Or
        <a @click="showDrawer">register now!</a>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import { defineComponent, reactive, computed } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
// import axios from 'axios';
export default defineComponent({
  name: 'LoginForm',

  components: {
    UserOutlined,
    LockOutlined
  },
  props: {
    showDrawer: {
      type: Function,
      required: true,
    },
    showAvatar: {
      type: Function,
      required: true,
    },
    openNotificationWithIcon: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const login = () => {
      // var params = new URLSearchParams();
      // params.append('op', 'login');
      // params.append('username', formState.username);
      // params.append('password', formState.password);
      // axios.post('http://localhost:8080/Servlet', params)
      //   .then(function (response) {
      //     console.log(response);
      //     if (response.data.status == 'success') {
      //       props.openNotificationWithIcon('success', 'Login', 'Login success');
      //     } else {
      //       props.openNotificationWithIcon('error', 'Login', 'Login failed');
      //     }
      //   })
      //   .catch(function (error) {
      //     console.log(error); 
      //   });
      // console.log("login");
      // console.log('====================')
      console.log(props)
      props.openNotificationWithIcon('success', '登录', '恭喜登录成功');
    }

    const formState = reactive({
      username: 'a',
      password: 'a',
      remember: true,
    });

    const onFinish = values => {
      console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };

    const disabled = computed(() => {
      return !(formState.username && formState.password);
    });

    return {
      formState,
      onFinish,
      onFinishFailed,
      disabled,
      login
    };
  },

});
</script>
<style>
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}

#components-form-demo-normal-login .login-form-forgot {
  float: right;
}

#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>