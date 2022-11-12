<template>
  <a-card bordered style="width: 300px;height: 200px;border-radius: 20px;" hoverable>
      <a-form :model="formState" name="normal_login" class="login-form" @finish="onFinish"
        @finishFailed="onFinishFailed">
        <a-form-item style="margin-bottom:10px;width: 220px" label="用户" name="username" :rules="[{ required: true, message: 'Please input your username!' }]">
          <a-input v-model:value="formState.username" style="border-radius:10px">
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item style="margin-bottom:10px;width: 220px" label="密码" name="password" :rules="[{ required: true, message: 'Please input your password!' }]">
          <a-input-password v-model:value="formState.password" style="border-radius:10px">
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item style="margin-bottom:10px;">
          <a-form-item name="remember" no-style>
            <a-checkbox v-model:checked="formState.remember">记住</a-checkbox>
          </a-form-item>
          <a class="login-form-forgot" href="">忘记密码</a>
        </a-form-item>

        <a-form-item>
          <a-button :disabled="disabled" style="border-radius:10px" type="primary" html-type="submit"
            class="login-form-button" @click="login()">
            Log in
          </a-button>
          Or
          <a @click="showDrawer">register now!</a>
        </a-form-item>
      </a-form>
  </a-card>
</template>
<script>
import { defineComponent, reactive, computed,onMounted } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { useStore } from 'vuex' // 引入useStore 方法
// import axios from 'axios';
export default defineComponent({
  name: 'LoginForm',

  components: {
    UserOutlined,
    LockOutlined,
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

    const user = {
      username:'zhangsan',
      email:'1437487442',
      head:'http://q1.qlogo.cn/g?b=qq&nk=1437487442&s=100',
    }

    const store = useStore();

    // const login = () => {
    //   var params = new URLSearchParams();
    //   params.append('op', 'login');
    //   params.append('username', formState.username);
    //   params.append('password', formState.password);
    //   //TODO: Login
    //   axios.post('http://kamuzuki.top:8080/bbs/user.action', params)
    //     .then(res=>{
    //       if (res.data.status == 'success') {
    //         store.state.isLogin = true
    //         props.showAvatar()
    //         props.openNotificationWithIcon('success', 'Login', 'Login success')
    //       } else {
    //         props.openNotificationWithIcon('error', 'Login', 'Login failed')
    //       }
    //     })
    //     .catch(function (error) {
    //       console.log(error); 
    //     });
    // }

    const login = () => {
      store.state.isLogin = true
      store.state.user = user
      store.state.isCertified = true
      sessionStorage.setItem("user", JSON.stringify(user));
      props.showAvatar()
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

    onMounted(() => {
      if(sessionStorage.getItem("user")!==null){
        store.state.isLogin = true
        store.state.user = user
        store.state.isCertified = true
        props.showAvatar()
        // props.openNotificationWithIcon('success', '登录', '自动登录成功');
      }
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