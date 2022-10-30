<template>
    <LoginForm :showDrawer="showDrawer" style="width:270px"></LoginForm>
    <a-drawer placement="left" :closable="false" :visible="visible" :get-container="true"
        :style="{ position: 'absolute' }" @close="onClose">
        <RegisterComponent :onClose="onClose"></RegisterComponent>
    </a-drawer>
</template>
<script>
  import { defineComponent, ref } from 'vue';
  import LoginForm from './LoginForm.vue';
  import RegisterComponent from './RegisterComponent.vue';
  export default defineComponent({
    name: 'DrawerComponent',
    setup() {
      const visible = ref(false);
  
      const afterVisibleChange = bool => {
        console.log('visible', bool);
      };
  
      const showDrawer = () => {
        visible.value = true;
      };
  
      const onClose = () => {
        visible.value = false;
      };
  
      return {
        visible,
        afterVisibleChange,
        showDrawer,
        onClose,
      };
    },
    components: {
        LoginForm,
        RegisterComponent
    }
  });
  </script>