<template>
  <LoginForm v-if="!avatarVisible" :showDrawer="showDrawer" :showAvatar="showAvatar"
    :openNotificationWithIcon="openNotificationWithIcon" style="width:100%">
  </LoginForm>
  <!-- <teleport to="header"> -->
    <!-- <AvatarComponent v-if="avatarVisible" :showAvatar="showAvatar" :openNotificationWithIcon="openNotificationWithIcon"
      style="width:270px">
    </AvatarComponent>
    <div v-if="isShow" class="mask">
      <div class="dialog">
        <h3>我是一个弹窗</h3>
        <button @click="isShow = false">关闭弹窗</button>
      </div>
    </div> -->
  <!-- </teleport> -->
  <a-drawer placement="left" :closable="false" :visible="visible" :get-container="true"
    :style="{ position: 'absolute' }" @close="onClose">
    <RegisterComponent :openNotificationWithIcon="openNotificationWithIcon" :onClose="onClose"></RegisterComponent>
  </a-drawer>
</template>
<script>
import { defineComponent, ref} from 'vue';
// import { notification } from 'ant-design-vue';
import LoginForm from './LoginForm.vue';
import RegisterComponent from './RegisterComponent.vue';
// import AvatarComponent from './tools/AvatarComponent.vue';
export default defineComponent({
  name: 'DrawerComponent',
  setup() {
    const visible = ref(false);
    // const avatarVisible = ref(false);

    const afterVisibleChange = bool => {
      console.log('visible', bool);
    };

    const showDrawer = () => {
      visible.value = true;
    };

    const onClose = () => {
      visible.value = false;
    };

    // const showAvatar = () => {
    //   avatarVisible.value = !avatarVisible.value;
    // };

    // const openNotificationWithIcon = (type,status,message) => {
    //   notification[type]({
    //     message: status,
    //     description: message,
    //   });
    // };

    return {
      visible,
      afterVisibleChange,
      showDrawer,
      onClose,
      // showAvatar,
      // avatarVisible,
      // openNotificationWithIcon,
    };
  },
  components: {
    LoginForm,
    RegisterComponent,
    // AvatarComponent
  },
  props: {
      avatarVisible:{
          type:Boolean,
          default:false
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
});
</script>