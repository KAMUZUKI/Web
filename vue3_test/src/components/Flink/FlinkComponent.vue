<template>
  <div class="wrap_box">
    <div class="flink">
      <template v-for="item in flinkList" :key="item.id">
        <a :href=item.url>
          <a-card hoverable style="width: 300px;margin-top:20px">
            <a-card-meta :title=item.name :description=item.description>
              <template #avatar>
                <a-avatar :src="'http://q1.qlogo.cn/g?b=qq&nk=' + item.img + '&s=100'" />
              </template>
            </a-card-meta>
          </a-card>
        </a>
      </template>
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
}
</style>
<script>
import { defineComponent, ref,onMounted } from 'vue';
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
    
    const initData = ()=>{
      //TODO:初始化友链列表  flinkList
      var params = new URLSearchParams();
        params.append('op', 'getFlink');
        axios.post('http://localhost:8081/demo/info.action', params)
          .then(res => {
            if (res.data.code == 1) {
                flinkList.value=res.data.data
            } else {
              console.log(res.data.msg)
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    
    onMounted(() => {
      initData()
    })

    return {
      flinkList
    };
  },
});
</script>