<template>
  <div class="container">
    <a-list item-layout="horizontal" :pagination="pagination" :data-source="listData">
      <template #renderItem="{ item }">
        <a-list-item>
          <a-list-item-meta :description=item.content>
            <template #title>
              <a>{{ item.title }}</a>
            </template>
            <template #avatar>
              <a-avatar style="margin-left:30px;width:45px;height:45px"
                :src="'http://q1.qlogo.cn/g?b=qq&nk=' + item.img + '&s=100'" />
            </template>
          </a-list-item-meta>
          <a-button class="button" type="primary" @click="modify(item.id)">修改</a-button>
          <a-popconfirm title="确定删除该文章?" ok-text="确认" cancel-text="取消" @confirm="confirm" @cancel="cancel">
            <a-button class="button" type="primary" danger @click="deleteByUserId(item.id)">删除</a-button>
          </a-popconfirm>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>
  
<script>
import { defineComponent, ref, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';
export default defineComponent({
  setup() {
    const originData = ref([]);

    for (let i = 1; i < 20; i++) {
      originData.value.push({
        id: i,
        author: 'zhangsan' + i,
        title: `zhangsan part` + i,
        avatar: 'https://joeschmoe.io/api/v1/random',
        description: 'GO JAVA',
        content: i + '# Marked in the browser  Marked in the browser  Marked in the browser\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.',
        keywords: ['GO', 'JAVA'],
        category: ['GO', 'PYTHON', 'JAVA'],
        createTime: '2015-07-23 15:23:05',
        colCnt: [234, 34, 43],
      })
    }

    const pagination = {
      onChange: page => {
        console.log(page);
      },
      pageSize: 5,
    };

    const router = useRouter()

    const listData = ref([])

    const initDataList = () => {
      originData.value.forEach((item) => {
        item.content = item.content.replaceAll(/[#*`-]/ig, "").slice(0, 200) + "....."
        listData.value.push(item)
      })
    }

    const modify = (articleId) => {
      //TODO: 根据id修改文章,跳转至编辑页面
      router.push({
        path: '/editor',
        query: {
          articleId: articleId
        }
      })
    }

    const deleteByUserId = (articleId) => {
      //TODO:根据id删除文章
      console.log(articleId)
    }

    const confirm = e => {
      console.log(e);
      message.success('删除成功');
    }

    const cancel = e => {
      console.log(e);
      message.error('取消删除');
    }

    onMounted(() => {
      initDataList()
    })

    return {
      listData,
      pagination,
      current: ref(2),
      modify,
      deleteByUserId,
      confirm,
      cancel,
    };
  },
});
</script>

<style scoped>
.flink {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
}

.container {
  min-height: 80vh;
  min-width: 1000px;
}

.button {
  margin-right: 20px;
}
</style>