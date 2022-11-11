<template>
  <a-list style="maxwidth:80%;" item-layout="vertical" size="large" :pagination="pagination" :data-source="initDataList">
    <template #footer>
      <div>
        <b>到底了,没有了!!!</b>
      </div>
    </template>
    <template #renderItem="{ item }">
      <a-list-item key="item.title">
        <template #actions>
          <span v-for="{ type,id } in actions" :key="type">
            <component :is="type" style="margin-right: 8px" />
            {{ item.colCnt[id] }}
          </span>
        </template>
        <template #extra>
          <img width="272" alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />
        </template>
        <a-list-item-meta :description="item.description">
          <template #title>
            <router-link class="nav-link" :to="'/article/'+item.id" @click="pushToDetail(item)">{{ item.title }}</router-link>
          </template>
          <template #avatar>
            <a-avatar :src="item.avatar" />
          </template>
        </a-list-item-meta>
        {{ item.content.replaceAll(/[#*`-]/ig, "").slice(0, 300)+"....." }}
      </a-list-item>
    </template>
  </a-list>
</template>
<script>
import { StarOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons-vue';
import { defineComponent,onMounted,ref,onBeforeUnmount } from 'vue';
import { useStore } from 'vuex' // 引入useStore 方法


const listData = [
  {
    id:1,
    author: 'zhangsan',
    title: `zhangsan part`,
    avatar: 'https://joeschmoe.io/api/v1/random',
    description: 'GO JAVA',
    content: '# 111111Marked in the browser  Marked in the browser  Marked in the browser\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.',
    keywords: ['GO','JAVA'],
    category: ['GO','PYTHON','JAVA'],
    colCnt:[234,34,43],

  },
  {
    id:2,
    author: 'lisi',
    title: `lisi part`,
    avatar: 'https://joeschmoe.io/api/v1/random',
    description: 'GO PYTHON.',
    content: '# 222222Marked in the browser  Marked in the browser  Marked in the browser\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.',
    keywords: ['GO','PYTHON'],
    category: ['GO','PYTHON','JAVA'],
    colCnt:[423,153,98],
  },
  {
    id:3,
    author: 'wangwu',
    title: `wangwu part`,
    avatar: 'https://joeschmoe.io/api/v1/random',
    description: 'PYTHON JAVA.',
    content: '# 333333Marked in the browser  Marked in the browser  Marked in the browser\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.# 333333Marked in the browser  Marked in the browser  Marked in the browser\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.# 333333Marked in the browser  Marked in the browser  Marked in the browser\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.# 333333Marked in the browser  Marked in the browser  Marked in the browser\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.',
    keywords: ['PYTHON','JAVA'],
    category: ['GO','PYTHON','JAVA'],
    colCnt:[365,433,43],
  },
  {
    id:4,
    author: 'zhaoliu',
    title: `zhaoliu part`,
    avatar: 'https://joeschmoe.io/api/v1/random',
    description: 'GO PYTHON JAVA.',
    content: '# 444444Marked in the browser  Marked in the browser  Marked in the browser\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.',
    keywords: ['GO','PYTHON','JAVA'],
    category: ['GO','PYTHON','JAVA'],
    colCnt:[432,64,876],
  },
  {
    id:5,
    author: 'zhaoliu',
    title: `zhaoliu part`,
    avatar: 'https://joeschmoe.io/api/v1/random',
    description: 'JAVA技术 .NET技术 JAVA.',
    content: '# 555555Marked in the browser  Marked in the browser  Marked in the browser\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.',
    keywords: ['JAVA技术','.NET技术','JAVA'],
    category: ['JAVA技术','.NET技术','JAVA'],
    colCnt:[432,64,876],
  },
  {
    id:5,
    author: 'zhaoliu',
    title: `zhaoliu part`,
    avatar: 'https://joeschmoe.io/api/v1/random',
    description: 'C# 数据库技术 JAVA.',
    content: '# 666666Marked in the browser  Marked in the browser  Marked in the browser\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.\n\nRendered by **marked**.',
    keywords: ['C#','数据库技术','JAVA'],
    category: ['C#','数据库技术','JAVA'],
    colCnt:[432,64,876],
  },
];

const initDataList = ref([]);

export default defineComponent({
  setup() {

    const store = useStore()  // 该方法用于返回store 实例

    const pushToDetail = (item) => {
      store.state.detail = JSON.stringify(item)
      sessionStorage.setItem("articleDetail", JSON.stringify(item));
    }

    const initDataByCategory = (type) => {
      if (type === 'all') {
        for (let i = 0; i < listData.length; i++) {
            initDataList.value.push(listData[i]);
        }
      } else {
        for (let i = 0; i < listData.length; i++) {
          if (listData[i].category.includes(type)) {
            initDataList.value.push(listData[i]);
          }
        }
      }
    }

    const initDataByKeyword = (type) => {
        for (let i = 0; i < listData.length; i++) {
          if (listData[i].keywords.includes(type)) {
            initDataList.value.push(listData[i]);
          }
        }
    }

    const pagination = {
      onChange: page => {
        console.log(page);
      },
      pageSize: 3,
    };

    onMounted(() => {
      initDataByCategory('all');
    });

    onBeforeUnmount(() => {
      initDataList.value = [];
    });

    const changeContenByCategory = (type) => {
      initDataList.value = [];
      initDataByCategory(type);
    }

    const changeContenByKeyword = (type) => {
      initDataList.value = [];
      initDataByKeyword(type);
    }

    const actions = [{
      id:0,
      type: 'StarOutlined',
    }, {
      id:1,
      type: 'LikeOutlined',
    }, {
      id:2,
      type: 'MessageOutlined',
    }];
    return {
      listData,
      pagination,
      actions,
      initDataList,
      pushToDetail,
      initDataByKeyword,
      initDataByCategory,
      changeContenByCategory,
      changeContenByKeyword,
    };
  },
  components: {
    StarOutlined,
    LikeOutlined,
    MessageOutlined,
  },
});
</script>