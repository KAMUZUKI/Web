<template>
  <template v-for="item in flinkList" :key="item.id">
    <a-card hoverable style="width: 300px">
      <a-card-meta title="Card title" description="This is the description">
        <template #avatar>
          <a-avatar :about="'http://q1.qlogo.cn/g?b=qq&nk='+flinkList.img+'&s=100'" />
        </template>
      </a-card-meta>
    </a-card>
  </template>
</template>s
<script>
import { defineComponent,ref } from 'vue';  
export default defineComponent({
    setup() {
      const flinkList = ref([
        {
          id:1,
          name:'张三',
          url:'https://www.baidu.com',
          img:'1437487442',
          description:'百度一下，你就知道',
          status:1,
        },
        {
          id:2,
          name:'李四',
          url:'https://cn.vuejs.org/',
          img:'2725291836',
          description:'百度一下，你就知道',
          status:1,
        },
        {
          id:3,
          name:'王五',
          url:'https://cn.vuejs.org/',
          img:'1196530268',
          description:'百度一下，你就知道',
          status:1,
        },
        {
          id:4,
          name:'赵六',
          url:'https://cn.vuejs.org/',
          img:'3603685701',
          description:'百度一下，你就知道',
          status:1,
        }
      ])
        return {
          flinkList
        };
    },
});
</script>