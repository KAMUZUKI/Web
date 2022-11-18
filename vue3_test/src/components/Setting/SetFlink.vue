<template>
  <div class="wrap_box"><h1>友链管理</h1>
    
    <div class="flink">
      <template v-for="item in flinkList" :key="item.id">
        <a-popconfirm title="操作" ok-text="删除" cancel-text="取消" @confirm="confirm" @cancel="cancel">
          <a-card hoverable style="width: 300px;margin-top:20px">
            <a-card-meta :title=item.name :description=item.description>
              <template #avatar>
                <a-avatar :src="'http://q1.qlogo.cn/g?b=qq&nk=' + item.img + '&s=100'" />
              </template>
            </a-card-meta>
          </a-card>
        </a-popconfirm>
      </template>
      <a-card hoverable style="width: 300px;height:97px;margin-top:20px" @click="showDrawer">
        <a-card-meta title="添加友链">
          添加友链
        </a-card-meta>
      </a-card>
      <a-drawer title="添加友链" :width="500" :visible="visible" :body-style="{ paddingBottom: '80px' }"
        :footer-style="{ textAlign: 'right' }" @close="onClose">
        <a-form ref="formRef" name="custom-validation" :model="formState" :rules="rules" v-bind="layout"
          @finish="handleFinish" @validate="handleValidate" @finishFailed="handleFinishFailed"
          :validate-messages="validateMessages">
          <h2 style="text-align:center;">注册</h2>
          <a-form-item label="用户名" name="name" required>
            <a-input v-model:value="formState.name" :rules="[{ required: true }]">
              <template #prefix>
                <UserOutlined class="site-form-item-icon" />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item :name="['img']" label="邮箱" :rules="[{ required: true }, { type: 'email' }]">
            <a-input v-model:value="formState.img" />
          </a-form-item>
          <a-form-item :name="['url']" label="网址" :rules="[{ required: true }]">
            <a-input v-model:value="formState.url" />
          </a-form-item>
          <a-form-item :name="['description']" label="简介" :rules="[{ required: true }]">
            <a-textarea v-model:value="formState.description" />
          </a-form-item>
          <a-form-item label="是否启用">
            <a-switch v-model:checked="formState.status" />
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 16, offset: 6 }">
            <a-button type="primary" html-type="submit">注册</a-button>
            <a-button style="margin-left: 10px" @click="onClose">退出</a-button>
          </a-form-item>
        </a-form>
        <notification-component ref="openNotification"></notification-component>
      </a-drawer>
    </div>
  </div>
</template>
  
<style scoped>
.flink {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
}

.wrap_box {
  min-height: 80vh;
  max-width: 1000px;
}
</style>
<script>

import { defineComponent, ref,reactive } from 'vue';
import NotificationComponent from '../tools/NotificationComponent.vue';
import { message } from 'ant-design-vue';
export default defineComponent({
  components: {
    NotificationComponent
  },
  setup() {
    const formRef = ref();
    const openNotification = ref()

    const flinkList = ref([
      {
        id: 1,
        name: '张三',
        url: 'https://www.baidu.com',
        img: '1437487442',
        description: '百度一下，你就知道',
        status: 1,
      },
      {
        id: 2,
        name: '李四',
        url: 'https://cn.vuejs.org/',
        img: '2725291836',
        description: '百度一下，你就知道',
        status: 1,
      },
      {
        id: 3,
        name: '王五',
        url: 'https://cn.vuejs.org/',
        img: '1196530268',
        description: '百度一下，你就知道',
        status: 1,
      },
      {
        id: 4,
        name: '赵六',
        url: 'https://cn.vuejs.org/',
        img: '3603685701',
        description: '百度一下，你就知道',
        status: 1,
      }
    ])

    //FORM BEGIN
    const formState = reactive({
      name: '',
      img: '',
      url: '',
      description: '',
      status: true,
    })

    // const layout = {
    //   labelCol: {
    //     span: 8,
    //   },
    //   wrapperCol: {
    //     span: 16,
    //   },
    // };

    const confirm = e => {
      console.log(e);
      message.success('删除成功');
    };

    const cancel = e => {
      console.log(e);
      message.error('操作取消');
    };

    // const validateMessages = {
    //   required: '${label} is required!',
    //   types: {
    //     email: '${label} is not a valid email!',
    //     number: '${label} is not a valid number!',
    //   },
    //   number: {
    //     range: '${label} must be between ${min} and ${max}',
    //   },
    // };

    // const onFinish = values => {
    //   //TODO: submit form 添加友链

    //   console.log('Success:', values);
    // };
    //FORM END

    const validateMessages = {
      required: '${label} 是必要的!',
      types: {
        email: '${label} 是无效的邮箱!',
        number: '${label} 是无效的数字!',
      }
    };

    const handleFinish = values => {
      console.log(values, formState);
      // flinkList.value.push({
      //   id: flinkList.value.length + 1,
      //   name: formState.name,
      //   url: formState.url,
      //   img: formState.img,
      //   description: formState.description,
      //   status: formState.status ? 1 : 0,
      // })
      //TODO:添加友链
      var params = new URLSearchParams();
      params.append('op', 'addFlink');
      params.append('name', formState.name);
      params.append('url', formState.url);
      params.append('img', formState.img);
      params.append('description', formState.description);
      params.append('status', formState.status ? 1 : 0);
      axios.post('http://localhost:8081/demo/info.action', params)
      .then(res => {
          if (res.data.code == 1) {
            flinkList.value.push(JSON.parse(res.data.data))
            openNotification.value.openNotificationWithIcon('success', '添加成功', '恭喜你添加友链成功');
            formState.name = '';
            formState.img = '';
            formState.url = '';
            formState.description = '';
          } else {
            openNotification.value.openNotificationWithIcon('error', '添加失败', '添加友链出错');
          }
      })
      .catch(function (error) {
          console.log(error);
      });
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


    const layout = {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 16,
      },
    };

    //DRAWER BEGIN
    const visible = ref(false);

    const showDrawer = () => {
      visible.value = true;
    };

    const onClose = () => {
      visible.value = false;
    };
    //DRAWER END
    return {
      layout,
      cancel,
      visible,
      confirm,
      onClose,
      flinkList,
      formState,
      resetForm,
      showDrawer,
      handleFinish,
      handleValidate,
      validateMessages,
      openNotification,
      handleFinishFailed,
    };
  }
});
</script>