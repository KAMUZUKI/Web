<template>
  <div class="container">
    <a-list item-layout="horizontal" :data-source="listData">
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
    <a-pagination hideOnSinglePage v-model:current="current" :total="50" show-less-items />
  </div>
</template>
  
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
</style>
<script>
import { defineComponent, ref, onMounted } from 'vue';
import { message } from 'ant-design-vue';
export default defineComponent({
  setup() {
    const originData = [
      {
        id: 1,
        author: 'zhangsan',
        title: `zhangsan part`,
        avatar: 'https://joeschmoe.io/api/v1/random',
        description: 'GO JAVA',
        content: '# 111111Marked in the browser  Marked in the browser  Marked in the browser\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.',
        keywords: ['GO', 'JAVA'],
        category: ['GO', 'PYTHON', 'JAVA'],
        createTime: '2015-07-23 15:23:05',
        colCnt: [234, 34, 43],
      },
      {
        id: 2,
        author: 'lisi',
        title: `lisi part`,
        avatar: 'https://joeschmoe.io/api/v1/random',
        description: 'GO PYTHON.',
        content: '# 222222Marked in the browser  Marked in the browser  Marked in the browser\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.',
        keywords: ['GO', 'PYTHON'],
        category: ['GO', 'PYTHON', 'JAVA'],
        createTime: '2015-07-23 15:23:05',
        colCnt: [423, 153, 98],
      },
      {
        id: 3,
        author: 'wangwu',
        title: `wangwu part`,
        avatar: 'https://joeschmoe.io/api/v1/random',
        description: 'PYTHON JAVA.',
        content: '# 333333Marked in the browser  Marked in the browser  Marked in the browser\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.# 333333Marked in the browser  Marked in the browser  Marked in the browser\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.# 333333Marked in the browser  Marked in the browser  Marked in the browser\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.# 333333Marked in the browser  Marked in the browser  Marked in the browser\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.',
        keywords: ['PYTHON', 'JAVA'],
        category: ['GO', 'PYTHON', 'JAVA'],
        createTime: '2015-07-23 15:23:05',
        colCnt: [365, 433, 43],
      },
      {
        id: 4,
        author: 'zhaoliu',
        title: `zhaoliu part`,
        avatar: 'https://joeschmoe.io/api/v1/random',
        description: 'GO PYTHON JAVA.',
        content: '# 444444Marked in the browser  Marked in the browser  Marked in the browser\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.',
        keywords: ['GO', 'PYTHON', 'JAVA'],
        category: ['GO', 'PYTHON', 'JAVA'],
        createTime: '2015-07-23 15:23:05',
        colCnt: [432, 64, 876],
      },
      {
        id: 5,
        author: 'zhaoliu',
        title: `zhaoliu part`,
        avatar: 'https://joeschmoe.io/api/v1/random',
        description: 'JAVA技术 .NET技术 JAVA.',
        content: '# 555555Marked in the browser  Marked in the browser  Marked in the browser\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.',
        keywords: ['JAVA技术', '.NET技术', 'JAVA'],
        category: ['JAVA技术', '.NET技术', 'JAVA'],
        createTime: '2015-07-23 15:23:05',
        colCnt: [432, 64, 876],
      },
      {
        id: 5,
        author: 'zhaoliu',
        title: `zhaoliu part`,
        avatar: 'https://joeschmoe.io/api/v1/random',
        description: 'C# 数据库技术 JAVA.',
        content: '# 666666Marked in the browser  Marked in the browser  Marked in the browser\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.',
        keywords: ['C#', '数据库技术', 'JAVA'],
        category: ['C#', '数据库技术', 'JAVA'],
        createTime: '2015-07-23 15:23:05',
        colCnt: [432, 64, 876],
      },
    ];

    const listData = ref([])

    const initDataList = () => {
      originData.forEach((item) => {
        item.content = item.content.replaceAll(/[#*`-]/ig, "").slice(0, 200) + "....."
        listData.value.push(item)
      })
    }

    const modify = (articleId) => {
      //TODO: 根据id修改文章
      console.log("modify", articleId)
    }

    const deleteByUserId = (articleId) => {
      //TODO:根据id删除文章
      console.log(articleId)
    }

    const confirm = e => {
      console.log(e);
      message.success('Click on Yes');
    };
    const cancel = e => {
      console.log(e);
      message.error('Click on No');
    };

    onMounted(() => {
      initDataList()
    })

    return {
      listData,
      modify,
      deleteByUserId,
      confirm,
      cancel,
      current: ref(2),
    };
  },
});
</script>