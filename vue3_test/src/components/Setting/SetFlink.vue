<template>
  <div class="wrap_box">
    <h1>友链管理</h1>
    <div class="flink">
      <template v-for="item in flinkList" :key="item.id">
        <a-popconfirm title="操作" ok-text="删除" cancel-text="取消"
                        @confirm="confirm" @cancel="cancel">
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
        <a-form :model="formState" v-bind="layout" name="nest-messages" :validate-messages="validateMessages"
          @finish="onFinish">
          <a-form-item :name="['user', 'name']" label="Name" :rules="[{ required: true }]">
            <a-input v-model:value="formState.name" />
          </a-form-item>
          <a-form-item :name="['user', 'email']" label="Email" :rules="[{ type: 'email' }, { required: true }]">
            <a-input v-model:value="formState.email" />
          </a-form-item>
          <a-form-item :name="['user', 'website']" label="Website" :rules="[{ required: true }]">
            <a-input v-model:value="formState.website" />
          </a-form-item>
          <a-form-item :name="['user', 'introduction']" label="Introduction" :rules="[{ required: true }]">
            <a-textarea v-model:value="formState.introduction" />
          </a-form-item>
          <a-form-item label="是否启用">
            <a-switch v-model:checked="formState.status" />
          </a-form-item>
          <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
            <a-button type="primary" html-type="submit">Submit</a-button>
          </a-form-item>
        </a-form>
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

import { defineComponent, ref, reactive } from 'vue';
import { message } from 'ant-design-vue';
export default defineComponent({
  setup() {
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
      email: '',
      website: '',
      introduction: '',
      status: true,
    })

    const layout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 16,
      },
    };

    const confirm = e => {
      console.log(e);
      message.success('删除成功');
    };

    const cancel = e => {
      console.log(e);
      message.error('操作取消');
    };

    const validateMessages = {
      required: '${label} is required!',
      types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
      },
      number: {
        range: '${label} must be between ${min} and ${max}',
      },
    };

    const onFinish = values => {
      //TODO: submit form 添加友链
      
      console.log('Success:', values);
    };
    //FORM END

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
      flinkList,
      visible,
      layout,
      formState,
      validateMessages,
      confirm,
      cancel,
      showDrawer,
      onClose,
      onFinish
    };
  }
});
</script>