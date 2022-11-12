<template>
  <div class="wrap_box">
    <h1>文章管理</h1>
    <a-list class="demo-loadmore-list" :loading="initLoading" item-layout="horizontal" :data-source="listData">
      <template #renderItem="{ item }">
        <a-list-item>
          <template #actions>
            <a key="list-loadmore-edit">edit</a>
            <a key="list-loadmore-more">more</a>
          </template>
        </a-list-item>
      </template>
    </a-list>
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
  min-width: 1000px;
}
</style>
<script>
import { defineComponent} from 'vue';
export default defineComponent({
  setup() {
    const listData = [
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
    return {
      listData
    };
  },
});
</script>